/**
 * Sistema de Alertas Robusto para a Calculadora Pediátrica
 * Este módulo fornece funcionalidades para exibir diferentes tipos de alertas na interface
 */

const ALERTA_SISTEMA = {
    // Configurações de duração (em milissegundos)
    duracoes: {
        curto: 3000,
        medio: 5000,
        longo: 8000
    },
    
    // Classes CSS para os diferentes tipos de alerta
    tipos: {
        info: 'alerta-info',
        sucesso: 'alerta-sucesso',
        aviso: 'alerta-aviso',
        perigo: 'alerta-perigo',
        validacao: 'alerta-validacao',
        medico: 'alerta-medico'
    },
    
    // Container onde serão exibidos os alertas
    container: null,
    
    // Contador para identificação única de cada alerta
    contadorIds: 0,
    
    // Inicializa o sistema de alertas
    inicializar: function() {
        // Cria o container de alertas se não existir
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'sistema-alertas-container';
            this.container.className = 'sistema-alertas-container';
            document.body.appendChild(this.container);
            
            // Adiciona os estilos CSS para os alertas
            this.adicionarEstilosCSS();
        }
        
        console.log('Sistema de alertas inicializado com sucesso');
    },
    
    // Adiciona estilos CSS diretamente ao documento
    adicionarEstilosCSS: function() {
        const estilos = `
            .sistema-alertas-container {
                position: fixed;
                top: 20px;
                right: 20px;
                max-width: 350px;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            
            .sistema-alerta {
                padding: 15px;
                border-radius: 5px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                margin-bottom: 10px;
                animation: fadeIn 0.3s ease;
                position: relative;
                overflow: hidden;
                color: #fff;
                font-weight: 500;
            }
            
            .sistema-alerta-conteudo {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .sistema-alerta-icone {
                font-size: 24px;
            }
            
            .sistema-alerta-mensagem {
                flex: 1;
            }
            
            .sistema-alerta-fechar {
                position: absolute;
                top: 5px;
                right: 5px;
                cursor: pointer;
                font-size: 16px;
                color: rgba(255, 255, 255, 0.8);
            }
            
            .sistema-alerta-fechar:hover {
                color: #fff;
            }
            
            .sistema-alerta-barra-progresso {
                position: absolute;
                bottom: 0;
                left: 0;
                height: 3px;
                width: 100%;
                background-color: rgba(255, 255, 255, 0.3);
            }
            
            .sistema-alerta-progresso {
                height: 100%;
                width: 100%;
                background-color: rgba(255, 255, 255, 0.7);
                transition: width linear;
            }
            
            /* Cores dos alertas */
            .alerta-info {
                background-color: #2196F3;
            }
            
            .alerta-sucesso {
                background-color: #4CAF50;
            }
            
            .alerta-aviso {
                background-color: #FF9800;
            }
            
            .alerta-perigo {
                background-color: #F44336;
            }

            .alerta-validacao {
                background-color: #9C27B0;
            }
            
            .alerta-medico {
                background-color: #00BCD4;
            }
            
            /* Animações */
            @keyframes fadeIn {
                from { opacity: 0; transform: translateX(30px); }
                to { opacity: 1; transform: translateX(0); }
            }
            
            @keyframes fadeOut {
                from { opacity: 1; transform: translateX(0); }
                to { opacity: 0; transform: translateX(30px); }
            }
        `;
        
        const styleElement = document.createElement('style');
        styleElement.textContent = estilos;
        document.head.appendChild(styleElement);
    },
    
    /**
     * Exibe um alerta na interface
     * @param {string} mensagem - Texto da mensagem
     * @param {string} tipo - Tipo de alerta ('info', 'sucesso', 'aviso', 'perigo', 'validacao', 'medico')
     * @param {Object} opcoes - Opções adicionais
     * @param {number} opcoes.duracao - Duração em ms (padrão: médio)
     * @param {boolean} opcoes.fechavel - Se o alerta pode ser fechado (padrão: true)
     * @param {boolean} opcoes.progressBar - Exibir barra de progresso (padrão: true)
     * @param {Function} opcoes.aoFechar - Função executada ao fechar o alerta
     * @returns {number} ID único do alerta
     */
    mostrar: function(mensagem, tipo = 'info', opcoes = {}) {
        try {
            // Inicializa o sistema se ainda não foi inicializado
            if (!this.container) {
                this.inicializar();
            }
            
            // Configura opções com valores padrão
            const configs = {
                duracao: opcoes.duracao || this.duracoes.medio,
                fechavel: opcoes.fechavel !== undefined ? opcoes.fechavel : true,
                progressBar: opcoes.progressBar !== undefined ? opcoes.progressBar : true,
                aoFechar: opcoes.aoFechar || null
            };
            
            // Valida o tipo de alerta
            const classeAlerta = this.tipos[tipo] || this.tipos.info;
            
            // Gera ID único para o alerta
            const alertaId = ++this.contadorIds;
            
            // Cria o elemento do alerta
            const alertaElement = document.createElement('div');
            alertaElement.className = `sistema-alerta ${classeAlerta}`;
            alertaElement.id = `sistema-alerta-${alertaId}`;
            
            // Define o ícone baseado no tipo
            const icone = this.obterIcone(tipo);
            
            // Constrói o conteúdo do alerta
            alertaElement.innerHTML = `
                <div class="sistema-alerta-conteudo">
                    <div class="sistema-alerta-icone">${icone}</div>
                    <div class="sistema-alerta-mensagem">${mensagem}</div>
                </div>
                ${configs.fechavel ? '<span class="sistema-alerta-fechar">&times;</span>' : ''}
                ${configs.progressBar ? `
                <div class="sistema-alerta-barra-progresso">
                    <div class="sistema-alerta-progresso" id="sistema-alerta-progresso-${alertaId}"></div>
                </div>` : ''}
            `;
            
            // Adiciona o alerta ao container
            this.container.appendChild(alertaElement);
            
            // Configura o botão de fechar
            if (configs.fechavel) {
                const fecharBtn = alertaElement.querySelector('.sistema-alerta-fechar');
                fecharBtn.addEventListener('click', () => this.fechar(alertaId, configs.aoFechar));
            }
            
            // Configura a barra de progresso
            if (configs.progressBar) {
                const progressoElement = document.getElementById(`sistema-alerta-progresso-${alertaId}`);
                progressoElement.style.width = '100%';
                progressoElement.style.transitionDuration = `${configs.duracao}ms`;
                
                // Inicia a animação da barra de progresso
                setTimeout(() => {
                    progressoElement.style.width = '0%';
                }, 10);
            }
            
            // Define timeout para remover o alerta após a duração especificada
            if (configs.duracao > 0) {
                setTimeout(() => {
                    this.fechar(alertaId, configs.aoFechar);
                }, configs.duracao);
            }
            
            return alertaId;
            
        } catch (error) {
            // Fallback para o sistema de log em caso de erro
            console.error('Erro ao exibir alerta:', error);
            console.log('Mensagem de alerta:', mensagem);
            return -1;
        }
    },
    
    /**
     * Obtém o ícone adequado para cada tipo de alerta
     */
    obterIcone: function(tipo) {
        switch (tipo) {
            case 'info':
                return '&#9432;';
            case 'sucesso':
                return '&#10004;';
            case 'aviso':
                return '&#9888;';
            case 'perigo':
                return '&#9888;';
            case 'validacao':
                return '&#128196;';
            case 'medico':
                return '&#9764;';
            default:
                return '&#9432;';
        }
    },
    
    /**
     * Fecha um alerta pelo seu ID
     * @param {number} id - ID do alerta
     * @param {Function} callback - Função a ser executada após o fechamento
     */
    fechar: function(id, callback = null) {
        const alertaElement = document.getElementById(`sistema-alerta-${id}`);
        
        if (alertaElement) {
            // Adiciona a animação de saída
            alertaElement.style.animation = 'fadeOut 0.3s ease forwards';
            
            // Remove o elemento após a animação
            setTimeout(() => {
                if (alertaElement.parentNode) {
                    alertaElement.parentNode.removeChild(alertaElement);
                    
                    // Executa o callback se fornecido
                    if (callback && typeof callback === 'function') {
                        callback();
                    }
                }
            }, 300);
        }
    },
    
    /**
     * Métodos de conveniência para diferentes tipos de alertas
     */
    info: function(mensagem, opcoes = {}) {
        return this.mostrar(mensagem, 'info', opcoes);
    },
    
    sucesso: function(mensagem, opcoes = {}) {
        return this.mostrar(mensagem, 'sucesso', opcoes);
    },
    
    aviso: function(mensagem, opcoes = {}) {
        return this.mostrar(mensagem, 'aviso', opcoes);
    },
    
    perigo: function(mensagem, opcoes = {}) {
        return this.mostrar(mensagem, 'perigo', opcoes);
    },
    
    validacao: function(mensagem, opcoes = {}) {
        return this.mostrar(mensagem, 'validacao', opcoes);
    },
    
    medico: function(mensagem, opcoes = {}) {
        return this.mostrar(mensagem, 'medico', opcoes);
    }
};

// Função global para mostrar alertas
function showAlert(mensagem, tipo = 'info', opcoes = {}) {
    return ALERTA_SISTEMA.mostrar(mensagem, tipo, opcoes);
}

// Inicializa o sistema de alertas quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    ALERTA_SISTEMA.inicializar();
});
