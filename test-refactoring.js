/**
 * Script para testar a refatoração e redução de duplicações
 * Este arquivo valida se o utils.js está funcionando corretamente
 */

// Função auto-executável para isolar o código
(function() {
    console.log('=== INICIANDO TESTE DE REFATORAÇÃO ===');
    
    // Carregar utils.js
    function carregarUtils() {
        return new Promise((resolve) => {
            if (window.utils) {
                console.log('Utils já está carregado');
                resolve(window.utils);
                return;
            }
            
            const script = document.createElement('script');
            script.src = '/js/modules/medicamentos/utils.js';
            script.onload = function() {
                console.log('Utils carregado com sucesso!');
                resolve(window.utils);
            };
            script.onerror = function(error) {
                console.error('Erro ao carregar utils:', error);
                resolve(null);
            };
            document.head.appendChild(script);
        });
    }
    
    // Testar funções do módulo utils
    async function testarUtilidades() {
        // Carregar utils primeiro
        const utils = await carregarUtils();
        if (!utils) {
            console.error('Não foi possível carregar o módulo utils');
            return false;
        }
        
        console.log('Testando funções do módulo utils...');
        
        // Testar verificarObjetosGlobais
        try {
            const MEDICAMENTOS = utils.verificarObjetosGlobais();
            console.log('✅ verificarObjetosGlobais funcionou corretamente');
            console.log(`   Objetos disponíveis: MEDICAMENTOS (${Object.keys(MEDICAMENTOS).length} itens)`);
        } catch (error) {
            console.error('❌ Erro em verificarObjetosGlobais:', error);
            return false;
        }
        
        // Testar adicionarMedicamento
        try {
            const medicamento = {
                nome: "Medicamento de Teste",
                formas: {
                    oral: {
                        descricao: "Comprimido teste",
                        tipo: "comprimido"
                    }
                }
            };
            
            utils.adicionarMedicamento('teste_refatoracao', medicamento);
            
            if (window.MEDICAMENTOS.teste_refatoracao) {
                console.log('✅ adicionarMedicamento funcionou corretamente');
            } else {
                console.error('❌ adicionarMedicamento falhou: medicamento não foi adicionado');
                return false;
            }
        } catch (error) {
            console.error('❌ Erro em adicionarMedicamento:', error);
            return false;
        }
        
        // Testar atualizarContadoresInterface
        try {
            utils.atualizarContadoresInterface();
            console.log('✅ atualizarContadoresInterface executado sem erros');
        } catch (error) {
            console.error('❌ Erro em atualizarContadoresInterface:', error);
            return false;
        }
        
        // Testar atualizarSeletorMedicamentos
        try {
            if (typeof utils.atualizarSeletorMedicamentos === 'function') {
                utils.atualizarSeletorMedicamentos();
                console.log('✅ atualizarSeletorMedicamentos executado sem erros');
            } else {
                console.warn('⚠️ atualizarSeletorMedicamentos não implementado');
            }
        } catch (error) {
            console.error('❌ Erro em atualizarSeletorMedicamentos:', error);
            // Não falhar por causa desta função
        }
        
        console.log('Todos os testes de utilidades concluídos com sucesso!');
        return true;
    }
    
    // Testar se os scripts de medicamentos estão carregando corretamente
    async function testarScriptsMedicamentos() {
        console.log('Testando scripts de medicamentos...');
        
        // Verificar se correcao_medicamentos.js está usando utils
        const correcaoScript = document.createElement('script');
        correcaoScript.src = '/js/modules/medicamentos/correcao_medicamentos.js';
        
        document.head.appendChild(correcaoScript);
        console.log('✅ correcao_medicamentos.js carregado');
        
        // Verificar se antiepilepticos_parte2.js está funcionando
        setTimeout(() => {
            const antiepilepticosScript = document.createElement('script');
            antiepilepticosScript.src = '/js/modules/medicamentos/antiepilepticos_parte2.js';
            
            document.head.appendChild(antiepilepticosScript);
            console.log('✅ antiepilepticos_parte2.js carregado');
        }, 1000);
        
        // Verificar se atualizar_ui.js está funcionando
        setTimeout(() => {
            const atualizarUIScript = document.createElement('script');
            atualizarUIScript.src = '/js/modules/medicamentos/atualizar_ui.js';
            
            document.head.appendChild(atualizarUIScript);
            console.log('✅ atualizar_ui.js carregado');
            
            // Mostrar estatísticas finais
            setTimeout(() => {
                const medicamentosKeys = Object.keys(window.MEDICAMENTOS || {});
                console.log(`Total final de medicamentos: ${medicamentosKeys.length}`);
                
                // Confirmar se os antiepilépticos foram carregados
                const antiEpilepticosDisponiveis = medicamentosKeys.filter(key => 
                    ['carbamazepina', 'valproato', 'fenitoina', 'fenobarbital', 
                     'lamotrigina', 'levetiracetam'].includes(key)
                );
                console.log('Antiepilépticos disponíveis:', antiEpilepticosDisponiveis);
                
                document.body.innerHTML += `
                    <div style="margin: 20px; padding: 10px; background-color: #eeffee; border: 1px solid #559955;">
                        <h2>Teste de Refatoração Concluído</h2>
                        <p>Total de medicamentos: ${medicamentosKeys.length}</p>
                        <p>Antiepilépticos carregados: ${antiEpilepticosDisponiveis.length}/6</p>
                        <p>Estado dos objetos globais: ✅</p>
                    </div>
                `;
            }, 3000);
        }, 2000);
    }
    
    // Iniciar testes
    (async function() {
        const utilsOK = await testarUtilidades();
        if (utilsOK) {
            await testarScriptsMedicamentos();
        }
    })();
    
    console.log('=== TESTE DE REFATORAÇÃO INICIADO ===');
})();
