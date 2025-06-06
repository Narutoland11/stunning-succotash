// Script aprimorado para contagem e análise de medicamentos no objeto global MEDICAMENTOS

/**
 * Função para contar e analisar medicamentos disponíveis no sistema
 * Retorna estatísticas detalhadas sobre os medicamentos
 */
function analisarMedicamentos() {
    // Verificar se o objeto MEDICAMENTOS existe
    if (typeof MEDICAMENTOS === 'undefined') {
        console.error('Erro: Objeto MEDICAMENTOS não definido. Certifique-se de que medicamentos.js está carregado.');
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
                        stats.possuiIndicacoes++;
                        
                        // Categoriza por indicações
                        Object.keys(med.formas[via].indicacoes).forEach(ind => {
                            // Agrupa em categorias principais
                            let categoria = 'Outros';
                            
                            if (ind.includes('pneumonia') || ind.includes('respira')) {
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
        
        console.log('Estatísticas de medicamentos:', stats);
        return stats;
    } catch (erro) {
        console.error('Erro ao analisar medicamentos:', erro);
        return {
            total: 0,
            porVia: {},
            possuiIndicacoes: 0,
            categorias: {}
        };
    }
}

/**
 * Cria ou atualiza elementos na interface com as estatísticas de medicamentos
 */
function atualizarEstatisticasInterface(stats) {
    // Verificar se a seção de informações existe
    const secaoInfo = document.getElementById('informacoes');
    if (!secaoInfo) return;
    
    // Verificar se o elemento de estatísticas já existe
    let estatisticasDiv = document.getElementById('estatisticas-medicamentos');
    
    // Se não existir, criar um novo
    if (!estatisticasDiv) {
        estatisticasDiv = document.createElement('div');
        estatisticasDiv.id = 'estatisticas-medicamentos';
        estatisticasDiv.className = 'info-card';
        
        // Encontrar um local adequado para adicionar as estatísticas
        const targetElement = secaoInfo.querySelector('.info-cards') || secaoInfo;
        targetElement.appendChild(estatisticasDiv);
    }
    
    // Gerar conteúdo HTML com as estatísticas
    let html = `
        <h3><i class="fas fa-pills"></i> Estatísticas de Medicamentos</h3>
        <p><strong>Total de medicamentos:</strong> ${stats.total}</p>
        <p><strong>Medicamentos com indicações:</strong> ${stats.possuiIndicacoes}</p>
        
        <div class="stat-grid">
            <div class="stat-column">
                <h4>Por Via de Administração:</h4>
                <ul>
    `;
    
    // Adicionar estatísticas por via
    Object.keys(stats.porVia).forEach(via => {
        const viaFormatada = via.charAt(0).toUpperCase() + via.slice(1);
        html += `<li>${viaFormatada}: ${stats.porVia[via]}</li>`;
    });
    
    html += `
                </ul>
            </div>
            
            <div class="stat-column">
                <h4>Por Categoria Terapêutica:</h4>
                <ul>
    `;
    
    // Adicionar estatísticas por categoria
    Object.keys(stats.categorias).forEach(categoria => {
        html += `<li>${categoria}: ${stats.categorias[categoria]}</li>`;
    });
    
    html += `
                </ul>
            </div>
        </div>
        
        <p class="update-time">Atualizado em: ${new Date().toLocaleString()}</p>
    `;
    
    // Aplicar o HTML ao elemento
    estatisticasDiv.innerHTML = html;
    
    // Adicionar estilos CSS inline se necessário
    if (!document.getElementById('estatisticas-medicamentos-css')) {
        const styleTag = document.createElement('style');
        styleTag.id = 'estatisticas-medicamentos-css';
        styleTag.textContent = `
            #estatisticas-medicamentos {
                margin: 20px 0;
                padding: 15px;
                border: 1px solid #e0e0e0;
                border-radius: 8px;
                background-color: #f9f9f9;
            }
            .stat-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
                margin-top: 15px;
            }
            .update-time {
                font-size: 0.8em;
                color: #666;
                text-align: right;
                margin-top: 15px;
            }
        `;
        document.head.appendChild(styleTag);
    }
}

/**
 * Função principal para contar medicamentos e atualizar interface
 */
function contarMedicamentos() {
    // Aguarda um tempo para garantir que todos os medicamentos foram carregados
    setTimeout(() => {
        const estatisticas = analisarMedicamentos();
        
        // Exibir no console para debugging
        console.log(`Total de medicamentos disponíveis: ${estatisticas.total}`);
        
        // Atualizar elementos na interface
        if (document.getElementById('total-medicamentos')) {
            document.getElementById('total-medicamentos').textContent = estatisticas.total;
        }
        
        // Atualizar a seção de estatísticas na interface
        atualizarEstatisticasInterface(estatisticas);
    }, 1000); // Aumentado para 1000ms para garantir carregamento completo
}

// Executa a contagem quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', contarMedicamentos);

// Expor funções para uso global
window.contarMedicamentos = contarMedicamentos;
window.analisarMedicamentos = analisarMedicamentos;