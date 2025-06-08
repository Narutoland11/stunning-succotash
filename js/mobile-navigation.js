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
    const mobileNavCards = document.querySelectorAll('.mobile-nav-card');
    const sections = document.querySelectorAll('.tool-section');
    
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
    
    // ===== LISTENERS DE EVENTOS =====
    // Toggle do menu mobile ao clicar no botão
    navToggle.addEventListener('click', function(e) {
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
    
    // Gerenciar cliques nos links do menu e navegação entre seções
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navigateToSection(this.getAttribute('href'));
        });
    });
    
    // Atualizar seção ativa quando a URL mudar
    window.addEventListener('hashchange', function() {
        activateCurrentSection();
    });
        
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
                navToggle.classList.add('active');
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
            navToggle.classList.remove('active');
        }
    }
    
    /**
     * Ativa a seção correta com base na URL atual
     */
    function activateCurrentSection() {
        const hash = window.location.hash || '#medicamentos';
        console.log('URL atual:', window.location.href, 'Hash:', hash);
        
        // Ativar link correspondente no menu
        navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === hash;
            link.classList.toggle('active', isActive);
            link.setAttribute('aria-current', isActive ? 'page' : null);
        });
        
        // Ativar seção correspondente
        const currentSectionId = hash.replace('#', '');
        sections.forEach(section => {
            section.classList.toggle('active', section.id === currentSectionId);
        });
        
        // Atualizar título da página baseado na seção ativa
        const activeLink = document.querySelector('#main-nav a.active');
        if (activeLink) {
            document.title = `${activeLink.textContent} | Moz Doctor Dose`;
        }
    }
    
    // Inicializar a seção atual quando o site carregar
    activateCurrentSection();
    
    /**
     * Navega para uma seção e fecha o menu móvel automaticamente
     * @param {string} sectionId - ID da seção para navegar
     */
    function navigateToSection(sectionId) {
        // Ativar link correspondente
        navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === sectionId;
            link.classList.toggle('active', isActive);
            link.setAttribute('aria-current', isActive ? 'page' : null);
            
            // Log para depuração
            if (isActive) {
                console.log('Link ativado:', link);
            }
        });
        
        // Ativar seção correspondente
        if (sectionId) {
            const sectionName = sectionId.replace('#', '');
            console.log('Ativando seção:', sectionId);
            
            sections.forEach(section => {
                const isSectionActive = section.id === sectionName;
                section.classList.toggle('active', isSectionActive);
            });
            
            // Log para confirmar ativação
            console.log('Seção ativada:', sectionName);
            
            // Fechar menu após navegação em dispotivos móveis
            if (window.innerWidth < 992) {
                toggleMenu(false);
            }
        }
    }
        }
    }
    
    // Função para navegação por abas (comum para links do menu e cards mobile)
    function navigateToSection(sectionId) {
        // Esconder todas as seções
        sections.forEach(section => section.classList.remove('active'));
        
        // Mostrar a seção selecionada
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Atualizar a URL para refletir a seção atual (sem recarregar a página)
            history.replaceState(null, null, '#' + sectionId);
            
            // Fechar o menu mobile se estiver aberto
            if (mainNav.classList.contains('visible')) {
                // Usar a função toggleMenu para garantir consistência nas animações
                toggleMenu(false);
                document.body.classList.remove('menu-open');
                document.body.style.overflow = '';
            }
            
            // Rolar suavemente até a seção, com pequeno atraso para animações
            setTimeout(() => {
                // Compensar a altura do header fixo no scroll
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
    
    // Fechar menu quando um link é clicado (em mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Impedir comportamento padrão se for um link interno
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                
                // Adicionar classe ativa ao link clicado
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Atualizar card móvel correspondente, se existir
                mobileNavCards.forEach(card => {
                    card.classList.remove('active');
                    if (card.getAttribute('href') === href) {
                        card.classList.add('active');
                    }
                });
                
                // Navegar para a seção
                navigateToSection(targetId);
            }
        });
    });
    
    // Cards de navegação mobile
    mobileNavCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                navigateToSection(targetId);
                
                // Atualizar estado ativo dos cards
                mobileNavCards.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                
                // Atualizar links do menu principal também
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === href) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Ajustar UI para diferentes tamanhos de tela
    function adjustUIForScreenSize() {
        const isMobile = window.innerWidth <= 768;
        document.body.classList.toggle('mobile-view', isMobile);
        
        if (isMobile) {
            // Ajustes específicos para telas pequenas
            
            // Melhorar o espaçamento na seção de doses
            const doseForm = document.querySelector('#doses .calculator-form');
            if (doseForm) {
                doseForm.classList.add('mobile-form');
            }
            
            // Ajustar comportamento de campos do formulário
            const formGroups = document.querySelectorAll('.form-group');
            formGroups.forEach(group => {
                if (!group.classList.contains('mobile-adjusted')) {
                    group.classList.add('mobile-adjusted');
                }
            });
            
            // Garantir que áreas de resultado se ajustem à tela
            document.querySelectorAll('.result-container').forEach(container => {
                container.classList.add('mobile-result');
            });
            
            // Melhor adaptação para tabelas
            document.querySelectorAll('table').forEach(table => {
                if (!table.parentElement.classList.contains('table-container')) {
                    // Criar um wrapper para permitir rolagem horizontal
                    const wrapper = document.createElement('div');
                    wrapper.className = 'table-container';
                    table.parentNode.insertBefore(wrapper, table);
                    wrapper.appendChild(table);
                }
            });
        } else {
            // Reverter ajustes para telas maiores
            const doseForm = document.querySelector('#doses .calculator-form');
            if (doseForm) {
                doseForm.classList.remove('mobile-form');
            }
            
            const formGroups = document.querySelectorAll('.form-group');
            formGroups.forEach(group => {
                group.classList.remove('mobile-adjusted');
            });
            
            document.querySelectorAll('.result-container').forEach(container => {
                container.classList.remove('mobile-result');
            });
        }
    }
    
    // Executar ajustes na carga e no redimensionamento
    adjustUIForScreenSize();
    window.addEventListener('resize', adjustUIForScreenSize);
    
    // Melhorar interatividade do formulário em dispositivos móveis
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            if (window.innerWidth <= 768) {
                // Scroll para o elemento com foco para garantir visibilidade
                setTimeout(() => {
                    this.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
                
                // Adicionar classe para destacar o campo ativo
                this.closest('.form-group')?.classList.add('field-focus');
            }
        });
        
        input.addEventListener('blur', function() {
            this.closest('.form-group')?.classList.remove('field-focus');
        });
    });
    
    // Ajustar comportamento de botões em mobile
    const actionButtons = document.querySelectorAll('.btn.primary, .btn.secondary');
    actionButtons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.classList.add('btn-touch');
        });
        
        button.addEventListener('touchend', function() {
            this.classList.remove('btn-touch');
        });
    });
    
    // Verificar a URL ao carregar para navegação direta para âncoras
    function checkUrlHash() {
        // Verificar se há um hash na URL (navegação direta para uma seção)
        const hash = window.location.hash;
        if (hash) {
            const targetId = hash.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Esconder todas as seções
                const sections = document.querySelectorAll('.tool-section');
                sections.forEach(section => section.classList.remove('active'));
                
                // Mostrar a seção alvo
                targetSection.classList.add('active');
                
                // Atualizar links do menu
                const navLinks = document.querySelectorAll('nav ul li a');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === hash) {
                        link.classList.add('active');
                    }
                });
                
                // Atualizar cards móveis se existirem
                const mobileNavCards = document.querySelectorAll('.mobile-nav-card');
                mobileNavCards.forEach(card => {
                    card.classList.remove('active');
                    if (card.getAttribute('href') === hash) {
                        card.classList.add('active');
                    }
                });
                
                // Rolar suavemente até a seção após um pequeno atraso
                setTimeout(() => {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }, 200);
            }
        }
    }
    
    // Executar verificação de hash após carregamento
    checkUrlHash();
    
    // Adicionar classe CSS para estilizar elementos ativos
    document.documentElement.style.setProperty('--header-height', document.querySelector('header').offsetHeight + 'px');
});
