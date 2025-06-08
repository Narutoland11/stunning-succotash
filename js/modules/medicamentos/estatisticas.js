/**
 * Script para manipular a atualização das estatísticas de medicamentos
 * Versão: 3.0 - Refatoração para eliminar duplicações de código
 */

// Verificar se utils está disponível ou carregar dinamicamente
let utils = window.utils;

document.addEventListener('DOMContentLoaded', function() {
    // Tentar carregar utils primeiro
    carregarUtils();
    
    // Aguardar que o documento esteja completamente carregado
    // usando setTimeout para garantir que outros scripts tenham sido carregados
    setTimeout(() => {
        inicializarEstatisticas();
    }, 2000); // Tempo maior para garantir carregamento completo no Netlify
});

/**
 * Função para carregar módulo utils se necessário
 */
function carregarUtils() {
    if (!window.utils) {
        console.log('Carregando módulo utils...');
        const script = document.createElement('script');
        script.src = '/js/modules/medicamentos/utils.js';
        document.head.appendChild(script);
        
        // Aguardar carregamento do script
        setTimeout(() => {
            utils = window.utils;
            console.log('Módulo utils disponível:', !!utils);
        }, 500);
    } else {
        utils = window.utils;
        console.log('Módulo utils já está disponível');
    }
}

/**
 * Função para inicializar o módulo de estatísticas
 */
function inicializarEstatisticas() {
    try {
        // Verificar se objetos globais existem
        if (utils && typeof utils.verificarObjetosGlobais === 'function') {
            utils.verificarObjetosGlobais();
            console.log('Objetos globais verificados via utils');
        }
        
        // Configurar botão de atualização das estatísticas
        const btnAtualizarEstatisticas = document.getElementById('atualizar-estatisticas');
        
        if (btnAtualizarEstatisticas) {
            // Botão de atualização de estatísticas encontrado
            
            btnAtualizarEstatisticas.addEventListener('click', function(event) {
                event.preventDefault();
                
                // Verificar se utils ou a função contarMedicamentos está disponível
                if (utils && typeof utils.atualizarContadoresInterface === 'function') {
                    // Efeito visual de atualização
                    this.innerHTML = '<i class="fas fa-sync fa-spin"></i> Atualizando...';
                    const botao = this; // Guardar referência ao botão
                    
                    // Usar utils para atualizar a interface
                    utils.atualizarContadoresInterface();
                    if (typeof utils.atualizarSeletorMedicamentos === 'function') {
                        utils.atualizarSeletorMedicamentos();
                    }
                    
                    // Restaurar o texto do botão
                    setTimeout(() => {
                        botao.innerHTML = '<i class="fas fa-sync"></i> Atualizar estatísticas';
                    }, 500);
                    
                    return;
                }
                
                // Fallback quando utils não está disponível
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
                        } catch (erro) {
                            // Erro silencioso
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
    console.log('Verificando dependências para estatísticas...');
    
    // Usar utils se disponível ou fallback
    if (utils && typeof utils.verificarObjetosGlobais === 'function') {
        utils.verificarObjetosGlobais();
    } else {
        // Verificar se o objeto MEDICAMENTOS existe
        if (typeof window.MEDICAMENTOS === 'undefined') {
            console.warn('Objeto MEDICAMENTOS não encontrado');
            window.MEDICAMENTOS = {};
        }
        
        // Verificar outros objetos importantes
        if (typeof window.INDICACOES === 'undefined') {
            console.warn('Objeto INDICACOES não encontrado');
            window.INDICACOES = {};
        }
    }
    
    // Verificar se temos alguma função de contagem implementada
    if (typeof window.contarMedicamentos !== 'function') {
        console.warn('Função contarMedicamentos não encontrada - implementando função padrão');
        
        // Implementar função de contagem padrão
        window.contarMedicamentos = function() {
            const medicamentos = window.MEDICAMENTOS || {};
            const total = Object.keys(medicamentos).length;
            console.log(`Total de medicamentos: ${total}`);
            
            // Atualizar UI se possível
            if (utils && typeof utils.atualizarContadoresInterface === 'function') {
                utils.atualizarContadoresInterface();
            } else {
                // Atualizar elementos na interface manualmente
                const elementosContagem = document.querySelectorAll('.total-medicamentos, #total-medicamentos, [data-medicamentos-count]');
                elementosContagem.forEach(elem => {
                    if (elem) elem.textContent = total;
                });
            }
            
            return total;
        };
        
        console.log('Função contarMedicamentos implementada');
    }
    
    return true;
}
