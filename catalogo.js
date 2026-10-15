import { IDIOMA } from './i18n.js';

// ============================================================================
// CATALOGO.JS — dados que o site usa, separados do resto do código.
//
// Edite este arquivo à vontade pra ir adicionando impressoras, peças e
// filamentos com o tempo. Não precisa mexer no app.html pra isso — só
// seguir o padrão de cada lista abaixo (copia um bloco existente, troca
// os valores, salva).
//
// Depois de editar, é só subir os dois arquivos (app.html + catalogo.js)
// pro repositório do GitHub, igual sempre.
// ============================================================================


// ----------------------------------------------------------------------------
// IMPRESSORAS DO CATÁLOGO
// Aparecem no seletor do card 02 pra qualquer visitante escolher e já sair
// calculando, sem precisar cadastrar nada. Inclui FDM (filamento) e resina —
// o campo "tipo" decide em qual modo da calculadora cada uma aparece.
//
// tipo ........... 'fdm' ou 'resina'
// watts .......... consumo médio DURANTE A IMPRESSÃO (não o pico de aquecimento)
// precoCompra .... preço de referência em R$ (estimativa de mercado brasileiro)
// vidaUtil ....... horas de uso estimadas até a máquina "se pagar"/ser trocada
// intervaloDias .. de quantos em quantos dias fazer uma revisão geral
// pecas .......... custo (R$) e intervalo de troca (horas) de cada peça —
//                  só as peças do mesmo tipo da impressora aparecem (ver
//                  CATALOGO_PECAS logo abaixo)
//
// icon aceita:
//   FDM:    'bedslinger' (aberta, mesa que anda pra frente)
//         | 'corexy'     (aberta, compacta, mesa fixa)
//         | 'enclosed'   (câmara fechada)
//         | 'enclosedAms'(câmara fechada + unidade multicor tipo AMS)
//   Resina: 'resina'     (impressora MSLA/LCD)
// ----------------------------------------------------------------------------
export const CATALOGO_IMPRESSORAS = [
  {
    id:'ender3v3se', tipo:'fdm', fabricante:'Creality', modelo:'Ender 3 V3 SE',
    spec:'aberta · fonte 350 W', watts:110, icon:'bedslinger',
    precoCompra:2000, vidaUtil:3000, intervaloDias:90,
    pecas:{ hotend:{custo:150,horas:2000}, bico:{custo:40,horas:800}, mesa:{custo:180,horas:1500}, filtro:{custo:0,horas:0}, graxa:{custo:25,horas:400} },
  },
  {
    id:'kobra3', tipo:'fdm', fabricante:'Anycubic', modelo:'Kobra 3',
    spec:'aberta · fonte 400 W', watts:130, icon:'bedslinger',
    precoCompra:2400, vidaUtil:3000, intervaloDias:90,
    pecas:{ hotend:{custo:150,horas:2000}, bico:{custo:40,horas:800}, mesa:{custo:180,horas:1500}, filtro:{custo:0,horas:0}, graxa:{custo:25,horas:400} },
  },
  {
    id:'crealityhi', tipo:'fdm', fabricante:'Creality', modelo:'Hi',
    spec:'aberta · pico 390 W (110V)', watts:120, icon:'bedslinger',
    precoCompra:2699, vidaUtil:3000, intervaloDias:90,
    pecas:{ hotend:{custo:150,horas:2000}, bico:{custo:40,horas:800}, mesa:{custo:180,horas:1500}, filtro:{custo:0,horas:0}, graxa:{custo:25,horas:400} },
  },
  {
    id:'a1mini', tipo:'fdm', fabricante:'Bambu Lab', modelo:'A1 mini',
    spec:'aberta compacta · fonte 150 W', watts:70, icon:'corexy',
    precoCompra:2500, vidaUtil:4000, intervaloDias:90,
    pecas:{ hotend:{custo:150,horas:2000}, bico:{custo:40,horas:800}, mesa:{custo:180,horas:1500}, filtro:{custo:0,horas:0}, graxa:{custo:25,horas:400} },
  },
  {
    id:'a1', tipo:'fdm', fabricante:'Bambu Lab', modelo:'A1',
    spec:'aberta · pico 350 W (110V)', watts:120, icon:'corexy',
    precoCompra:3200, vidaUtil:4000, intervaloDias:90,
    pecas:{ hotend:{custo:150,horas:2000}, bico:{custo:40,horas:800}, mesa:{custo:180,horas:1500}, filtro:{custo:0,horas:0}, graxa:{custo:25,horas:400} },
  },
  {
    id:'k2', tipo:'fdm', fabricante:'Creality', modelo:'K2',
    spec:'fechada · pico 450 W (+20 W do CFS)', watts:150, icon:'enclosed',
    precoCompra:4600, vidaUtil:5000, intervaloDias:90,
    pecas:{ hotend:{custo:150,horas:2000}, bico:{custo:40,horas:800}, mesa:{custo:180,horas:1500}, filtro:{custo:50,horas:350}, graxa:{custo:25,horas:400} },
  },
  {
    id:'p1s', tipo:'fdm', fabricante:'Bambu Lab', modelo:'P1S',
    spec:'fechada · pico 350 W (110V)', watts:130, icon:'enclosed',
    precoCompra:5000, vidaUtil:6000, intervaloDias:90,
    pecas:{ hotend:{custo:150,horas:2000}, bico:{custo:40,horas:800}, mesa:{custo:180,horas:1500}, filtro:{custo:50,horas:350}, graxa:{custo:25,horas:400} },
  },
  {
    id:'x1c', tipo:'fdm', fabricante:'Bambu Lab', modelo:'X1 Carbon',
    spec:'fechada + AMS · pico 350 W (110V)', watts:140, icon:'enclosedAms',
    precoCompra:14000, vidaUtil:8000, intervaloDias:90,
    pecas:{ hotend:{custo:150,horas:2000}, bico:{custo:40,horas:800}, mesa:{custo:180,horas:1500}, filtro:{custo:50,horas:350}, graxa:{custo:25,horas:400} },
  },

  // ---- RESINA ----
  // Preços pesquisados em setembro/2026. Confiança marcada em cada uma —
  // "medido" veio de loja brasileira real, "estimado" foi calculado a partir
  // de preço internacional + padrão de importação. Ajuste com o que você
  // encontrar, esses são só um ponto de partida.
  {
    // preço: MEDIDO (Topink3D, R$1.897) · watts/vidaUtil: estimados
    id:'mars5', tipo:'resina', fabricante:'Elegoo', modelo:'Mars 5',
    spec:'resina · LCD 4K · entrada', watts:55, icon:'resina',
    precoCompra:1900, vidaUtil:2500, intervaloDias:60,
    pecas:{ tela:{custo:450,horas:2000}, fep:{custo:60,horas:300}, cuba:{custo:150,horas:3000} },
  },
  {
    // preço/watts/vidaUtil: estimados (sem loja BR com valor exato do modelo)
    id:'saturn4ultra', tipo:'resina', fabricante:'Elegoo', modelo:'Saturn 4 Ultra',
    spec:'resina · LCD 12K · cuba aquecida', watts:65, icon:'resina',
    precoCompra:4300, vidaUtil:3500, intervaloDias:60,
    pecas:{ tela:{custo:750,horas:2000}, fep:{custo:80,horas:300}, cuba:{custo:220,horas:3000} },
  },
  {
    // preço: MEDIDO (R$4.399 a R$5.499 em 6 lojas BR; Amazon R$4.799; arredondado pra cima)
    // watts/vidaUtil: estimados (fonte 24V 6A = 144 W máx.) · tela/cuba: estimados
    // (cuba baseada no reservatório de metal da linha Saturn 4, ~R$460 na Slim3D)
    id:'saturn4ultra16k', tipo:'resina', fabricante:'Elegoo', modelo:'Saturn 4 Ultra 16K',
    spec:'resina · LCD 16K · cuba aquecida', watts:70, icon:'resina',
    precoCompra:4800, vidaUtil:3500, intervaloDias:60,
    pecas:{ tela:{custo:1000,horas:2000}, fep:{custo:80,horas:300}, cuba:{custo:450,horas:3000} },
  },
  {
    // watts: MEDIDO (ficha técnica Anycubic, 100W) · preço: estimado (import de ~US$549)
    id:'photonm5s', tipo:'resina', fabricante:'Anycubic', modelo:'Photon Mono M5s',
    spec:'resina · LCD 12K · sem nivelamento', watts:100, icon:'resina',
    precoCompra:3800, vidaUtil:3000, intervaloDias:60,
    pecas:{ tela:{custo:700,horas:2000}, fep:{custo:70,horas:300}, cuba:{custo:200,horas:3000} },
  },
  {
    // preço/watts/vidaUtil: estimados
    id:'sonicmini8k', tipo:'resina', fabricante:'Phrozen', modelo:'Sonic Mini 8K',
    spec:'resina · LCD 8K · compacta', watts:90, icon:'resina',
    precoCompra:3600, vidaUtil:3000, intervaloDias:60,
    pecas:{ tela:{custo:650,horas:2000}, fep:{custo:65,horas:300}, cuba:{custo:190,horas:3000} },
  },

  // Pra adicionar uma nova FDM, copia um bloco FDM acima inteiro e edita:
  // {
  //   id:'meu-id-unico', tipo:'fdm', fabricante:'Marca', modelo:'Modelo X',
  //   spec:'texto curto de descrição', watts:150, icon:'bedslinger',
  //   precoCompra:3000, vidaUtil:4000, intervaloDias:90,
  //   pecas:{ hotend:{custo:150,horas:2000}, bico:{custo:40,horas:800}, mesa:{custo:180,horas:1500}, filtro:{custo:0,horas:0}, graxa:{custo:25,horas:400} },
  // },
  //
  // Pra adicionar uma nova de resina, copia um bloco de resina acima e edita:
  // {
  //   id:'meu-id-unico', tipo:'resina', fabricante:'Marca', modelo:'Modelo X',
  //   spec:'texto curto de descrição', watts:70, icon:'resina',
  //   precoCompra:3000, vidaUtil:3000, intervaloDias:60,
  //   pecas:{ tela:{custo:650,horas:2000}, fep:{custo:70,horas:300}, cuba:{custo:190,horas:3000} },
  // },
];


// ----------------------------------------------------------------------------
// PEÇAS DE MANUTENÇÃO
// Definem quais linhas aparecem no bloco de peças de cada impressora — só as
// do mesmo "tipo" da impressora (ou tipo:'ambos', que aparece nos dois modos).
// "id" precisa ser único e sem espaço/acento.
// ----------------------------------------------------------------------------
export const CATALOGO_PECAS = [
  { id:'hotend', nome:'Hotend', tipo:'fdm' },
  { id:'bico', nome:'Bico', tipo:'fdm' },
  { id:'mesa', nome:'Placa da mesa', tipo:'fdm' },
  { id:'filtro', nome:'Filtro de ar', tipo:'fdm' },
  { id:'graxa', nome:'Graxa', tipo:'ambos' },

  { id:'tela', nome:'Tela LCD/mascaramento', tipo:'resina' },
  { id:'fep', nome:'Filme FEP', tipo:'resina' },
  { id:'cuba', nome:'Cuba de resina', tipo:'resina' },

  // { id:'correia', nome:'Correia', tipo:'fdm' },
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


// ----------------------------------------------------------------------------
// TIPOS DE RESINA
// Alimentam o seletor "Tipo" no cadastro de resina.
// ----------------------------------------------------------------------------
export const CATALOGO_TIPOS_RESINA = [
  'Padrão (Standard)', 'ABS-Like (Tough)', 'Água-lavável (Water Washable)',
  'Flexível', 'Alta velocidade', 'Fundição (Castable)', 'Dental/Odontológica', 'Outro',
];


// ----------------------------------------------------------------------------
// RESINAS SUGERIDAS
// Atalho de preenchimento em "Dados da resina" (Configurações). precoLitro é
// por LITRO (como o mercado brasileiro vende), não por kg.
// ----------------------------------------------------------------------------
export const CATALOGO_RESINAS = [
  { id:'resina_padrao', nome:'Resina Padrão genérica', tipo:'Padrão (Standard)', precoLitro:180 },
  { id:'resina_abslike', nome:'Resina ABS-Like genérica', tipo:'ABS-Like (Tough)', precoLitro:220 },
  { id:'resina_lavavel', nome:'Resina Água-lavável genérica', tipo:'Água-lavável (Water Washable)', precoLitro:200 },
  { id:'resina_flexivel', nome:'Resina Flexível genérica', tipo:'Flexível', precoLitro:280 },

  // { id:'minha-resina', nome:'Nome que aparece', tipo:'Padrão (Standard)', precoLitro:190 },
];


// ============================================================================
// LINKS DE COMPRA — não ficam mais aqui. Todos vivem em loja/links.txt (guia
// Shopping), e os botões "Comprar" do app abrem a Shopping. Pra ligar um
// produto a uma impressora/peça/filamento/resina deste arquivo, use a 5ª coluna
// ("alvo") do links.txt — ver loja/README.md.
// ============================================================================


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
const MARKETPLACES_BR = [
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


// ============================================================================
// VERSÃO EUA (idioma English)
// Só vale quando o app está em inglês: troca preços para dólar, descrições,
// nomes e a lista de marketplaces. Em português nada disso é usado.
//
// Todos os valores são ESTIMATIVAS (referência: lojas oficiais e roundups de
// outubro/2026 — ex.: Bambu A1 combo US$ 399, Ender-3 V3 SE US$ 199, Saturn 4
// Ultra US$ 379, Mars 5 Ultra US$ 259). Ajuste aqui à vontade.
// ============================================================================
export const MARKETPLACES_US = [
  { nome:'Etsy', percentual:9.5, taxaFixa:0.45,
    obs:'6.5% transaction + 3% & $0.25 payment processing + $0.20 listing; shipping is also charged the 6.5%' },
  { nome:'Etsy · with Offsite Ads', percentual:24.5, taxaFixa:0.45,
    obs:'adds 15% when a sale comes from an Etsy-placed ad (12% above $10k/year)' },
  { nome:'eBay', percentual:13.6, taxaFixa:0.40,
    obs:'13.6% on most categories (fee base includes shipping and tax) + $0.40 per order ($0.30 up to $10)' },
  { nome:'Amazon Handmade', percentual:15, taxaFixa:0,
    obs:'15% referral fee, no monthly fee; requires approval as a maker' },
  { nome:'Direct sale · card', percentual:2.9, taxaFixa:0.30,
    obs:'Stripe / Square-style card processing, for your own site or Instagram sales' },
];

const US = {
  impressoras: {
    ender3v3se:      { precoCompra:199,  spec:'open frame · 350 W PSU' },
    kobra3:          { precoCompra:279,  spec:'open frame · 400 W PSU' },
    crealityhi:      { precoCompra:399,  spec:'open frame · 390 W peak (120V)' },
    a1mini:          { precoCompra:219,  spec:'compact open frame · 150 W PSU' },
    a1:              { precoCompra:349,  spec:'open frame · 350 W peak (120V)' },
    k2:              { precoCompra:799,  spec:'enclosed · 450 W peak (+20 W for CFS)' },
    p1s:             { precoCompra:549,  spec:'enclosed · 350 W peak (120V)' },
    x1c:             { precoCompra:1099, spec:'enclosed + AMS · 350 W peak (120V)' },
    mars5:           { precoCompra:229,  spec:'resin · 4K LCD · entry level',  pecas:{ tela:55,  fep:10, cuba:25 } },
    saturn4ultra:    { precoCompra:379,  spec:'resin · 12K LCD · heated vat',  pecas:{ tela:90,  fep:12, cuba:40 } },
    saturn4ultra16k: { precoCompra:449,  spec:'resin · 16K LCD · heated vat',  pecas:{ tela:130, fep:12, cuba:70 } },
    photonm5s:       { precoCompra:259,  spec:'resin · 12K LCD · no leveling', pecas:{ tela:80,  fep:12, cuba:30 } },
    sonicmini8k:     { precoCompra:299,  spec:'resin · 8K LCD · compact',      pecas:{ tela:75,  fep:12, cuba:30 } },
  },
  pecasFdm: { hotend:20, bico:6, mesa:25, filtro:12, graxa:8 },          // custo por peça, US$
  nomesPecas: { hotend:'Hotend', bico:'Nozzle', mesa:'Build plate', filtro:'Air filter', graxa:'Grease',
                tela:'LCD screen', fep:'FEP film', cuba:'Resin vat' },
  filamentos: {
    pla_generico:   { nome:'Generic PLA',   precoKg:20 },
    petg_generico:  { nome:'Generic PETG',  precoKg:22 },
    abs_generico:   { nome:'Generic ABS',   precoKg:20 },
    tpu_generico:   { nome:'Generic TPU',   precoKg:40 },
    nylon_generico: { nome:'Generic nylon', precoKg:55 },
  },
  resinas: {                                   // preço por litro (≈ 1 kg)
    resina_padrao:   { nome:'Generic standard resin',        precoLitro:25 },
    resina_abslike:  { nome:'Generic ABS-like resin',        precoLitro:30 },
    resina_lavavel:  { nome:'Generic water-washable resin',  precoLitro:30 },
    resina_flexivel: { nome:'Generic flexible resin',        precoLitro:45 },
  },
};

if (IDIOMA === 'en') {
  CATALOGO_IMPRESSORAS.forEach(p => {
    const u = US.impressoras[p.id]; if (!u) return;
    p.precoCompra = u.precoCompra; p.spec = u.spec;
    Object.keys(p.pecas || {}).forEach(k => {
      const c = (u.pecas && u.pecas[k] != null) ? u.pecas[k] : US.pecasFdm[k];
      if (c != null && p.pecas[k].custo > 0) p.pecas[k].custo = c;
    });
  });
  CATALOGO_PECAS.forEach(pm => { if (US.nomesPecas[pm.id]) pm.nome = US.nomesPecas[pm.id]; });
  CATALOGO_FILAMENTOS.forEach(f => { const u = US.filamentos[f.id]; if (u) Object.assign(f, u); });
  CATALOGO_RESINAS.forEach(r => { const u = US.resinas[r.id]; if (u) Object.assign(r, u); });
}

export const MARKETPLACES = IDIOMA === 'en' ? MARKETPLACES_US : MARKETPLACES_BR;
