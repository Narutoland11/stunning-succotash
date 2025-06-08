/**
 * Service Worker de Fallback
 * Usado para resolver problemas com o Service Worker original
 */

// Verificar se o navegador suporta Service Workers
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/js/service-worker-fixed.js')
      .then(function(registration) {
        console.log('Service Worker registrado com sucesso: ', registration.scope);
      })
      .catch(function(error) {
        console.log('Registro do Service Worker falhou: ', error);
      });
  });
}
