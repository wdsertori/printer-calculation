#!/usr/bin/env python3
"""Gera a versão em inglês das páginas públicas (landing e privacidade).

    python3 tools/gerar-en.py

Lê index.html e privacidade.html (português = fonte da verdade) e escreve
en/index.html e en/privacy.html, trocando cada texto pelo inglês de
tools/en-site.json (chave = texto em português, valor = inglês).
Mudou a página em português? Rode de novo. Texto sem tradução fica em português
e o script avisa. NÃO edite os arquivos de en/ à mão: são sobrescritos.
"""
import html as H, json, re, sys, pathlib

RAIZ = pathlib.Path(__file__).resolve().parent.parent
BASE = 'https://wdsertori.github.io/printer-calculation/'
D = json.load(open(RAIZ / 'tools' / 'en-site.json', encoding='utf-8'))
norm = lambda t: re.sub(r'\s+', ' ', t).strip()
faltando = []

def traduz_texto(t):
    k = norm(H.unescape(t))
    if not k or not re.search(r'[A-Za-zÀ-ú]{2}', k): return t
    if k in D:
        m = re.match(r'^(\s*)[\s\S]*?(\s*)$', t)
        return m.group(1) + H.escape(D[k], quote=False) + m.group(2)
    faltando.append(k); return t

ATTR_TXT = re.compile(r'(\b(?:alt|title|aria-label|placeholder|content)=")([^"]*)(")')
ATTR_URL = re.compile(r'(\b(?:href|src)=")([^"]*)(")')

def url_en(v, pagina):
    if v.startswith(('http', 'mailto:', '#', 'data:', 'tel:', '@@')) or v in ('./', ''): return v
    if v == 'app.html': return '../app.html?lang=en'
    if v == 'privacidade.html': return 'privacy.html'
    return '../' + v

def traduz_tag(tag, pagina):
    def a_txt(m):
        k = norm(H.unescape(m.group(2)))
        if k in D: return m.group(1) + H.escape(D[k], quote=True) + m.group(3)
        if re.search(r'[áéíóúâêôãõç]', k): faltando.append('@' + k)
        return m.group(0)
    tag = ATTR_TXT.sub(a_txt, tag)
    tag = ATTR_URL.sub(lambda m: m.group(1) + url_en(m.group(2), pagina) + m.group(3), tag)
    return tag

def gera(origem, destino, head_en, link_pt, extra=None):
    s = (RAIZ / origem).read_text(encoding='utf-8')
    # link de idioma -> aponta de volta pro português
    s = re.sub(r'<a class="idioma-link"[^>]*>English</a>',
               '<a class="idioma-link" href="@@PT@@" hreflang="pt-BR" lang="pt-BR">Português</a>', s)
    s = re.sub(r'<!--i18n-head-->.*?<!--/i18n-head-->', head_en, s, flags=re.S)
    s = s.replace('<html lang="pt-BR"', '<html lang="en"')
    partes = re.split(r'(<script\b.*?</script>|<style\b.*?</style>|<!--.*?-->|<[^>]+>)', s, flags=re.S)
    saida = []
    for p in partes:
        if p.startswith('<script'):
            p = p.replace("location.replace('app.html')", "location.replace('../app.html?lang=en')")
        elif p.startswith('<style') or p.startswith('<!--'):
            pass
        elif p.startswith('<'):
            p = traduz_tag(p, destino)
        else:
            p = traduz_texto(p)
        saida.append(p)
    s = ''.join(saida).replace('@@PT@@', link_pt)
    if extra: s = extra(s)
    cab = '<!-- GERADO por tools/gerar-en.py a partir de %s — não edite aqui. -->\n' % origem
    (RAIZ / destino).parent.mkdir(exist_ok=True)
    (RAIZ / destino).write_text(cab + s, encoding='utf-8')

HEAD_LAND = '''<link rel="canonical" href="%sen/">
<link rel="alternate" hreflang="pt-BR" href="%s">
<link rel="alternate" hreflang="en" href="%sen/">
<link rel="alternate" hreflang="x-default" href="%s">
<meta property="og:url" content="%sen/">
<meta property="og:locale" content="en_US">''' % ((BASE,) * 5)
HEAD_PRIV = '''<link rel="canonical" href="%sen/privacy.html">
<link rel="alternate" hreflang="pt-BR" href="%sprivacidade.html">
<link rel="alternate" hreflang="en" href="%sen/privacy.html">''' % ((BASE,) * 3)

EXTRA_DIREITOS = ('<p>Depending on where you live (for example, the European Union and the United Kingdom under the GDPR, '
  'or California under the CCPA/CPRA), you may have additional rights, such as access, correction, portability and '
  'objection to processing. To exercise any of them, write to the email above. We do not sell personal information and '
  'do not share it for cross-context advertising.</p>\n\n  <h2>Children</h2>')

def extra_priv(s):
    assert '<h2>Children</h2>' in s
    return ('<!-- DRAFT: English version prepared for review. Have it checked by a professional (GDPR/CCPA) before promoting it outside Brazil. -->\n'
            + s.replace('<h2>Children</h2>', EXTRA_DIREITOS, 1))

gera('index.html', 'en/index.html', HEAD_LAND, '../')
gera('privacidade.html', 'en/privacy.html', HEAD_PRIV, '../privacidade.html', extra_priv)
sem = sorted(set(faltando))
print('gerado: en/index.html, en/privacy.html')
if sem:
    print('SEM TRADUÇÃO (%d):' % len(sem)); [print(' -', t[:110]) for t in sem]
