/**
 * Moz Doctor Dose - Registro do Service Worker
 * Registra o service worker para caching e otimização offline
 */

// Registrar o service worker se for suportado pelo navegador
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js')
      .then(function(registration) {
        console.log('Service Worker registrado com sucesso:', registration.scope);
      })
      .catch(function(error) {
        console.log('Registro do Service Worker falhou:', error);
      });
  });
}
