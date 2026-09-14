// ============================================================================
// CATALOGO.JS — dados que o site usa, separados do resto do código.
//
// Edite este arquivo à vontade pra ir adicionando impressoras, peças e
// filamentos com o tempo. Não precisa mexer no index.html pra isso — só
// seguir o padrão de cada lista abaixo (copia um bloco existente, troca
// os valores, salva).
//
// Depois de editar, é só subir os dois arquivos (index.html + catalogo.js)
// pro repositório do GitHub, igual sempre.
// ============================================================================


// ----------------------------------------------------------------------------
// IMPRESSORAS DO CATÁLOGO
// Aparecem no seletor do card 02 pra qualquer visitante escolher e já sair
// calculando, sem precisar cadastrar nada.
//
// watts .......... consumo médio DURANTE A IMPRESSÃO (não o pico de aquecimento)
// precoCompra .... preço de referência em R$ (estimativa de mercado brasileiro)
// vidaUtil ....... horas de uso estimadas até a máquina "se pagar"/ser trocada
// intervaloDias .. de quantos em quantos dias fazer uma revisão geral
// pecas .......... custo (R$) e intervalo de troca (horas) de cada peça
//
// icon aceita: 'bedslinger' (aberta, mesa que anda pra frente)
//            | 'corexy'     (aberta, compacta, mesa fixa)
//            | 'enclosed'   (câmara fechada)
//            | 'enclosedAms'(câmara fechada + unidade multicor tipo AMS)
// ----------------------------------------------------------------------------
export const CATALOGO_IMPRESSORAS = [
  {
    id:'ender3v3se', fabricante:'Creality', modelo:'Ender 3 V3 SE',
    spec:'aberta · fonte 350 W', watts:110, icon:'bedslinger',
    precoCompra:2000, vidaUtil:3000, intervaloDias:90,
    pecas:{ hotend:{custo:150,horas:2000}, bico:{custo:40,horas:800}, mesa:{custo:180,horas:1500}, filtro:{custo:0,horas:0}, graxa:{custo:25,horas:400} },
  },
  {
    id:'kobra3', fabricante:'Anycubic', modelo:'Kobra 3',
    spec:'aberta · fonte 400 W', watts:130, icon:'bedslinger',
    precoCompra:2400, vidaUtil:3000, intervaloDias:90,
    pecas:{ hotend:{custo:150,horas:2000}, bico:{custo:40,horas:800}, mesa:{custo:180,horas:1500}, filtro:{custo:0,horas:0}, graxa:{custo:25,horas:400} },
  },
  {
    id:'crealityhi', fabricante:'Creality', modelo:'Hi',
    spec:'aberta · pico 390 W (110V)', watts:120, icon:'bedslinger',
    precoCompra:2699, vidaUtil:3000, intervaloDias:90,
    pecas:{ hotend:{custo:150,horas:2000}, bico:{custo:40,horas:800}, mesa:{custo:180,horas:1500}, filtro:{custo:0,horas:0}, graxa:{custo:25,horas:400} },
  },
  {
    id:'a1mini', fabricante:'Bambu Lab', modelo:'A1 mini',
    spec:'aberta compacta · fonte 150 W', watts:70, icon:'corexy',
    precoCompra:2500, vidaUtil:4000, intervaloDias:90,
    pecas:{ hotend:{custo:150,horas:2000}, bico:{custo:40,horas:800}, mesa:{custo:180,horas:1500}, filtro:{custo:0,horas:0}, graxa:{custo:25,horas:400} },
  },
  {
    id:'a1', fabricante:'Bambu Lab', modelo:'A1',
    spec:'aberta · pico 350 W (110V)', watts:120, icon:'corexy',
    precoCompra:3200, vidaUtil:4000, intervaloDias:90,
    pecas:{ hotend:{custo:150,horas:2000}, bico:{custo:40,horas:800}, mesa:{custo:180,horas:1500}, filtro:{custo:0,horas:0}, graxa:{custo:25,horas:400} },
  },
  {
    id:'k2', fabricante:'Creality', modelo:'K2',
    spec:'fechada · pico 450 W (+20 W do CFS)', watts:150, icon:'enclosed',
    precoCompra:4600, vidaUtil:5000, intervaloDias:90,
    pecas:{ hotend:{custo:150,horas:2000}, bico:{custo:40,horas:800}, mesa:{custo:180,horas:1500}, filtro:{custo:50,horas:350}, graxa:{custo:25,horas:400} },
  },
  {
    id:'p1s', fabricante:'Bambu Lab', modelo:'P1S',
    spec:'fechada · pico 350 W (110V)', watts:130, icon:'enclosed',
    precoCompra:5000, vidaUtil:6000, intervaloDias:90,
    pecas:{ hotend:{custo:150,horas:2000}, bico:{custo:40,horas:800}, mesa:{custo:180,horas:1500}, filtro:{custo:50,horas:350}, graxa:{custo:25,horas:400} },
  },
  {
    id:'x1c', fabricante:'Bambu Lab', modelo:'X1 Carbon',
    spec:'fechada + AMS · pico 350 W (110V)', watts:140, icon:'enclosedAms',
    precoCompra:14000, vidaUtil:8000, intervaloDias:90,
    pecas:{ hotend:{custo:150,horas:2000}, bico:{custo:40,horas:800}, mesa:{custo:180,horas:1500}, filtro:{custo:50,horas:350}, graxa:{custo:25,horas:400} },
  },

  // Pra adicionar uma nova, copia um bloco acima inteiro e edita:
  // {
  //   id:'meu-id-unico', fabricante:'Marca', modelo:'Modelo X',
  //   spec:'texto curto de descrição', watts:150, icon:'bedslinger',
  //   precoCompra:3000, vidaUtil:4000, intervaloDias:90,
  //   pecas:{ hotend:{custo:150,horas:2000}, bico:{custo:40,horas:800}, mesa:{custo:180,horas:1500}, filtro:{custo:0,horas:0}, graxa:{custo:25,horas:400} },
  // },
];


// ----------------------------------------------------------------------------
// PEÇAS DE MANUTENÇÃO
// Definem quais linhas aparecem no bloco de peças de cada impressora.
// "id" precisa ser único e sem espaço/acento.
// ----------------------------------------------------------------------------
export const CATALOGO_PECAS = [
  { id:'hotend', nome:'Hotend' },
  { id:'bico', nome:'Bico' },
  { id:'mesa', nome:'Placa da mesa' },
  { id:'filtro', nome:'Filtro de ar' },
  { id:'graxa', nome:'Graxa' },

  // { id:'correia', nome:'Correia' },
];


// ----------------------------------------------------------------------------
// TIPOS DE FILAMENTO
// Alimentam o seletor "Tipo" no cadastro de filamento.
// ----------------------------------------------------------------------------
export const CATALOGO_TIPOS_FILAMENTO = [
  'PLA', 'PETG', 'ABS', 'ASA', 'TPU', 'Nylon (PA)', 'PC', 'PLA-CF', 'PETG-CF', 'HIPS', 'PVA', 'Outro',
];


// ----------------------------------------------------------------------------
// FILAMENTOS SUGERIDOS
// Atalho de preenchimento em "Dados do filamento" (Configurações).
// ----------------------------------------------------------------------------
export const CATALOGO_FILAMENTOS = [
  { id:'pla_generico', nome:'PLA genérico', tipo:'PLA', precoKg:120 },
  { id:'petg_generico', nome:'PETG genérico', tipo:'PETG', precoKg:135 },
  { id:'abs_generico', nome:'ABS genérico', tipo:'ABS', precoKg:110 },
  { id:'tpu_generico', nome:'TPU genérico', tipo:'TPU', precoKg:190 },
  { id:'nylon_generico', nome:'Nylon genérico', tipo:'Nylon (PA)', precoKg:260 },

  // { id:'meu-filamento', nome:'Nome que aparece', tipo:'PLA', precoKg:130 },
];


// ============================================================================
// LINKS DE AFILIADO — só editável aqui no código, não existe campo pra isso
// no site (por segurança, e pra ninguém trocar seu link sem querer).
//
// Cole sua URL de afiliado no id correspondente. Deixe comentado (com // na
// frente) ou vazio pra cair na busca automática do Mercado Livre.
//
// Sem link cadastrado, o site monta sozinho uma busca no Mercado Livre com
// "peça + modelo + fabricante" (ex: "Bico Ender 3 V3 SE Creality").
// ============================================================================
export const LINKS_AFILIADO_IMPRESSORA = {
  // ender3v3se: 'https://seulink.com/ender3v3se?afiliado=SEUCODIGO',
  // kobra3: 'https://seulink.com/...',
  // crealityhi: 'https://seulink.com/...',
  // a1mini: 'https://seulink.com/...',
  // a1: 'https://seulink.com/...',
  // k2: 'https://seulink.com/...',
  // p1s: 'https://seulink.com/...',
  // x1c: 'https://seulink.com/...',
};

export const LINKS_AFILIADO_PECA = {
  // hotend: 'https://seulink.com/...',
  // bico: 'https://seulink.com/...',
  // mesa: 'https://seulink.com/...',
  // filtro: 'https://seulink.com/...',
  // graxa: 'https://seulink.com/...',
};

export const LINKS_AFILIADO_FILAMENTO = {
  // pla_generico: 'https://seulink.com/...',
  // petg_generico: 'https://seulink.com/...',
  // abs_generico: 'https://seulink.com/...',
  // tpu_generico: 'https://seulink.com/...',
  // nylon_generico: 'https://seulink.com/...',
};


// ----------------------------------------------------------------------------
// FOTOS REAIS DAS IMPRESSORAS (opcional)
// Cole a URL de uma imagem pra usar no lugar do ícone genérico. Alternativa:
// salvar o arquivo em images/printers/{id}.jpg (ou .png/.webp).
// ----------------------------------------------------------------------------
export const PRINTER_IMAGE_OVERRIDES = {
  // ender3v3se: 'https://exemplo.com/ender3.jpg',
};

// ----------------------------------------------------------------------------
// MARKETPLACES — taxas usadas pra sugerir o preço mínimo de anúncio.
//
// Levantadas em setembro/2026. Comissão varia MUITO por categoria, então
// usei a média prática de cada plataforma — confirme no simulador oficial
// antes de anunciar de verdade. Edite aqui pra ajustar.
//
// percentual ..... comissão em % sobre o preço de venda
// taxaFixa ....... valor fixo em R$ cobrado por unidade vendida
// fixaAbaixoDe ... se preenchido, a taxa fixa só vale abaixo desse preço
// netPrice ....... true = plataforma onde você informa o líquido que quer
//                  receber (Temu), então o preço mínimo é o próprio líquido
// ----------------------------------------------------------------------------
export const MARKETPLACES = [
  { nome:'Mercado Livre · Clássico', percentual:13, taxaFixa:6.50, fixaAbaixoDe:79,
    obs:'10–14% por categoria; taxa por unidade só abaixo de R$ 79' },
  { nome:'Mercado Livre · Premium', percentual:17, taxaFixa:6.50, fixaAbaixoDe:79,
    obs:'15–19%; embute parcelamento sem juros' },
  { nome:'Shopee · até R$ 79,99', percentual:20, taxaFixa:4,
    obs:'14% + 6% do frete grátis obrigatório; CPF paga R$ 7 de fixa' },
  { nome:'Shopee · R$ 80 ou mais', percentual:14, taxaFixa:26,
    obs:'taxa fixa sobe por faixa de preço (R$ 4 a R$ 26)' },
  { nome:'Amazon', percentual:15, taxaFixa:0,
    obs:'8–15% por categoria, sem taxa fixa por item; exige CNPJ' },
  { nome:'Temu · Net Price', percentual:0, taxaFixa:0, netPrice:true,
    obs:'você informa o líquido desejado e a Temu define o preço final' },
];
