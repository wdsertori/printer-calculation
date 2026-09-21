# Fotos reais das impressoras

Documento interno de manutenção. Não aparece no app.

Por padrão, cada impressora do seletor aparece com um ícone genérico. Dá pra
trocar pela foto real do modelo de dois jeitos. O site tenta, nessa ordem:

1. a URL definida em `PRINTER_IMAGE_OVERRIDES` (no `catalogo.js`)
2. o arquivo `images/printers/{id}.jpg`, depois `.jpeg`, `.png` e `.webp`
3. se nada carregar, volta pro ícone genérico

## Opção 1 — arquivo no repositório (recomendado)

Crie a pasta `images/printers/` na raiz do repositório (ao lado do
`index.html`) e salve uma imagem com o **id do modelo** como nome.

| Impressora | Nome do arquivo |
|---|---|
| Creality Ender 3 V3 SE | `ender3v3se.jpg` |
| Anycubic Kobra 3 | `kobra3.jpg` |
| Creality Hi | `crealityhi.jpg` |
| Bambu Lab A1 mini | `a1mini.jpg` |
| Bambu Lab A1 | `a1.jpg` |
| Creality K2 | `k2.jpg` |
| Bambu Lab P1S | `p1s.jpg` |
| Bambu Lab X1 Carbon | `x1c.jpg` |

Recomendações:
- imagem quadrada, 300×300 px ou maior
- fundo neutro (branco ou transparente), impressora centralizada
- aceita `.jpg`, `.jpeg`, `.png` ou `.webp`

Modelo novo adicionado no `catalogo.js`: o nome do arquivo é o valor do campo
`id` daquele modelo.

## Opção 2 — URL externa

No `catalogo.js`, procure `PRINTER_IMAGE_OVERRIDES` e cole a URL no id
correspondente:

```js
export const PRINTER_IMAGE_OVERRIDES = {
  ender3v3se: 'https://exemplo.com/fotos/ender3v3se.jpg',
  x1c: 'https://exemplo.com/fotos/x1c.png',
};
```

A URL tem prioridade sobre o arquivo local. Links externos podem sair do ar ou
ser bloqueados pelo site de origem — a Opção 1 é mais confiável.

## Observações

- Impressoras cadastradas pelo próprio usuário (em Configurações) sempre usam
  o ícone de estrela; as fotos valem só pros modelos do catálogo.
- Depois de subir as imagens, o navegador pode mostrar a versão antiga por um
  tempo. Recarregar sem cache resolve.
