/**
 * Funções avançadas para análise laboratorial
 * Adaptado para contexto médico real em Moçambique
 */

// Importar valores de referência
// Na página HTML, este arquivo deve ser carregado após valores_referencia.js
const valoresRef = typeof VALORES_REFERENCIA !== 'undefined' ? VALORES_REFERENCIA : {};

/**
 * Objeto principal para análise laboratorial avançada
 */
const ANALISE_LABORATORIO = {
    /**
     * Analisa um hemograma completo
     * @param {Object} dados - Dados do hemograma
     * @param {Object} paciente - Dados do paciente (sexo, idade, peso, gestante)
     * @returns {Object} Resultado da análise com interpretações e alertas
     */
    analisarHemograma: function(dados, paciente) {
        const resultado = {
            analises: [],
            alertas: [],
            condutas: []
        };
        
        try {
            // Verificar tipo de paciente para selecionar valores de referência corretos
            const tipoRef = this._determinarTipoReferencia(paciente);
            
            // Análise de hemoglobina e hematócrito
            if (dados.hemoglobina !== undefined) {
                this._analisarHemoglobina(dados.hemoglobina, tipoRef, resultado);
            }
            
            if (dados.hematocrito !== undefined) {
                this._analisarHematocrito(dados.hematocrito, tipoRef, resultado);
            }
            
            // Análise dos leucócitos
            if (dados.leucocitos !== undefined) {
                this._analisarLeucocitos(dados, tipoRef, resultado);
            }
            
            // Análise das plaquetas
            if (dados.plaquetas !== undefined) {
                this._analisarPlaquetas(dados.plaquetas, tipoRef, resultado);
            }
            
            // Análises específicas para contexto de Moçambique
            this._analisesEspecificasMocambique(dados, paciente, resultado);
            
            // Sugerir exames complementares se necessário
            this._sugerirExamesComplementares(resultado);
            
        } catch (error) {
            console.error("Erro na análise do hemograma:", error);
            resultado.alertas.push({
                tipo: "erro",
                mensagem: "Ocorreu um erro ao analisar o hemograma. Verifique os dados inseridos."
            });
        }
        
        return resultado;
    },
    
    /**
     * Analisa exames bioquímicos
     * @param {Object} dados - Dados bioquímicos
     * @param {Object} paciente - Dados do paciente
     * @returns {Object} Resultado da análise
     */
    analisarBioquimica: function(dados, paciente) {
        const resultado = {
            analises: [],
            alertas: [],
            condutas: []
        };
        
        try {
            // Análise da função renal
            if (dados.creatinina !== undefined || dados.ureia !== undefined) {
                this._analisarFuncaoRenal(dados, paciente, resultado);
            }
            
            // Se temos TFG estimada, inclui-la no resultado
            if (dados.tfgEstimada !== undefined) {
                this._analisarTFG(dados.tfgEstimada, resultado);
            }
            
            // Análise da função hepática
            if (dados.tgo !== undefined || dados.tgp !== undefined || 
                dados.bilirrubinaTotal !== undefined || dados.fosfataseAlcalina !== undefined ||
                dados.ggt !== undefined) {
                this._analisarFuncaoHepatica(dados, paciente, resultado);
            }
            
            // Análise de eletrólitos básicos
            if (dados.sodio !== undefined || dados.potassio !== undefined || 
                dados.calcio !== undefined) {
                this._analisarEletrolitos(dados, paciente, resultado);
            }
            
            // Análise de eletrólitos adicionais
            if (dados.eletrolitos && (
                dados.eletrolitos.magnesio !== undefined || 
                dados.eletrolitos.fosforo !== undefined || 
                dados.eletrolitos.cloro !== undefined || 
                dados.eletrolitos.bicarbonato !== undefined)) {
                this._analisarEletrolitosAdicionais(dados.eletrolitos, resultado);
            }
            
            // Análise da glicemia
            if (dados.glicemia !== undefined) {
                this._analisarGlicemia(dados, paciente, resultado);
            }
            
            // Análise de proteínas
            if (dados.proteinasTotais !== undefined || dados.albumina !== undefined) {
                this._analisarProteinas(dados, paciente, resultado);
            }
            
            // Análise do perfil lipídico
            if (dados.perfilLipidico && (
                dados.perfilLipidico.colesterolTotal !== undefined || 
                dados.perfilLipidico.hdl !== undefined || 
                dados.perfilLipidico.ldl !== undefined || 
                dados.perfilLipidico.triglicerides !== undefined)) {
                this._analisarPerfilLipidico(dados.perfilLipidico, paciente, resultado);
            }
            
            // Análise da função pancreática
            if (dados.funcaoPancreatica && (
                dados.funcaoPancreatica.amilase !== undefined || 
                dados.funcaoPancreatica.lipase !== undefined)) {
                this._analisarFuncaoPancreatica(dados.funcaoPancreatica, resultado);
            }
            
            // Análise de Ânion Gap se calculado
            if (dados.anionGap !== undefined) {
                this._analisarAnionGap(dados.anionGap, resultado);
            }
            
            // Análise da relação colesterol total/HDL
            if (dados.relacaoColesterolHDL !== undefined) {
                this._analisarRelacaoColesterolHDL(dados.relacaoColesterolHDL, resultado);
            }
            
            // Análise do escore de Framingham
            if (dados.escoreFramingham !== undefined) {
                this._analisarEscoreFramingham(dados.escoreFramingham, resultado);
            }
            
        } catch (error) {
            console.error("Erro na análise bioquímica:", error);
            resultado.alertas.push({
                tipo: "erro",
                mensagem: "Ocorreu um erro ao analisar os exames bioquímicos. Verifique os dados inseridos."
            });
        }
        
        return resultado;
    },
    
    /**
     * Determina qual tipo de referência utilizar baseado nos dados do paciente
     * @param {Object} paciente - Dados do paciente
     * @private
     * @returns {string} Tipo de referência a ser utilizada
     */
    _determinarTipoReferencia: function(paciente) {
        if (!paciente) return 'adulto';
        
        // Idade em anos (aproximada)
        let idadeAnos = paciente.idade;
        if (paciente.idadeUnidade === 'meses') {
            idadeAnos = paciente.idade / 12;
        } else if (paciente.idadeUnidade === 'dias') {
            idadeAnos = paciente.idade / 365;
        }
        
        // Determinar tipo de paciente
        if (idadeAnos < 0.08) { // ~28 dias
            return 'neonato';
        } else if (idadeAnos < 2) {
            return 'crianca24meses';
        } else if (idadeAnos < 12) {
            return 'crianca612Anos';
        } else {
            // Adulto
            if (paciente.sexo === 'feminino') {
                if (paciente.gestante) {
                    return paciente.trimestre === 3 ? 'gestante3Trim' : 'gestante1Trim';
                }
                return 'adultoFeminino';
            } else {
                return 'adultoMasculino';
            }
        }
    },
    
    /**
     * Analisa hemoglobina
     * @param {number} hemoglobina - Valor da hemoglobina
     * @param {string} tipoRef - Tipo de referência
     * @param {Object} resultado - Objeto resultado
     * @private
     */
    _analisarHemoglobina: function(hemoglobina, tipoRef, resultado) {
        const refs = valoresRef.hemograma.hemoglobina;
        
        // Selecionar referência correta
        let ref = refs.adultoMasculino;
        if (refs[tipoRef]) {
            ref = refs[tipoRef];
        }
        
        // Verificar anemia
        if (hemoglobina < ref.min) {
            const gravidade = this._determinarGravidadeAnemia(hemoglobina, tipoRef);
            resultado.analises.push({
                parametro: "Hemoglobina",
                valor: `${hemoglobina} ${ref.unidade}`,
                interpretacao: `Anemia ${gravidade}`,
                referencia: `${ref.min}-${ref.max} ${ref.unidade}`
            });
            
            // Alertas específicos para anemia
            if (gravidade === 'moderada' || gravidade === 'grave') {
                resultado.alertas.push({
                    tipo: "importante",
                    mensagem: `Anemia ${gravidade}: Hb ${hemoglobina} ${ref.unidade}`
                });
                
                // Condutas para anemia
                this._recomendarCondutasAnemia(hemoglobina, gravidade, tipoRef, resultado);
            }
        } else if (hemoglobina > ref.max) {
            resultado.analises.push({
                parametro: "Hemoglobina",
                valor: `${hemoglobina} ${ref.unidade}`,
                interpretacao: "Elevada (policitemia)",
                referencia: `${ref.min}-${ref.max} ${ref.unidade}`
            });
            
            resultado.alertas.push({
                tipo: "atencao",
                mensagem: `Hemoglobina elevada (${hemoglobina} ${ref.unidade}). Avaliar causas de policitemia.`
            });
        } else {
            resultado.analises.push({
                parametro: "Hemoglobina",
                valor: `${hemoglobina} ${ref.unidade}`,
                interpretacao: "Normal",
                referencia: `${ref.min}-${ref.max} ${ref.unidade}`
            });
        }
    },
    
    /**
     * Determina a gravidade da anemia
     * @param {number} hemoglobina - Valor da hemoglobina
     * @param {string} tipoRef - Tipo de referência
     * @private
     * @returns {string} Gravidade da anemia
     */
    _determinarGravidadeAnemia: function(hemoglobina, tipoRef) {
        // Critérios adaptados para Moçambique onde anemia é prevalente
        if (tipoRef.includes('gestante')) {
            if (hemoglobina < 7) return 'grave';
            if (hemoglobina < 9) return 'moderada';
            return 'leve';
        } else if (tipoRef.includes('crianca')) {
            if (hemoglobina < 7) return 'grave';
            if (hemoglobina < 9) return 'moderada';
            return 'leve';
        } else {
            if (hemoglobina < 8) return 'grave';
            if (hemoglobina < 10) return 'moderada';
            return 'leve';
        }
    },
    
    /**
     * Recomenda condutas para anemia
     * @param {number} hemoglobina - Valor da hemoglobina
     * @param {string} gravidade - Gravidade da anemia
     * @param {string} tipoRef - Tipo de referência
     * @param {Object} resultado - Objeto onde serão adicionados os resultados
     * @private
     */
    _recomendarCondutasAnemia: function(hemoglobina, gravidade, tipoRef, resultado) {
        if (gravidade === 'grave') {
            resultado.condutas.push({
                titulo: "Conduta para Anemia Grave",
                passos: [
                    "Considerar transfusão sanguínea se Hb < 7g/dL com sintomas",
                    "Investigar causas: perda sanguínea, hemólise, deficiência nutricional",
                    "Avaliar parasitemia (malária) em áreas endêmicas",
                    "Verificar presença de ancilostomíase ou esquistossomose"
                ]
            });
        } else if (gravidade === 'moderada') {
            resultado.condutas.push({
                titulo: "Conduta para Anemia Moderada",
                passos: [
                    "Suplementação de ferro oral (Sulfato Ferroso)",
                    "Tratar malária se positivo",
                    "Desparasitação com Albendazol/Mebendazol",
                    "Aconselhamento nutricional"
                ]
            });
        }
        
        // Condutas específicas para gestantes
        if (tipoRef.includes('gestante')) {
            resultado.condutas.push({
                titulo: "Atenção para Gestante com Anemia",
                passos: [
                    "Suplementação de ácido fólico 5mg/dia",
                    "Monitorar crescimento fetal",
                    "Acompanhamento pré-natal mais frequente"
                ]
            });
        }
    },
    
    // Mais funções de análise serão implementadas...
    
    /**
     * Análises específicas para o contexto de Moçambique
     * @param {Object} dados - Dados laboratoriais
     * @param {Object} paciente - Dados do paciente
     * @param {Object} resultado - Objeto onde serão adicionados os resultados
     * @private
     */
    _analisesEspecificasMocambique: function(dados, paciente, resultado) {
        // Verificar eosinofilia (comum em parasitoses)
        if (dados.eosinofilos && dados.eosinofilos > 6) {
            resultado.analises.push({
                parametro: "Eosinofilia",
                interpretacao: "Elevada (possível parasitose)",
                valor: `${dados.eosinofilos}%`
            });
            
            resultado.condutas.push({
                titulo: "Avaliar parasitoses",
                passos: [
                    "Coletar amostras seriadas de fezes",
                    "Considerar tratamento empírico para helmintos",
                    "Avaliar população periférica para esquistossomose em áreas endêmicas"
                ]
            });
        }
        
        // Verificar neutropenia ou neutrofilia (infecções)
        if (dados.neutrofilos) {
            if (dados.neutrofilos > 70) {
                resultado.analises.push({
                    parametro: "Neutrofilia",
                    interpretacao: "Elevada (possível infecção bacteriana)",
                    valor: `${dados.neutrofilos}%`
                });
            } else if (dados.neutrofilos < 40 && dados.leucocitos < 4.0) {
                resultado.analises.push({
                    parametro: "Neutropenia",
                    interpretacao: "Reduzida (possível efeito de medicamentos/HIV)",
                    valor: `${dados.neutrofilos}%`
                });
                
                resultado.alertas.push({
                    tipo: "atencao",
                    mensagem: "Neutropenia: considerar investigação de HIV ou efeitos de medicamentos."
                });
            }
        }
    },
    
    /**
     * Sugere exames complementares baseados nos resultados
     * @private
     */
    _sugerirExamesComplementares: function(resultado) {
        // Verificar alertas existentes e sugerir exames complementares
        const alertas = resultado.alertas || [];
        
        // Iterar sobre os alertas e sugerir exames com base no tipo
        for (const alerta of alertas) {
            // Anemia
            if (alerta.mensagem.includes('Anemia') && alerta.mensagem.includes('grave')) {
                resultado.condutas.push({
                    texto: 'Exames recomendados: ferritina, ferro sérico, capacidade de ligação do ferro, vitamina B12, folato, reticulócitos.'
                });
                break;
            }
            
            // Leucocitose
            if (alerta.mensagem.includes('Leucocitose')) {
                resultado.condutas.push({
                    texto: 'Considerar hemoculturas se suspeita de infecção bacteriana. Avaliar PCR e/ou VHS.'
                });
                break;
            }
        }
    },
    
    /**
     * Análise da TFG estimada
     * @param {number} tfg - TFG estimada
     * @param {Object} resultado - Objeto onde serão adicionados os resultados
     * @private
     */
    _analisarTFG: function(tfg, resultado) {
        // Classificação da TFG conforme KDIGO
        let interpretacao = '';
        let estadioDRC = '';
        
        if (tfg >= 90) {
            interpretacao = 'Normal ou aumentada';
            estadioDRC = 'G1';
        } else if (tfg >= 60) {
            interpretacao = 'Levemente diminuída';
            estadioDRC = 'G2';
        } else if (tfg >= 45) {
            interpretacao = 'Leve a moderadamente diminuída';
            estadioDRC = 'G3a';
        } else if (tfg >= 30) {
            interpretacao = 'Moderada a severamente diminuída';
            estadioDRC = 'G3b';
        } else if (tfg >= 15) {
            interpretacao = 'Severamente diminuída';
            estadioDRC = 'G4';
        } else {
            interpretacao = 'Falência renal';
            estadioDRC = 'G5';
        }
        
        // Adicionar ao resultado
        resultado.analises.push({
            parametro: 'TFG estimada',
            valor: `${tfg} mL/min/1.73m²`,
            interpretacao: `${interpretacao} (Estádio ${estadioDRC})`,
            referencia: '≥ 90 mL/min/1.73m²'
        });
        
        // Alertas e condutas
        if (tfg < 60) {
            resultado.alertas.push({
                tipo: 'atencao',
                mensagem: `TFG reduzida (${tfg} mL/min/1.73m²). Possível doença renal crônica estádio ${estadioDRC}.`
            });
            
            if (tfg < 30) {
                resultado.alertas.push({
                    tipo: 'importante',
                    mensagem: `TFG severamente reduzida. Considerar referência para nefrologia.`
                });
                
                resultado.condutas.push({
                    texto: `Paciente com possível DRC estádio ${estadioDRC}. Ajustar doses de medicamentos com eliminação renal. Considerar referência para nefrologia.`
                });
            } else if (tfg < 45) {
                resultado.condutas.push({
                    texto: `Paciente com possível DRC estádio ${estadioDRC}. Monitorar função renal regularmente. Verificar microalbuminúria e proteinúria.`
                });
            }
        }
    },
    
    /**
     * Análise da função pancreática
     * @param {Object} dados - Dados de função pancreática (amilase, lipase)
     * @param {Object} resultado - Objeto onde serão adicionados os resultados
     * @private
     */
    _analisarFuncaoPancreatica: function(dados, resultado) {
        // Análise da amilase
        if (dados.amilase !== undefined) {
            const amilaseRef = valoresRef.bioquimica.amilase || { min: 30, max: 110, unidade: 'U/L' };
            
            resultado.analises.push({
                parametro: 'Amilase',
                valor: `${dados.amilase} ${amilaseRef.unidade}`,
                interpretacao: this._interpretarValor(dados.amilase, amilaseRef.min, amilaseRef.max),
                referencia: `${amilaseRef.min}-${amilaseRef.max} ${amilaseRef.unidade}`
            });
            
            if (dados.amilase > amilaseRef.max * 3) {
                resultado.alertas.push({
                    tipo: 'importante',
                    mensagem: `Amilase significativamente elevada (${dados.amilase} ${amilaseRef.unidade}). Sugestivo de pancreatite aguda.`
                });
                
                resultado.condutas.push({
                    texto: 'Investigar pancreatite aguda. Considerar internação se dor abdominal intensa, vômitos ou sinais de desidratação.'
                });
            } else if (dados.amilase > amilaseRef.max) {
                resultado.alertas.push({
                    tipo: 'atencao',
                    mensagem: `Amilase elevada (${dados.amilase} ${amilaseRef.unidade}). Possível lesão pancreática.`
                });
            }
        }
        
        // Análise da lipase
        if (dados.lipase !== undefined) {
            const lipaseRef = valoresRef.bioquimica.lipase || { min: 0, max: 160, unidade: 'U/L' };
            
            resultado.analises.push({
                parametro: 'Lipase',
                valor: `${dados.lipase} ${lipaseRef.unidade}`,
                interpretacao: this._interpretarValor(dados.lipase, lipaseRef.min, lipaseRef.max),
                referencia: `${lipaseRef.min}-${lipaseRef.max} ${lipaseRef.unidade}`
            });
            
            if (dados.lipase > lipaseRef.max * 3) {
                resultado.alertas.push({
                    tipo: 'importante',
                    mensagem: `Lipase significativamente elevada (${dados.lipase} ${lipaseRef.unidade}). Alta especificidade para pancreatite aguda.`
                });
                
                if (dados.amilase === undefined || dados.amilase <= valoresRef.bioquimica.amilase.max * 3) {
                    resultado.condutas.push({
                        texto: 'Lipase significativamente elevada com maior especificidade para pancreatite aguda que a amilase.'
                    });
                }
            } else if (dados.lipase > lipaseRef.max) {
                resultado.alertas.push({
                    tipo: 'atencao',
                    mensagem: `Lipase elevada (${dados.lipase} ${lipaseRef.unidade}). Possível lesão pancreática.`
                });
            }
        }
        
        // Correlação entre amilase e lipase
        if (dados.amilase !== undefined && dados.lipase !== undefined) {
            const amilaseRef = valoresRef.bioquimica.amilase || { max: 110 };
            const lipaseRef = valoresRef.bioquimica.lipase || { max: 160 };
            
            if (dados.amilase > amilaseRef.max && dados.lipase > lipaseRef.max) {
                if (dados.lipase / lipaseRef.max > dados.amilase / amilaseRef.max * 2) {
                    resultado.condutas.push({
                        texto: 'Padrão de elevação da lipase > amilase é altamente sugestivo de pancreatite aguda. Considerar avaliação clínica completa.'
                    });
                }
            }
        }
    }
};

// Exportar para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ANALISE_LABORATORIO;
} else {
    // Para uso direto no navegador
    window.ANALISE_LABORATORIO = ANALISE_LABORATORIO;
}
