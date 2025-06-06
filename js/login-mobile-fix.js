/**
 * Correções adicionais para comportamento em dispositivos móveis
 * Este script complementa o login-unified.js com foco em melhorias específicas 
 * para dispositivos móveis e orientação de tela
 */

document.addEventListener('DOMContentLoaded', function() {
    // Cache dos elementos necessários
    const loginContainer = document.getElementById('login-container');
    const loginPanel = document.querySelector('.login-panel');
    const navToggle = document.getElementById('nav-toggle');
    const mainNav = document.getElementById('main-nav');
    const authButtons = document.querySelector('.auth-buttons');
    
    // Função para ajustar a posição do container de autenticação em dispositivos móveis
    function adjustAuthPosition() {
        if (!authButtons) return;
        
        const windowWidth = window.innerWidth;
        const headerContainer = document.querySelector('header .container');
        
        if (windowWidth <= 480) {
            // Em telas muito pequenas, posicionar os botões de auth diferentemente
            if (headerContainer) {
                headerContainer.style.position = 'relative';
            }
            
            authButtons.style.position = 'absolute';
            authButtons.style.top = '0.5rem';
            authButtons.style.right = '3.5rem'; // Espaço para o botão de menu
        } else if (windowWidth <= 768) {
            // Em tablets e telas médias
            if (headerContainer) {
                headerContainer.style.position = 'relative';
            }
            
            authButtons.style.position = 'absolute';
            authButtons.style.top = '1rem';
            authButtons.style.right = '4rem';
        } else {
            // Em desktop
            authButtons.style.position = 'absolute';
            authButtons.style.top = '1rem';
            authButtons.style.right = '1.5rem';
        }
    }
    
    // Ajustar o posicionamento do painel de login em diferentes tamanhos de tela
    function adjustLoginPanel() {
        if (!loginPanel) return;
        
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        if (windowWidth <= 480) {
            // Para telas muito pequenas
            loginPanel.style.width = '95%';
            loginPanel.style.maxWidth = '100%';
            loginPanel.style.padding = '1.25rem';
            
            // Se a altura for pequena (modo paisagem em celular)
            if (windowHeight < 500) {
                loginPanel.style.maxHeight = '90vh';
                loginPanel.style.overflowY = 'auto';
            }
        } else if (windowWidth <= 768) {
            // Para tablets
            loginPanel.style.width = '90%';
            loginPanel.style.maxWidth = '450px';
            loginPanel.style.padding = '1.5rem';
        } else {
            // Para desktop
            loginPanel.style.width = '90%';
            loginPanel.style.maxWidth = '420px';
            loginPanel.style.padding = '2rem';
        }
    }
    
    // Tratamento especial para quando o teclado virtual é aberto em dispositivos móveis
    function handleVirtualKeyboard() {
        if (!loginContainer || !loginPanel) return;
        
        const inputs = loginPanel.querySelectorAll('input');
        if (!inputs.length) return;
        
        // Em dispositivos móveis, quando um campo recebe foco, o teclado virtual pode abrir
        // e redimensionar a viewport, causando problemas de layout
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                if (window.innerWidth <= 768) {
                    // Pequeno ajuste para garantir que o formulário permaneça visível
                    setTimeout(() => {
                        loginPanel.style.transform = 'translateY(0)';
                        window.scrollTo(0, 0);
                    }, 300);
                }
            });
            
            input.addEventListener('blur', function() {
                if (window.innerWidth <= 768) {
                    // Restaurar o posicionamento normal
                    setTimeout(() => {
                        loginPanel.style.transform = '';
                    }, 100);
                }
            });
        });
    }
    
    // Melhorar interação entre menu toggle e login em dispositivos móveis
    function enhanceMenuToggleInteraction() {
        if (!navToggle || !mainNav || !loginContainer) return;
        
        // Se o menu estiver aberto quando o usuário clicar em login, fechar o menu
        const loginButton = document.getElementById('login-button');
        if (loginButton) {
            loginButton.addEventListener('click', function() {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            });
        }
        
        // Fechar login ao pressionar Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && loginContainer.classList.contains('active')) {
                // Verificar se temos função closeLoginModal disponível
                if (typeof closeLoginModal === 'function') {
                    closeLoginModal();
                } else {
                    loginContainer.classList.remove('active');
                }
            }
        });
    }
    
    // Executar as funções
    adjustAuthPosition();
    adjustLoginPanel();
    handleVirtualKeyboard();
    enhanceMenuToggleInteraction();
    
    // Reajustar quando o tamanho da tela mudar
    window.addEventListener('resize', function() {
        adjustAuthPosition();
        adjustLoginPanel();
    });
    
    // Reajustar quando a orientação do dispositivo mudar
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            adjustAuthPosition();
            adjustLoginPanel();
        }, 200);
    });
    
    console.log('Melhorias específicas para dispositivos móveis aplicadas ao login');
});
