/**
 * Moz Doctor Dose - Service Worker
 * Gerencia o cache de recursos estáticos e otimiza o carregamento da página
 */

const CACHE_NAME = 'moz-doctor-dose-cache-v1';
const RUNTIME_CACHE = 'moz-doctor-dose-runtime';

// Recursos que serão cacheados imediatamente na instalação
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/css/critical.css',
  '/css/main.css',
  '/js/utils/image-optimizer.js',
  '/js/theme-switcher.js',
  '/js/mobile-navigation.js',
  '/img/logo.png',
  '/img/favicon.ico'
];

// Instala o Service Worker e faz pré-cache dos recursos essenciais
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cacheando recursos estáticos');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Limpa caches antigos ao ativar
self.addEventListener('activate', event => {
  const currentCaches = [CACHE_NAME, RUNTIME_CACHE];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// Estratégia de cache para requisições
self.addEventListener('fetch', event => {
  // Ignora requisições não GET
  if (event.request.method !== 'GET') return;

  // Ignora requisições a APIs externas e analytics
  if (event.request.url.includes('/api/') || 
      event.request.url.includes('analytics') || 
      event.request.url.includes('firebase')) {
    return;
  }

  // Estratégia cache-first para recursos estáticos
  if (isStaticAsset(event.request.url)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME_CACHE).then(cache => {
          return fetch(event.request).then(response => {
            // Cache a resposta válida
            if (response.status === 200) {
              cache.put(event.request, response.clone());
            }
            return response;
          });
        });
      })
    );
    return;
  }

  // Estratégia network-first para conteúdo dinâmico
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Cache a resposta válida
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});

// Verifica se é um recurso estático
function isStaticAsset(url) {
  const staticExtensions = ['.css', '.js', '.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.woff', '.woff2', '.ttf', '.eot'];
  return staticExtensions.some(ext => url.endsWith(ext));
}
