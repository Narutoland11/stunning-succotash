/**
 * Script dedicado para estilização e posicionamento do botão de login
 * Este script será executado quando a página estiver totalmente carregada
 */

// Executa quando a página está completamente carregada, incluindo todos os recursos
window.addEventListener('load', function() {
    console.log("Login styling script loaded");
    applyLoginButtonStyling();
});

// Também tenta aplicar os estilos quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded - attempting early styling");
    applyLoginButtonStyling();
    
    // Tenta novamente após um breve intervalo para garantir que outros scripts não sobrescrevam
    setTimeout(applyLoginButtonStyling, 100);
    setTimeout(applyLoginButtonStyling, 500);
    setTimeout(applyLoginButtonStyling, 1000);
});

// Função principal de estilização
function applyLoginButtonStyling() {
    console.log("Applying login button styling");
    
    // Captura os elementos
    const authButtons = document.querySelector('.auth-buttons');
    const loginButton = document.getElementById('login-button');
    const headerContainer = document.querySelector('header .container');
    
    console.log("Auth buttons:", authButtons);
    console.log("Login button:", loginButton);
    
    if (headerContainer) {
        console.log("Styling header container");
        // Garantir posicionamento relativo para o container do cabeçalho
        headerContainer.style.position = 'relative';
    }
    
    if (authButtons) {
        console.log("Styling auth buttons container");
        // Forçar posicionamento absoluto no canto superior direito
        Object.assign(authButtons.style, {
            position: 'absolute',
            top: '1rem',
            right: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            zIndex: '9999'
        });
    }
    
    if (loginButton) {
        console.log("Styling login button");
        // Aplicar estilo moderno ao botão
        Object.assign(loginButton.style, {
            background: '#2563eb',
            color: 'white',
            border: 'none',
            padding: '0.6rem 1.2rem',
            borderRadius: '50px',
            fontWeight: '600',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 4px 8px rgba(37, 99, 235, 0.25)',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
        });
        
        // Adicionar eventos de hover
        loginButton.addEventListener('mouseenter', function() {
            this.style.background = '#1d4ed8';
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 12px rgba(37, 99, 235, 0.3)';
        });
        
        loginButton.addEventListener('mouseleave', function() {
            this.style.background = '#2563eb';
            this.style.transform = '';
            this.style.boxShadow = '0 4px 8px rgba(37, 99, 235, 0.25)';
        });
    } else {
        console.warn("Login button not found");
    }
    
    // Backup: tente encontrar o botão com seletor de classe
    const loginButtonByClass = document.querySelector('.login-button');
    if (loginButtonByClass && loginButtonByClass !== loginButton) {
        console.log("Found login button by class");
        // Aplicar o mesmo estilo
        Object.assign(loginButtonByClass.style, {
            background: '#2563eb',
            color: 'white',
            border: 'none',
            padding: '0.6rem 1.2rem',
            borderRadius: '50px',
            fontWeight: '600',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 4px 8px rgba(37, 99, 235, 0.25)',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
        });
        
        // Adicionar eventos de hover
        loginButtonByClass.addEventListener('mouseenter', function() {
            this.style.background = '#1d4ed8';
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 12px rgba(37, 99, 235, 0.3)';
        });
        
        loginButtonByClass.addEventListener('mouseleave', function() {
            this.style.background = '#2563eb';
            this.style.transform = '';
            this.style.boxShadow = '0 4px 8px rgba(37, 99, 235, 0.25)';
        });
    }
}
