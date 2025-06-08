/**
 * Componente de Navegação
 * Este arquivo fornece funcionalidades para navegação do sistema,
 * evitando duplicação de código em múltiplos arquivos
 */

// Inicializar navegação principal
function initMainNavigation() {
  const navToggle = document.getElementById('nav-toggle');
  const navOverlay = document.getElementById('nav-overlay');
  const mainNav = document.getElementById('main-nav');
  
  // Toggle do menu mobile
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      const expanded = this.getAttribute('aria-expanded') === 'true' || false;
      this.setAttribute('aria-expanded', !expanded);
      document.body.classList.toggle('nav-open');
      mainNav.classList.toggle('active');
      navOverlay.classList.toggle('active');
    });
  }
  
  // Fechar menu ao clicar no overlay
  if (navOverlay) {
    navOverlay.addEventListener('click', function() {
      document.body.classList.remove('nav-open');
      mainNav.classList.remove('active');
      navOverlay.classList.remove('active');
      if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    });
  }
  
  // Links de navegação principal
  const navLinks = document.querySelectorAll('.main-nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Obtém o ID da seção (não armazenamos em variável já que não é utilizada)
      this.getAttribute('href').substring(1);
      
      // Atualiza estados ativos
      navLinks.forEach(navLink => {
        navLink.classList.remove('active');
        navLink.setAttribute('aria-current', 'false');
      });
      
      this.classList.add('active');
      this.setAttribute('aria-current', 'page');
      
      // Fecha menu mobile se aberto
      if (window.innerWidth < 992) {
        document.body.classList.remove('nav-open');
        if (mainNav) mainNav.classList.remove('active');
        if (navOverlay) navOverlay.classList.remove('active');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

// Inicializar navegação mobile (cards)
function initMobileNavigation() {
  const mobileCards = document.querySelectorAll('.mobile-nav-card');
  
  mobileCards.forEach(card => {
    card.addEventListener('click', function(e) {
      // Obtém o ID da seção (não armazenamos em variável já que não é utilizada)
      this.getAttribute('href').substring(1);
      
      // Atualiza estados ativos
      mobileCards.forEach(navCard => {
        navCard.classList.remove('active');
        navCard.setAttribute('aria-current', 'false');
      });
      
      this.classList.add('active');
      this.setAttribute('aria-current', 'page');
    });
  });
}

// Função para mostrar uma seção específica
function showSection(sectionId) {
  // Esconde todas as seções
  const sections = document.querySelectorAll('.tool-section');
  sections.forEach(section => {
    section.classList.remove('active');
  });
  
  // Mostra a seção desejada
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add('active');
    
    // Atualiza navegação
    updateNavigation(sectionId);
  }
}

// Atualizar estado de navegação com base na seção atual
function updateNavigation(sectionId) {
  // Atualiza menu principal
  const navLinks = document.querySelectorAll('.main-nav a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href').substring(1);
    link.classList.toggle('active', href === sectionId);
    link.setAttribute('aria-current', href === sectionId ? 'page' : 'false');
  });
  
  // Atualiza navegação mobile
  const mobileCards = document.querySelectorAll('.mobile-nav-card');
  mobileCards.forEach(card => {
    const href = card.getAttribute('href').substring(1);
    card.classList.toggle('active', href === sectionId);
    card.setAttribute('aria-current', href === sectionId ? 'page' : 'false');
  });
}
