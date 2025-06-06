/**
 * Inicialização do objeto MEDICAMENTOS
 * Este script garante que o objeto MEDICAMENTOS esteja sempre definido
 * antes que outros scripts tentem acessá-lo
 */

// Criar o objeto MEDICAMENTOS global para garantir que esteja disponível em todos os scripts
(function() {
    // Certifique-se de que MEDICAMENTOS seja definido no escopo global (window)
    if (typeof window.MEDICAMENTOS === 'undefined') {
        console.log('Definindo objeto MEDICAMENTOS global');
        window.MEDICAMENTOS = {};
        
        // Também criar em escopo global como variável
        MEDICAMENTOS = window.MEDICAMENTOS;
    } else {
        console.log('Objeto MEDICAMENTOS já inicializado');
    }
    
    // Verificar após a definição
    setTimeout(function() {
        if (typeof window.MEDICAMENTOS !== 'undefined') {
            console.log('MEDICAMENTOS está definido corretamente no escopo global');
        } else {
            console.error('MEDICAMENTOS não foi definido corretamente');
        }
    }, 50);
})();

// Função auxiliar para carregar scripts de medicamentos dinamicamente
function carregarScriptMedicamentos(caminho) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = caminho;
        script.onload = () => {
            console.log(`Script carregado: ${caminho}`);
            resolve();
        };
        script.onerror = () => {
            console.warn(`Erro ao carregar script: ${caminho}`);
            reject();
        };
        document.head.appendChild(script);
    });
}

// Função para carregar medicamentos principais se necessário
async function garantirMedicamentosCarregados() {
    if (Object.keys(window.MEDICAMENTOS).length === 0) {
        console.log('Carregando definições de medicamentos...');
        try {
            // Carregar o arquivo principal de medicamentos se necessário
            await carregarScriptMedicamentos('js/modules/medicamentos/medicamentos.js');
            
            // Verificar se os medicamentos foram carregados
            if (Object.keys(window.MEDICAMENTOS).length === 0) {
                console.warn('Medicamentos não foram carregados corretamente. Criando objeto vazio.');
            } else {
                console.log('Medicamentos carregados com sucesso.');
            }
        } catch (error) {
            console.error('Falha ao carregar medicamentos:', error);
        }
    } else {
        console.log('Medicamentos já estão carregados.');
    }
}

// Iniciar o carregamento quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', garantirMedicamentosCarregados);
