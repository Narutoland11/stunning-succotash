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
            // Botão de atualização de estatísticas encontrado
            
            btnAtualizarEstatisticas.addEventListener('click', function(event) {
                event.preventDefault();
                
                // Verificar se a função contarMedicamentos está disponível
                if (typeof window.contarMedicamentos !== 'function') {
                    // Função contarMedicamentos não disponível
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
                            
                            // Notificações removidas
                        } catch (erro) {
                            // Erro silencioso
                            // Notificações removidas
                        } finally {
                            // Restaurar o texto do botão
                            botao.innerHTML = '<i class="fas fa-sync"></i> Atualizar estatísticas';
                        }
                    }, 500);
                } catch (erro) {
                    // Erro silencioso
                    botao.innerHTML = '<i class="fas fa-sync"></i> Atualizar estatísticas';
                    
                    // Notificações removidas
                }
            });
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
        // Erro silencioso
    }
}

/**
 * Verifica se todas as dependências necessárias estão carregadas
 */
function verificarDependencias() {
    // Verificar script de contagem
    const scripts = document.getElementsByTagName('script');
    let contarMedicamentosScriptCarregado = false;
    
    for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src && scripts[i].src.includes('contarMedicamentos.js')) {
            contarMedicamentosScriptCarregado = true;
            break;
        }
    }
    
    if (!contarMedicamentosScriptCarregado) {
        // Tentar carregar o script dinamicamente
        const script = document.createElement('script');
        script.src = 'js/modules/medicamentos/contarMedicamentos.js';
        script.onload = () => {
            // Tentar inicializar novamente após carregamento
            setTimeout(inicializarEstatisticas, 500);
        };
        document.head.appendChild(script);
    }
}
