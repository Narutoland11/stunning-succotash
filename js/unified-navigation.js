/**
 * Moz Doctor Dose - Sistema de Navegação Unificado
 * Script consolida todas as funções de navegação mobile e desktop
 * Versão: 2.0.0
 */

// Variável global para evitar inicializações múltiplas
if (window.navigationInitialized) {
    console.log('Sistema de navegação já inicializado. Saindo...');
} else {
    document.addEventListener('DOMContentLoaded', initializeNavigation);
}

/**
 * Função principal de inicialização do sistema de navegação
 */
function initializeNavigation() {
    // Evitar inicializações duplicadas
    if (window.navigationInitialized) return;
    window.navigationInitialized = true;
    
    console.log('Sistema de navegação unificado iniciando no ambiente:', window.location.hostname);
    
    // ===== ELEMENTOS DOM =====
    const navToggle = document.getElementById('nav-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('#main-nav ul li a');
    const userMenuButton = document.getElementById('user-menu-button');
    const userDropdown = document.getElementById('user-dropdown');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const mobileNavCards = document.querySelectorAll('.mobile-nav-card');
    const toolSections = document.querySelectorAll('.tool-section');
    
    // Se elementos essenciais não existirem, abortar inicialização
    if (!navToggle || !mainNav) {
        console.warn('Sistema de navegação: Elementos essenciais não encontrados');
        return;
    }
    
    // ===== OVERLAY DE NAVEGAÇÃO =====
    // Buscar overlay existente ou criar um novo
    let navOverlay = document.getElementById('nav-overlay');
    if (!navOverlay) {
        navOverlay = document.createElement('div');
        navOverlay.id = 'nav-overlay';
        navOverlay.className = 'nav-overlay';
        document.body.appendChild(navOverlay);
    }
    
    // ===== FUNÇÕES DE NAVEGAÇÃO =====
    
    /**
     * Toggle do menu mobile com animações fluidas
     * @param {boolean} forceState - Forçar um estado específico (opcional)
     */
    function toggleMenu(forceState) {
        const shouldOpen = forceState !== undefined ? forceState : !mainNav.classList.contains('visible');
        
        if (shouldOpen) {
            // Exibir overlay primeiro para suavizar a transição
            navOverlay.style.visibility = 'visible';
            navOverlay.classList.add('visible');
            
            // Ativar o menu lateral deslizante
            requestAnimationFrame(() => {
                mainNav.classList.add('visible');
                
                // Atualizar estado do botão e aria attributes
                navToggle.setAttribute('aria-expanded', 'true');
                navToggle.setAttribute('aria-label', 'Fechar menu de navegação');
                navToggle.classList.add('active');
                
                // Alterar ícone se existir
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                }
            });
            
            // Bloquear scroll do body enquanto menu está aberto
            document.body.classList.add('menu-open');
            document.body._previousOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            
            // Animar itens do menu com efeito cascata
            const headerMenuItems = mainNav.querySelectorAll('ul li a');
            headerMenuItems.forEach((item, index) => {
                item.style.transitionDelay = `${0.1 + (index * 0.05)}s`;
            });
        } else {
            // Remover classe visible do menu
            mainNav.classList.remove('visible');
            mainNav.classList.remove('active');
            
            // Efeito de fade-out no overlay
            navOverlay.classList.remove('visible');
            
            // Remover delay de transição dos itens do menu
            const headerMenuItems = mainNav.querySelectorAll('ul li a');
            headerMenuItems.forEach(item => {
                item.style.transitionDelay = '0s';
            });
            
            // Delay para completar animações
            setTimeout(() => {
                if (!mainNav.classList.contains('visible')) {
                    navOverlay.style.visibility = 'hidden';
                    document.body.classList.remove('menu-open');
                    
                    // Restaurar o overflow anterior
                    document.body.style.overflow = document.body._previousOverflow || '';
                    delete document.body._previousOverflow;
                }
            }, 350);
            
            // Atualizar estado do botão
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.setAttribute('aria-label', 'Abrir menu de navegação');
            navToggle.classList.remove('active');
            
            // Alterar ícone de volta se existir
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    }
    
    /**
     * Ativa a seção correta com base na URL atual
     */
    function activateCurrentSection() {
        const hash = window.location.hash || '#medicamentos';
        console.log('Ativando seção baseada na URL:', hash);
        
        // Ativar link correspondente no menu
        navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === hash;
            link.classList.toggle('active', isActive);
            link.setAttribute('aria-current', isActive ? 'page' : null);
        });
        
        // Também ativar no menu mobile se existir
        if (mobileNavLinks && mobileNavLinks.length > 0) {
            mobileNavLinks.forEach(link => {
                const isActive = link.getAttribute('href') === hash;
                link.classList.toggle('active', isActive);
                link.setAttribute('aria-selected', isActive ? 'true' : 'false');
            });
        }
        
        // Ativar seção correspondente
        const currentSectionId = hash.replace('#', '');
        const sections = document.querySelectorAll('.tool-section');
        sections.forEach(section => {
            section.classList.toggle('active', section.id === currentSectionId);
        });
        
        // Atualizar título da página baseado na seção ativa
        const activeLink = document.querySelector('#main-nav a.active');
        if (activeLink) {
            document.title = `${activeLink.textContent} | Moz Doctor Dose`;
        }
    }
    
    /**
     * Navega para uma seção e fecha o menu móvel automaticamente
     * @param {string} sectionId - ID da seção para navegar
     */
    function navigateToSection(sectionId) {
        if (!sectionId) return;
        
        // Se vier como ID (#medicamentos), remover a hashtag
        const cleanId = sectionId.replace('#', '');
        
        // Ativar link correspondente
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href').replace('#', '');
            const isActive = linkHref === cleanId;
            link.classList.toggle('active', isActive);
            link.setAttribute('aria-current', isActive ? 'page' : null);
        });
        
        // Ativar link mobile se existir
        if (mobileNavLinks && mobileNavLinks.length > 0) {
            mobileNavLinks.forEach(link => {
                const linkHref = link.getAttribute('href').replace('#', '');
                const isActive = linkHref === cleanId;
                link.classList.toggle('active', isActive);
                link.setAttribute('aria-selected', isActive ? 'true' : 'false');
            });
        }
        
        // Ativar seção correspondente
        const sections = document.querySelectorAll('.tool-section');
        sections.forEach(section => {
            const isSectionActive = section.id === cleanId;
            section.classList.toggle('active', isSectionActive);
        });
        
        // Atualizar URL sem recarregar a página
        if (cleanId && history.replaceState) {
            history.replaceState(null, null, '#' + cleanId);
        }
        
        // Fechar menu após navegação em dispositivos móveis
        if (window.innerWidth < 992) {
            toggleMenu(false);
        }
    }
    
    // ===== LISTENERS DE EVENTOS =====
    
    // Toggle do menu mobile ao clicar no botão
    navToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation(); // Impedir evento de propagar
        toggleMenu();
    });
    
    // Fechar menu quando clicar no overlay
    navOverlay.addEventListener('click', function() {
        toggleMenu(false);
    });
    
    // Fechar menu quando clicar fora dele
    document.addEventListener('click', function(e) {
        if (mainNav.classList.contains('visible') && 
            !mainNav.contains(e.target) && 
            e.target !== navToggle && 
            !navToggle.contains(e.target)) {
            toggleMenu(false);
        }
    });
    
    // Fechar menu quando pressionar ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mainNav.classList.contains('visible')) {
            toggleMenu(false);
        }
    });
    
    // Gerenciar cliques nos links do menu
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            navigateToSection(targetId);
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
    
    // Gerenciar cliques nos links do menu mobile se existirem
    if (mobileNavLinks && mobileNavLinks.length > 0) {
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                navigateToSection(targetId);
            });
        });
    }
    
    // Suporte ao dropdown de usuário se existir
    if (userMenuButton && userDropdown) {
        userMenuButton.addEventListener('click', function(e) {
            e.stopPropagation();
            userDropdown.classList.toggle('visible');
            userMenuButton.setAttribute('aria-expanded', 
                userDropdown.classList.contains('visible') ? 'true' : 'false');
        });
        
        // Fechar dropdown ao clicar fora
        document.addEventListener('click', function(e) {
            if (userDropdown.classList.contains('visible') && 
                !userDropdown.contains(e.target) && 
                e.target !== userMenuButton) {
                userDropdown.classList.remove('visible');
                userMenuButton.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // Atualizar seção ativa quando a URL mudar
    window.addEventListener('hashchange', function() {
        activateCurrentSection();
    });
    
    // Inicializar a seção atual quando o site carregar
    activateCurrentSection();
}
