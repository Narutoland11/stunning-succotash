/**
 * Módulo para análise do perfil lipídico
 * Parte da implementação de análise bioquímica avançada
 * Adaptado para contexto médico em Moçambique
 */

// Objeto que contém as funções para análise do perfil lipídico
const PERFIL_LIPIDICO = {
    /**
     * Analisa perfil lipídico completo
     * @param {Object} dados - Dados do perfil lipídico (colesterolTotal, hdl, ldl, triglicerides)
     * @param {Object} paciente - Dados do paciente
     * @param {Object} resultado - Objeto onde serão adicionados os resultados
     */
    analisar: function(dados, paciente, resultado) {
        // Verificar se temos dados para análise
        if (!dados) return;
        
        // Importar valores de referência
        const valoresRef = typeof VALORES_REFERENCIA !== 'undefined' ? VALORES_REFERENCIA : {};
        
        // Analisar colesterol total
        if (dados.colesterolTotal !== undefined) {
            const colRef = valoresRef.bioquimica?.colesterolTotal || { 
                desejavel: 200, 
                limitrofe: 240,
                unidade: 'mg/dL' 
            };
            
            let interpretacao = '';
            if (dados.colesterolTotal < colRef.desejavel) {
                interpretacao = 'Desejável';
            } else if (dados.colesterolTotal < colRef.limitrofe) {
                interpretacao = 'Limítrofe';
            } else {
                interpretacao = 'Elevado';
            }
            
            resultado.analises.push({
                parametro: 'Colesterol Total',
                valor: `${dados.colesterolTotal} ${colRef.unidade}`,
                interpretacao: interpretacao,
                referencia: `Desejável: < ${colRef.desejavel} ${colRef.unidade}`
            });
            
            if (dados.colesterolTotal >= colRef.limitrofe) {
                resultado.alertas.push({
                    tipo: 'atencao',
                    mensagem: `Colesterol total elevado (${dados.colesterolTotal} ${colRef.unidade}). Risco aumentado para doença cardiovascular.`
                });
            }
        }
        
        // Analisar HDL
        if (dados.hdl !== undefined) {
            const hdlRef = valoresRef.bioquimica?.hdl || {
                baixo: 40, 
                alto: 60,
                unidade: 'mg/dL'
            };
            
            let interpretacao = '';
            if (dados.hdl < hdlRef.baixo) {
                interpretacao = 'Baixo - Fator de risco';
            } else if (dados.hdl >= hdlRef.alto) {
                interpretacao = 'Alto - Fator protetor';
            } else {
                interpretacao = 'Desejável';
            }
            
            resultado.analises.push({
                parametro: 'HDL-Colesterol',
                valor: `${dados.hdl} ${hdlRef.unidade}`,
                interpretacao: interpretacao,
                referencia: `Desejável: > ${hdlRef.baixo} ${hdlRef.unidade}`
            });
            
            if (dados.hdl < hdlRef.baixo) {
                resultado.alertas.push({
                    tipo: 'atencao',
                    mensagem: `HDL baixo (${dados.hdl} ${hdlRef.unidade}). Fator de risco para doença cardiovascular.`
                });
            }
        }
        
        // Analisar LDL
        if (dados.ldl !== undefined) {
            const ldlRef = valoresRef.bioquimica?.ldl || { 
                otimo: 100, 
                desejavel: 130,
                limitrofe: 160,
                alto: 190,
                unidade: 'mg/dL' 
            };
            
            let interpretacao = '';
            if (dados.ldl < ldlRef.otimo) {
                interpretacao = 'Ótimo';
            } else if (dados.ldl < ldlRef.desejavel) {
                interpretacao = 'Desejável';
            } else if (dados.ldl < ldlRef.limitrofe) {
                interpretacao = 'Limítrofe';
            } else if (dados.ldl < ldlRef.alto) {
                interpretacao = 'Alto';
            } else {
                interpretacao = 'Muito alto';
            }
            
            resultado.analises.push({
                parametro: 'LDL-Colesterol',
                valor: `${dados.ldl} ${ldlRef.unidade}`,
                interpretacao: interpretacao,
                referencia: `Ótimo: < ${ldlRef.otimo} ${ldlRef.unidade}`
            });
            
            if (dados.ldl >= ldlRef.alto) {
                resultado.alertas.push({
                    tipo: 'importante',
                    mensagem: `LDL-Colesterol muito elevado (${dados.ldl} ${ldlRef.unidade}). Alto risco cardiovascular.`
                });
                
                resultado.condutas.push({
                    texto: 'Considerar tratamento farmacológico com estatinas conforme avaliação de risco cardiovascular global.'
                });
            } else if (dados.ldl >= ldlRef.limitrofe) {
                resultado.alertas.push({
                    tipo: 'atencao',
                    mensagem: `LDL-Colesterol elevado (${dados.ldl} ${ldlRef.unidade}). Avaliar fatores de risco adicionais.`
                });
            }
        }
        
        // Analisar triglicerídeos
        if (dados.triglicerides !== undefined) {
            const trigRef = valoresRef.bioquimica?.triglicerides || { 
                otimo: 150, 
                limitrofe: 200,
                alto: 500,
                unidade: 'mg/dL' 
            };
            
            let interpretacao = '';
            if (dados.triglicerides < trigRef.otimo) {
                interpretacao = 'Desejável';
            } else if (dados.triglicerides < trigRef.limitrofe) {
                interpretacao = 'Limítrofe';
            } else if (dados.triglicerides < trigRef.alto) {
                interpretacao = 'Alto';
            } else {
                interpretacao = 'Muito alto';
            }
            
            resultado.analises.push({
                parametro: 'Triglicerídeos',
                valor: `${dados.triglicerides} ${trigRef.unidade}`,
                interpretacao: interpretacao,
                referencia: `Desejável: < ${trigRef.otimo} ${trigRef.unidade}`
            });
            
            if (dados.triglicerides >= trigRef.alto) {
                resultado.alertas.push({
                    tipo: 'importante',
                    mensagem: `Triglicerídeos muito elevados (${dados.triglicerides} ${trigRef.unidade}). Risco de pancreatite aguda.`
                });
                
                resultado.condutas.push({
                    texto: 'Considerar tratamento farmacológico para hipertrigliceridemia severa. Avaliar causas secundárias como diabetes, hipotireoidismo, álcool, obesidade.'
                });
            } else if (dados.triglicerides >= trigRef.limitrofe) {
                resultado.alertas.push({
                    tipo: 'atencao',
                    mensagem: `Triglicerídeos elevados (${dados.triglicerides} ${trigRef.unidade}). Fator de risco metabólico.`
                });
            }
        }
        
        // Calcular e analisar relação colesterol total/HDL se ambos estão presentes
        if (dados.colesterolTotal !== undefined && dados.hdl !== undefined && dados.hdl > 0) {
            const relacao = dados.colesterolTotal / dados.hdl;
            this.analisarRelacao(relacao, resultado);
        }
    },
    
    /**
     * Analisa a relação colesterol total/HDL
     * @param {number} relacao - Relação colesterol total/HDL
     * @param {Object} resultado - Objeto onde serão adicionados os resultados
     */
    analisarRelacao: function(relacao, resultado) {
        if (relacao === undefined) return;
        
        let interpretacao = '';
        let risco = '';
        
        if (relacao < 3.5) {
            interpretacao = 'Excelente';
            risco = 'Metade do risco médio';
        } else if (relacao < 5.0) {
            interpretacao = 'Bom';
            risco = 'Risco médio';
        } else if (relacao < 9.5) {
            interpretacao = 'Elevado';
            risco = 'Dobro do risco médio';
        } else {
            interpretacao = 'Muito elevado';
            risco = 'Triplo do risco médio';
        }
        
        resultado.analises.push({
            parametro: 'Relação Colesterol Total/HDL',
            valor: relacao.toFixed(1),
            interpretacao: interpretacao,
            referencia: 'Desejável: < 5.0'
        });
        
        if (relacao >= 5.0) {
            resultado.alertas.push({
                tipo: 'atencao',
                mensagem: `Relação Colesterol Total/HDL elevada (${relacao.toFixed(1)}). ${risco} para doença cardiovascular.`
            });
            
            resultado.condutas.push({
                texto: 'Considerar modificação do estilo de vida: dieta, exercício, cessação do tabagismo. Avaliar necessidade de tratamento farmacológico.'
            });
        }
    }
};

// Exportar para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PERFIL_LIPIDICO;
} else {
    // Para uso direto no navegador
    window.PERFIL_LIPIDICO = PERFIL_LIPIDICO;
}
