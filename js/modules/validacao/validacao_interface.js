// ==================== INTERFACE PARA VALIDAÇÃO ====================

// Função intermediária para verificar necessidade de dupla verificação
function verificarNecessidadeDuplaVerificacao(dados) {
    // Extrai os dados
    const { medicamento, via, indicacao, peso, idade, idadeUnidade } = dados;
    
    // Prepara a estrutura de idade para o módulo de validação
    // Nota: Essa funcionalidade será implementada em uma versão futura
    
    // Calcula a dose estimada para avaliação
    const indicacaoData = MEDICAMENTOS[medicamento].formas[via].indicacoes[indicacao];
    const doseRange = indicacaoData.dose;
    const [minDose, maxDose] = doseRange.split('-').map(str => parseFloat(str.trim().split(' ')[0]));
    const doseEstimada = ((minDose + maxDose) / 2) * peso;
    
    // Verifica se:
    // 1. É um medicamento que requer dupla verificação
    // 2. Se há desvios significativos na dose
    const precisaDuplaVerificacao = requerDuplaVerificacao(medicamento, doseEstimada, via, indicacao);
    const temDesvioSignificativo = verificarDesvioDose(medicamento, via, indicacao, doseEstimada);
    
    // Retorna true se qualquer condição for verdadeira
    return precisaDuplaVerificacao || temDesvioSignificativo;
}

// Função para validar a dose com interface completa
function validarDoseCompleta(dados) {
    const { medicamento, via, indicacao, peso, idade, idadeUnidade } = dados;
    
    // Calcula a dose estimada para avaliação
    const indicacaoData = MEDICAMENTOS[medicamento].formas[via].indicacoes[indicacao];
    const doseRange = indicacaoData.dose;
    const [minDose, maxDose] = doseRange.split('-').map(str => parseFloat(str.trim().split(' ')[0]));
    const doseEstimada = ((minDose + maxDose) / 2) * peso;
    
    // Formato de idade para o validador
    const idadeObj = {
        valor: idade,
        unidade: idadeUnidade
    };
    
    // Obtem resultado da validação
    const resultadoValidacao = validarDose(medicamento, peso, idadeObj, indicacao, doseEstimada, via);
    
    // Verifica se há desvio significativo
    const emDesvio = verificarDesvioDose(medicamento, via, indicacao, doseEstimada);
    
    // Retorna o resultado padronizado com erros críticos e avisos
    return {
        errosCriticos: !resultadoValidacao.seguro ? resultadoValidacao.avisos.filter(a => a.includes('⚠️')) : [],
        avisos: resultadoValidacao.avisos,
        risco: resultadoValidacao.risco,
        emDesvio: emDesvio
    };
}

// Disponibiliza a função para o escopo global
window.verificarNecessidadeDuplaVerificacao = verificarNecessidadeDuplaVerificacao;
window.validarDoseCompleta = validarDoseCompleta;
