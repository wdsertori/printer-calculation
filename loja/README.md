# Loja (guia Shopping)

Documento interno. Não aparece no app.

## Como adicionar ou mudar um produto

Edite **somente** o `loja/links.txt`. Uma linha por produto:

```
categoria | link de afiliado | título opcional | descrição opcional | alvo opcional
```

Categorias válidas (escreva exatamente assim):
`Impressoras` · `Filamentos` · `Resinas` · `Peças de reposição` · `Ferramentas` · `Acessórios` · `Aprenda 3D`

## Ligar um produto a um botão "Comprar" do app (coluna `alvo`)

Todos os botões "Comprar" espalhados pelo app (impressora, peça, filamento,
resina) abrem esta guia Shopping. A 5ª coluna diz **qual produto** deve abrir em
destaque. Sem ela, o botão abre só a categoria certa. É opcional.

| Botão do app | Chave |
|---|---|
| Impressora do catálogo | `impressora:ender3v3se` |
| Peça de uma impressora | `peca:ender3v3se:bico` |
| Peça que vale pra qualquer impressora | `peca:*:graxa` |
| Filamento sugerido | `filamento:pla_generico` |
| Resina sugerida | `resina:resina_padrao` |

Os ids (`ender3v3se`, `bico`, `pla_generico`...) são os do `catalogo.js`. O mesmo
produto pode servir a vários botões: separe as chaves por vírgula
(`peca:a1:hotend,peca:a1mini:hotend`).

Quando o botão é de um item que o usuário cadastrou à mão e não existe no
catálogo, ele abre a categoria, sem destaque.

**Dica:** depois da Action rodar, confira o título que o Mercado Livre devolveu
pra cada linha (ele aparece depois do `#`). Se não bater com o item, o link está
trocado.

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

## Anotação automática dos títulos

Depois de rodar, o processador reescreve o `links.txt` acrescentando o título
encontrado como comentário no fim de cada linha:

```
Peças de reposição | https://meli.la/xxxxx  # Bico MK8 0.4mm para Impressora 3D
```

Serve só pra você reconhecer o produto na hora de excluir ou trocar de
categoria, já que o link de afiliado sozinho não diz nada. Na leitura da
execução seguinte esse pedaço é descartado.

Por isso a Action commita **dois** arquivos: `loja.json` e `loja/links.txt`.

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
