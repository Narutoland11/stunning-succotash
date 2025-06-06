/**
 * Moz Doctor Dose - Melhorias de Acessibilidade
 * Script para corrigir problemas comuns de acessibilidade detectados
 */

document.addEventListener('DOMContentLoaded', function() {
    // Corrigir botões sem nome acessível
    fixButtonsWithoutAccessibleName();
    
    // Associar labels a elementos de formulário
    associateLabelsWithFormElements();
    
    // Corrigir ordem dos cabeçalhos
    fixHeadingOrder();
    
    /**
     * Adiciona nomes acessíveis a botões que não os possuem
     */
    function fixButtonsWithoutAccessibleName() {
        // Encontrar todos os botões sem texto e sem aria-label
        const buttonsWithoutName = Array.from(document.querySelectorAll('button'))
            .filter(button => {
                const hasText = button.textContent.trim().length > 0;
                const hasAriaLabel = button.hasAttribute('aria-label');
                const hasAriaLabelledBy = button.hasAttribute('aria-labelledby');
                
                return !hasText && !hasAriaLabel && !hasAriaLabelledBy;
            });
        
        // Adicionar aria-label com base no conteúdo ou ícones
        buttonsWithoutName.forEach(button => {
            // Verificar se possui ícone Font Awesome
            const icon = button.querySelector('.fa, .fas, .far, .fal, .fab');
            
            if (icon) {
                // Extrair nome do ícone da classe (ex: fa-search → "Pesquisar")
                const iconClasses = Array.from(icon.classList);
                const iconClass = iconClasses.find(cls => cls.startsWith('fa-'));
                
                if (iconClass) {
                    const iconName = iconClass.replace('fa-', '');
                    const accessibleName = getAccessibleNameFromIconName(iconName);
                    button.setAttribute('aria-label', accessibleName);
                }
            } else {
                // Se não conseguirmos determinar automaticamente, usamos 'Botão'
                button.setAttribute('aria-label', 'Botão');
            }
        });
    }
    
    /**
     * Converte nome de ícone para nome acessível em português
     */
    function getAccessibleNameFromIconName(iconName) {
        const nameMap = {
            'search': 'Pesquisar',
            'user': 'Usuário',
            'home': 'Início',
            'cog': 'Configurações',
            'sun': 'Alternar para modo claro',
            'moon': 'Alternar para modo escuro',
            'adjust': 'Alternar tema automático',
            'bars': 'Menu',
            'times': 'Fechar',
            'chevron-down': 'Expandir',
            'chevron-up': 'Recolher',
            'plus': 'Adicionar',
            'minus': 'Remover',
            'trash': 'Excluir',
            'edit': 'Editar',
            'save': 'Salvar',
            'download': 'Download',
            'upload': 'Upload',
            'sign-out-alt': 'Sair'
        };
        
        return nameMap[iconName] || 'Botão';
    }
    
    /**
     * Associa labels a elementos de formulário que não os possuem
     */
    function associateLabelsWithFormElements() {
        // Encontrar todos os inputs/selects sem label associada
        const formElements = Array.from(document.querySelectorAll('input, select, textarea'))
            .filter(element => {
                // Ignorar inputs escondidos ou botões
                if (element.type === 'hidden' || element.type === 'button' || 
                    element.type === 'submit' || element.type === 'reset') {
                    return false;
                }
                
                // Verificar se já possui label associada
                const id = element.id;
                if (!id) return true; // Sem ID não pode ter label associada
                
                const hasLabel = document.querySelector(`label[for="${id}"]`);
                return !hasLabel;
            });
        
        // Para cada elemento sem label, criar uma label baseada no placeholder ou nome
        formElements.forEach(element => {
            // Se não tiver ID, criar um único
            if (!element.id) {
                element.id = `form-element-${Math.random().toString(36).substring(2, 10)}`;
            }
            
            // Determinar texto da label
            let labelText = '';
            if (element.placeholder) {
                labelText = element.placeholder;
            } else if (element.name) {
                // Converter name em texto legível (ex: user_name → "Nome de usuário")
                labelText = element.name
                    .replace(/_/g, ' ')
                    .replace(/([A-Z])/g, ' $1')
                    .toLowerCase()
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
            } else {
                // Último recurso
                labelText = `Campo ${Math.floor(Math.random() * 1000)}`;
            }
            
            // Criar e adicionar label antes do elemento
            const label = document.createElement('label');
            label.setAttribute('for', element.id);
            label.textContent = labelText;
            
            // Verificar se o elemento está num container
            const parent = element.parentElement;
            parent.insertBefore(label, element);
            
            // Adicionar classe para estilos
            label.classList.add('auto-generated-label');
        });
    }
    
    /**
     * Corrige a ordem dos cabeçalhos para seguir hierarquia correta
     */
    function fixHeadingOrder() {
        // Encontrar todos os cabeçalhos na página
        const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
        
        // Verificar se temos pelo menos um h1
        const hasH1 = headings.some(h => h.tagName === 'H1');
        if (!hasH1 && headings.length > 0) {
            // Converter o primeiro cabeçalho encontrado em H1
            const firstHeading = headings[0];
            const newH1 = document.createElement('h1');
            newH1.innerHTML = firstHeading.innerHTML;
            newH1.className = firstHeading.className;
            newH1.id = firstHeading.id;
            
            firstHeading.parentNode.replaceChild(newH1, firstHeading);
        }
        
        // Não vamos alterar outros cabeçalhos automaticamente para não quebrar a semântica existente,
        // mas podemos adicionar um aria-level para melhorar a experiência de leitores de tela
        let lastHeadingLevel = 0;
        
        headings.forEach(heading => {
            const currentLevel = parseInt(heading.tagName.substring(1));
            
            // Se pular níveis (ex: H1 para H3, sem H2)
            if (currentLevel > lastHeadingLevel + 1) {
                heading.setAttribute('aria-level', lastHeadingLevel + 1);
            } else {
                lastHeadingLevel = currentLevel;
            }
        });
    }
});
