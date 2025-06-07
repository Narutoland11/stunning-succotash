/**
 * Inicialização e integração dos novos medicamentos
 * Este arquivo gerencia a adição de todos os novos medicamentos ao banco de dados
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando novos medicamentos...');
    
    try {
        // Verificar se o objeto MEDICAMENTOS existe
        if (typeof MEDICAMENTOS !== 'undefined') {
            // Chamar as funções de adição de medicamentos
            if (typeof adicionarNovosMedicamentos === 'function') {
                adicionarNovosMedicamentos();
            } else {
                console.warn('Função adicionarNovosMedicamentos não encontrada');
            }
            
            if (typeof adicionarMaisMedicamentos === 'function') {
                adicionarMaisMedicamentos();
            } else {
                console.warn('Função adicionarMaisMedicamentos não encontrada');
            }
            
            if (typeof adicionarMedicamentosParte3 === 'function') {
                adicionarMedicamentosParte3();
            } else {
                console.warn('Função adicionarMedicamentosParte3 não encontrada');
            }
            
            // Carregar os novos antiepiléticos/anticonvulsivantes
            if (typeof adicionarAntiepilepticosParte1 === 'function') {
                adicionarAntiepilepticosParte1();
                console.log('Antiepiléticos parte 1 carregados');
            } else {
                console.warn('Função adicionarAntiepilepticosParte1 não encontrada');
            }
            
            if (typeof adicionarAntiepilepticosParte2 === 'function') {
                adicionarAntiepilepticosParte2();
                console.log('Antiepiléticos parte 2 carregados');
            } else {
                console.warn('Função adicionarAntiepilepticosParte2 não encontrada');
            }
            
            if (typeof adicionarAntiepilepticosParte3 === 'function') {
                adicionarAntiepilepticosParte3();
                console.log('Antiepiléticos parte 3 carregados');
            } else {
                console.warn('Função adicionarAntiepilepticosParte3 não encontrada');
            }
            
            // Medicamentos carregados silenciosamente sem exibir notificação ao usuário
            
            console.log('Total de medicamentos disponíveis:', Object.keys(MEDICAMENTOS).length);
        } else {
            console.error('Erro: O objeto MEDICAMENTOS não foi encontrado. Verifique se medicamentos.js está sendo carregado antes deste arquivo.');
        }
    } catch (error) {
        console.error('Erro ao inicializar novos medicamentos:', error);
        
        // Tentar exibir alerta de erro usando o novo sistema, ou console como fallback
        if (typeof ALERTA_SISTEMA !== 'undefined') {
            ALERTA_SISTEMA.perigo('Erro ao carregar medicamentos adicionais. Consulte o console para mais detalhes.', {
                duracao: ALERTA_SISTEMA.duracoes.longo,
                fechavel: true
            });
        }
    }
});
