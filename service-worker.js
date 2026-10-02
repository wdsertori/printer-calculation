// Service Worker do Precifica 3D — cache básico do "app shell" pra permitir
// abrir offline (depois da primeira visita) e satisfazer o critério de
// instalabilidade de PWA (exigido pra empacotar como app Android via TWA).
//
// Estratégia: network-first pros arquivos próprios (sempre tenta buscar a
// versão mais nova; se não tiver rede, cai no cache). CDNs externos
// (Firebase, jsPDF, fontes) não são interceptados — deixa o navegador
// cuidar do cache deles normalmente.

const CACHE_NOME = 'precifica3d-v2';
const ARQUIVOS_APP_SHELL = [
  './',
  './index.html',
  './app.html',
  './catalogo.js',
  './site.webmanifest',
  './icon-192.png',
  './icon-512.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NOME).then(cache => cache.addAll(ARQUIVOS_APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(nomes =>
      Promise.all(nomes.filter(n => n !== CACHE_NOME).map(n => caches.delete(n)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  // Só intercepta pedidos pro próprio domínio (mesma origem) — CDNs externos
  // (fonts.googleapis.com, gstatic, jsdelivr) seguem o caminho normal.
  if (url.origin !== self.location.origin) return;
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then(resposta => {
        const copia = resposta.clone();
        caches.open(CACHE_NOME).then(cache => cache.put(event.request, copia));
        return resposta;
      })
      .catch(() => caches.match(event.request))
  );
});
