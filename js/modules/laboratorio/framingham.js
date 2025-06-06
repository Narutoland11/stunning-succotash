/**
 * Módulo para análise de risco cardiovascular pelo Escore de Framingham
 * Parte da implementação de análise bioquímica avançada
 * Adaptado para contexto médico em Moçambique
 */

// Objeto que contém as funções para análise do Escore de Framingham
const FRAMINGHAM = {
    /**
     * Analisa o Escore de Framingham e categoriza o risco cardiovascular
     * @param {Object} dados - Dados do escore de Framingham
     * @param {Object} resultado - Objeto onde serão adicionados os resultados
     */
    analisarRisco: function(dados, resultado) {
        if (!dados || dados.pontuacao === undefined || !dados.sexo) {
            return;
        }
        
        // Classificação de risco baseada no sexo e pontuação
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
        } else { // feminino
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
     * Calcula a pontuação do Escore de Framingham
     * @param {Object} paciente - Dados do paciente
     * @param {Object} dadosLab - Dados laboratoriais
     * @returns {Object} Dados com pontuação calculada
     */
    calcularPontuacao: function(paciente, dadosLab) {
        if (!paciente || !paciente.idade || !paciente.sexo || !dadosLab) {
            return { erro: "Dados insuficientes para cálculo" };
        }
        
        let pontuacao = 0;
        const sexo = paciente.sexo.toLowerCase();
        
        // Pontuação por idade
        if (sexo === 'masculino') {
            if (paciente.idade < 35) pontuacao -= 9;
            else if (paciente.idade < 40) pontuacao -= 4;
            else if (paciente.idade < 45) pontuacao = 0;
            else if (paciente.idade < 50) pontuacao += 3;
            else if (paciente.idade < 55) pontuacao += 6;
            else if (paciente.idade < 60) pontuacao += 8;
            else if (paciente.idade < 65) pontuacao += 10;
            else if (paciente.idade < 70) pontuacao += 11;
            else pontuacao += 12;
        } else { // feminino
            if (paciente.idade < 35) pontuacao -= 7;
            else if (paciente.idade < 40) pontuacao -= 3;
            else if (paciente.idade < 45) pontuacao = 0;
            else if (paciente.idade < 50) pontuacao += 3;
            else if (paciente.idade < 55) pontuacao += 6;
            else if (paciente.idade < 60) pontuacao += 8;
            else if (paciente.idade < 65) pontuacao += 10;
            else if (paciente.idade < 70) pontuacao += 12;
            else pontuacao += 14;
        }
        
        // Pontuação por colesterol total (ajustada pela idade)
        if (dadosLab.colesterolTotal) {
            const colTotal = dadosLab.colesterolTotal;
            let pontosCT = 0;
            
            if (sexo === 'masculino') {
                if (colTotal < 160) pontosCT = -3;
                else if (colTotal < 200) pontosCT = 0;
                else if (colTotal < 240) pontosCT = 1;
                else if (colTotal < 280) pontosCT = 2;
                else pontosCT = 3;
                
                // Ajuste pela idade
                if (paciente.idade >= 50) {
                    pontosCT -= 1; // Menos impacto para homens mais velhos
                }
            } else { // feminino
                if (colTotal < 160) pontosCT = -2;
                else if (colTotal < 200) pontosCT = 0;
                else if (colTotal < 240) pontosCT = 1;
                else if (colTotal < 280) pontosCT = 2;
                else pontosCT = 3;
                
                // Ajuste pela idade
                if (paciente.idade >= 55) {
                    pontosCT -= 1; // Menos impacto para mulheres mais velhas
                }
            }
            
            pontuacao += pontosCT;
        }
        
        // Pontuação por HDL
        if (dadosLab.hdl) {
            if (dadosLab.hdl < 35) pontuacao += 2;
            else if (dadosLab.hdl < 45) pontuacao += 1;
            else if (dadosLab.hdl < 50) {} // Nenhuma mudança na pontuação
            else if (dadosLab.hdl < 60) pontuacao -= 1;
            else pontuacao -= 2;
        }
        
        // Pontuação por pressão arterial
        if (paciente.pas && paciente.pad) {
            let pontosPAS = 0;
            
            if (paciente.pas < 120 && paciente.pad < 80) pontosPAS = 0;
            else if (paciente.pas < 130 && paciente.pad < 85) pontosPAS = 0;
            else if (paciente.pas < 140 && paciente.pad < 90) pontosPAS = 1;
            else if (paciente.pas < 160 && paciente.pad < 100) pontosPAS = 2;
            else pontosPAS = 3;
            
            pontuacao += pontosPAS;
        }
        
        // Pontuação por diabetes
        if (paciente.diabetes) {
            pontuacao += (sexo === 'masculino') ? 2 : 4;
        }
        
        // Pontuação por tabagismo
        if (paciente.tabagismo) {
            pontuacao += 2; // Mesma pontuação para ambos os sexos
        }
        
        return {
            pontuacao: pontuacao,
            sexo: sexo
        };
    }
};

// Exportar para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FRAMINGHAM;
} else {
    // Para uso direto no navegador
    window.FRAMINGHAM = FRAMINGHAM;
}
