/**
 * Pesquisa de Medicamentos
 * Este arquivo implementa a funcionalidade de pesquisa para o seletor de medicamentos
 */

// Iniciar a pesquisa de medicamentos assim que o documento estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Pequeno delay para garantir que outros scripts tenham sido executados
    setTimeout(() => {
        initPesquisaMedicamentos();
        console.log("Sistema de pesquisa de medicamentos inicializado");
    }, 100);
});

function initPesquisaMedicamentos() {
    const pesquisaInput = document.getElementById('pesquisa-medicamento');
    const medicamentoSelect = document.getElementById('medicamento');
    
    if (!pesquisaInput || !medicamentoSelect) {
        console.error('Elementos de pesquisa de medicamentos não encontrados');
        return;
    }
    
    // Armazenar as opções originais para poder restaurar durante a pesquisa
    let opcoesOriginais = [];
    
    // Capturar as opções originais após o carregamento das mesmas
    const observador = new MutationObserver((mutationsList) => {
        // Verificar se os medicamentos já foram carregados
        if (medicamentoSelect.options.length > 1 && opcoesOriginais.length === 0) {
            // Armazenar todas as opções originais
            Array.from(medicamentoSelect.options).forEach(option => {
                if (option.value) {  // Ignorar a opção "Selecione..."
                    opcoesOriginais.push({
                        valor: option.value,
                        texto: option.textContent,
                        elementoOption: option
                    });
                }
            });
            
            console.log(`${opcoesOriginais.length} medicamentos carregados e prontos para pesquisa`);
            
            // Inicializar o evento de pesquisa agora que temos as opções
            pesquisaInput.addEventListener('input', function() {
                filtrarMedicamentos();
            });
        }
    });
    
    // Configurar a observação para detectar quando as opções são adicionadas
    observador.observe(medicamentoSelect, { childList: true });
    
    // Função para filtrar medicamentos com base no texto de pesquisa
    function filtrarMedicamentos() {
        const termoPesquisa = pesquisaInput.value.toLowerCase().trim();
        
        // Se não houver termo de pesquisa, restaurar todas as opções originais
        if (!termoPesquisa) {
            restaurarOpcoesOriginais();
            return;
        }
        
        // Remover todas as opções, exceto a primeira (Selecione...)
        while (medicamentoSelect.options.length > 1) {
            medicamentoSelect.remove(1);
        }
        
        // Filtrar e adicionar apenas medicamentos que correspondem à pesquisa
        const opcoesFiltradas = opcoesOriginais.filter(opcao => 
            opcao.texto.toLowerCase().includes(termoPesquisa)
        );
        
        // Adicionar opções filtradas ao select
        opcoesFiltradas.forEach(opcao => {
            const novaOpcao = document.createElement('option');
            novaOpcao.value = opcao.valor;
            novaOpcao.textContent = opcao.texto;
            medicamentoSelect.appendChild(novaOpcao);
        });
        
        console.log(`Pesquisa: "${termoPesquisa}" - ${opcoesFiltradas.length} resultados encontrados`);
        
        // Se não houver resultados, mostrar mensagem
        if (opcoesFiltradas.length === 0) {
            const semResultados = document.createElement('option');
            semResultados.value = "";
            semResultados.textContent = "Nenhum medicamento encontrado";
            semResultados.disabled = true;
            medicamentoSelect.appendChild(semResultados);
        }
    }
    
    // Função para restaurar as opções originais
    function restaurarOpcoesOriginais() {
        // Remover todas as opções, exceto a primeira (Selecione...)
        while (medicamentoSelect.options.length > 1) {
            medicamentoSelect.remove(1);
        }
        
        // Re-adicionar todas as opções originais
        opcoesOriginais.forEach(opcao => {
            const novaOpcao = document.createElement('option');
            novaOpcao.value = opcao.valor;
            novaOpcao.textContent = opcao.texto;
            medicamentoSelect.appendChild(novaOpcao);
        });
    }
}
