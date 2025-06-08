/**
 * Componente de Tabulação
 * Este arquivo contém funcionalidades para gerenciar sistemas de abas,
 * evitando duplicação de código em várias seções do projeto
 */

// Inicializar sistema de tabs
function initTabSystem(tabContainer, defaultTabId = null) {
  const tabButtons = tabContainer.querySelectorAll('[role="tab"]');
  const tabPanels = tabContainer.querySelectorAll('[role="tabpanel"]');
  
  // Função para ativar uma tab específica
  function activateTab(tabId) {
    // Desativa todas as tabs
    tabButtons.forEach(button => {
      button.classList.remove('active');
      button.setAttribute('aria-selected', 'false');
    });
    
    // Desativa todos os painéis
    tabPanels.forEach(panel => {
      panel.classList.remove('active');
    });
    
    // Ativa a tab selecionada
    const selectedButton = tabContainer.querySelector(`[aria-controls="${tabId}"]`);
    const selectedPanel = tabContainer.querySelector(`#${tabId}`);
    
    if (selectedButton && selectedPanel) {
      selectedButton.classList.add('active');
      selectedButton.setAttribute('aria-selected', 'true');
      selectedPanel.classList.add('active');
    }
  }
  
  // Adiciona listeners aos botões
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('aria-controls');
      activateTab(tabId);
    });
    
    // Navegação via teclado para acessibilidade
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const tabId = button.getAttribute('aria-controls');
        activateTab(tabId);
      }
    });
  });
  
  // Ativa a tab padrão ou a primeira
  if (defaultTabId) {
    activateTab(defaultTabId);
  } else if (tabButtons.length > 0) {
    const firstTabId = tabButtons[0].getAttribute('aria-controls');
    activateTab(firstTabId);
  }
  
  // Retorna API para uso externo
  return {
    activateTab: activateTab
  };
}

// Inicializa todos os sistemas de tabs do documento
function initAllTabSystems() {
  const tabContainers = document.querySelectorAll('.tabs, .profile-tabs');
  
  tabContainers.forEach(container => {
    initTabSystem(container);
  });
}

// Inicializar tabs em seções
function initSectionTabs(sectionId, defaultTabId = null) {
  const section = document.getElementById(sectionId);
  if (!section) return null;
  
  const tabContainer = section.querySelector('.tabs, .profile-tabs');
  if (!tabContainer) return null;
  
  return initTabSystem(tabContainer, defaultTabId);
}
