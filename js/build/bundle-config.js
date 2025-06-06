/**
 * Moz Doctor Dose - Configuração para Bundling de Scripts
 * 
 * Este arquivo define os grupos de scripts que devem ser combinados
 * para reduzir requisições HTTP e duplicações.
 */

const bundleConfig = {
  // Bundle principal da aplicação
  "main": [
    "../core/mainn.js",
    "../theme-switcher.js",
    "../mobile-navigation.js",
    "../utils/image-optimizer.js",
    "../utils/accessibility-enhancer.js"
  ],
  
  // Bundle para o módulo de medicamentos
  "medicamentos": [
    "../modules/medicamentos/medicamentos.js",
    "../modules/medicamentos/medicamentos_init.js",
    "../modules/medicamentos/antiepilepticos_init.js",
    "../modules/medicamentos/pesquisa_medicamentos.js",
    "../modules/medicamentos/interacoes_medicamentosas.js",
    "../modules/medicamentos/medicamentos_mocambique.js",
    "../modules/medicamentos/correcao_medicamentos.js",
    "../modules/medicamentos/novos_medicamentos_essenciais.js",
    "../modules/medicamentos/novos_medicamentos_essenciais2.js"
  ],
  
  // Bundle para o sistema de usuários
  "users": [
    "../login-system.js",
    "../user-profile.js",
    "../user-settings.js",
    "../user-notifications.js"
  ],
  
  // Bundle para o dashboard administrativo
  "admin": [
    "../admin-dashboard.js",
    "../estatisticas-tempo-real.js"
  ]
};

// Exportar configuração
if (typeof module !== 'undefined') {
  module.exports = bundleConfig;
}

// Para uso direto no navegador
if (typeof window !== 'undefined') {
  window.bundleConfig = bundleConfig;
}
