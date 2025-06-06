/**
 * Moz Doctor Dose - Aprimoramentos de Formulários
 * Adiciona interatividade e feedback visual aos formulários
 */

// Esperar um tempo antes de inicializar para que os scripts originais carreguem primeiro
setTimeout(function() {
    // Adiciona classes de animação aos elementos do formulário
    initFormAnimations();
    
    // Adiciona efeitos visuais básicos sem interferir nos eventos originais
    safeEnhanceFormVisuals();
    
    // Melhora botões e interações de forma segura
    safeEnhanceButtons();
    
    // Adiciona feedback visual para resultados
    enhanceResults();
}, 500);

/**
 * Adiciona classes de animação aos elementos do formulário sem interferir nos eventos
 */
function initFormAnimations() {
    // Adiciona animações sequenciais aos grupos de formulário
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        // Limita o atraso a 5 elementos para que não fique muito lento
        const delay = Math.min(index, 4) * 100;
        group.classList.add('animate-fade-in');
        group.style.animationDelay = `${delay}ms`;
    });
}

/**
 * Adiciona efeitos visuais básicos sem interferir nos formulários originais
 */
function safeEnhanceFormVisuals() {
    // Adiciona indicadores visuais para campos obrigatórios sem adicionar eventos
    const requiredInputs = document.querySelectorAll('input[required], select[required]');
    requiredInputs.forEach(input => {
        // Adiciona um asterisco ao label correspondente
        const label = input.previousElementSibling;
        if (label && label.tagName === 'LABEL') {
            if (!label.innerHTML.includes('*')) {
                label.innerHTML += ' <span class="required">*</span>';
            }
        }
        
        // Evitamos adicionar eventos de blur/focus que interferem com a lógica original
    });
    
    // NÃO adiciona eventos aos campos de entrada que podem interferir com a funcionalidade original
    // Especialmente importante para os selects de medicamentos
    
    // Adicionamos apenas classes CSS para destaque visual
    document.querySelectorAll('#medicamento, #indicacao, #via').forEach(select => {
        select.classList.add('select-enhanced');
    });
}

/**
 * Aplica estilo visual simples para um campo válido/inválido
 * Não usado ativamente para não interferir com a lógica original
 */
function styleFieldValidity(field, isValid) {
    if (isValid) {
        field.classList.remove('invalid');
        field.classList.add('valid');
    } else {
        field.classList.remove('valid');
        field.classList.add('invalid');
    }
}

/**
 * Melhora botões e interações de forma segura
 */
function safeEnhanceButtons() {
    // Melhora apenas a acessibilidade dos botões, sem adicionar eventos de clique
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        // Garante que todos os botões tenham role="button" se não forem <button>
        if (button.tagName !== 'BUTTON' && !button.hasAttribute('role')) {
            button.setAttribute('role', 'button');
        }
        
        // Evitamos adicionar event listeners que possam interferir com os scripts originais
        // Isso foi identificado como uma causa de problemas
    });
    
    // Deixamos os botões de calcular e limpar sem modificações
    // Estes botões são críticos para o funcionamento da calculadora
}

/**
 * Adiciona simples efeitos visuais aos resultados sem usar observers
 * para evitar conflitos com a funcionalidade original
 */
function enhanceResults() {
    // Em vez de usar MutationObserver, apenas aplicamos classes CSS estáticas
    // aos elementos de resultado existentes
    const resultCards = document.querySelectorAll('.result-card, .result-item');
    resultCards.forEach(card => {
        card.classList.add('result-enhanced');
    });
    
    // Adicionamos uma classe também aos containers para estilização por CSS
    const resultContainers = document.querySelectorAll('.result-container, .results-area');
    resultContainers.forEach(container => {
        container.classList.add('results-container-enhanced');
    });
}
