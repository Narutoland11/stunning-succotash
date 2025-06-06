/**
 * Módulo para análise de eletrólitos adicionais (magnésio, fósforo, cloro, bicarbonato)
 * Parte da implementação de análise bioquímica avançada
 * Adaptado para contexto médico em Moçambique
 */

// Objeto que contém as funções para análise de eletrólitos adicionais
const ELETROLITOS_ADICIONAIS = {
    /**
     * Analisa eletrólitos adicionais (magnésio, fósforo, cloro, bicarbonato)
     * @param {Object} dados - Dados dos eletrólitos adicionais
     * @param {Object} resultado - Objeto onde serão adicionados os resultados
     */
    analisar: function(dados, resultado) {
        if (!dados) return;
        
        // Importar valores de referência
        const valoresRef = typeof VALORES_REFERENCIA !== 'undefined' ? VALORES_REFERENCIA : {};
        
        // Analisar magnésio
        if (dados.magnesio !== undefined) {
            const mgRef = valoresRef.bioquimica?.magnesio || { min: 1.8, max: 2.4, unidade: 'mg/dL' };
            
            resultado.analises.push({
                parametro: 'Magnésio',
                valor: `${dados.magnesio} ${mgRef.unidade}`,
                interpretacao: this._interpretarValor(dados.magnesio, mgRef.min, mgRef.max),
                referencia: `${mgRef.min}-${mgRef.max} ${mgRef.unidade}`
            });
            
            if (dados.magnesio < mgRef.min) {
                resultado.alertas.push({
                    tipo: 'atencao',
                    mensagem: `Hipomagnesemia (${dados.magnesio} ${mgRef.unidade}). Pode causar arritmias, convulsões e tetania.`
                });
                
                if (dados.magnesio < mgRef.min * 0.7) {  // Hipomagnesemia severa
                    resultado.alertas.push({
                        tipo: 'importante',
                        mensagem: `Hipomagnesemia severa (${dados.magnesio} ${mgRef.unidade}). Alto risco de arritmias e convulsões.`
                    });
                    
                    resultado.condutas.push({
                        texto: 'Considerar reposição de magnésio IV para níveis severamente baixos. Monitorar ECG para arritmias.'
                    });
                } else {
                    resultado.condutas.push({
                        texto: 'Considerar reposição de magnésio oral ou investigar causas de hipomagnesemia (má absorção, medicamentos, alcoolismo).'
                    });
                }
            } else if (dados.magnesio > mgRef.max) {
                resultado.alertas.push({
                    tipo: 'atencao',
                    mensagem: `Hipermagnesemia (${dados.magnesio} ${mgRef.unidade}). Verificar função renal e uso de antiácidos contendo magnésio.`
                });
                
                if (dados.magnesio > mgRef.max * 1.5) {  // Hipermagnesemia significativa
                    resultado.alertas.push({
                        tipo: 'importante',
                        mensagem: `Hipermagnesemia significativa (${dados.magnesio} ${mgRef.unidade}). Pode causar depressão respiratória e cardíaca.`
                    });
                    
                    resultado.condutas.push({
                        texto: 'Avaliar função renal. Suspender fontes exógenas de magnésio. Considerar gluconato de cálcio IV para casos graves.'
                    });
                }
            }
        }
        
        // Analisar fósforo
        if (dados.fosforo !== undefined) {
            const pRef = valoresRef.bioquimica?.fosforo || { min: 2.5, max: 4.5, unidade: 'mg/dL' };
            
            resultado.analises.push({
                parametro: 'Fósforo',
                valor: `${dados.fosforo} ${pRef.unidade}`,
                interpretacao: this._interpretarValor(dados.fosforo, pRef.min, pRef.max),
                referencia: `${pRef.min}-${pRef.max} ${pRef.unidade}`
            });
            
            if (dados.fosforo < pRef.min) {
                resultado.alertas.push({
                    tipo: 'atencao',
                    mensagem: `Hipofosfatemia (${dados.fosforo} ${pRef.unidade}). Verificar desnutrição, alcoolismo, uso de antiácidos.`
                });
                
                if (dados.fosforo < pRef.min * 0.6) {
                    resultado.alertas.push({
                        tipo: 'importante',
                        mensagem: `Hipofosfatemia severa (${dados.fosforo} ${pRef.unidade}). Risco de fraqueza muscular e insuficiência respiratória.`
                    });
                    
                    resultado.condutas.push({
                        texto: 'Considerar reposição de fosfato para níveis severamente baixos. Monitorar função muscular e respiratória.'
                    });
                }
            } else if (dados.fosforo > pRef.max) {
                resultado.alertas.push({
                    tipo: 'atencao',
                    mensagem: `Hiperfosfatemia (${dados.fosforo} ${pRef.unidade}). Avaliar função renal.`
                });
                
                if (dados.fosforo > pRef.max * 1.5) {
                    resultado.condutas.push({
                        texto: 'Avaliar função renal. Considerar restrição de fosfato na dieta e uso de quelantes de fosfato em casos de insuficiência renal.'
                    });
                }
            }
        }
        
        // Analisar cloro
        if (dados.cloro !== undefined) {
            const clRef = valoresRef.bioquimica?.cloro || { min: 98, max: 107, unidade: 'mEq/L' };
            
            resultado.analises.push({
                parametro: 'Cloro',
                valor: `${dados.cloro} ${clRef.unidade}`,
                interpretacao: this._interpretarValor(dados.cloro, clRef.min, clRef.max),
                referencia: `${clRef.min}-${clRef.max} ${clRef.unidade}`
            });
            
            if (dados.cloro < clRef.min) {
                resultado.alertas.push({
                    tipo: 'atencao',
                    mensagem: `Hipocloremia (${dados.cloro} ${clRef.unidade}). Avaliar vômitos, uso de diuréticos, alcalose metabólica.`
                });
            } else if (dados.cloro > clRef.max) {
                resultado.alertas.push({
                    tipo: 'atencao',
                    mensagem: `Hipercloremia (${dados.cloro} ${clRef.unidade}). Avaliar desidratação, insuficiência renal, acidose metabólica.`
                });
            }
        }
        
        // Analisar bicarbonato
        if (dados.bicarbonato !== undefined) {
            const bicarbonatoRef = valoresRef.bioquimica?.bicarbonato || { min: 22, max: 29, unidade: 'mEq/L' };
            
            resultado.analises.push({
                parametro: 'Bicarbonato',
                valor: `${dados.bicarbonato} ${bicarbonatoRef.unidade}`,
                interpretacao: this._interpretarValor(dados.bicarbonato, bicarbonatoRef.min, bicarbonatoRef.max),
                referencia: `${bicarbonatoRef.min}-${bicarbonatoRef.max} ${bicarbonatoRef.unidade}`
            });
            
            if (dados.bicarbonato < bicarbonatoRef.min) {
                resultado.alertas.push({
                    tipo: 'atencao',
                    mensagem: `Bicarbonato baixo (${dados.bicarbonato} ${bicarbonatoRef.unidade}). Sugere acidose metabólica.`
                });
                
                if (dados.bicarbonato < bicarbonatoRef.min - 5) {
                    resultado.alertas.push({
                        tipo: 'importante',
                        mensagem: `Bicarbonato significativamente baixo (${dados.bicarbonato} ${bicarbonatoRef.unidade}). Acidose metabólica significativa.`
                    });
                    
                    resultado.condutas.push({
                        texto: 'Avaliar urgentemente estado ácido-base. Considerar gasometria arterial e investigação para causa da acidose metabólica.'
                    });
                }
            } else if (dados.bicarbonato > bicarbonatoRef.max) {
                resultado.alertas.push({
                    tipo: 'atencao',
                    mensagem: `Bicarbonato elevado (${dados.bicarbonato} ${bicarbonatoRef.unidade}). Sugere alcalose metabólica.`
                });
                
                if (dados.bicarbonato > bicarbonatoRef.max + 5) {
                    resultado.condutas.push({
                        texto: 'Avaliar causas de alcalose metabólica: vômitos prolongados, uso de diuréticos, hiperaldosteronismo.'
                    });
                }
            }
        }
    },
    
    /**
     * Função auxiliar para interpretar valores com base em mínimo e máximo
     * @param {number} valor - Valor a ser interpretado
     * @param {number} min - Valor mínimo normal
     * @param {number} max - Valor máximo normal
     * @returns {string} Interpretação (Normal, Baixo ou Elevado)
     * @private
     */
    _interpretarValor: function(valor, min, max) {
        if (valor === undefined || min === undefined || max === undefined) {
            return 'Não disponível';
        }
        
        if (valor < min) {
            return 'Baixo';
        } else if (valor > max) {
            return 'Elevado';
        } else {
            return 'Normal';
        }
    }
};

// Exportar para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ELETROLITOS_ADICIONAIS;
} else {
    // Para uso direto no navegador
    window.ELETROLITOS_ADICIONAIS = ELETROLITOS_ADICIONAIS;
}
