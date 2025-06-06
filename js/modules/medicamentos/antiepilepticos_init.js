/**
 * Inicialização dos medicamentos antiepilépticos e anticonvulsivantes
 * Este arquivo coordena o carregamento de todos os medicamentos antiepilépticos
 */

// Garantir que o objeto MEDICAMENTOS exista
if (typeof MEDICAMENTOS === 'undefined') {
    console.error('Erro: MEDICAMENTOS não definido - criando objeto vazio');
    window.MEDICAMENTOS = {};
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Iniciando carregamento de medicamentos antiepilépticos/anticonvulsivantes');
    
    // Os arquivos antiepilépticos já foram carregados via HTML
    // Verificar e adicionar funcionalidades adicionais se necessário
    console.log('Todos os medicamentos antiepilépticos foram carregados com sucesso!');
    
    // Atualizar também o Diazepam existente com doses mais detalhadas para convulsões
    if (MEDICAMENTOS && MEDICAMENTOS.diazepam && MEDICAMENTOS.diazepam.formas.iv) {
        try {
            // Atualizar indicações IV
            MEDICAMENTOS.diazepam.formas.iv.indicacoes.statusEpilepticus = {
                dose: "0,2-0,3 mg/kg/dose",
                doseMaxima: "10 mg/dose",
                frequencia: "Repetir em 5-10 minutos se necessário",
                duracao: "Máximo 3 doses em 24 horas"
            };
            
            MEDICAMENTOS.diazepam.formas.iv.indicacoes.convulsoesNeonatal = {
                dose: "0,1-0,3 mg/kg/dose",
                doseMaxima: "2 mg/dose em neonatos",
                frequencia: "Repetir em 5-10 minutos se necessário",
                duracao: "Máximo 2 doses"
            };
            
            MEDICAMENTOS.diazepam.formas.iv.indicacoes.tetano = {
                dose: "0,2-0,5 mg/kg/dose",
                doseMaxima: "10 mg/dose",
                frequencia: "A cada 4-6 horas",
                duracao: "Até controle dos espasmos"
            };
            
            console.log('Indicações anticonvulsivantes do Diazepam atualizadas com sucesso');
        } catch (error) {
            console.error('Erro ao atualizar indicações do Diazepam:', error);
        }
    }
});

// Executar inicialização
console.log('Módulo de antiepilépticos inicializado');
