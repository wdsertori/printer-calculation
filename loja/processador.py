#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Precifica 3D - Processador de Links de Afiliados da guia Shopping.

Baseado no processador do projeto Assunto do Dia (mesma estratégia:
resolve redirecionamentos, lê Open Graph / Twitter Cards / JSON-LD e,
quando necessário, repete a requisição com User-Agent de rastreador de
prévia, que é o que o WhatsApp faz).

Diferenças desta versão:
  - entrada é "categoria | link | título opcional | descrição opcional"
  - saída é loja.json (consumido pela guia Shopping do app)
  - título e descrição escritos à mão têm prioridade sobre o automático
  - links já resolvidos antes são reaproveitados do loja.json (cache),
    pra não repetir requisição a cada execução
"""

from __future__ import annotations

import csv
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import parse_qs, unquote, urlparse

try:
    import requests
except ImportError:
    print("ERRO: instale as dependências com: pip install -r requirements.txt")
    raise SystemExit(1)


USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/140.0 Safari/537.36"
)

TIMEOUT = 20

# User-Agents usados por rastreadores de prévia de links.
# O WhatsApp informa que usa um User-Agent no formato WhatsApp/2.x.x.x A|I|N;
# facebookexternalhit é usado como fallback pela infraestrutura da Meta.
PREVIEW_USER_AGENTS = (
    "WhatsApp/2.22.20.72 I",
    "facebookexternalhit/1.1",
)


class PreviewParser(HTMLParser):
    """Extrai metadados usados normalmente em prévias de links."""

    def __init__(self):
        super().__init__()
        self.meta = {}
        self.title = ""
        self._inside_title = False

    def handle_starttag(self, tag, attrs):
        tag = tag.lower()

        if tag == "title":
            self._inside_title = True
            return

        if tag != "meta":
            return

        data = {str(k).lower(): v for k, v in attrs}
        key = data.get("property") or data.get("name")
        value = data.get("content")

        if key and value:
            self.meta.setdefault(key.lower(), value.strip())

    def handle_endtag(self, tag):
        if tag.lower() == "title":
            self._inside_title = False

    def handle_data(self, data):
        if self._inside_title and data.strip() and not self.title:
            self.title = data.strip()


def extract_preview(html: str, response_url: str) -> dict:
    """Extrai título, descrição, imagem e URL dos metadados da página."""
    result = {
        "titulo_preview": "",
        "descricao_preview": "",
        "imagem_preview": "",
        "url_meta": "",
    }

    if not html:
        return result

    parser = PreviewParser()

    try:
        parser.feed(html)
    except Exception:
        return result

    meta = parser.meta

    result["titulo_preview"] = (
        meta.get("og:title")
        or meta.get("twitter:title")
        or meta.get("title")
        or parser.title
        or ""
    )

    result["descricao_preview"] = (
        meta.get("og:description")
        or meta.get("twitter:description")
        or meta.get("description")
        or ""
    )

    result["imagem_preview"] = (
        meta.get("og:image")
        or meta.get("twitter:image")
        or meta.get("twitter:image:src")
        or meta.get("og:image:secure_url")
        or ""
    )

    result["url_meta"] = meta.get("og:url") or response_url or ""

    # Fallback para JSON-LD de páginas de produto.
    scripts = re.findall(
        r'<script[^>]+type=["\']application/ld\+json["\'][^>]*>(.*?)</script>',
        html,
        re.I | re.S,
    )

    for raw in scripts:
        try:
            data = json.loads(raw.strip())
        except (json.JSONDecodeError, TypeError):
            continue

        objects = data if isinstance(data, list) else [data]

        for obj in objects:
            if not isinstance(obj, dict):
                continue

            obj_type = obj.get("@type")

            if isinstance(obj_type, list):
                is_product = "Product" in obj_type
            else:
                is_product = obj_type == "Product"

            if not is_product:
                continue

            if not result["titulo_preview"]:
                result["titulo_preview"] = str(obj.get("name") or "").strip()

            if not result["descricao_preview"]:
                result["descricao_preview"] = str(obj.get("description") or "").strip()

            if not result["imagem_preview"]:
                image = obj.get("image")

                if isinstance(image, list) and image:
                    image = image[0]

                if isinstance(image, dict):
                    image = image.get("url") or image.get("contentUrl")

                result["imagem_preview"] = str(image or "").strip()

            if not result["url_meta"]:
                result["url_meta"] = str(obj.get("url") or "").strip()

            break

    return result


def has_preview_data(preview: dict) -> bool:
    """Retorna True quando já temos dados suficientes para uma prévia."""
    return bool(
        preview.get("titulo_preview")
        and (
            preview.get("imagem_preview")
            or preview.get("descricao_preview")
        )
    )


def collect_preview(response) -> dict:
    """Procura metadados em todas as respostas do redirecionamento."""
    responses = list(response.history) + [response]

    combined = {
        "titulo_preview": "",
        "descricao_preview": "",
        "imagem_preview": "",
        "url_meta": "",
    }

    for item in responses:
        try:
            candidate = extract_preview(item.text, item.url)
        except Exception:
            continue

        for key, value in candidate.items():
            if value and not combined[key]:
                combined[key] = value

    return combined


def marketplace_from_host(host: str) -> str:
    host = host.lower().split(":", 1)[0]

    if any(x in host for x in ("mercadolivre", "mercadolibre", "meli.")):
        return "Mercado Livre"

    if "shopee" in host:
        return "Shopee"

    if "amazon" in host:
        return "Amazon"

    return "Desconhecido"


def extract_product_id(url: str, marketplace: str) -> str:
    """Tenta encontrar um identificador útil sem inventar um ID."""
    parsed = urlparse(url)
    text = unquote(parsed.path + "?" + parsed.query)
    query = parse_qs(parsed.query)

    if marketplace == "Amazon":
        match = re.search(
            r"/(?:dp|gp/product|product)/([A-Z0-9]{10})(?:[/?]|$)",
            text,
            re.I,
        )

        if match:
            return match.group(1).upper()

        for key in ("asin", "ASIN"):
            if key in query and query[key]:
                return query[key][0]

    if marketplace == "Mercado Livre":
        match = re.search(r"\b(MLB[-_]?[0-9]{6,})\b", text, re.I)

        if match:
            return match.group(1).upper().replace("_", "-")

        for key in ("item_id", "item", "id"):
            if key in query and query[key]:
                value = query[key][0]

                if re.search(r"MLB[-_]?[0-9]{6,}", value, re.I):
                    return value.upper().replace("_", "-")

    if marketplace == "Shopee":
        # Formato antigo/comum: /i.<loja>.<produto>
        match = re.search(r"/i\.(\d+)\.(\d+)", text, re.I)

        if match:
            return match.group(2)

        # Formato atual observado no teste:
        # /<loja>/<produto>/<slug>
        match = re.search(r"/(\d{6,})/(\d{8,})(?:/|$)", parsed.path)

        if match:
            return match.group(2)

    return ""


def resolve_url(url: str) -> dict:
    url = url.strip()

    result = {
        "link_afiliado": url,
        "link_final": "",
        "marketplace": marketplace_from_host(urlparse(url).netloc),
        "id_produto": "",
        "titulo_preview": "",
        "descricao_preview": "",
        "imagem_preview": "",
        "url_meta": "",
        "status": "",
        "erro": "",
    }

    if not url.startswith(("http://", "https://")):
        result["status"] = "ERRO"
        result["erro"] = "Link não começa com http:// ou https://"
        return result

    try:
        response = requests.get(
            url,
            headers={
                "User-Agent": USER_AGENT,
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
            },
            allow_redirects=True,
            timeout=TIMEOUT,
        )

        final_url = response.url

        result["link_final"] = final_url
        result["marketplace"] = (
            marketplace_from_host(urlparse(final_url).netloc)
            or result["marketplace"]
        )
        result["id_produto"] = extract_product_id(
            final_url,
            result["marketplace"],
        )

        preview = collect_preview(response)

        # Algumas lojas entregam uma página diferente para navegadores e
        # para os rastreadores que montam a prévia do WhatsApp. Isso é
        # especialmente importante nos links curtos da Shopee.
        if not has_preview_data(preview):
            for preview_user_agent in PREVIEW_USER_AGENTS:
                try:
                    preview_response = requests.get(
                        url,
                        headers={
                            "User-Agent": preview_user_agent,
                            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                            "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
                        },
                        allow_redirects=True,
                        timeout=TIMEOUT,
                    )
                except requests.RequestException:
                    continue

                candidate = collect_preview(preview_response)

                # O que o rastreador de prévia devolve tem PRIORIDADE sobre a
                # primeira tentativa: quando a loja bloqueia o acesso comum,
                # aquela resposta traz lixo (ex.: <title>Acesso bloqueado</title>)
                # que sobrescreveria o título correto se fosse só preencher
                # campo vazio.
                for key, value in candidate.items():
                    if value:
                        preview[key] = value

                if has_preview_data(preview):
                    break

        result.update(preview)

        result["status"] = "OK" if response.ok else f"HTTP {response.status_code}"

    except requests.RequestException as exc:
        result["status"] = "ERRO"
        result["erro"] = str(exc)

    return result


CATEGORIAS = [
    "Impressoras",
    "Filamentos",
    "Peças de reposição",
    "Ferramentas",
    "Acessórios",
    "Aprenda 3D",
]


def read_items(path: Path) -> list[dict]:
    """Lê links.txt no formato: categoria | link | título | descrição.

    Só categoria e link são obrigatórios. Título e descrição, quando
    preenchidos, substituem o que vier da prévia automática — útil na
    Amazon, que não entrega título para rastreadores de prévia.
    """
    items = []

    with path.open("r", encoding="utf-8-sig") as file:
        for numero, line in enumerate(file, start=1):
            line = line.strip()

            if not line or line.startswith("#"):
                continue

            partes = [p.strip() for p in line.split("|")]

            if len(partes) < 2 or not partes[1]:
                print(f"  linha {numero} ignorada (faltou categoria ou link): {line}")
                continue

            categoria = partes[0]

            if categoria not in CATEGORIAS:
                print(f"  linha {numero}: categoria '{categoria}' não existe, usando 'Ferramentas'")
                categoria = "Ferramentas"

            items.append({
                "categoria": categoria,
                "link": partes[1],
                "titulo_manual": partes[2] if len(partes) > 2 else "",
                "descricao_manual": partes[3] if len(partes) > 3 else "",
            })

    return items


def load_cache(path: Path) -> dict:
    """Produtos já resolvidos numa execução anterior, indexados pelo link."""
    if not path.exists():
        return {}

    try:
        dados = json.loads(path.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return {}

    return {
        p["link"]: p
        for p in dados.get("produtos", [])
        if p.get("link") and p.get("imagem")
    }


def main() -> int:
    base = Path(__file__).resolve().parent
    raiz = base.parent

    input_file = Path(sys.argv[1]) if len(sys.argv) > 1 else base / "links.txt"
    output_file = Path(sys.argv[2]) if len(sys.argv) > 2 else raiz / "loja.json"

    if not input_file.exists():
        print(f"Arquivo não encontrado: {input_file}")
        return 1

    items = read_items(input_file)

    if not items:
        print("Nenhum link válido encontrado. Gerando loja.json vazio.")
        output_file.write_text(
            json.dumps({"atualizadoEm": "", "produtos": []}, ensure_ascii=False, indent=2),
            encoding="utf-8",
        )
        return 0

    cache = load_cache(output_file)
    print(f"Processando {len(items)} link(s)... ({len(cache)} já em cache)")

    produtos = []
    falhas = 0

    for indice, item in enumerate(items, start=1):
        link = item["link"]
        print(f"[{indice}/{len(items)}] {item['categoria']} | {link}")

        guardado = cache.get(link)

        if guardado:
            print("      reaproveitado do cache")
            dados = {
                "titulo": guardado.get("titulo", ""),
                "descricao": guardado.get("descricao", ""),
                "imagem": guardado.get("imagem", ""),
                "marketplace": guardado.get("marketplace", ""),
            }
        else:
            bruto = resolve_url(link)

            if bruto["status"] != "OK":
                print(f"      FALHOU: {bruto['status']} {bruto['erro']}")
                falhas += 1

            dados = {
                "titulo": bruto["titulo_preview"],
                "descricao": bruto["descricao_preview"],
                "imagem": bruto["imagem_preview"],
                "marketplace": bruto["marketplace"],
            }

            if not dados["imagem"]:
                print("      sem imagem na prévia")

        # Descrições genéricas que os marketplaces devolvem não servem
        # para o cliente; melhor deixar vazio do que poluir o cartão.
        descricao = dados["descricao"]

        if descricao and re.search(
            r"visite a página|encontre todos os produtos|em um só lugar",
            descricao,
            re.I,
        ):
            descricao = ""

        produtos.append({
            "categoria": item["categoria"],
            "link": link,
            "titulo": item["titulo_manual"] or dados["titulo"] or "(sem título)",
            "descricao": item["descricao_manual"] or descricao,
            "imagem": dados["imagem"],
            "marketplace": dados["marketplace"],
        })

    # Mantém a ordem das categorias como definida em CATEGORIAS.
    produtos.sort(key=lambda p: CATEGORIAS.index(p["categoria"]) if p["categoria"] in CATEGORIAS else 99)

    saida = {
        "atualizadoEm": __import__("datetime").datetime.now().strftime("%Y-%m-%d %H:%M"),
        "produtos": produtos,
    }

    output_file.write_text(
        json.dumps(saida, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    print(f"\n{len(produtos)} produto(s) gravado(s) em: {output_file}")

    if falhas:
        print(f"{falhas} link(s) com problema — confira acima.")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
