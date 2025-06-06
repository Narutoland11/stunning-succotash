/**
 * Inicialização do objeto MEDICAMENTOS
 * Este script garante que o objeto MEDICAMENTOS esteja sempre definido
 * antes que outros scripts tentem acessá-lo
 */

// Criar o objeto MEDICAMENTOS global se ele ainda não existir
if (typeof window.MEDICAMENTOS === 'undefined') {
    console.log('Inicializando objeto MEDICAMENTOS global');
    window.MEDICAMENTOS = {};
} else {
    console.log('Objeto MEDICAMENTOS já inicializado');
}

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
