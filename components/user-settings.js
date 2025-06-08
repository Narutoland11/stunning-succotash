/**
 * Componente de Configurações do Usuário
 * Este arquivo contém funções para gerenciar as configurações do usuário,
 * evitando duplicação de código entre user-sections.html e index.html
 */

// Inicializar navegação das configurações
function initSettingsNavigation() {
  const navLinks = document.querySelectorAll('.settings-nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Remove classe ativa de todos os links
      navLinks.forEach(navLink => {
        navLink.classList.remove('active');
      });
      
      // Adiciona classe ativa no link clicado
      link.classList.add('active');
      
      // Mostra a seção correspondente
      const sectionId = link.getAttribute('data-section');
      const sections = document.querySelectorAll('.settings-section');
      
      sections.forEach(section => {
        section.classList.remove('active');
      });
      
      document.getElementById(sectionId).classList.add('active');
    });
  });
}

// Carregar configurações do usuário
function loadUserSettings(userId) {
  return new Promise((resolve, reject) => {
    const settingsRef = db.collection('user_settings').doc(userId);
    
    settingsRef.get().then((doc) => {
      if (doc.exists) {
        const settings = doc.data();
        updateSettingsUI(settings);
        resolve(settings);
      } else {
        // Cria configurações padrão se não existir
        const defaultSettings = {
          darkMode: false,
          notifications: true,
          newsletter: false,
          autoSave: true,
          fontSize: 'medium',
          language: 'pt'
        };
        
        // Salva as configurações padrão
        settingsRef.set(defaultSettings)
          .then(() => {
            updateSettingsUI(defaultSettings);
            resolve(defaultSettings);
          })
          .catch(error => {
            console.error("Erro ao salvar configurações padrão:", error);
            reject(error);
          });
      }
    }).catch((error) => {
      console.error("Erro ao carregar configurações:", error);
      reject(error);
    });
  });
}

// Atualizar interface com as configurações
function updateSettingsUI(settings) {
  // Atualiza toggles e seletores
  const darkModeToggle = document.querySelector('input[name="darkMode"]');
  const notificationsToggle = document.querySelector('input[name="notifications"]');
  const newsletterToggle = document.querySelector('input[name="newsletter"]');
  const autoSaveToggle = document.querySelector('input[name="autoSave"]');
  const fontSizeSelect = document.querySelector('select[name="fontSize"]');
  const languageSelect = document.querySelector('select[name="language"]');
  
  if (darkModeToggle) darkModeToggle.checked = settings.darkMode;
  if (notificationsToggle) notificationsToggle.checked = settings.notifications;
  if (newsletterToggle) newsletterToggle.checked = settings.newsletter;
  if (autoSaveToggle) autoSaveToggle.checked = settings.autoSave;
  
  if (fontSizeSelect) fontSizeSelect.value = settings.fontSize || 'medium';
  if (languageSelect) languageSelect.value = settings.language || 'pt';
  
  // Aplica tema escuro se ativado
  if (settings.darkMode) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}

// Salvar configurações do usuário
function saveUserSettings(userId, settings) {
  return db.collection('user_settings').doc(userId).set(settings)
    .then(() => {
      showSettingsNotification('Configurações salvas com sucesso!', 'success');
      return true;
    })
    .catch(error => {
      console.error("Erro ao salvar configurações:", error);
      showSettingsNotification('Erro ao salvar configurações. Tente novamente.', 'error');
      throw error;
    });
}

// Exibir notificação de configurações
function showSettingsNotification(message, type = 'info') {
  const settingsSaved = document.querySelector('.settings-saved');
  const settingsError = document.querySelector('.settings-error');
  
  if (type === 'success' && settingsSaved) {
    settingsSaved.textContent = message;
    settingsSaved.style.display = 'block';
    
    setTimeout(() => {
      settingsSaved.style.display = 'none';
    }, 3000);
  } else if (type === 'error' && settingsError) {
    settingsError.textContent = message;
    settingsError.style.display = 'block';
    
    setTimeout(() => {
      settingsError.style.display = 'none';
    }, 3000);
  }
}
