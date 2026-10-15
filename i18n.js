// ============================================================================
// i18n.js — idioma, moeda e formatos do Precifica 3D
//
// Idioma e moeda andam juntos num "perfil regional" (REGIOES). Hoje: pt (Brasil,
// R$) e en (EUA, US$). A escolha fica só neste aparelho (c3d_idioma).
//
// Regras:
//  - O português é o texto ORIGINAL do app. Em pt nada é trocado.
//  - Em en, cada texto vem do dicionário EN abaixo, pela chave.
//      HTML:  <h2 data-i18n="chave">Texto em português</h2>
//             data-i18n-placeholder / data-i18n-title / data-i18n-aria
//      JS:    t('chave', { nome: 'x' })   (usa {nome} no texto)
//  - Chave sem tradução cai no português: nunca aparece uma chave crua.
//  - Dados salvos (ids de status, tipos de resina) continuam em português
//    por dentro; só o rótulo na tela muda. Valores em dinheiro NÃO são
//    convertidos entre moedas.
// ============================================================================
export const CHAVE_IDIOMA = 'c3d_idioma';

export const REGIOES = {
  pt: { id:'pt', locale:'pt-BR', moeda:'BRL', simbolo:'R$', decimal:',', placeholder:'0,00',
        loja:true, padroes:null },
  en: { id:'en', locale:'en-US', moeda:'USD', simbolo:'$', decimal:'.', placeholder:'0.00',
        loja:false,                                   // Shopping oculto por enquanto (sem afiliados nos EUA)
        // valores iniciais (só quando ainda não há nada salvo) — estimativas EUA, 2026
        padroes:{ precoKg:22, precoLitro:35, precoKwh:0.17, valorHora:20 } },
};

function detectar(){
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
// Preenchido por etapas. Chaves já traduzidas aqui; o resto cai no português.
export const EN = {
  'conta.idioma': 'Language',
  'conta.sair': 'Sign out',
  'conta.aria': 'Account',
};

export function t(chave, vars, original){
  let s = IDIOMA === 'en' && EN[chave] != null ? EN[chave] : (original != null ? original : chave);
  if (vars) s = s.replace(/\{(\w+)\}/g, (m, k) => (vars[k] != null ? vars[k] : m));
  return s;
}

// traduz o que já está na página (atributos data-i18n*)
export function traduzirDOM(raiz){
  if (IDIOMA !== 'en') return;
  const r = raiz || document;
  r.querySelectorAll('[data-i18n]').forEach(n => { const v = EN[n.dataset.i18n]; if (v != null) n.textContent = v; });
  [['placeholder','i18nPlaceholder','placeholder'], ['title','i18nTitle','title'], ['aria-label','i18nAria','aria-label']]
    .forEach(([attr, ds, nome]) => {
      r.querySelectorAll('[data-i18n-' + nome.replace('aria-label','aria') + ']').forEach(n => {
        const v = EN[n.dataset[ds]]; if (v != null) n.setAttribute(attr, v);
      });
    });
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
export const outroIdioma = () => (IDIOMA === 'pt' ? 'en' : 'pt');

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
