/**
 * Utilities for medicamentos module
 * Contains shared functions to eliminate code duplication
 */

// Global initialization functions
function verificarObjetosGlobais() {
    if (typeof window.MEDICAMENTOS === 'undefined' || Object.keys(window.MEDICAMENTOS).length === 0) {
        console.warn("Criando objeto MEDICAMENTOS que não existia ou estava vazio");
        window.MEDICAMENTOS = {};
    }
    
    if (typeof window.INDICACOES === 'undefined' || Object.keys(window.INDICACOES).length === 0) {
        console.warn("Criando objeto INDICACOES que não existia ou estava vazio");
        window.INDICACOES = {};
    }
    
    if (typeof window.VIAS === 'undefined' || Object.keys(window.VIAS).length === 0) {
        console.warn("Criando objeto VIAS que não existia ou estava vazio");
        window.VIAS = {};
    }
    
    // Garantir que os objetos estejam disponíveis no escopo global
    if (typeof MEDICAMENTOS === 'undefined' || typeof window.MEDICAMENTOS === 'undefined') {
        window.MEDICAMENTOS = window.MEDICAMENTOS || {};
    }
    
    if (typeof INDICACOES === 'undefined' || typeof window.INDICACOES === 'undefined') {
        window.INDICACOES = window.INDICACOES || {};
    }
    
    if (typeof VIAS === 'undefined' || typeof window.VIAS === 'undefined') {
        window.VIAS = window.VIAS || {};
    }
    
    // Adicionar vias padrão se não existirem
    if (typeof window.VIAS !== 'undefined') {
        if (!window.VIAS.oral) window.VIAS.oral = "Via Oral";
        if (!window.VIAS.iv) window.VIAS.iv = "Intravenoso";
    }
    
    console.log('Objetos globais verificados e inicializados com sucesso');
    return window.MEDICAMENTOS;
}

// UI update functions
function atualizarContadoresInterface() {
    try {
        // Verificar se o objeto existe
        const MEDICAMENTOS = verificarObjetosGlobais();
        
        // Calcular contagem
        const total = Object.keys(MEDICAMENTOS).length;
        console.log(`Total de medicamentos: ${total}`);
        
        // Atualizar elementos na interface
        const elementosContagem = document.querySelectorAll('.total-medicamentos, #total-medicamentos, [data-medicamentos-count]');
        elementosContagem.forEach(elem => {
            if (elem) {
                elem.textContent = total;
                console.log('Elemento de contagem atualizado:', elem);
            }
        });
        
        // Executar análise de medicamentos se disponível
        if (typeof window.analisarMedicamentos === 'function') {
            console.log('Executando análise de medicamentos...');
            const stats = window.analisarMedicamentos();
            
            // Atualizar estatísticas na interface
            if (typeof window.atualizarEstatisticasInterface === 'function') {
                window.atualizarEstatisticasInterface(stats);
                console.log('Interface de estatísticas atualizada');
            }
            
            // Avisar sobre a atualização
            if (typeof window.ALERTA_SISTEMA !== 'undefined') {
                window.ALERTA_SISTEMA.sucesso(`Base de medicamentos atualizada! Total de ${total} medicamentos disponíveis.`, {
                    duracao: 8000,
                    fechavel: true
                });
            }
        }
        
        // Forçar atualização do seletor de medicamentos, se existir
        atualizarSeletorMedicamentos();
        
        return total;
    } catch (error) {
        console.error('Erro ao atualizar contagem:', error);
        return 0;
    }
}

// Function to update medication selectors
function atualizarSeletorMedicamentos() {
    if (typeof window.atualizarSeletorMedicamentos === 'function') {
        window.atualizarSeletorMedicamentos();
        console.log('Seletor de medicamentos atualizado');
        return true;
    } else if (typeof window.inicializarSeletorMedicamentos === 'function') {
        window.inicializarSeletorMedicamentos();
        console.log('Seletor de medicamentos inicializado');
        return true;
    }
    return false;
}

// Função para adicionar medicamento ao objeto global
function adicionarMedicamento(chave, definicao) {
    try {
        const MEDICAMENTOS = verificarObjetosGlobais();
        
        // Adicionar medicamento ao objeto global
        MEDICAMENTOS[chave] = definicao;
        
        console.log(`Medicamento ${definicao.nome} adicionado com sucesso!`);
        return true;
    } catch (error) {
        console.error(`Erro ao adicionar medicamento ${chave}:`, error);
        return false;
    }
}

// Exportar funções para uso global
window.utils = {
    verificarObjetosGlobais,
    atualizarContadoresInterface,
    atualizarSeletorMedicamentos,
    adicionarMedicamento
};
