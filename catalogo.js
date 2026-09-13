// ============================================================================
// CATALOGO.JS — dados que o site usa, separados do resto do código.
//
// Edite este arquivo à vontade pra ir adicionando impressoras, peças e
// filamentos com o tempo. Não precisa mexer no index.html pra isso — só
// seguir o padrão de cada lista abaixo (copia uma linha existente, troca
// os valores, salva).
//
// Depois de editar, é só subir os dois arquivos (index.html + catalogo.js)
// pro repositório do GitHub, igual sempre.
// ============================================================================


// ----------------------------------------------------------------------------
// IMPRESSORAS DO CATÁLOGO
// Aparecem no seletor do card "Impressão & energia" pra qualquer visitante
// escolher, mesmo sem cadastrar nada. "watts" é o consumo médio DURANTE A
// IMPRESSÃO (não o pico de aquecimento).
//
// icon aceita: 'bedslinger' (impressora aberta, mesa que anda pra frente)
//            | 'corexy'     (aberta, compacta, mesa fixa)
//            | 'enclosed'   (câmara fechada)
//            | 'enclosedAms'(câmara fechada + unidade multicor tipo AMS)
// ----------------------------------------------------------------------------
export const CATALOGO_IMPRESSORAS = [
  { id:'ender3v3se', name:'Creality Ender 3 V3 SE', spec:'aberta · fonte 350 W', watts:110, icon:'bedslinger' },
  { id:'kobra3', name:'Anycubic Kobra 3', spec:'aberta · fonte 400 W', watts:130, icon:'bedslinger' },
  { id:'mk4s', name:'Prusa MK4S', spec:'aberta · fonte 240 W', watts:90, icon:'bedslinger' },
  { id:'crealityhi', name:'Creality Hi', spec:'aberta · pico 390 W (110V)', watts:120, icon:'bedslinger' },
  { id:'a1mini', name:'Bambu Lab A1 mini', spec:'aberta compacta · fonte 150 W', watts:70, icon:'corexy' },
  { id:'a1', name:'Bambu Lab A1', spec:'aberta · pico 350 W (110V)', watts:120, icon:'corexy' },
  { id:'p1s', name:'Bambu Lab P1S', spec:'fechada · pico 350 W (110V)', watts:130, icon:'enclosed' },
  { id:'x1c', name:'Bambu Lab X1 Carbon', spec:'fechada + AMS · pico 350 W (110V)', watts:140, icon:'enclosedAms' },
  { id:'k2', name:'Creality K2', spec:'fechada · pico 450 W (+20 W do CFS)', watts:150, icon:'enclosed' },

  // Pra adicionar uma nova, copia o padrão abaixo (descomenta e edita):
  // { id:'meu-id-unico', name:'Nome que aparece', spec:'texto curto de descrição', watts:150, icon:'bedslinger' },
];


// ----------------------------------------------------------------------------
// PEÇAS DE MANUTENÇÃO
// Aparecem no card "Peças de manutenção" de cada impressora cadastrada em
// "Dados da impressora". "id" precisa ser único e sem espaço/acento.
// ----------------------------------------------------------------------------
export const CATALOGO_PECAS = [
  { id:'hotend', nome:'Hotend' },
  { id:'bico', nome:'Bico' },
  { id:'mesa', nome:'Placa da mesa' },
  { id:'filtro', nome:'Filtro de ar' },
  { id:'graxa', nome:'Graxa' },

  // Exemplo de como adicionar mais uma:
  // { id:'correia', nome:'Correia' },
];


// ----------------------------------------------------------------------------
// FILAMENTOS SUGERIDOS
// Aparecem como atalho de preenchimento em "Dados do filamento" (Configurações)
// — quem visita o site pode escolher um desses em vez de cadastrar do zero.
// precoKg é só uma sugestão de partida, cada pessoa pode ajustar o preço dela.
// ----------------------------------------------------------------------------
export const CATALOGO_FILAMENTOS = [
  { id:'pla_generico', nome:'PLA genérico', precoKg:120 },
  { id:'petg_generico', nome:'PETG genérico', precoKg:135 },
  { id:'abs_generico', nome:'ABS genérico', precoKg:110 },

  // { id:'meu-filamento', nome:'Nome que aparece', precoKg:130 },
];


// ============================================================================
// LINKS DE AFILIADO — só editável aqui no código, não existe campo pra isso
// no site (por segurança, e pra ninguém trocar seu link sem querer).
//
// Cole sua URL de afiliado no id correspondente. Deixe comentado (com // na
// frente) ou vazio pra não mostrar o botão "Comprar" naquele item.
//
// Isso só funciona pros itens FIXOS acima (catálogo de impressoras e peças),
// porque eles têm um "id" estável. Filamentos e impressoras que cada pessoa
// cadastra na hora (nome livre) não têm como receber link de afiliado fixo —
// pra esses, o site gera sozinho um link de busca no Mercado Livre usando o
// nome digitado, só pra não deixar a pessoa sem nenhum link.
// ============================================================================
export const LINKS_AFILIADO_IMPRESSORA = {
  // ender3v3se: 'https://seulink.com/ender3v3se?afiliado=SEUCODIGO',
  // kobra3: 'https://seulink.com/...',
  // mk4s: 'https://seulink.com/...',
  // crealityhi: 'https://seulink.com/...',
  // a1mini: 'https://seulink.com/...',
  // a1: 'https://seulink.com/...',
  // p1s: 'https://seulink.com/...',
  // x1c: 'https://seulink.com/...',
  // k2: 'https://seulink.com/...',
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
};


// ----------------------------------------------------------------------------
// FOTOS REAIS DAS IMPRESSORAS (opcional)
// Cole a URL de uma imagem pra usar no lugar do ícone genérico. Alternativa:
// salvar o arquivo em images/printers/{id}.jpg (ou .png/.webp) — ver "Ajuda"
// no site pra mais detalhes.
// ----------------------------------------------------------------------------
export const PRINTER_IMAGE_OVERRIDES = {
  // ender3v3se: 'https://exemplo.com/ender3.jpg',
};
