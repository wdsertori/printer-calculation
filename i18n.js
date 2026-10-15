// ============================================================================
// i18n.js — idioma, moeda e formatos do Precifica 3D
//
// Idioma e moeda andam juntos num "perfil regional" (REGIOES). Hoje: pt (Brasil,
// R$) e en (EUA, US$). A escolha fica só neste aparelho (c3d_idioma).
//
// Regras:
//  - O português é o texto ORIGINAL do app. Em pt nada é trocado.
//  - Em en, a chave é o próprio texto em português e o valor está em i18n-en.js.
//      Texto já na página / criado depois (innerHTML, textContent): troca sozinho
//      (traduzirDOM + observarDOM), inclusive placeholder, title, aria-label.
//      Texto com valores no meio (ou PDF/alert):  t('Lote de {qtd} peças', { qtd })
//  - Texto sem tradução cai no português: nunca aparece chave crua.
//  - Dados salvos (ids de status, tipos de resina) continuam em português
//    por dentro; só o rótulo na tela muda. Valores em dinheiro NÃO são
//    convertidos entre moedas.
// ============================================================================
export const CHAVE_IDIOMA = 'c3d_idioma';

export const REGIOES = {
  pt: { id:'pt', nome:'Português', locale:'pt-BR', moeda:'BRL', simbolo:'R$', decimal:',', placeholder:'0,00',
        loja:true, padroes:null },
  en: { id:'en', nome:'English', locale:'en-US', moeda:'USD', simbolo:'$', decimal:'.', placeholder:'0.00',
        loja:false,                                   // Shopping oculto por enquanto (sem afiliados nos EUA)
        // valores iniciais (só quando ainda não há nada salvo) — estimativas EUA, out/2026 — luz: média residencial ~18,6¢/kWh (EIA, mar/2026)
        padroes:{ precoKg:20, precoLitro:25, precoKwh:0.18, valorHora:20 } },
};

function detectar(){
  try {                                   // ?lang=en / ?lang=pt (links da landing) vale e fica salvo
    const q = new URLSearchParams(location.search).get('lang');
    if (q && REGIOES[q]) { localStorage.setItem(CHAVE_IDIOMA, q); return q; }
  } catch (e) {}
  try {
    const s = localStorage.getItem(CHAVE_IDIOMA);
    if (s && REGIOES[s]) return s;
  } catch (e) {}
  const nav = (navigator.language || 'pt').toLowerCase();
  return nav.startsWith('pt') ? 'pt' : 'en';
}

export const IDIOMA = detectar();
export const REGIAO = REGIOES[IDIOMA];
export const SIMBOLO = REGIAO.simbolo;

// ---------------------------------------------------------------- dicionário
// A CHAVE é o próprio texto em português; o valor é o inglês (i18n-en.js).
// Texto sem tradução continua em português — nunca aparece chave crua.
import { EN } from './i18n-en.js';
const norm = s => String(s).replace(/\s+/g, ' ').trim();

// t('Lote de {qtd} peças', { qtd: 3 })  — texto montado em JS, com valores no meio
export function t(pt, vars){
  let s = IDIOMA === 'en' && EN[pt] != null ? EN[pt] : pt;
  if (vars) s = s.replace(/\{(\w+)\}/g, (m, k) => (vars[k] != null ? vars[k] : m));
  return s;
}

// Textos que já estão na página (e os que o app cria depois, via observarDOM):
// troca cada pedaço de texto e atributo (placeholder/title/aria-label/alt) que tiver tradução exata.
const ATTRS = ['placeholder', 'title', 'aria-label', 'alt'];
const PULA = /^(SCRIPT|STYLE|TEXTAREA|NOSCRIPT)$/;
function trNo(n){
  const v = n.nodeValue, k = norm(v);
  if (!k || EN[k] == null) return;
  const m = v.match(/^(\s*)[\s\S]*?(\s*)$/);
  n.nodeValue = m[1] + EN[k] + m[2];
}
function trAttrs(e){
  for (const a of ATTRS){
    const v = e.getAttribute && e.getAttribute(a);
    if (v) { const k = norm(v); if (EN[k] != null) e.setAttribute(a, EN[k]); }
  }
}
export function traduzirDOM(raiz){
  if (IDIOMA !== 'en') return;
  const r = raiz || document.body;
  if (r.nodeType === 3){ if (r.parentNode && !PULA.test(r.parentNode.nodeName)) trNo(r); return; }
  if (r.nodeType !== 1 || PULA.test(r.nodeName)) return;
  trAttrs(r);
  const w = document.createTreeWalker(r, 5);      // 1 = elementos, 4 = textos
  let n;
  while ((n = w.nextNode())){
    if (n.nodeType === 3){ if (!PULA.test(n.parentNode.nodeName)) trNo(n); }
    else if (!PULA.test(n.nodeName)) trAttrs(n);
  }
}
export function observarDOM(){
  if (IDIOMA !== 'en') return;
  new MutationObserver(ms => { ms.forEach(m => m.addedNodes.forEach(n => traduzirDOM(n))); })
    .observe(document.body, { childList: true, subtree: true });
}

// ------------------------------------------------------------------ formatos
export const fmtMoeda = n => Number(n).toLocaleString(REGIAO.locale, { style:'currency', currency:REGIAO.moeda });
export const fmtNumero = (n, opts) => Number(n).toLocaleString(REGIAO.locale, opts || { maximumFractionDigits:1 });
export const fmtCentavos = c => (c / 100).toLocaleString(REGIAO.locale, { minimumFractionDigits:2, maximumFractionDigits:2 });
export const fmtData = (d, opts) => new Date(d).toLocaleDateString(REGIAO.locale, opts);
export const fmtMes = (d) => new Date(d).toLocaleDateString(REGIAO.locale, { month:'long', year:'numeric' });
export const comparar = (a, b) => String(a).localeCompare(String(b), REGIAO.locale);
// 12.5 -> "12,5" (pt) ou "12.5" (en)
export const decimalLocal = s => String(s).replace('.', REGIAO.decimal);

// ------------------------------------------------------------------- trocar
// grava a escolha neste aparelho (a nuvem é com o app). Devolve true se mudou.
export function gravarIdioma(id){
  if (!REGIOES[id] || id === IDIOMA) return false;
  try { localStorage.setItem(CHAVE_IDIOMA, id); } catch (e) {}
  return true;
}
// Idiomas oferecidos (nome na própria língua). Com 2 idiomas o app mostra um botão com o nome
// do OUTRO idioma; quando entrar um terceiro, basta trocar o botão por uma lista com IDIOMAS.
export const IDIOMAS = Object.values(REGIOES).map(r => ({ id:r.id, nome:r.nome }));
export const outroIdioma = () => {
  const outros = IDIOMAS.filter(i => i.id !== IDIOMA);
  return outros.length ? outros[0].id : IDIOMA;
};
export const nomeIdioma = id => (REGIOES[id] ? REGIOES[id].nome : id);

// valores iniciais da região (só se o usuário ainda não salvou nada)
export function aplicarPadroes(chaveCampos){
  if (!REGIAO.padroes) return;
  try { if (localStorage.getItem(chaveCampos)) return; } catch (e) {}
  Object.keys(REGIAO.padroes).forEach(id => {
    const i = document.getElementById(id); if (i) i.value = REGIAO.padroes[id];
  });
}

document.documentElement.lang = REGIAO.locale;
document.documentElement.setAttribute('data-idioma', IDIOMA);
