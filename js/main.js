/**
 * Moz Doctor Dose - Script Principal
 * Gerencia a navegação entre seções e inicialização geral do aplicativo
 * Implementação com melhorias de acessibilidade
 */

document.addEventListener('DOMContentLoaded', function() {
    // Gerenciar navegação entre seções
    const navLinks = document.querySelectorAll('nav a[role="menuitem"]');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-cards a[role="tab"]');
    const toolSections = document.querySelectorAll('.tool-section');
    const navToggle = document.getElementById('nav-toggle');
    const mainNav = document.getElementById('main-nav');
    
    // Função para ativar a seção correta com base na URL atual
    function activateCurrentSection() {
        const hash = window.location.hash || '#doses';
        
        // Remover atributos ativos de todos os links e seções
        navLinks.forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        });
        
        mobileNavLinks.forEach(link => {
            link.classList.remove('active');
            link.setAttribute('aria-selected', 'false');
        });
        
        toolSections.forEach(section => section.classList.remove('active'));
        
        // Adicionar atributos ativos ao link e seção correspondentes
        const currentLink = document.querySelector(`nav a[href="${hash}"]`);
        const currentMobileLink = document.querySelector(`.mobile-nav-cards a[href="${hash}"]`);
        const currentSection = document.querySelector(hash);
        
        if (currentLink) {
            currentLink.classList.add('active');
            currentLink.setAttribute('aria-current', 'page');
        }
        
        if (currentMobileLink) {
            currentMobileLink.classList.add('active');
            currentMobileLink.setAttribute('aria-selected', 'true');
        }
        
        if (currentSection) currentSection.classList.add('active');
        
        // Fechar o menu móvel após clicar em um link (se estiver aberto)
        if (mainNav && mainNav.classList.contains('active')) {
            closeMainNav();
        }
    }
    
    // Função para abrir o menu de navegação principal
    function openMainNav() {
        mainNav.classList.add('active');
        navToggle.setAttribute('aria-expanded', 'true');
        navToggle.setAttribute('aria-label', 'Fechar menu de navegação');
        navToggle.querySelector('i').classList.remove('fa-bars');
        navToggle.querySelector('i').classList.add('fa-times');
    }
    
    // Função para fechar o menu de navegação principal
    function closeMainNav() {
        mainNav.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Abrir menu de navegação');
        navToggle.querySelector('i').classList.remove('fa-times');
        navToggle.querySelector('i').classList.add('fa-bars');
    }
    
    // Gerenciar botão de toggle do menu
    if (navToggle && mainNav) {
        navToggle.addEventListener('click', function() {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            
            if (isExpanded) {
                closeMainNav();
            } else {
                openMainNav();
            }
        });
    }
    
    // Suporte à navegação por teclado no menu principal
    navLinks.forEach(link => {
        // Navegação por clique
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => {
                l.classList.remove('active');
                l.removeAttribute('aria-current');
            });
            
            this.classList.add('active');
            this.setAttribute('aria-current', 'page');
            
            const targetId = this.getAttribute('href');
            updateActiveSection(targetId);
        });
        
        // Acessibilidade por teclado
        link.addEventListener('keydown', function(e) {
            // Enter ou espaço para ativar o link
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Navegação mobile
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            mobileNavLinks.forEach(l => {
                l.classList.remove('active');
                l.setAttribute('aria-selected', 'false');
            });
            
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');
            
            const targetId = this.getAttribute('href');
            updateActiveSection(targetId);
        });
        
        // Acessibilidade por teclado para tabs mobile
        link.addEventListener('keydown', function(e) {
            // Enter ou espaço para ativar o tab
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Função para atualizar a seção ativa
    function updateActiveSection(targetId) {
        toolSections.forEach(section => section.classList.remove('active'));
        const targetSection = document.querySelector(targetId);
        if (targetSection) targetSection.classList.add('active');
    }
    
    // Inicialize a seção atual com base na URL
    activateCurrentSection();
    
    // Atualizar a seção ativa quando a URL muda (navegação por histórico)
    window.addEventListener('hashchange', activateCurrentSection);
    
    // Fechamento do menu ao clicar fora dele
    document.addEventListener('click', function(e) {
        if (mainNav && mainNav.classList.contains('active')) {
            if (!mainNav.contains(e.target) && e.target !== navToggle && !navToggle.contains(e.target)) {
                closeMainNav();
            }
        }
    });
    
    // Inicialização de componentes adicionais
    initializeInformationStats();
});

/**
 * Inicializa as estatísticas na seção de informações
 */
function initializeInformationStats() {
    const updateStatsButton = document.getElementById('atualizar-estatisticas');
    
    if (updateStatsButton) {
        updateStatsButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Simulação de atualização de estatísticas
            document.getElementById('total-medicamentos').textContent = countAllMedications();
            document.getElementById('estatisticas-detalhadas').innerHTML = 
                `<p>Última atualização: ${new Date().toLocaleString()}</p>`;
        });
    }
}

/**
 * Conta o número total de medicamentos disponíveis
 * (Esta é uma função simples para ilustração)
 */
function countAllMedications() {
    // Esta função seria idealmente implementada nos módulos de medicamentos
    // Apenas um valor demonstrativo aqui
    return '150+';
}
