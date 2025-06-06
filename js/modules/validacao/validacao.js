// ==================== SISTEMA DE VALIDAÇÃO E DUPLA VERIFICAÇÃO ====================

// Configurações de níveis de alerta para medicamentos de alto risco
const MEDICAMENTOS_ALTO_RISCO = {
    midazolam: true,
    fentanil: true,
    morfina: true,
    adrenalina: true,
    insulina: true,
    digoxina: true,
    heparina: true,
    vancomicina: true,
    gentamicina: true,
    fenobarbital: true,
    warfarina: true,
    cloreto_potassio: true
};

// Lista de intervalos críticos para alertas especiais
const INTERVALOS_CRITICOS = {
    estreito: 0.2,  // Margem de erro de 20%
    moderado: 0.3,  // Margem de erro de 30%
    amplo: 0.5      // Margem de erro de 50%
};

// Funções de validação de dose
function validarDose(medicamento, peso, idade, indicacao, dose, via) {
    const resultados = {
        seguro: true,
        avisos: [],
        risco: 'baixo'
    };
    
    // Verifica se é um medicamento de alto risco
    if (MEDICAMENTOS_ALTO_RISCO[medicamento]) {
        resultados.risco = 'alto';
        resultados.avisos.push(`⚠️ ${MEDICAMENTOS[medicamento].nome} é um medicamento de ALTO RISCO. Verifique a dose cuidadosamente.`);
    }
    
    // Verifica se tem dose máxima definida
    if (MEDICAMENTOS[medicamento] && 
        MEDICAMENTOS[medicamento].formas[via] && 
        MEDICAMENTOS[medicamento].formas[via].indicacoes[indicacao]) {
        
        const indicacaoData = MEDICAMENTOS[medicamento].formas[via].indicacoes[indicacao];
        
        // Validação por dose máxima
        if (indicacaoData.doseMaxima) {
            const doseMaxima = parseFloat(indicacaoData.doseMaxima.split(' ')[0]);
            
            if (dose > doseMaxima) {
                resultados.seguro = false;
                resultados.avisos.push(`⚠️ DOSE EXCEDE O MÁXIMO RECOMENDADO (${doseMaxima} mg)`);
            } else if (dose > doseMaxima * 0.9) {
                resultados.avisos.push(`⚠️ DOSE PRÓXIMA AO LIMITE MÁXIMO (${doseMaxima} mg)`);
            }
        }
        
        // Validação por faixa etária
        if (indicacaoData.idadeMinima || indicacaoData.idadeMaxima) {
            const idadeEmMeses = converterIdadeParaMeses(idade);
            
            if (indicacaoData.idadeMinima && idadeEmMeses < indicacaoData.idadeMinima) {
                resultados.seguro = false;
                resultados.avisos.push(`⚠️ MEDICAMENTO NÃO RECOMENDADO PARA IDADE INFERIOR A ${formatarIdade(indicacaoData.idadeMinima)}`);
            }
            
            if (indicacaoData.idadeMaxima && idadeEmMeses > indicacaoData.idadeMaxima) {
                resultados.seguro = false;
                resultados.avisos.push(`⚠️ MEDICAMENTO NÃO RECOMENDADO PARA IDADE SUPERIOR A ${formatarIdade(indicacaoData.idadeMaxima)}`);
            }
        }
        
        // Validação por peso
        if (indicacaoData.pesoMinimo && peso < indicacaoData.pesoMinimo) {
            resultados.seguro = false;
            resultados.avisos.push(`⚠️ PESO INFERIOR AO MÍNIMO RECOMENDADO (${indicacaoData.pesoMinimo} kg)`);
        }
    }
    
    return resultados;
}

// Verificar desvios significativos em relação à dose padrão
function verificarDesvioDose(medicamento, via, indicacao, doseCalculada) {
    if (!MEDICAMENTOS[medicamento] || 
        !MEDICAMENTOS[medicamento].formas[via] || 
        !MEDICAMENTOS[medicamento].formas[via].indicacoes[indicacao]) {
        return false;
    }
    
    const indicacaoData = MEDICAMENTOS[medicamento].formas[via].indicacoes[indicacao];
    const doseRange = indicacaoData.dose;
    
    if (!doseRange.includes('-')) {
        return false; // Não podemos calcular o desvio se não houver um intervalo
    }
    
    const [minDose, maxDose] = doseRange.split('-').map(str => parseFloat(str.trim().split(' ')[0]));
    const doseMedia = (minDose + maxDose) / 2;
    const desvio = Math.abs(doseCalculada - doseMedia) / doseMedia;
    
    let tipoIntervalo = 'amplo';
    if (MEDICAMENTOS_ALTO_RISCO[medicamento]) {
        tipoIntervalo = 'estreito';
    } else if (indicacaoData.intervalo) {
        tipoIntervalo = indicacaoData.intervalo;
    }
    
    return desvio > INTERVALOS_CRITICOS[tipoIntervalo];
}

// Sistema de dupla verificação
function requerDuplaVerificacao(medicamento, dose, via, indicacao) {
    // Medicamentos que sempre requerem dupla verificação
    if (MEDICAMENTOS_ALTO_RISCO[medicamento]) {
        return true;
    }
    
    // Vias de administração que requerem dupla verificação
    if (via === 'iv' || via === 'epidural' || via === 'intratecal') {
        return true;
    }
    
    // Indicações críticas que requerem dupla verificação
    const indicacoesCriticas = ['sepse', 'meningite', 'status', 'paradaCardiaca'];
    if (indicacoesCriticas.includes(indicacao)) {
        return true;
    }
    
    return false;
}

// Função auxiliar para converter idade para meses
function converterIdadeParaMeses(idade) {
    if (!idade) return 0;
    
    const valor = parseFloat(idade.valor);
    const unidade = idade.unidade;
    
    if (unidade === 'anos') {
        return valor * 12;
    } else if (unidade === 'meses') {
        return valor;
    } else if (unidade === 'dias') {
        return valor / 30;
    } else if (unidade === 'horas') {
        return valor / 30 / 24;
    }
    
    return 0;
}

// Formatação de idade para exibição
function formatarIdade(meses) {
    if (meses < 1) {
        return `${Math.round(meses * 30)} dias`;
    } else if (meses < 24) {
        return `${meses} meses`;
    } else {
        return `${Math.floor(meses / 12)} anos`;
    }
}

// Exporta as funções para uso global
window.validarDose = validarDose;
window.verificarDesvioDose = verificarDesvioDose;
window.requerDuplaVerificacao = requerDuplaVerificacao;

// Aliases para garantir compatibilidade com o mainn.js
window.validarDoseCompleta = validarDose;
window.verificarNecessidadeDuplaVerificacao = requerDuplaVerificacao;
