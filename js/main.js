/**
 * Moz Doctor Dose - Script Principal
 * Gerencia a navegação entre seções e inicialização geral do aplicativo
 */

document.addEventListener('DOMContentLoaded', function() {
    // Gerenciar navegação entre seções
    const navLinks = document.querySelectorAll('nav a');
    const toolSections = document.querySelectorAll('.tool-section');
    
    // Função para ativar a seção correta com base na URL atual
    function activateCurrentSection() {
        const hash = window.location.hash || '#doses';
        
        // Remover classe ativa de todos os links e seções
        navLinks.forEach(link => link.classList.remove('active'));
        toolSections.forEach(section => section.classList.remove('active'));
        
        // Adicionar classe ativa ao link e seção correspondentes
        const currentLink = document.querySelector(`nav a[href="${hash}"]`);
        const currentSection = document.querySelector(hash);
        
        if (currentLink) currentLink.classList.add('active');
        if (currentSection) currentSection.classList.add('active');
        
        // Fechar o menu móvel após clicar em um link (se estiver aberto)
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            
            // Reset o ícone do botão de menu
            const menuIcon = document.querySelector('#mobile-menu-toggle i');
            if (menuIcon) {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        }
    }
    
    // Ativar navegação por hash na URL
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Deixe o navegador lidar com a navegação por âncora
            // mas adicione classe ativa imediatamente para feedback visual
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            toolSections.forEach(section => section.classList.remove('active'));
            const targetSection = document.querySelector(this.getAttribute('href'));
            if (targetSection) targetSection.classList.add('active');
        });
    });
    
    // Inicialize a seção atual com base na URL
    activateCurrentSection();
    
    // Atualizar a seção ativa quando a URL muda (navegação por histórico)
    window.addEventListener('hashchange', activateCurrentSection);
    
    // Inicialização de componentes adicionais conforme necessário
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
