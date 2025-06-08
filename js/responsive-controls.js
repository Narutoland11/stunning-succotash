/**
 * Moz Doctor Dose - Controles Responsivos
 * Gerencia a funcionalidade de toggle para tablet e mobile
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const navToggle = document.getElementById('nav-toggle');
    const mainNav = document.getElementById('main-nav');
    const userMenuButton = document.getElementById('user-menu-button');
    const userDropdown = document.getElementById('user-dropdown');
    
    // Toggle do menu de navegação móvel
    if (navToggle && mainNav) {
        navToggle.addEventListener('click', function() {
            // Toggle da classe para exibir/esconder o menu
            mainNav.classList.toggle('visible');
            navToggle.classList.toggle('active');
            
            // Alternar ícone
            const icon = navToggle.querySelector('i');
            if (icon) {
                if (mainNav.classList.contains('visible')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && 
                !mainNav.contains(event.target) && 
                mainNav.classList.contains('visible')) {
                mainNav.classList.remove('visible');
                navToggle.classList.remove('active');
                
                // Restaurar ícone
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }
    
    // Toggle do menu dropdown de usuário
    if (userMenuButton && userDropdown) {
        // Manipulador de clique no botão do menu do usuário
        userMenuButton.addEventListener('click', function(e) {
            e.stopPropagation();
            userDropdown.classList.toggle('visible');
            
            // Alternar ícone
            const icon = userMenuButton.querySelector('.fa-chevron-down');
            if (icon) {
                if (userDropdown.classList.contains('visible')) {
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                } else {
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                }
            }
        });
        
        // Fechar dropdown ao clicar fora
        document.addEventListener('click', function(event) {
            if (!userMenuButton.contains(event.target) && 
                userDropdown.classList.contains('visible')) {
                userDropdown.classList.remove('visible');
                
                // Restaurar ícone
                const icon = userMenuButton.querySelector('i:last-child');
                if (icon) {
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                }
            }
        });
    }
    
    // Lidar com navegação para perfil e configurações
    const menuPerfil = document.getElementById('menu-perfil');
    const menuConfiguracoes = document.getElementById('menu-configuracoes');
    const perfilSection = document.getElementById('perfil');
    const configuracoesSection = document.getElementById('configuracoes');
    const allSections = document.querySelectorAll('.tool-section');
    
    if (menuPerfil && perfilSection) {
        menuPerfil.addEventListener('click', function(e) {
            // Esconder todas as seções
            allSections.forEach(section => section.classList.remove('active'));
            
            // Mostrar seção de perfil
            perfilSection.classList.add('active');
            
            // Fechar dropdown após clicar
            if (userDropdown) userDropdown.classList.remove('visible');
            
            // Atualizar URL e atualizar navegação
            window.location.hash = '#perfil';
        });
    }
    
    if (menuConfiguracoes && configuracoesSection) {
        menuConfiguracoes.addEventListener('click', function(e) {
            // Esconder todas as seções
            allSections.forEach(section => section.classList.remove('active'));
            
            // Mostrar seção de configurações
            configuracoesSection.classList.add('active');
            
            // Fechar dropdown após clicar
            if (userDropdown) userDropdown.classList.remove('visible');
            
            // Atualizar URL e atualizar navegação
            window.location.hash = '#configuracoes';
        });
    }
    
    // Corrigir problema de navegação em dispositivos móveis
    const mobileNavCards = document.querySelectorAll('.mobile-nav-card');
    if (mobileNavCards.length > 0) {
        mobileNavCards.forEach(card => {
            card.addEventListener('click', function(e) {
                const target = this.getAttribute('href');
                if (target) {
                    // Esconder todas as seções
                    allSections.forEach(section => section.classList.remove('active'));
                    
                    // Mostrar seção alvo
                    const targetSection = document.querySelector(target);
                    if (targetSection) targetSection.classList.add('active');
                    
                    // Atualizar classes nas cards
                    mobileNavCards.forEach(c => c.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Fechar menu móvel se estiver aberto
                    if (mainNav && mainNav.classList.contains('visible')) {
                        mainNav.classList.remove('visible');
                        
                        if (navToggle) {
                            navToggle.classList.remove('active');
                            const icon = navToggle.querySelector('i');
                            if (icon) {
                                icon.classList.remove('fa-times');
                                icon.classList.add('fa-bars');
                            }
                        }
                    }
                }
            });
        });
    }
});
