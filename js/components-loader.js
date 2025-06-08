/**
 * Carregador de Componentes 
 * Este arquivo inicializa todos os componentes reutilizáveis da aplicação
 * para reduzir duplicação de código e melhorar a manutenibilidade
 */

document.addEventListener('DOMContentLoaded', function() {
  // Inicializa sistemas de navegação
  if (typeof initMainNavigation === 'function') {
    initMainNavigation();
  }

  if (typeof initMobileNavigation === 'function') {
    initMobileNavigation();
  }

  // Inicializa todos os sistemas de abas
  if (typeof initAllTabSystems === 'function') {
    initAllTabSystems();
  }

  // Inicializa navegação de configurações
  if (typeof initSettingsNavigation === 'function') {
    initSettingsNavigation();
  }

  // Carrega dados do usuário quando logado
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // Carrega perfil do usuário
      if (typeof loadUserProfile === 'function') {
        loadUserProfile(user.uid);
      }

      // Carrega configurações do usuário
      if (typeof loadUserSettings === 'function') {
        loadUserSettings(user.uid);
      }

      // Configura formulário de perfil
      const profileForm = document.getElementById('profile-form');
      if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          if (typeof saveUserProfile === 'function') {
            const profileData = {
              displayName: document.getElementById('displayName').value,
              especialidade: document.getElementById('especialidade')?.value || '',
              instituicao: document.getElementById('instituicao')?.value || '',
              telefone: document.getElementById('telefone')?.value || '',
              bio: document.getElementById('bio')?.value || ''
            };
            
            saveUserProfile(user.uid, profileData);
          }
        });
      }

      // Configura formulário de preferências
      const preferencesForm = document.getElementById('preferences-form');
      if (preferencesForm) {
        preferencesForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          if (typeof saveUserSettings === 'function') {
            const settings = {
              darkMode: document.querySelector('input[name="darkMode"]')?.checked || false,
              notifications: document.querySelector('input[name="notifications"]')?.checked || true,
              newsletter: document.querySelector('input[name="newsletter"]')?.checked || false,
              autoSave: document.querySelector('input[name="autoSave"]')?.checked || true,
              fontSize: document.querySelector('select[name="fontSize"]')?.value || 'medium',
              language: document.querySelector('select[name="language"]')?.value || 'pt'
            };
            
            saveUserSettings(user.uid, settings);
          }
        });
      }
    }
  });
});
