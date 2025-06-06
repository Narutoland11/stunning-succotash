/**
 * Módulo integrador para análises bioquímicas avançadas
 * Reúne todas as funcionalidades dos módulos especializados
 * Adaptado para contexto médico em Moçambique
 */

// Importação dos módulos específicos
// Nota: no ambiente browser, estes módulos devem ser carregados antes deste arquivo
const BIOQUIMICA_AVANCADA = {
    /**
     * Integra todos os módulos de análise bioquímica avançada
     * Este objeto serve como ponto de entrada para todas as análises
     */
    
    /**
     * Inicializar o módulo e importar dependências
     */
    init: function() {
        // No ambiente de navegador, verifica se os módulos estão disponíveis
        this.perfilLipidico = typeof PERFIL_LIPIDICO !== 'undefined' ? PERFIL_LIPIDICO : null;
        this.anionGap = typeof ANION_GAP !== 'undefined' ? ANION_GAP : null;
        this.eletrolitos = typeof ELETROLITOS_ADICIONAIS !== 'undefined' ? ELETROLITOS_ADICIONAIS : null;
        this.framingham = typeof FRAMINGHAM !== 'undefined' ? FRAMINGHAM : null;
        
        return this;
    },
    
    /**
     * Analisa perfil lipídico completo
     * @param {Object} dados - Dados do perfil lipídico
     * @param {Object} paciente - Dados do paciente
     * @param {Object} resultado - Objeto onde serão adicionados os resultados
     */
    analisarPerfilLipidico: function(dados, paciente, resultado) {
        if (this.perfilLipidico) {
            this.perfilLipidico.analisar(dados, paciente, resultado);
        } else {
            console.error("Módulo de perfil lipídico não disponível");
        }
        return resultado;
    },
    
    /**
     * Analisa ânion gap e equilíbrio ácido-base
     * @param {Object} dados - Dados de eletrólitos
     * @param {Object} resultado - Objeto onde serão adicionados os resultados
     */
    analisarAnionGap: function(dados, resultado) {
        if (this.anionGap) {
            this.anionGap.analisar(dados, resultado);
        } else {
            console.error("Módulo de ânion gap não disponível");
        }
        return resultado;
    },
    
    /**
     * Analisa eletrólitos adicionais (magnésio, fósforo, cloro, bicarbonato)
     * @param {Object} dados - Dados dos eletrólitos adicionais
     * @param {Object} resultado - Objeto onde serão adicionados os resultados
     */
    analisarEletrolitosAdicionais: function(dados, resultado) {
        if (this.eletrolitos) {
            this.eletrolitos.analisar(dados, resultado);
        } else {
            console.error("Módulo de eletrólitos adicionais não disponível");
        }
        return resultado;
    },
    
    /**
     * Calcula e analisa o Escore de Framingham
     * @param {Object} paciente - Dados do paciente
     * @param {Object} dadosLab - Dados laboratoriais
     * @param {Object} resultado - Objeto onde serão adicionados os resultados
     */
    analisarRiscoCardiovascular: function(paciente, dadosLab, resultado) {
        if (this.framingham) {
            // Calcular pontuação primeiro
            const dadosFramingham = this.framingham.calcularPontuacao(paciente, dadosLab);
            
            // Se o cálculo foi bem-sucedido, analisar o risco
            if (dadosFramingham && !dadosFramingham.erro) {
                this.framingham.analisarRisco(dadosFramingham, resultado);
            } else if (dadosFramingham && dadosFramingham.erro) {
                console.error("Erro ao calcular Escore de Framingham:", dadosFramingham.erro);
            }
        } else {
            console.error("Módulo de Framingham não disponível");
        }
        return resultado;
    },
    
    /**
     * Realiza uma análise bioquímica completa
     * @param {Object} dados - Todos os dados bioquímicos
     * @param {Object} paciente - Dados do paciente
     * @returns {Object} Objeto com todas as análises, alertas e condutas
     */
    analisarCompleto: function(dados, paciente) {
        if (!dados) return null;
        
        // Criar objeto de resultado
        const resultado = {
            analises: [],
            alertas: [],
            condutas: []
        };
        
        // Realizar todas as análises disponíveis
        if (dados.lipidico) {
            this.analisarPerfilLipidico(dados.lipidico, paciente, resultado);
        }
        
        if (dados.eletrolitos) {
            // Análise de ânion gap (requer sódio, cloro e bicarbonato)
            if (dados.eletrolitos.sodio && dados.eletrolitos.cloro && dados.eletrolitos.bicarbonato) {
                this.analisarAnionGap(dados.eletrolitos, resultado);
            }
            
            // Análise de eletrólitos adicionais
            this.analisarEletrolitosAdicionais(dados.eletrolitos, resultado);
        }
        
        // Análise de risco cardiovascular
        if (paciente && dados.lipidico) {
            this.analisarRiscoCardiovascular(paciente, dados.lipidico, resultado);
        }
        
        return resultado;
    }
};

// Exportar para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BIOQUIMICA_AVANCADA.init();
} else {
    // Para uso direto no navegador
    window.BIOQUIMICA_AVANCADA = BIOQUIMICA_AVANCADA.init();
}
