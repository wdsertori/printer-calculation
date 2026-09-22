# Loja (guia Shopping)

Documento interno. Não aparece no app.

## Como adicionar ou mudar um produto

Edite **somente** o `loja/links.txt`. Uma linha por produto:

```
categoria | link de afiliado | título opcional | descrição opcional
```

Categorias válidas (escreva exatamente assim):
`Impressoras` · `Filamentos` · `Peças de reposição` · `Ferramentas` · `Aprenda 3D`

Ao dar commit nesse arquivo, uma GitHub Action roda o processador, busca
título/descrição/foto de cada link e regrava o `loja.json`, que é o arquivo
que o app lê. **Não edite o `loja.json` à mão** — ele é sobrescrito.

Pelo celular: abra o repositório no navegador, toque em `loja/links.txt`, no
ícone de lápis, edite e faça o commit.

## Quando preencher o título à mão

Pelos testes com links reais:

| Marketplace | Título automático | Descrição automática | Foto |
|---|---|---|---|
| Mercado Livre | vem certo | inútil (descarta sozinho) | ok |
| Shopee | vem certo | vem boa | ok |
| Amazon | vem só "Amazon.com.br" | vazia | ok |

Então **produto da Amazon precisa de título escrito à mão** na terceira coluna.
Nos outros, preencha só se quiser um texto melhor que o do anúncio.

## Cache

Link que já foi resolvido antes é reaproveitado do `loja.json` e não gera nova
requisição. Pra forçar a releitura de um item, apague a linha dele do
`loja.json` (ou o arquivo todo) e rode de novo.

## Rodar na mão

```
pip install -r loja/requirements.txt
python loja/processador.py
```

Também dá pra disparar sem commit: aba **Actions** do GitHub →
"Atualiza a loja" → **Run workflow**.

## Como funciona por dentro

Mesma estratégia do processador do projeto Assunto do Dia: resolve os
redirecionamentos do link curto, analisa todas as respostas do caminho
(`response.history`), lê Open Graph / Twitter Cards / JSON-LD e, se não achar
dados suficientes, repete a requisição com User-Agent de rastreador de prévia
(`WhatsApp/...`, `facebookexternalhit/1.1`) — que é como o WhatsApp monta a
prévia de link. Nessa segunda tentativa, o que o rastreador devolve tem
prioridade sobre a primeira resposta, porque páginas bloqueadas devolvem lixo
no `<title>`.
