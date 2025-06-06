/**
 * Script de diagnóstico para identificar e corrigir problemas com medicamentos antiepilépticos
 */

// Executar diagnóstico quando a página estiver totalmente carregada
window.addEventListener('load', function() {
    console.log('=== INÍCIO DO DIAGNÓSTICO DE MEDICAMENTOS ===');
    
    // Aguardar para garantir que todos os scripts foram carregados
    setTimeout(function() {
        try {
            // 1. Verificar se o objeto MEDICAMENTOS existe
            if (typeof MEDICAMENTOS !== 'undefined') {
                const medicamentosKeys = Object.keys(MEDICAMENTOS);
                console.log(`Total de medicamentos encontrados: ${medicamentosKeys.length}`);
                
                // 2. Verificar se os antiepilépticos foram adicionados
                const antiEpilepticsToCheck = [
                    'carbamazepina', 'valproato', 'fenitoina', 
                    'fenobarbital', 'lamotrigina', 'levetiracetam', 
                    'topiramato', 'oxcarbazepina', 'clobazam', 'etosuximida'
                ];
                
                const existingAntiEpileptics = antiEpilepticsToCheck.filter(med => 
                    MEDICAMENTOS[med] !== undefined
                );
                
                console.log(`Antiepilépticos encontrados (${existingAntiEpileptics.length}/${antiEpilepticsToCheck.length}):`, existingAntiEpileptics);
                
                // 3. Se não encontrar algum, tentar adicionar manualmente
                if (existingAntiEpileptics.length < antiEpilepticsToCheck.length) {
                    console.log('Tentando adicionar antiepilépticos manualmente...');
                    
                    // Verificar se as funções de adição existem e executá-las
                    if (typeof adicionarAntiepilepticosParte1 === 'function') {
                        console.log('Executando adicionarAntiepilepticosParte1()...');
                        adicionarAntiepilepticosParte1();
                    } else {
                        console.error('Função adicionarAntiepilepticosParte1 não encontrada');
                    }
                    
                    if (typeof adicionarAntiepilepticosParte2 === 'function') {
                        console.log('Executando adicionarAntiepilepticosParte2()...');
                        adicionarAntiepilepticosParte2();
                    } else {
                        console.error('Função adicionarAntiepilepticosParte2 não encontrada');
                    }
                    
                    if (typeof adicionarAntiepilepticosParte3 === 'function') {
                        console.log('Executando adicionarAntiepilepticosParte3()...');
                        adicionarAntiepilepticosParte3();
                    } else {
                        console.error('Função adicionarAntiepilepticosParte3 não encontrada');
                    }
                    
                    // Verificar novamente após adicionar
                    const updatedKeys = Object.keys(MEDICAMENTOS);
                    console.log(`Total de medicamentos após adição manual: ${updatedKeys.length}`);
                    
                    // Verificar novamente os antiepilépticos
                    const updatedAntiEpileptics = antiEpilepticsToCheck.filter(med => 
                        MEDICAMENTOS[med] !== undefined
                    );
                    
                    console.log(`Antiepilépticos após correção: ${updatedAntiEpileptics.length}/${antiEpilepticsToCheck.length}`);
                    
                    // 4. Forçar atualização da interface
                    if (typeof contarMedicamentos === 'function') {
                        console.log('Forçando recontagem de medicamentos...');
                        contarMedicamentos();
                    }
                    
                    // 5. Atualizar diretamente os elementos HTML
                    document.querySelectorAll('.total-medicamentos, #total-medicamentos, [data-medicamentos-count]').forEach(elem => {
                        if (elem) {
                            elem.textContent = updatedKeys.length;
                            elem.setAttribute('data-updated', 'true');
                            console.log('Elemento de contagem atualizado diretamente:', elem);
                        }
                    });
                    
                    // 6. Exibir alerta sobre correção
                    if (typeof ALERTA_SISTEMA !== 'undefined') {
                        ALERTA_SISTEMA.sucesso(`Correção aplicada! ${updatedKeys.length} medicamentos disponíveis agora, incluindo ${updatedAntiEpileptics.length} antiepilépticos.`, {
                            duracao: 10000,
                            fechavel: true
                        });
                    }
                }
                
                // 7. Verificar a função analisarMedicamentos
                if (typeof analisarMedicamentos === 'function') {
                    // Criar uma versão corrigida da função analisarMedicamentos
                    console.log('Substituindo função analisarMedicamentos com versão corrigida...');
                    window.analisarMedicamentosOriginal = analisarMedicamentos;
                    
                    window.analisarMedicamentos = function() {
                        console.log('Função analisarMedicamentos corrigida em execução...');
                        // Verificar se o objeto MEDICAMENTOS existe
                        if (typeof MEDICAMENTOS === 'undefined') {
                            console.error('Erro: Objeto MEDICAMENTOS não definido.');
                            return {
                                total: 0,
                                porVia: {},
                                possuiIndicacoes: 0,
                                categorias: {}
                            };
                        }
                        
                        try {
                            const medicamentosKeys = Object.keys(MEDICAMENTOS);
                            const totalMedicamentos = medicamentosKeys.length;
                            
                            // Estatísticas a serem coletadas
                            const stats = {
                                total: totalMedicamentos,
                                porVia: {},
                                possuiIndicacoes: 0,
                                categorias: {}
                            };

                            // Analisa cada medicamento
                            let indicacoesContadas = new Set();
                            medicamentosKeys.forEach(medKey => {
                                const med = MEDICAMENTOS[medKey];
                                
                                // Conta vias de administração
                                if (med.formas) {
                                    Object.keys(med.formas).forEach(via => {
                                        if (!stats.porVia[via]) {
                                            stats.porVia[via] = 0;
                                        }
                                        stats.porVia[via]++;
                                        
                                        // Conta medicamentos com indicações
                                        if (med.formas[via].indicacoes && Object.keys(med.formas[via].indicacoes).length > 0) {
                                            // Garantir que contamos indicações uma única vez por medicamento e via
                                            const indicacaoID = medKey + '_' + via;
                                            if (!indicacoesContadas.has(indicacaoID)) {
                                                stats.possuiIndicacoes++;
                                                indicacoesContadas.add(indicacaoID);
                                            }
                                            
                                            // Categoriza por indicações
                                            Object.keys(med.formas[via].indicacoes).forEach(ind => {
                                                // Atribuir categorias especiais para antiepilépticos
                                                let categoria = 'Outros';
                                                
                                                if (ind.includes('epilepsia') || ind.includes('convuls') || ind.includes('status') || 
                                                   ['carbamazepina', 'valproato', 'fenitoina', 'fenobarbital', 
                                                    'lamotrigina', 'levetiracetam', 'topiramato', 
                                                    'oxcarbazepina', 'clobazam', 'etosuximida'].includes(medKey)) {
                                                    categoria = 'Neurológico/Antiepiléptico';
                                                } else if (ind.includes('pneumonia') || ind.includes('respira')) {
                                                    categoria = 'Respiratório';
                                                } else if (ind.includes('meningite') || ind.includes('encefalite')) {
                                                    categoria = 'Neurológico';
                                                } else if (ind.includes('sepse') || ind.includes('infeccao')) {
                                                    categoria = 'Infeccioso';
                                                } else if (ind.includes('dor') || ind.includes('febre')) {
                                                    categoria = 'Analgésico/Antipirético';
                                                } else if (ind.includes('diarreia') || ind.includes('vômito')) {
                                                    categoria = 'Gastrointestinal';
                                                }
                                                
                                                if (!stats.categorias[categoria]) {
                                                    stats.categorias[categoria] = 0;
                                                }
                                                stats.categorias[categoria]++;
                                            });
                                        }
                                    });
                                }
                            });
                            
                            console.log('Estatísticas corrigidas de medicamentos:', stats);
                            return stats;
                        } catch (erro) {
                            console.error('Erro ao analisar medicamentos (função corrigida):', erro);
                            return {
                                total: Object.keys(MEDICAMENTOS).length,
                                porVia: {},
                                possuiIndicacoes: 0,
                                categorias: {}
                            };
                        }
                    };
                    
                    // Executar a nova função para atualizar estatísticas
                    const estatisticasCorrigidas = analisarMedicamentos();
                    console.log('Estatísticas após correção:', estatisticasCorrigidas);
                    
                    // Atualizar a interface com as novas estatísticas
                    if (typeof atualizarEstatisticasInterface === 'function') {
                        atualizarEstatisticasInterface(estatisticasCorrigidas);
                        console.log('Interface de estatísticas atualizada com valores corrigidos');
                    }
                }
            } else {
                console.error('Erro crítico: MEDICAMENTOS não definido');
            }
            
            console.log('=== FIM DO DIAGNÓSTICO DE MEDICAMENTOS ===');
        } catch (error) {
            console.error('Erro durante diagnóstico:', error);
        }
    }, 3000); // Esperar 3 segundos para garantir carregamento completo
});
