/**
 * Moz Doctor Dose - Script para gerenciamento do modo escuro
 * Gerencia a alternância entre tema claro e escuro, salvando a preferência do usuário
 */

document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    const icon = darkModeToggle.querySelector('i');
    
    // Verifica a preferência do usuário salva no localStorage
    const darkModePreference = localStorage.getItem('darkMode');
    
    // Verifica preferência de tema do sistema
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Função para ativar o modo escuro
    function enableDarkMode() {
        body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('darkMode', 'enabled');
    }
    
    // Função para desativar o modo escuro
    function disableDarkMode() {
        body.classList.remove('dark-mode');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('darkMode', 'disabled');
    }
    
    // Inicialização com base na preferência salva ou preferência do sistema
    if (darkModePreference === 'enabled') {
        enableDarkMode();
    } else if (darkModePreference === 'disabled') {
        disableDarkMode();
    } else if (prefersDarkMode) {
        // Se não houver preferência salva, use a preferência do sistema
        enableDarkMode();
    }
    
    // Adiciona manipulador de eventos ao botão
    darkModeToggle.addEventListener('click', function() {
        // Verifica se o modo escuro está ativado
        if (body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });
    
    // Adiciona detecção de mudança na preferência do sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        // Só altera automaticamente se o usuário não tiver definido uma preferência
        if (!localStorage.getItem('darkMode')) {
            if (e.matches) {
                enableDarkMode();
            } else {
                disableDarkMode();
            }
        }
    });
});
