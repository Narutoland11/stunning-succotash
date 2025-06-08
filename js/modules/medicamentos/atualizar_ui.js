/**
 * Script emergencial para forçar atualização da UI e contagem de medicamentos
 * Este arquivo deve ser carregado após todos os outros scripts de medicamentos
 * Versão 2.0 - Refatoração para eliminar duplicações de código
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Iniciando atualização forçada da UI e recontagem de medicamentos...');
    
    // Verificar ou carregar o módulo de utilidades
    verificarUtils(function() {
        // Após garantir que utils está disponível (ou usando alternativas), continuar
        atualizarUICompleta();
    });
});

// Função para verificar e possivelmente carregar o módulo utils
function verificarUtils(callback) {
    if (window.utils) {
        console.log('Módulo utils encontrado!');
        callback();
        return;
    }
    
    console.log('Carregando módulo utils...');
    const script = document.createElement('script');
    script.src = '/js/modules/medicamentos/utils.js';
    script.onload = function() {
        console.log('Módulo utils carregado com sucesso!');
        callback();
    };
    script.onerror = function() {
        console.warn('Não foi possível carregar o módulo utils. Usando funções internas.');
        callback();
    };
    document.head.appendChild(script);
}

// Função principal para atualizar toda a UI
function atualizarUICompleta() {
    setTimeout(function() {
        try {
            // Verificar quais antiepilépticos foram carregados
            const medicamentosKeys = Object.keys(window.MEDICAMENTOS || {});
            const antiEpilepticosDisponiveis = medicamentosKeys.filter(key => 
                ['carbamazepina', 'valproato', 'fenitoina', 'fenobarbital', 
                 'lamotrigina', 'levetiracetam', 'topiramato', 'oxcarbazepina',
                 'clobazam', 'etosuximida'].includes(key)
            );
            
            console.log('Antiepilépticos disponíveis:', antiEpilepticosDisponiveis);
            console.log('Total de medicamentos após adição dos antiepilépticos:', medicamentosKeys.length);
            
            // Usar módulo utils se disponível
            if (window.utils && typeof window.utils.atualizarContadoresInterface === 'function') {
                window.utils.atualizarContadoresInterface();
                
                // Também atualizar o seletor de medicamentos
                if (window.utils && typeof window.utils.atualizarSeletorMedicamentos === 'function') {
                    window.utils.atualizarSeletorMedicamentos();
                }
                
                // Feito!
                console.log('UI atualizada via módulo utils!');
                return;
            }
            
            // Fallback: Forçar recontagem de medicamentos
            if (typeof analisarMedicamentos === 'function') {
                const stats = analisarMedicamentos();
                console.log('Estatísticas atualizadas:', stats);
                
                // Atualizar interface com as estatísticas
                if (typeof atualizarEstatisticasInterface === 'function') {
                    atualizarEstatisticasInterface(stats);
                    console.log('Interface de estatísticas atualizada');
                }
            } else {
                console.warn('Função analisarMedicamentos não disponível');
            }
            
            // Atualizar outros elementos da UI que possam mostrar contagem de medicamentos
            const elementosContagem = document.querySelectorAll('.total-medicamentos, #total-medicamentos, [data-medicamentos-count]');
            elementosContagem.forEach(elem => {
                if (elem) {
                    elem.textContent = medicamentosKeys.length;
                    console.log('Elemento de contagem atualizado:', elem);
                }
            });
            
            // Forçar atualização do seletor de medicamentos, se existir
            if (typeof atualizarSeletorMedicamentos === 'function') {
                atualizarSeletorMedicamentos();
                console.log('Seletor de medicamentos atualizado');
            } else if (typeof inicializarSeletorMedicamentos === 'function') {
                inicializarSeletorMedicamentos();
                console.log('Seletor de medicamentos inicializado');
            }
            
            console.log('UI atualizada com mecanismo alternativo!');
            
        } catch (error) {
            console.error('Erro durante atualização forçada da UI:', error);
        }
    }, 2000); // Esperar 2 segundos para garantir que todos os scripts foram carregados
}
