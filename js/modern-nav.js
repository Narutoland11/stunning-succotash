/**
 * Modern Navigation JavaScript
 * Script para gerenciar a navegação moderna do Moz Doctor Dose
 * Inclui manipulação de toggle, acessibilidade e interações responsivas
 */

document.addEventListener('DOMContentLoaded', function() {
    // Verificar ambiente - útil para debugging
    console.log('Ambiente:', window.location.hostname);
    // Elementos principais da navegação
    const navToggle = document.getElementById('nav-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');
    const userMenuButton = document.getElementById('user-menu-button');
    const userDropdown = document.getElementById('user-dropdown');
    const mobileNavCards = document.querySelectorAll('.mobile-nav-card');
    const toolSections = document.querySelectorAll('.tool-section');
    
    // Função para abrir/fechar menu de navegação móvel
    function toggleMainNav() {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        
        if (isExpanded) {
            // Fechar menu
            mainNav.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.setAttribute('aria-label', 'Abrir menu de navegação');
            navToggle.querySelector('i').classList.remove('fa-times');
            navToggle.querySelector('i').classList.add('fa-bars');
        } else {
            // Abrir menu
            mainNav.classList.add('active');
            navToggle.setAttribute('aria-expanded', 'true');
            navToggle.setAttribute('aria-label', 'Fechar menu de navegação');
            navToggle.querySelector('i').classList.remove('fa-bars');
            navToggle.querySelector('i').classList.add('fa-times');
        }
    }
    
    // Função para alternar dropdown de usuário
    function toggleUserDropdown(event) {
        event.stopPropagation();
        
        const isExpanded = userMenuButton.getAttribute('aria-expanded') === 'true';
        const dropdownToggle = userMenuButton.querySelector('.user-dropdown-toggle');
        
        if (isExpanded) {
            // Fechar dropdown
            userDropdown.style.display = 'none';
            userMenuButton.classList.remove('active');
            dropdownToggle.setAttribute('aria-expanded', 'false');
        } else {
            // Abrir dropdown
            userDropdown.style.display = 'block';
            userMenuButton.classList.add('active');
            dropdownToggle.setAttribute('aria-expanded', 'true');
        }
    }
    
    // Função para ativar a seção correta com base na URL atual
    function activateCurrentSection() {
        // Garantir que haja um hash padrão se nenhum estiver presente
        let hash = window.location.hash || '#doses';
        
        // Verificar se o hash é válido (corresponde a uma seção existente)
        let targetSection = document.querySelector(hash);
        
        // Se o hash não corresponder a uma seção válida, use o padrão '#doses'
        if (!targetSection) {
            hash = '#doses';
            // Atualiza a URL sem recarregar a página
            if (history.pushState) {
                history.pushState(null, null, hash);
            } else {
                window.location.hash = hash;
            }
        }
        
        console.log('Ativando seção:', hash);
        
        // Remover atributos ativos de todos os links e seções
        navLinks.forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        });
        
        if (mobileNavCards) {
            mobileNavCards.forEach(link => {
                link.classList.remove('active');
                link.setAttribute('aria-selected', 'false');
            });
        }
        
        toolSections.forEach(section => section.classList.remove('active'));
        
        // Adicionar atributos ativos ao link e seção correspondentes
        const currentLink = document.querySelector(`.main-nav a[href="${hash}"]`);
        const currentMobileLink = document.querySelector(`.mobile-nav-card[href="${hash}"]`);
        const currentSection = document.querySelector(hash);
        
        if (currentLink) {
            currentLink.classList.add('active');
            currentLink.setAttribute('aria-current', 'page');
            console.log('Link ativado:', currentLink);
        } else {
            console.warn('Link não encontrado para:', hash);
        }
        
        if (currentMobileLink) {
            currentMobileLink.classList.add('active');
            currentMobileLink.setAttribute('aria-selected', 'true');
        }
        
        if (currentSection) {
            currentSection.classList.add('active');
            console.log('Seção ativada:', currentSection.id);
        } else {
            console.warn('Seção não encontrada para:', hash);
        }
        
        // Fechar o menu móvel após clicar em um link (se estiver aberto)
        if (mainNav && mainNav.classList.contains('active')) {
            toggleMainNav();
        }
    }
    
    // Adicionar event listener ao botão de toggle
    if (navToggle) {
        navToggle.addEventListener('click', toggleMainNav);
    }
    
    // Adicionar event listener ao botão de dropdown do usuário
    if (userMenuButton) {
        const dropdownToggle = userMenuButton.querySelector('.user-dropdown-toggle');
        if (dropdownToggle) {
            dropdownToggle.addEventListener('click', toggleUserDropdown);
        }
    }
    
    // Adicionar event listeners aos links de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Impedir comportamento padrão para garantir controle total
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Atualizar URL hash sem recarregar a página
            if (history.pushState) {
                history.pushState(null, null, targetId);
            } else {
                window.location.hash = targetId;
            }
            
            // Ativar seção correspondente
            activateCurrentSection();
            
            // Rolar suavemente até o topo se necessário
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
    
    // Inicializar a seção ativa baseada na URL atual
    setTimeout(function() {
        activateCurrentSection();
        
        // Verificação adicional para garantir que a seção esteja ativa
        const hash = window.location.hash || '#doses';
        const activeSection = document.querySelector('.tool-section.active');
        if (!activeSection) {
            console.log('Forçando ativação da seção padrão devido a problema no deploy');
            const defaultSection = document.querySelector(hash) || document.querySelector('#doses');
            if (defaultSection) defaultSection.classList.add('active');
        }
    }, 100); // Pequeno atraso para garantir que o DOM esteja pronto
    
    // Atualizar a seção quando a URL mudar
    window.addEventListener('hashchange', function(e) {
        e.preventDefault(); // Prevenir comportamento padrão
        console.log('Hash alterado:', window.location.hash);
        activateCurrentSection();
    }, false);
    
    // Fechar dropdown se clicar fora dele
    document.addEventListener('click', function(event) {
        if (userMenuButton && !userMenuButton.contains(event.target)) {
            const dropdownToggle = userMenuButton.querySelector('.user-dropdown-toggle');
            if (dropdownToggle && dropdownToggle.getAttribute('aria-expanded') === 'true') {
                userDropdown.style.display = 'none';
                userMenuButton.classList.remove('active');
                dropdownToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });
    
    // Melhorias para acessibilidade por teclado
    
    // Navegação por teclado no menu principal
    navLinks.forEach(link => {
        link.addEventListener('keydown', function(e) {
            // Enter ou espaço para ativar o link
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Navegação por teclado no dropdown do usuário
    if (userMenuButton) {
        const dropdownItems = userDropdown.querySelectorAll('.user-dropdown-item');
        const dropdownToggle = userMenuButton.querySelector('.user-dropdown-toggle');
        
        if (dropdownToggle) {
            dropdownToggle.addEventListener('keydown', function(e) {
                // Teclas de seta, enter ou espaço
                if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    
                    // Abrir dropdown se fechado
                    if (dropdownToggle.getAttribute('aria-expanded') === 'false') {
                        toggleUserDropdown(e);
                        
                        // Focar no primeiro item
                        if (dropdownItems.length > 0) {
                            dropdownItems[0].focus();
                        }
                    }
                }
            });
        }
        
        // Navegação por teclado dentro do dropdown
        dropdownItems.forEach((item, index) => {
            item.addEventListener('keydown', function(e) {
                switch (e.key) {
                    case 'ArrowDown':
                        e.preventDefault();
                        if (index < dropdownItems.length - 1) {
                            dropdownItems[index + 1].focus();
                        }
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        if (index > 0) {
                            dropdownItems[index - 1].focus();
                        } else {
                            dropdownToggle.focus();
                        }
                        break;
                    case 'Escape':
                        e.preventDefault();
                        toggleUserDropdown(e);
                        dropdownToggle.focus();
                        break;
                }
            });
        });
    }
});
