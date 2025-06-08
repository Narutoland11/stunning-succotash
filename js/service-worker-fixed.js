/**
 * Service Worker Fixado
 * Versão simplificada do Service Worker original para evitar erros de cache
 */

const CACHE_NAME = 'moz-doctor-dose-cache-v1';
const SAFE_URLS = [
  '/',
  '/css/main.css',
  '/css/responsive-ui.css',
  '/css/modern-nav.css',
  '/css/additional-styles.css',
  '/js/unified-navigation.js',
  '/js/dist/main-fixed.min.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cacheando recursos estáticos');
        // Só tenta adicionar URLs seguras ao cache
        // Isso evitará o erro de falha no addAll
        return cache.addAll(SAFE_URLS)
          .catch(err => {
            console.log('Algumas URLs não puderam ser cacheadas, continuando mesmo assim:', err);
            // Continua mesmo se alguns recursos falhar
            return Promise.resolve();
          });
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - retorna a resposta do cache
        if (response) {
          return response;
        }
        
        // Clone da requisição
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest)
          .then((response) => {
            // Verifica se recebemos uma resposta válida
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone da resposta
            const responseToCache = response.clone();
            
            // Não tenta cachear todas as respostas para evitar erros
            if (event.request.method === 'GET' && event.request.url.indexOf('http') === 0) {
              caches.open(CACHE_NAME)
                .then((cache) => {
                  try {
                    cache.put(event.request, responseToCache);
                  } catch (e) {
                    console.error('Erro ao cachear recurso:', e);
                  }
                });
            }
            
            return response;
          })
          .catch(() => {
            // Fallback para quando a rede falha e o recurso não está em cache
            if (event.request.mode === 'navigate') {
              return caches.match('/');
            }
          });
      })
  );
});
