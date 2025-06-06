/**
 * Moz Doctor Dose - Mobile Navigation
 * Script para controlar a navegação em dispositivos móveis
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const navToggle = document.getElementById('nav-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('nav ul li a');
    const mobileNavCards = document.querySelectorAll('.mobile-nav-card');
    const sections = document.querySelectorAll('.tool-section');
    
    // Toggle menu móvel
    if (navToggle) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event from bubbling up
            toggleMenu();
        });
        
        // Fechar menu quando clicar fora dele
        document.addEventListener('click', function(e) {
            if (mainNav.classList.contains('mobile-open') && 
                !mainNav.contains(e.target) && 
                e.target !== navToggle) {
                toggleMenu(false);
            }
        });
        
        // Fechar menu quando pressionar ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mainNav.classList.contains('mobile-open')) {
                toggleMenu(false);
            }
        });
        
        // Função auxiliar para alternar estado do menu
        function toggleMenu(forceState) {
            const shouldOpen = forceState !== undefined ? forceState : !mainNav.classList.contains('mobile-open');
            
            if (shouldOpen) {
                mainNav.classList.add('mobile-open');
                navToggle.setAttribute('aria-expanded', 'true');
                navToggle.innerHTML = '<i class="fas fa-times"></i>';
                document.body.classList.add('menu-open'); // Usar classe para controle
            } else {
                mainNav.classList.remove('mobile-open');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.classList.remove('menu-open');
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
            
            // Restaurar o estado da página após a navegação
            document.body.classList.remove('menu-open');
            
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
                navigateToSection(targetId);
            }
            
            if (window.innerWidth <= 992 && typeof toggleMenu === 'function') {
                toggleMenu(false);
            }
            
            // Adicionar classe ativa ao link clicado
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Atualizar card móvel correspondente, se existir
            if (href && href.startsWith('#')) {
                // O ID do alvo não está sendo usado atualmente
                mobileNavCards.forEach(card => {
                    card.classList.remove('active');
                    if (card.getAttribute('href') === href) {
                        card.classList.add('active');
                    }
                });
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
        const hash = window.location.hash;
        if (hash) {
            const targetId = hash.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection && targetSection.classList.contains('tool-section')) {
                // Atualizar classes ativas
                sections.forEach(section => section.classList.remove('active'));
                targetSection.classList.add('active');
                
                // Atualizar navegação
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === hash);
                });
                
                mobileNavCards.forEach(card => {
                    card.classList.toggle('active', card.getAttribute('href') === hash);
                });
                
                // Rolar para a seção após um breve atraso para garantir que tudo carregou
                setTimeout(() => {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }, 300);
            }
        }
    }
    
    // Executar verificação de hash após carregamento
    checkUrlHash();
    
    // Adicionar classe CSS para estilizar elementos ativos
    document.documentElement.style.setProperty('--header-height', document.querySelector('header').offsetHeight + 'px');
});
