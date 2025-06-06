/**
 * Moz Doctor Dose - Theme Switcher
 * Gerenciador de troca entre tema claro e escuro
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Verificar configuração salva
    const currentTheme = localStorage.getItem('theme');
    
    // Aplicar tema inicial baseado na preferência salva ou do sistema
    if (currentTheme) {
        document.body.classList.toggle('dark-mode', currentTheme === 'dark');
        document.body.classList.toggle('theme-auto', currentTheme === 'auto');
        updateThemeIcon(currentTheme);
    } else {
        // Se não houver tema salvo, usar modo automático
        document.body.classList.add('theme-auto');
        localStorage.setItem('theme', 'auto');
        updateThemeIcon('auto');
    }
    
    // Configurar evento de clique no botão de alternar tema
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentSetting = localStorage.getItem('theme') || 'auto';
            let newTheme;
            
            // Ciclo: light -> dark -> auto (sistema) -> light
            switch (currentSetting) {
                case 'light':
                    newTheme = 'dark';
                    document.body.classList.remove('theme-auto');
                    document.body.classList.add('dark-mode');
                    break;
                    
                case 'dark':
                    newTheme = 'auto';
                    document.body.classList.remove('dark-mode');
                    document.body.classList.add('theme-auto');
                    break;
                    
                case 'auto':
                default:
                    newTheme = 'light';
                    document.body.classList.remove('theme-auto', 'dark-mode');
                    break;
            }
            
            // Atualizar ícone e salvar configuração
            updateThemeIcon(newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Disparar evento para componentes que precisam saber sobre a mudança de tema
            document.dispatchEvent(new CustomEvent('themeChanged', { 
                detail: { theme: newTheme } 
            }));
        });
    }
    
    // Atualizar ícone do botão de tema
    function updateThemeIcon(theme) {
        if (!themeToggle) return;
        
        const iconElement = themeToggle.querySelector('i') || themeToggle;
        
        // Remover todas as classes existentes de ícones
        iconElement.className = iconElement.className.replace(/fa-[^\s]+/, '');
        
        // Adicionar nova classe de ícone
        switch (theme) {
            case 'light':
                iconElement.classList.add('fas', 'fa-sun');
                themeToggle.setAttribute('title', 'Modo claro');
                break;
                
            case 'dark':
                iconElement.classList.add('fas', 'fa-moon');
                themeToggle.setAttribute('title', 'Modo escuro');
                break;
                
            case 'auto':
                iconElement.classList.add('fas', 'fa-adjust');
                themeToggle.setAttribute('title', 'Modo automático (preferência do sistema)');
                break;
        }
    }
    
    // Responder a mudanças na preferência do sistema
    prefersDarkScheme.addEventListener('change', function(event) {
        if (document.body.classList.contains('theme-auto')) {
            // Atualizar apenas se estiver no modo automático
            updateSystemPreference(event.matches);
        }
    });
    
    // Aplicar preferência do sistema quando no modo automático
    function updateSystemPreference(isDark) {
        if (document.body.classList.contains('theme-auto')) {
            document.body.classList.toggle('dark-mode', isDark);
        }
    }
});
