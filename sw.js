// Service worker del diario: deja abrir la app sin conexión.
// Con red pide siempre la versión publicada (y guarda copia); sin red, sirve la copia.
// Las llamadas a GitHub (otro dominio) no pasan por aquí: las gestiona la app.
const CACHE = 'diario-app';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icon.svg'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  // La copia se guarda sin la parte de «?…», para que las comprobaciones de versión no llenen la caché
  const key = url.origin + url.pathname;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(key, copy)); }
        return res;
      })
      .catch(() => caches.match(key).then((hit) => hit || caches.match('./')))
  );
});
