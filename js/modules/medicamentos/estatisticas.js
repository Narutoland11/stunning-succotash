/**
 * Script para manipular a atualização das estatísticas de medicamentos
 * Versão: 2.0 - Melhoria de robustez e compatibilidade com Netlify
 */

document.addEventListener('DOMContentLoaded', function() {
    // Aguardar que o documento esteja completamente carregado
    // usando setTimeout para garantir que outros scripts tenham sido carregados
    setTimeout(() => {
        inicializarEstatisticas();
    }, 2000); // Tempo maior para garantir carregamento completo no Netlify
});

/**
 * Função para inicializar o módulo de estatísticas
 */
function inicializarEstatisticas() {
    try {
        // Configurar botão de atualização das estatísticas
        const btnAtualizarEstatisticas = document.getElementById('atualizar-estatisticas');
        
        if (btnAtualizarEstatisticas) {
            console.log('Botão de atualização de estatísticas encontrado');
            
            btnAtualizarEstatisticas.addEventListener('click', function(event) {
                event.preventDefault();
                
                // Verificar se a função contarMedicamentos está disponível
                if (typeof window.contarMedicamentos !== 'function') {
                    console.error('Função contarMedicamentos não encontrada. Verificando dependências...');
                    verificarDependencias();
                    return;
                }
                
                // Efeito visual de atualização
                this.innerHTML = '<i class="fas fa-sync fa-spin"></i> Atualizando...';
                const botao = this; // Guardar referência ao botão
                
                try {
                    // Chamar a função de contagem de medicamentos
                    setTimeout(() => {
                        try {
                            window.contarMedicamentos();
                            
                            // Exibir notificação de sucesso
                            if (typeof showAlert === 'function') {
                                showAlert('Estatísticas de medicamentos atualizadas com sucesso!', 'success');
                            }
                        } catch (erro) {
                            console.error('Erro ao executar contarMedicamentos:', erro);
                            if (typeof showAlert === 'function') {
                                showAlert('Erro ao atualizar estatísticas. Verifique o console.', 'danger');
                            }
                        } finally {
                            // Restaurar o texto do botão
                            botao.innerHTML = '<i class="fas fa-sync"></i> Atualizar estatísticas';
                        }
                    }, 500);
                } catch (erro) {
                    console.error('Erro:', erro);
                    botao.innerHTML = '<i class="fas fa-sync"></i> Atualizar estatísticas';
                    
                    if (typeof showAlert === 'function') {
                        showAlert('Erro ao atualizar estatísticas. Verifique o console.', 'danger');
                    }
                }
            });
        } else {
            console.warn('Botão de atualização de estatísticas não encontrado');
        }
        
        // Exibir informações adicionais sobre a contagem
        const estatisticasDetalhadas = document.getElementById('estatisticas-detalhadas');
        if (estatisticasDetalhadas) {
            estatisticasDetalhadas.innerHTML = `
                <p class="stat-info">As estatísticas incluem todos os medicamentos cadastrados, 
                incluindo os medicamentos adicionais como Ampicilina e Ceftriaxona.</p>
            `;
        }
    } catch (erro) {
        console.error('Erro ao inicializar módulo de estatísticas:', erro);
    }
}

/**
 * Verifica se todas as dependências necessárias estão carregadas
 */
function verificarDependencias() {
    const dependencias = [
        { nome: 'MEDICAMENTOS', tipo: 'objeto' },
        { nome: 'contarMedicamentos', tipo: 'função' },
        { nome: 'showAlert', tipo: 'função' }
    ];
    
    console.log('Verificando dependências do módulo de estatísticas:');
    
    dependencias.forEach(dep => {
        const disponivel = window[dep.nome] !== undefined;
        console.log(`- ${dep.nome} (${dep.tipo}): ${disponivel ? 'Disponível' : 'Não encontrado'}`);
    });
    
    // Verificar script de contagem
    const scripts = document.getElementsByTagName('script');
    let contarMedicamentosScriptCarregado = false;
    
    for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src && scripts[i].src.includes('contarMedicamentos.js')) {
            contarMedicamentosScriptCarregado = true;
            break;
        }
    }
    
    console.log(`Script contarMedicamentos.js: ${contarMedicamentosScriptCarregado ? 'Carregado' : 'Não encontrado'}`);
    
    if (!contarMedicamentosScriptCarregado) {
        console.warn('Tentando carregar contarMedicamentos.js dinamicamente...');
        // Tentar carregar o script dinamicamente
        const script = document.createElement('script');
        script.src = 'js/modules/medicamentos/contarMedicamentos.js';
        script.onload = () => {
            console.log('Script contarMedicamentos.js carregado com sucesso!');
            // Tentar inicializar novamente após carregamento
            setTimeout(inicializarEstatisticas, 500);
        };
        script.onerror = () => {
            console.error('Falha ao carregar contarMedicamentos.js');
        };
        document.head.appendChild(script);
    }
}
