/**
 * Exames específicos para contexto moçambicano
 * Foco em malária, HIV, tuberculose e outras condições prevalentes
 */

const EXAMES_ESPECIFICOS = {
    /**
     * Análise de testes para malária
     * @param {Object} dados - Dados do exame
     * @returns {Object} Resultado da análise
     */
    analisarMalaria: function(dados) {
        const resultado = {
            analises: [],
            alertas: [],
            condutas: []
        };
        
        try {
            // Análise de teste rápido
            if (dados.testeRapido !== undefined) {
                this._analisarTesteRapidoMalaria(dados.testeRapido, resultado);
            }
            
            // Análise de gota espessa
            if (dados.parasitemia !== undefined) {
                this._analisarParasitemia(dados.parasitemia, resultado);
            }
            
            // Análise da gravidade clínica
            if (dados.clinica) {
                this._avaliarGravidadeMalaria(dados, resultado);
            }
        } catch (error) {
            console.error("Erro na análise de malária:", error);
            resultado.alertas.push({
                tipo: "erro",
                mensagem: "Ocorreu um erro ao analisar os exames de malária."
            });
        }
        
        return resultado;
    },
    
    /**
     * Analisa resultado de teste rápido para malária
     * @private
     */
    _analisarTesteRapidoMalaria: function(testeRapido, resultado) {
        if (testeRapido === true || testeRapido === 'positivo') {
            resultado.analises.push({
                parametro: "Teste rápido para malária",
                valor: "Positivo",
                interpretacao: "Infecção por Plasmodium detectada"
            });
            
            resultado.alertas.push({
                tipo: "importante",
                mensagem: "Teste rápido POSITIVO para malária. Iniciar tratamento conforme diretrizes."
            });
            
            resultado.condutas.push({
                titulo: "Conduta para Malária",
                passos: [
                    "Iniciar tratamento com arteméter/lumefantrina",
                    "Ou artesunato/amodiaquina conforme disponibilidade",
                    "Monitorizar febre e parasitemia",
                    "Garantir hidratação adequada"
                ]
            });
        } else if (testeRapido === false || testeRapido === 'negativo') {
            resultado.analises.push({
                parametro: "Teste rápido para malária",
                valor: "Negativo",
                interpretacao: "Não detectada infecção por Plasmodium"
            });
            
            // Mesmo com teste negativo, considerar clínica
            resultado.condutas.push({
                titulo: "Observação",
                passos: [
                    "Se alta suspeita clínica, repetir exame em 24h ou realizar gota espessa",
                    "Considerar outros diagnósticos diferenciais de síndrome febril"
                ]
            });
        }
    },
    
    /**
     * Analisa nível de parasitemia na malária
     * @private
     */
    _analisarParasitemia: function(parasitemia, resultado) {
        const refs = VALORES_REFERENCIA.malaria.parasitemia;
        
        let gravidade = "leve";
        if (parasitemia > refs.grave.min) {
            gravidade = "grave";
        } else if (parasitemia > refs.moderada.min) {
            gravidade = "moderada";
        }
        
        resultado.analises.push({
            parametro: "Parasitemia",
            valor: `${parasitemia}%`,
            interpretacao: `Malária com parasitemia ${gravidade}`
        });
        
        if (gravidade === "grave") {
            resultado.alertas.push({
                tipo: "urgente",
                mensagem: `Malária grave com parasitemia ${parasitemia}%. Considerar tratamento parenteral.`
            });
            
            resultado.condutas.push({
                titulo: "Malária Grave - Conduta Urgente",
                passos: [
                    "Iniciar artesunato IV/IM (2,4mg/kg) em 0, 12, 24h, depois 1x/dia",
                    "Monitorizar glicemia (hipoglicemia é comum)",
                    "Avaliar função renal e hepática",
                    "Considerar transfusão se anemia grave sintomática"
                ]
            });
        } else if (gravidade === "moderada") {
            resultado.condutas.push({
                titulo: "Malária Moderada - Conduta",
                passos: [
                    "Iniciar arteméter/lumefantrina (dose habitual)",
                    "Garantir tolerância à medicação oral",
                    "Repetir parasitemia em 48h para verificar resposta",
                    "Observar sinais de agravamento"
                ]
            });
        }
    },
    
    /**
     * Avalia gravidade clínica da malária
     * @private
     */
    _avaliarGravidadeMalaria: function(dados, resultado) {
        const sinaisGravidade = [];
        
        // Avaliar dados clínicos para determinar gravidade
        if (dados.clinica.consciencia === 'alterada') {
            sinaisGravidade.push("Alteração do nível de consciência");
        }
        
        if (dados.clinica.convulsoes) {
            sinaisGravidade.push("Convulsões");
        }
        
        if (dados.clinica.sangramento) {
            sinaisGravidade.push("Sangramento anormal");
        }
        
        if (dados.clinica.ictericia) {
            sinaisGravidade.push("Icterícia");
        }
        
        if (sinaisGravidade.length > 0) {
            resultado.alertas.push({
                tipo: "urgente",
                mensagem: `Sinais de malária grave: ${sinaisGravidade.join(", ")}`
            });
            
            resultado.condutas.push({
                titulo: "Malária Grave - Sinais Clínicos",
                passos: [
                    "Iniciar tratamento para malária grave",
                    "Considerar internamento/transferência para unidade de maior complexidade",
                    "Monitorização contínua de sinais vitais"
                ]
            });
        }
    },
    
    /**
     * Analisa resultados de exames para HIV
     * @param {Object} dados - Dados dos exames
     * @returns {Object} Resultado da análise
     */
    analisarHIV: function(dados) {
        const resultado = {
            analises: [],
            alertas: [],
            condutas: []
        };
        
        try {
            // Análise de teste rápido ou ELISA
            if (dados.testeDiagnostico !== undefined) {
                this._analisarTesteDiagnosticoHIV(dados.testeDiagnostico, resultado);
            }
            
            // Análise de CD4
            if (dados.cd4 !== undefined) {
                this._analisarCD4(dados.cd4, resultado);
            }
            
            // Análise de carga viral
            if (dados.cargaViral !== undefined) {
                this._analisarCargaViral(dados.cargaViral, resultado);
            }
        } catch (error) {
            console.error("Erro na análise de HIV:", error);
            resultado.alertas.push({
                tipo: "erro",
                mensagem: "Ocorreu um erro ao analisar os exames de HIV."
            });
        }
        
        return resultado;
    },
    
    /**
     * Analisa o resultado do teste diagnóstico para HIV
     * @private
     */
    _analisarTesteDiagnosticoHIV: function(testeDiagnostico, resultado) {
        if (testeDiagnostico === true || testeDiagnostico === 'positivo') {
            resultado.analises.push({
                parametro: "Teste para HIV",
                valor: "Positivo",
                interpretacao: "Infecção por HIV detectada"
            });
            
            resultado.alertas.push({
                tipo: "importante",
                mensagem: "Teste POSITIVO para HIV. Realizar avaliação completa."
            });
            
            resultado.condutas.push({
                titulo: "Conduta para HIV+",
                passos: [
                    "Solicitar CD4 e carga viral",
                    "Avaliar critérios para início de TARV",
                    "Rastreio para tuberculose e outras infecções oportunistas",
                    "Encaminhar para serviço especializado em HIV/SIDA"
                ]
            });
        } else {
            resultado.analises.push({
                parametro: "Teste para HIV",
                valor: "Negativo",
                interpretacao: "Infecção por HIV não detectada"
            });
            
            resultado.condutas.push({
                titulo: "Observação",
                passos: [
                    "Considerar janela imunológica se exposição recente",
                    "Reforçar medidas preventivas"
                ]
            });
        }
    },
    
    /**
     * Analisa a contagem de CD4
     * @private
     */
    _analisarCD4: function(cd4, resultado) {
        const refs = VALORES_REFERENCIA.hiv.cd4;
        
        let status = "normal";
        if (cd4 < refs.grave.max) {
            status = "grave";
        } else if (cd4 < refs.moderado.max) {
            status = "moderado";
        }
        
        resultado.analises.push({
            parametro: "CD4",
            valor: `${cd4} células/mm³`,
            interpretacao: status === "normal" ? "Preservado" : `Comprometimento ${status}`
        });
        
        if (status === "grave") {
            resultado.alertas.push({
                tipo: "urgente",
                mensagem: `CD4 muito baixo (${cd4} células/mm³). Alto risco de infecções oportunistas.`
            });
            
            resultado.condutas.push({
                titulo: "CD4 < 200 células/mm³",
                passos: [
                    "Iniciar TARV imediatamente se não estiver em uso",
                    "Profilaxia para infecções oportunistas (cotrimoxazol)",
                    "Rastreio ativo para tuberculose",
                    "Profilaxia para PCP (pneumonia por Pneumocystis)"
                ]
            });
        } else if (status === "moderado") {
            resultado.condutas.push({
                titulo: "CD4 entre 200-500 células/mm³",
                passos: [
                    "Iniciar TARV conforme diretrizes nacionais",
                    "Avaliar necessidade de profilaxias",
                    "Monitorar resposta ao tratamento"
                ]
            });
        }
    },
    
    /**
     * Analisa a carga viral do HIV
     * @private
     */
    _analisarCargaViral: function(cargaViral, resultado) {
        const refs = VALORES_REFERENCIA.hiv.cargaViral;
        
        let status = "indetectavel";
        if (cargaViral > refs.alta.min) {
            status = "alta";
        } else if (cargaViral > refs.moderada.min) {
            status = "moderada";
        } else if (cargaViral > refs.baixa.min) {
            status = "baixa";
        }
        
        resultado.analises.push({
            parametro: "Carga Viral",
            valor: `${cargaViral} cópias/mL`,
            interpretacao: status === "indetectavel" ? "Indetectável" : `${status.charAt(0).toUpperCase() + status.slice(1)}`
        });
        
        if (status === "alta") {
            resultado.alertas.push({
                tipo: "importante",
                mensagem: `Carga viral elevada (${cargaViral} cópias/mL). Avaliar adesão ou resistência.`
            });
            
            resultado.condutas.push({
                titulo: "Carga viral elevada",
                passos: [
                    "Verificar adesão ao tratamento",
                    "Considerar teste de genotipagem para resistência",
                    "Avaliar necessidade de troca de esquema TARV"
                ]
            });
        } else if (status === "indetectavel" || status === "baixa") {
            resultado.condutas.push({
                titulo: "Carga viral suprimida",
                passos: [
                    "Manter esquema atual",
                    "Reforçar importância da adesão ao tratamento",
                    "Monitoramento conforme diretrizes (6-12 meses)"
                ]
            });
        }
    },
    
    /**
     * Analisa exames para tuberculose
     * @param {Object} dados - Dados dos exames
     * @returns {Object} Resultado da análise
     */
    analisarTuberculose: function(dados) {
        const resultado = {
            analises: [],
            alertas: [],
            condutas: []
        };
        
        try {
            // Análise de baciloscopia
            if (dados.baciloscopia !== undefined) {
                this._analisarBaciloscopia(dados.baciloscopia, resultado);
            }
            
            // Análise de GeneXpert/MTB-RIF
            if (dados.geneXpert !== undefined) {
                this._analisarGeneXpert(dados.geneXpert, resultado);
            }
            
            // Análise de cultura
            if (dados.cultura !== undefined) {
                this._analisarCultura(dados.cultura, resultado);
            }
            
            // Análise de raio-X ou outros exames de imagem
            if (dados.imagem !== undefined) {
                this._analisarImagemTB(dados.imagem, resultado);
            }
        } catch (error) {
            console.error("Erro na análise de tuberculose:", error);
            resultado.alertas.push({
                tipo: "erro",
                mensagem: "Ocorreu um erro ao analisar os exames de tuberculose."
            });
        }
        
        return resultado;
    },
    
    /**
     * Analisa resultados de baciloscopia
     * @private
     */
    _analisarBaciloscopia: function(baciloscopia, resultado) {
        const refs = VALORES_REFERENCIA.tuberculose.baciloscopia;
        
        if (baciloscopia === refs.negativo) {
            resultado.analises.push({
                parametro: "Baciloscopia",
                valor: "Negativa",
                interpretacao: "BAAR não detectados"
            });
            
            resultado.condutas.push({
                titulo: "Baciloscopia Negativa",
                passos: [
                    "Se alta suspeita clínica, coletar novas amostras (até 3)",
                    "Considerar GeneXpert MTB/RIF ou cultura",
                    "Avaliar outras causas para sintomas"
                ]
            });
        } else {
            let positividade = "";
            if (baciloscopia === refs.positivo3) positividade = "alta";
            else if (baciloscopia === refs.positivo2) positividade = "moderada";
            else positividade = "baixa";
            
            resultado.analises.push({
                parametro: "Baciloscopia",
                valor: baciloscopia,
                interpretacao: `BAAR detectados (positividade ${positividade})`
            });
            
            resultado.alertas.push({
                tipo: "importante",
                mensagem: `Baciloscopia POSITIVA (${baciloscopia}). Iniciar tratamento para tuberculose.`
            });
            
            resultado.condutas.push({
                titulo: "Tuberculose Confirmada",
                passos: [
                    "Iniciar esquema básico (RHZE)",
                    "Testar para HIV se status desconhecido",
                    "Avaliar contatos domiciliares",
                    "Notificar caso às autoridades sanitárias"
                ]
            });
        }
    }
};

// Exportar para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EXAMES_ESPECIFICOS;
} else {
    // Para uso direto no navegador
    window.EXAMES_ESPECIFICOS = EXAMES_ESPECIFICOS;
}
