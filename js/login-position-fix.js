// Script para posicionar o botão de login no canto superior direito
document.addEventListener('DOMContentLoaded', function() {
    // Captura os elementos
    const authButtons = document.querySelector('.auth-buttons');
    const loginButton = document.getElementById('login-button');
    const headerContainer = document.querySelector('header .container');
    
    if (headerContainer) {
        // Garantir que o container do cabeçalho tenha position relative
        headerContainer.style.position = 'relative';
    }
    
    if (authButtons) {
        // Posiciona a div auth-buttons no canto superior direito
        authButtons.style.position = 'absolute';
        authButtons.style.top = '1rem';
        authButtons.style.right = '1.5rem';
        authButtons.style.display = 'flex';
        authButtons.style.alignItems = 'center';
        authButtons.style.zIndex = '100';
    }
    
    if (loginButton) {
        // Estiliza o botão de login com design moderno
        loginButton.style.background = '#2563eb';
        loginButton.style.color = '#fff';
        loginButton.style.border = 'none';
        loginButton.style.padding = '0.6rem 1.2rem';
        loginButton.style.borderRadius = '50px';
        loginButton.style.fontWeight = '600';
        loginButton.style.fontSize = '0.9rem';
        loginButton.style.display = 'flex';
        loginButton.style.alignItems = 'center';
        loginButton.style.gap = '0.5rem';
        loginButton.style.transition = 'all 0.3s ease';
        loginButton.style.boxShadow = '0 4px 8px rgba(37, 99, 235, 0.25)';
        loginButton.style.cursor = 'pointer';
        
        // Adiciona efeito de hover
        loginButton.addEventListener('mouseover', function() {
            this.style.background = '#1d4ed8';
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 12px rgba(37, 99, 235, 0.3)';
        });
        
        loginButton.addEventListener('mouseout', function() {
            this.style.background = '#2563eb';
            this.style.transform = 'none';
            this.style.boxShadow = '0 4px 8px rgba(37, 99, 235, 0.25)';
        });
    }
});
