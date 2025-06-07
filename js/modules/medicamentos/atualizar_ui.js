/**
 * Script emergencial para forçar atualização da UI e contagem de medicamentos
 * Este arquivo deve ser carregado após todos os outros scripts de medicamentos
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Iniciando atualização forçada da UI e recontagem de medicamentos...');
    
    // Função para aguardar carregamento completo de todos os scripts
    setTimeout(function() {
        try {
            // Verificar quais antiepilépticos foram carregados
            const medicamentosKeys = Object.keys(MEDICAMENTOS || {});
            const antiEpilepticosDisponiveis = medicamentosKeys.filter(key => 
                ['carbamazepina', 'valproato', 'fenitoina', 'fenobarbital', 
                 'lamotrigina', 'levetiracetam', 'topiramato', 'oxcarbazepina',
                 'clobazam', 'etosuximida'].includes(key)
            );
            
            console.log('Antiepilépticos disponíveis:', antiEpilepticosDisponiveis);
            console.log('Total de medicamentos após adição dos antiepilépticos:', medicamentosKeys.length);
            
            // Forçar recontagem de medicamentos
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
            const elementosContagem = document.querySelectorAll('.total-medicamentos, #total-medicamentos');
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
            
            // Banco de dados atualizado silenciosamente sem exibir notificações
            // console.log('Banco de dados de medicamentos atualizado: ' + medicamentosKeys.length + ' medicamentos disponíveis');
            
        } catch (error) {
            console.error('Erro durante atualização forçada da UI:', error);
        }
    }, 2000); // Esperar 2 segundos para garantir que todos os scripts foram carregados
});
