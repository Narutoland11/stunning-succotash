/**
 * Moz Doctor Dose - Script de Bundling
 * 
 * Este script combina e minifica arquivos JS relacionados conforme a configuração
 * para reduzir o tamanho total do download e melhorar performance.
 */

(function() {
  // Função utilitária para carregar script
  function loadScript(url, callback) {
    const script = document.createElement('script');
    script.src = url;
    script.async = false; // Manter a ordem de execução
    
    if (callback) {
      script.onload = callback;
    }
    
    document.head.appendChild(script);
  }
  
  // Função para carregar um bundle específico
  function loadBundle(bundleName) {
    // No ambiente de produção, carregamos o arquivo minificado
    if (isProduction()) {
      loadScript(`/js/dist/${bundleName}.min.js`);
      return;
    }
    
    // Em desenvolvimento, carregamos os scripts individuais
    const config = window.bundleConfig || {};
    const scripts = config[bundleName] || [];
    
    scripts.forEach(scriptPath => {
      loadScript(`/js${scriptPath}`);
    });
  }
  
  // Determina se estamos em ambiente de produção
  function isProduction() {
    // Verifica se estamos em um domínio de produção ou há um parâmetro de URL que indica produção
    return window.location.hostname !== 'localhost' && 
           window.location.hostname !== '127.0.0.1' &&
           !window.location.search.includes('dev=true');
  }
  
  // Carrega os bundles necessários baseado nos elementos presentes na página
  function loadRequiredBundles() {
    // Bundle principal é sempre carregado
    loadBundle('main');
    
    // Verifica elementos na página para determinar quais módulos são necessários
    if (document.querySelector('[data-module="medicamentos"]')) {
      loadBundle('medicamentos');
    }
    
    if (document.querySelector('[data-module="login"], [data-module="profile"]')) {
      loadBundle('users');
    }
    
    if (document.querySelector('[data-module="admin"]')) {
      loadBundle('admin');
    }
  }
  
  // Inicializa carregamento após o DOM estar pronto
  document.addEventListener('DOMContentLoaded', function() {
    // Primeiro carregamos a configuração de bundles
    loadScript('/js/build/bundle-config.js', function() {
      // Após carregar a configuração, carregamos os bundles necessários
      loadRequiredBundles();
    });
  });
})();
