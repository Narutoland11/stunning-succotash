/**
 * Funções avançadas para análise de bioquímica
 * Módulo complementar para o sistema de análise laboratorial
 * Adaptado para contexto médico em Moçambique
 */

// Este objeto contém funções avançadas para análise bioquímica
const BIOQUIMICA_AVANCADA = {
    /**
     * Analisa perfil lipídico completo
     * @param {Object} dados - Dados do perfil lipídico (colesterolTotal, hdl, ldl, triglicerides)
     * @param {Object} paciente - Dados do paciente
     * @param {Object} resultado - Objeto onde serão adicionados os resultados
     */
    analisarPerfilLipidico: function(dados, paciente, resultado) {
        // Verificar se temos dados para análise
        if (!dados) return;
        
        // Importar valores de referência
        const valoresRef = typeof VALORES_REFERENCIA !== 'undefined' ? VALORES_REFERENCIA : {};
        
        // Analisar colesterol total
        if (dados.colesterolTotal !== undefined) {
            const colRef = valoresRef.bioquimica.colesterolTotal || { 
                desejavel: 200, 
                limítrofe: 240,
                unidade: 'mg/dL' 
            };
            
            let interpretacao = '';
            if (dados.colesterolTotal < colRef.desejavel) {
                interpretacao = 'Desejável';
            } else if (dados.colesterolTotal < colRef.limítrofe) {
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
            
            if (dados.colesterolTotal >= colRef.limítrofe) {
                resultado.alertas.push({
                    tipo: 'atencao',
                    mensagem: `Colesterol total elevado (${dados.colesterolTotal} ${colRef.unidade}). Risco aumentado para doença cardiovascular.`
                });
            }
        }
        
        // Analisar HDL
        if (dados.hdl !== undefined) {
            const hdlRef = valoresRef.bioquimica.hdl || {
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
    },
    
    /**
     * Analisa a relação colesterol total/HDL
     * @param {number} relacao - Relação colesterol total/HDL
     * @param {Object} resultado - Objeto onde serão adicionados os resultados
     */
    analisarRelacaoColesterolHDL: function(relacao, resultado) {
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
    },
    
    /**
     * Completa a análise do perfil lipídico com LDL e triglicerídeos
     * @param {Object} dados - Dados do perfil lipídico (ldl, triglicerides)
     * @param {Object} resultado - Objeto onde serão adicionados os resultados
     */
    completarPerfilLipidico: function(dados, resultado) {
        // Importar valores de referência
        const valoresRef = typeof VALORES_REFERENCIA !== 'undefined' ? VALORES_REFERENCIA : {};
        
        // Analisar LDL
        if (dados.ldl !== undefined) {
            const ldlRef = valoresRef.bioquimica.ldl || { 
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
            const trigRef = valoresRef.bioquimica.triglicerides || { 
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
    },
    
    /**
     * Analisa Ânion Gap
     * @param {number} anionGap - Valor do Ânion Gap calculado
     * @param {Object} resultado - Objeto onde serão adicionados os resultados
     */
    analisarAnionGap: function(anionGap, resultado) {
        if (anionGap === undefined) return;
        
        // Valores de referência para Ânion Gap
        const agRef = { min: 8, max: 16, unidade: 'mEq/L' };
        
        let interpretacao = '';
        if (anionGap < agRef.min) {
            interpretacao = 'Diminuído';
        } else if (anionGap <= agRef.max) {
            interpretacao = 'Normal';
        } else if (anionGap <= 20) {
            interpretacao = 'Levemente aumentado';
        } else if (anionGap <= 30) {
            interpretacao = 'Moderadamente aumentado';
        } else {
            interpretacao = 'Severamente aumentado';
        }
        
        resultado.analises.push({
            parametro: 'Ânion Gap',
            valor: `${anionGap} ${agRef.unidade}`,
            interpretacao: interpretacao,
            referencia: `${agRef.min}-${agRef.max} ${agRef.unidade}`
        });
        
        if (anionGap > agRef.max) {
            let mensagem = `Ânion Gap aumentado (${anionGap} ${agRef.unidade}).`;
            let tipo = 'atencao';
            
            // Adicionar possíveis causas baseado na magnitude do aumento
            if (anionGap > 30) {
                mensagem += ' Causas potenciais incluem cetoacidose diabética, acidose láctica, intoxicação por salicilato ou metanol.';
                tipo = 'importante';
                
                resultado.condutas.push({
                    texto: 'Avaliar urgentemente o estado ácido-base. Considerar gasometria arterial para avaliar acidose metabólica com anion gap elevado.'
                });
            } else if (anionGap > 20) {
                mensagem += ' Possível acidose metabólica com ânion gap aumentado.';
                
                resultado.condutas.push({
                    texto: 'Avaliar estado ácido-base. Verificar função renal, histórico de diabetes, uso de medicamentos e tóxicos.'
                });
            } else {
                mensagem += ' Possível acidose metabólica leve ou fase inicial.';
            }
            
            resultado.alertas.push({
                tipo: tipo,
                mensagem: mensagem
            });
        } else if (anionGap < agRef.min) {
            resultado.alertas.push({
                tipo: 'atencao',
                mensagem: `Ânion Gap diminuído (${anionGap} ${agRef.unidade}). Possíveis causas: hipoalbuminemia, mieloma múltiplo, intoxicação por bromo ou lítio.`
            });
        }
    },

/**
 * Analisa eletrólitos adicionais (magnésio, fósforo, cloro, bicarbonato)
 * @param {Object} dados - Dados dos eletrólitos adicionais
 * @param {Object} resultado - Objeto onde serão adicionados os resultados
 */
    analisarEletrolitosAdicionais: function(dados, resultado) {
    if (!dados) return;
    
    // Importar valores de referência
    const valoresRef = typeof VALORES_REFERENCIA !== 'undefined' ? VALORES_REFERENCIA : {};
    
    // Analisar magnésio
    if (dados.magnesio !== undefined) {
        const mgRef = valoresRef.bioquimica.magnesio || { min: 1.8, max: 2.4, unidade: 'mg/dL' };
        
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
        const pRef = valoresRef.bioquimica.fosforo || { min: 2.5, max: 4.5, unidade: 'mg/dL' };
        
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
        const clRef = valoresRef.bioquimica.cloro || { min: 98, max: 107, unidade: 'mEq/L' };
        
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
        const bicarbonatoRef = valoresRef.bioquimica.bicarbonato || { min: 22, max: 29, unidade: 'mEq/L' };
        
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
 * Analisa o Escore de Framingham e categoriza o risco cardiovascular
 * @param {Object} dados - Dados do escore de Framingham
 * @param {Object} resultado - Objeto onde serão adicionados os resultados
 */
    analisarEscoreFramingham: function(dados, resultado) {
    if (!dados || dados.pontuacao === undefined) return;
    
    // Classificação de risco
    let risco = '';
    let porcentagem = 0;
    
    if (dados.sexo === 'masculino') {
        if (dados.pontuacao < 10) {
            risco = 'Baixo';
            porcentagem = dados.pontuacao < 0 ? '<1' : dados.pontuacao;
        } else if (dados.pontuacao <= 14) {
            risco = 'Moderado';
            porcentagem = 20;
        } else if (dados.pontuacao <= 20) {
            risco = 'Alto';
            porcentagem = 25;
        } else {
            risco = 'Muito alto';
            porcentagem = dados.pontuacao > 30 ? '>30' : 30;
        }
    } else {
        if (dados.pontuacao < 15) {
            risco = 'Baixo';
            porcentagem = dados.pontuacao < 9 ? '<1' : 8;
        } else if (dados.pontuacao <= 20) {
            risco = 'Moderado';
            porcentagem = 11;
        } else if (dados.pontuacao <= 25) {
            risco = 'Alto';
            porcentagem = 20;
        } else {
            risco = 'Muito alto';
            porcentagem = dados.pontuacao > 30 ? '>30' : 27;
        }
    }
    
    // Adicionar ao resultado
    resultado.analises.push({
        parametro: 'Escore de Framingham',
        valor: `${dados.pontuacao} pontos`,
        interpretacao: `Risco ${risco} - ${porcentagem}% em 10 anos`,
        referencia: 'Baixo: <10% em 10 anos'
    });
    
    // Alertas e condutas
    if (risco === 'Alto' || risco === 'Muito alto') {
        resultado.alertas.push({
            tipo: 'importante',
            mensagem: `Risco cardiovascular ${risco.toLowerCase()} (${porcentagem}% em 10 anos). Necessita intervenção.`
        });
        
        resultado.condutas.push({
            texto: `Risco cardiovascular ${risco.toLowerCase()}: considerar tratamento intensivo dos fatores de risco modificáveis. Estatinas, controle pressórico rigoroso, modificações no estilo de vida.`
        });
    } else if (risco === 'Moderado') {
        resultado.alertas.push({
            tipo: 'atencao',
            mensagem: `Risco cardiovascular moderado (${porcentagem}% em 10 anos). Monitorar fatores de risco.`
        });
        
        resultado.condutas.push({
            texto: 'Intensificar medidas de prevenção primária: dieta, exercícios, cessação do tabagismo. Considerar medicamentos se múltiplos fatores de risco.'
        });
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
    module.exports = BIOQUIMICA_AVANCADA;
} else {
    // Para uso direto no navegador
    window.BIOQUIMICA_AVANCADA = BIOQUIMICA_AVANCADA;
}
