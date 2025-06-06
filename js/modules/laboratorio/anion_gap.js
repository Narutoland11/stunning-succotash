/**
 * Módulo para análise do ânion gap e equilíbrio ácido-base
 * Parte da implementação de análise bioquímica avançada
 * Adaptado para contexto médico em Moçambique
 */

// Objeto que contém as funções para análise do ânion gap
const ANION_GAP = {
    /**
     * Calcula e analisa o ânion gap
     * @param {Object} dados - Dados de eletrólitos (sódio, potássio, cloro, bicarbonato)
     * @param {Object} resultado - Objeto onde serão adicionados os resultados
     */
    analisar: function(dados, resultado) {
        if (!dados || !dados.sodio || !dados.cloro || !dados.bicarbonato) return;
        
        // Importar valores de referência
        const valoresRef = typeof VALORES_REFERENCIA !== 'undefined' ? VALORES_REFERENCIA : {};
        const agRef = valoresRef.bioquimica?.anionGap || { min: 8, max: 16, unidade: 'mEq/L' };
        
        // Calcular ânion gap: Na+ - (Cl- + HCO3-)
        const anionGap = dados.sodio - (dados.cloro + dados.bicarbonato);
        
        // Adicionar ao resultado
        resultado.analises.push({
            parametro: 'Ânion Gap',
            valor: `${anionGap.toFixed(1)} ${agRef.unidade}`,
            interpretacao: this._interpretarAnionGap(anionGap, agRef),
            referencia: `${agRef.min}-${agRef.max} ${agRef.unidade}`
        });
        
        // Adicionar alertas conforme valores
        if (anionGap > agRef.max) {
            this._analisarAnionGapElevado(anionGap, dados, agRef, resultado);
        } else if (anionGap < agRef.min) {
            resultado.alertas.push({
                tipo: 'atencao',
                mensagem: `Ânion Gap diminuído (${anionGap.toFixed(1)} ${agRef.unidade}). Possíveis causas: hipoalbuminemia, mieloma múltiplo, intoxicação por lítio.`
            });
        }
    },
    
    /**
     * Analisa um ânion gap elevado e fornece interpretação clínica
     * @param {number} anionGap - Valor do ânion gap calculado
     * @param {Object} dados - Dados de eletrólitos
     * @param {Object} agRef - Valores de referência do ânion gap
     * @param {Object} resultado - Objeto onde serão adicionados os resultados
     * @private
     */
    _analisarAnionGapElevado: function(anionGap, dados, agRef, resultado) {
        // Classificar a elevação
        let tipo = 'atencao';
        let mensagem = '';
        
        if (anionGap > agRef.max * 1.5) {  // Elevação significativa
            tipo = 'importante';
            mensagem = `Ânion Gap significativamente elevado (${anionGap.toFixed(1)} ${agRef.unidade}). Considerar ACIDOSE METABÓLICA com ânion gap aumentado: cetoacidose diabética, acidose láctica, intoxicação (metanol, etilenoglicol, salicilatos).`;
            
            // Adicionar conduta
            resultado.condutas.push({
                texto: 'Investigar urgentemente causa de acidose metabólica com ânion gap elevado. Considerar gasometria arterial, avaliação de cetoacidose, lactato e função renal.'
            });
        } else {  // Elevação moderada
            mensagem = `Ânion Gap elevado (${anionGap.toFixed(1)} ${agRef.unidade}). Considerar acidose metabólica com ânion gap aumentado.`;
        }
        
        resultado.alertas.push({
            tipo: tipo,
            mensagem: mensagem
        });
        
        // Avaliar bicarbonato
        if (dados.bicarbonato !== undefined) {
            const bicarbonatoRef = { min: 22, max: 29, unidade: 'mEq/L' };
            
            if (dados.bicarbonato < bicarbonatoRef.min) {
                resultado.alertas.push({
                    tipo: 'importante', 
                    mensagem: `Acidose metabólica confirmada: Ânion gap aumentado (${anionGap.toFixed(1)} ${agRef.unidade}) e bicarbonato baixo (${dados.bicarbonato} ${bicarbonatoRef.unidade}).`
                });
            }
        }
    },
    
    /**
     * Interpreta o valor do ânion gap
     * @param {number} valor - Valor do ânion gap
     * @param {Object} agRef - Valores de referência do ânion gap
     * @returns {string} Interpretação do ânion gap
     * @private
     */
    _interpretarAnionGap: function(valor, agRef) {
        if (valor > agRef.max) {
            return 'Elevado';
        } else if (valor < agRef.min) {
            return 'Diminuído';
        } else {
            return 'Normal';
        }
    }
};

// Exportar para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ANION_GAP;
} else {
    // Para uso direto no navegador
    window.ANION_GAP = ANION_GAP;
}
