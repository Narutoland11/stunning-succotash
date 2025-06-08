/**
 * Moz Doctor Dose - Registro do Service Worker
 * Registra o service worker para caching e otimização offline
 */

// Registrar o service worker - Versão corrigida
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/js/service-worker-fixed.js')
      .then(function(registration) {
        console.log('Service Worker registrado com sucesso:', registration.scope);
      })
      .catch(function(error) {
        console.log('Falha no registro do Service Worker:', error);
      });
  });
}
