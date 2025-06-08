// Configuração inicial moderna
document.addEventListener('DOMContentLoaded', function() {
    // Navegação por tabs suave
    const navLinks = document.querySelectorAll('nav a');
    const toolSections = document.querySelectorAll('.tool-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            toolSections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section with smooth transition
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.classList.add('active');
            
            // Smooth scroll to section
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
    
    // Inicializa todas as calculadoras
    initDoseCalculator();
    initElectrolyteCalculator();
    initGasometryCalculator();
    initProtocols();
    initTools();
    initLabCalculator();
    
    // Mostra a primeira seção por padrão
    document.querySelector('.tool-section').classList.add('active');
});

// Calculadora de Doses
function initDoseCalculator() {
    const pesoInput = document.getElementById('peso');
    const medicamentoSelect = document.getElementById('medicamento');
    const indicacaoSelect = document.getElementById('indicacao');
    const viaSelect = document.getElementById('via');
    const calcularBtn = document.getElementById('calcular-dose');
    const limparBtn = document.getElementById('limpar-dose');
    const resultadoContainer = document.getElementById('resultado-dose');
    
    console.log('Inicializando seletor de medicamentos...');
    console.log('MEDICAMENTOS object:', MEDICAMENTOS ? 'Disponível' : 'Não disponível');
    console.log('Total de medicamentos:', MEDICAMENTOS ? Object.keys(MEDICAMENTOS).length : 0);
    
    // Preenche os medicamentos em ordem alfabética
    medicamentoSelect.innerHTML = '<option value="">Selecione...</option>';
    
    try {
        // Cria um array de chaves e ordena pelo nome do medicamento
        const medicamentosOrdenados = Object.keys(MEDICAMENTOS || {}).sort((a, b) => {
            return MEDICAMENTOS[a].nome.localeCompare(MEDICAMENTOS[b].nome);
        });
        console.log('Medicamentos ordenados:', medicamentosOrdenados.length);
        
        // Adiciona os medicamentos ordenados ao select
        medicamentosOrdenados.forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = MEDICAMENTOS[key].nome;
            medicamentoSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao preencher medicamentos:', error);
    }
    
    // Atualiza indicações e vias quando o medicamento muda - Assegura que o evento seja adicionado apenas uma vez
    medicamentoSelect?.removeEventListener('change', medicamentoChangeHandler);
    medicamentoSelect?.addEventListener('change', medicamentoChangeHandler);
    
    function medicamentoChangeHandler(event) {
        const medicamento = medicamentoSelect.value;
        console.log('Evento change disparado, medicamento selecionado:', medicamento);
        
        // Limpa e desativa os selects
        indicacaoSelect.innerHTML = '<option value="">Selecione...</option>';
        viaSelect.innerHTML = '<option value="">Selecione...</option>';
        
        if (!medicamento) {
            console.log('Nenhum medicamento selecionado, desativando selects');
            indicacaoSelect.disabled = true;
            viaSelect.disabled = true;
            return;
        }
        
        // Verifica se os dados do medicamento existem
        if (!MEDICAMENTOS || !MEDICAMENTOS[medicamento] || !MEDICAMENTOS[medicamento].formas) {
            console.error('Dados do medicamento não disponíveis:', medicamento);
            indicacaoSelect.disabled = true;
            viaSelect.disabled = true;
            return;
        }
        
        // Preenche as indicações
        const indicacoes = new Set();
        Object.keys(MEDICAMENTOS[medicamento].formas).forEach(via => {
            if (MEDICAMENTOS[medicamento].formas[via].indicacoes) {
                Object.keys(MEDICAMENTOS[medicamento].formas[via].indicacoes).forEach(ind => {
                    indicacoes.add(ind);
                });
            }
        });
        
        indicacoes.forEach(ind => {
            const option = document.createElement('option');
            option.value = ind;
            option.textContent = INDICACOES[ind] || ind;
            indicacaoSelect.appendChild(option);
        });
        
        // Preenche as vias
        Object.keys(MEDICAMENTOS[medicamento].formas).forEach(via => {
            const option = document.createElement('option');
            option.value = via;
            option.textContent = VIAS[via] || via;
            viaSelect.appendChild(option);
        });
        
        indicacaoSelect.disabled = false;
        viaSelect.disabled = false;
        
        // Log para depuração
        console.log('Medicamento selecionado:', medicamento);
        console.log('Indicações disponíveis:', [...indicacoes]);
        console.log('Vias disponíveis:', Object.keys(MEDICAMENTOS[medicamento].formas));
    }
    
    // Calcula a dose - Assegura que o evento seja adicionado apenas uma vez
    calcularBtn?.removeEventListener('click', calcularDoseHandler);
    calcularBtn?.addEventListener('click', calcularDoseHandler);
    
    function calcularDoseHandler() {
        const peso = parseFloat(pesoInput.value);
        const idade = document.getElementById('idade') ? parseFloat(document.getElementById('idade').value) : null;
        const idadeUnidade = document.getElementById('idade-unidade') ? document.getElementById('idade-unidade').value : 'anos';
        const medicamento = medicamentoSelect.value;
        const indicacao = indicacaoSelect.value;
        const via = viaSelect.value;
        
        // Validação básica de entrada
        if (!peso || peso <= 0) {
            showAlert('Por favor, insira um peso válido maior que zero.', 'danger');
            return;
        }
        
        if (!medicamento) {
            showAlert('Por favor, selecione um medicamento.', 'danger');
            return;
        }
        
        if (!indicacao) {
            showAlert('Por favor, selecione uma indicação.', 'danger');
            return;
        }
        
        if (!via) {
            showAlert('Por favor, selecione uma via de administração.', 'danger');
            return;
        }
        
        // Verifica se a via selecionada tem a indicação
        if (!MEDICAMENTOS[medicamento].formas[via].indicacoes || !MEDICAMENTOS[medicamento].formas[via].indicacoes[indicacao]) {
            showAlert(`O medicamento ${MEDICAMENTOS[medicamento].nome} não está indicado para ${INDICACOES[indicacao]} via ${VIAS[via]}.`, 'warning');
            return;
        }

        // Obtém os dados da indicação e forma farmacêutica
        const indicacaoData = MEDICAMENTOS[medicamento].formas[via].indicacoes[indicacao];
        const formaData = MEDICAMENTOS[medicamento].formas[via];

        // Validação completa dos dados
        let validacaoResultado = {
            errosCriticos: [],
            avisos: [],
            emDesvio: false
        };
        
        try {
            // Verifica se a função existe antes de chamar
            if (typeof validarDoseCompleta === 'function') {
                const resultadoValidacao = validarDoseCompleta({
                    medicamento, 
                    peso, 
                    idade, 
                    idadeUnidade,
                    indicacao, 
                    via
                });
                
                // Apenas use o resultado se não for undefined
                if (resultadoValidacao) {
                    validacaoResultado = resultadoValidacao;
                }
            } else {
                console.warn('Função validarDoseCompleta não encontrada. Pulando validação.');
            }
            
            // Verifica se há erros críticos usando o operador opcional ?
            if (validacaoResultado?.errosCriticos?.length > 0) {
                // Se há erros críticos, bloqueia o cálculo
                showAlert(
                    `Não foi possível calcular a dose com segurança: ${validacaoResultado.errosCriticos.join(', ')}`, 
                    'danger'
                );
                return;
            }
        } catch (error) {
            console.error('Erro ao validar dose:', error);
            showAlert('Ocorreu um erro na validação dos dados, mas o cálculo continuará', 'warning');
            // Continua com o cálculo mesmo com erro na validação
        }

        // Verifica se é necessária dupla verificação
        let requerDuplaVerificacao = false;
        try {
            // Verifica se a função existe antes de chamar
            if (typeof verificarNecessidadeDuplaVerificacao === 'function') {
                requerDuplaVerificacao = verificarNecessidadeDuplaVerificacao({
                    medicamento: medicamento,
                    via: via,
                    indicacao: indicacao,
                    peso: peso,
                    idade: idade || 0, 
                    idadeUnidade: idadeUnidade || 'anos'
                });
            } else {
                console.warn('Função verificarNecessidadeDuplaVerificacao não encontrada');
            }
        } catch (error) {
            console.error('Erro ao verificar necessidade de dupla verificação:', error);
        }
        
        // Função para continuar o cálculo após verificação ou imediatamente se não precisar
        const continuarCalculo = () => {
            // Busca as referências para este medicamento/indicação
            let referenciasMedicas = [];
            let referenciasHTML = '';
            
            try {
                // Verifica se as funções existem antes de chama-las
                if (typeof obterReferencias === 'function') {
                    referenciasMedicas = obterReferencias(medicamento, indicacao);
                    
                    if (typeof gerarHTMLReferencias === 'function') {
                        referenciasHTML = gerarHTMLReferencias(referenciasMedicas);
                    }
                }
            } catch (error) {
                console.error('Erro ao obter referências:', error);
            }
            
            // Guarda as informações para mostrar no modal e resultados
            const avisos = validacaoResultado && validacaoResultado.avisos ? validacaoResultado.avisos : [];
        
            // Verifica se existe uma função de cálculo personalizada
            if (formaData && formaData.calculoDose) {
                const resultado = formaData.calculoDose(peso, indicacao);
                if (resultado) {
                    // Exibe os resultados do cálculo personalizado de forma segura
                    try {
                        const nomeMedicamentoEl = document.getElementById('nome-medicamento');
                        const doseCalculadaEl = document.getElementById('dose-calculada');
                        const formaFarmaceuticaEl = document.getElementById('forma-farmaceutica');
                        const posologiaEl = document.getElementById('posologia');
                        const frequenciaEl = document.getElementById('frequencia');
                        const duracaoEl = document.getElementById('duracao');
                        const doseMaximaEl = document.getElementById('dose-maxima');
                        
                        if (nomeMedicamentoEl) nomeMedicamentoEl.textContent = MEDICAMENTOS[medicamento]?.nome || medicamento;
                        if (doseCalculadaEl) doseCalculadaEl.textContent = resultado?.dose || '0';
                        if (formaFarmaceuticaEl) formaFarmaceuticaEl.textContent = formaData?.descricao || via;
                        if (posologiaEl) posologiaEl.textContent = indicacaoData?.dose || '';
                        if (frequenciaEl) frequenciaEl.textContent = indicacaoData?.frequencia || '';
                        if (duracaoEl) duracaoEl.textContent = indicacaoData?.duracao || '';
                        if (doseMaximaEl) doseMaximaEl.textContent = indicacaoData?.doseMaxima || 'Não especificada';
                        
                        // Passos de preparo
                        const passosLista = document.getElementById('passos-preparo');
                        if (passosLista) {
                            passosLista.innerHTML = '';
                            if (formaData?.passos && Array.isArray(formaData.passos)) {
                                formaData.passos.forEach(passo => {
                                    const li = document.createElement('li');
                                    li.textContent = passo;
                                    passosLista.appendChild(li);
                                });
                            }
                        }
                        
                        // Exibe as referências médicas
                        const refContainer = document.getElementById('referencias-container');
                        if (refContainer) {
                            refContainer.innerHTML = referenciasHTML || 'Sem referências disponíveis';
                        }
                        
                        // Precauções e avisos
                        const precaucoesLista = document.getElementById('precaucoes');
                        if (precaucoesLista) {
                            precaucoesLista.innerHTML = '';
                            
                            // Primeiro adiciona os avisos de segurança da validação, se existirem
                            if (avisos && avisos.length > 0) {
                                const avisosTitulo = document.createElement('h4');
                                avisosTitulo.textContent = 'Avisos de Segurança:';
                                precaucoesLista.appendChild(avisosTitulo);
                                
                                avisos.forEach(aviso => {
                                    const li = document.createElement('li');
                                    li.textContent = aviso;
                                    precaucoesLista.appendChild(li);
                                });
                            }
                            
                            // Depois adiciona as precauções do medicamento, se existirem
                            if (formaData?.precaucoes && Array.isArray(formaData.precaucoes)) {
                                const precaucoesTitulo = document.createElement('h4');
                                precaucoesTitulo.textContent = 'Precauções:';
                                precaucoesLista.appendChild(precaucoesTitulo);
                                
                                formaData.precaucoes.forEach(precaucao => {
                                    const li = document.createElement('li');
                                    li.textContent = precaucao;
                                    precaucoesLista.appendChild(li);
                                });
                            }
                        }
                    } catch (error) {
                        console.error('Erro ao exibir resultados do cálculo personalizado:', error);
                        showAlert('Ocorreu um erro ao exibir os resultados', 'warning');
                    }        
                    
                    // Adiciona detalhes adicionais se disponíveis
                    if (resultado.detalhes) {
                        const li = document.createElement('li');
                        li.innerHTML = `<strong>Detalhes:</strong> ${resultado.detalhes}`;
                        precaucoesLista.appendChild(li);
                    }
                    
                    // Adiciona as precauções padrão
                    if (formaData?.precaucoes && Array.isArray(formaData.precaucoes)) {
                        formaData.precaucoes.forEach(precaucao => {
                            const li = document.createElement('li');
                            li.textContent = precaucao;
                            precaucoesLista.appendChild(li);
                        });
                    }
                    
                    // Adiciona avisos de validação se houver
                    if (avisos.length > 0) {
                        const avisosTitulo = document.createElement('li');
                        avisosTitulo.innerHTML = '<strong>Avisos de segurança:</strong>';
                        precaucoesLista.appendChild(avisosTitulo);
                        
                        avisos.forEach(aviso => {
                            const li = document.createElement('li');
                            li.innerHTML = `<span class="aviso-seguranca">${aviso}</span>`;
                            precaucoesLista.appendChild(li);
                        });
                    }
                    
                    // Adiciona referências médicas
                    if (referenciasHTML) {
                        const refsContainer = document.createElement('div');
                        refsContainer.className = 'referencias-container';
                        refsContainer.innerHTML = `<h4>Referências Médicas</h4>${referenciasHTML}`;
                        document.getElementById('resultado-content').appendChild(refsContainer);
                    }
                    
                    // Mostra o resultado
                    resultadoContainer.classList.remove('hidden');
                    showAlert('Cálculo realizado com sucesso!', 'success');
                    return;
                }
            }
            
            // Cálculo pelo método padrão se não houver função personalizada
            // Declaração das variáveis no escopo da função continuarCalculo para acessá-las depois
            let doseCalculada = 0;
            let doseFormatada = 'Não calculada';
            let doseMaxima = Infinity;
            let doseAjustada = 0;
            let avisoDoseMaxima = '';
            
            try {
                // Verifica se os dados necessários estão disponíveis
                if (!indicacaoData || !indicacaoData.dose) {
                    console.error('Dados da indicação não encontrados.');
                    showAlert('Erro: informações sobre a dose não estão disponíveis para esta indicação.', 'danger');
                    return;
                }
                
                // Extrai a dose mínima e máxima da string de dose com tratamento de erros
                let minDose = 0, maxDose = 0;
                const doseRange = indicacaoData.dose;
                
                try {
                    // Tenta extrair valores de dose da string fornecida
                    if (doseRange.includes('-')) {
                        // Formato com intervalo: "10-20 mg/kg"
                        [minDose, maxDose] = doseRange.split('-')
                            .map(str => {
                                const numStr = str.trim().split(' ')[0];
                                const num = parseFloat(numStr);
                                return isNaN(num) ? 0 : num;
                            });
                    } else {
                        // Formato com valor único: "10 mg/kg"
                        const numStr = doseRange.trim().split(' ')[0];
                        minDose = maxDose = parseFloat(numStr);
                        if (isNaN(minDose)) {
                            minDose = maxDose = 0;
                        }
                    }
                } catch (error) {
                    console.error('Erro ao extrair valores de dose:', error);
                    minDose = maxDose = 0;
                }
                
                // Cálculo da dose com validação de valores
                doseCalculada = ((minDose + maxDose) / 2) * peso;
                
                // Formata a dose conforme a forma farmacêutica com validação
                if (!isNaN(doseCalculada) && isFinite(doseCalculada)) {
                    if (formaData?.tipo === 'solucao' || formaData?.tipo === 'suspensao') {
                        doseFormatada = doseCalculada.toFixed(2) + ' mg';
                    } else {
                        doseFormatada = Math.round(doseCalculada) + ' mg';
                    }
                } else {
                    doseFormatada = 'Não calculada';
                }
                
                // Verifica dose máxima com tratamento de erro
                try {
                    if (indicacaoData.doseMaxima) {
                        const doseMaxString = indicacaoData.doseMaxima.toString();
                        const doseMaxMatch = doseMaxString.match(/([\d\.]+)/);
                        if (doseMaxMatch) {
                            doseMaxima = parseFloat(doseMaxMatch[0]);
                        }
                    }
                } catch (error) {
                    console.warn('Erro ao extrair dose máxima:', error);
                    doseMaxima = Infinity;
                }
                
                // Aplica limite de dose máxima se não for infinito
                if (isFinite(doseMaxima) && !isNaN(doseMaxima) && doseCalculada > doseMaxima) {
                    doseCalculada = doseMaxima; // Ajusta a dose para a dose máxima
                    avisoDoseMaxima = ` (dose máxima de ${doseMaxima} mg atingida)`;
                }
            } catch (error) {
                console.error('Erro fatal no cálculo padrão:', error);
                showAlert('Ocorreu um erro ao calcular a dose. Verifique os dados inseridos.', 'danger');
                // Não retornamos aqui para permitir que a interface seja atualizada de qualquer forma
            }
            
            // Exibe os resultados com tratamento de erros
            try {
                // Identifica elementos do DOM com verificação de nulos
                const nomeMedicamentoEl = document.getElementById('nome-medicamento');
                const doseCalculadaEl = document.getElementById('dose-calculada');
                const formaFarmaceuticaEl = document.getElementById('forma-farmaceutica');
                const posologiaEl = document.getElementById('posologia');
                const frequenciaEl = document.getElementById('frequencia');
                const duracaoEl = document.getElementById('duracao');
                const doseMaximaEl = document.getElementById('dose-maxima');
                const passosLista = document.getElementById('passos-preparo');
                const precaucoesLista = document.getElementById('precaucoes');
                
                // Atualiza elementos apenas se existirem
                if (nomeMedicamentoEl) nomeMedicamentoEl.textContent = MEDICAMENTOS[medicamento]?.nome || medicamento;
                if (doseCalculadaEl) doseCalculadaEl.textContent = doseFormatada + (avisoDoseMaxima || '');
                if (formaFarmaceuticaEl) formaFarmaceuticaEl.textContent = formaData?.descricao || via;
                if (posologiaEl) posologiaEl.textContent = indicacaoData?.dose || '';
                if (frequenciaEl) frequenciaEl.textContent = indicacaoData?.frequencia || '';
                if (duracaoEl) duracaoEl.textContent = indicacaoData?.duracao || '';
                if (doseMaximaEl) doseMaximaEl.textContent = indicacaoData?.doseMaxima || 'Não especificada';
                
                // Passos de preparo
                if (passosLista) {
                    passosLista.innerHTML = '';
                    if (formaData?.passos && Array.isArray(formaData.passos)) {
                        formaData.passos.forEach(passo => {
                            if (passo) {
                                const li = document.createElement('li');
                                li.textContent = passo;
                                passosLista.appendChild(li);
                            }
                        });
                    }
                }
                
                // Precauções
                if (precaucoesLista) {
                    precaucoesLista.innerHTML = '';
                    
                    // Adiciona aviso de dose máxima se aplicável
                    if (avisoDoseMaxima && doseMaxima) {
                        const li = document.createElement('li');
                        li.innerHTML = `<strong>Dose máxima:</strong> A dose calculada excede a dose máxima recomendada. Use ${doseMaxima} mg.`;
                        precaucoesLista.appendChild(li);
                    }
                    
                    // Adiciona as precauções padrão
                    if (formaData?.precaucoes && Array.isArray(formaData.precaucoes)) {
                        formaData.precaucoes.forEach(precaucao => {
                            if (precaucao) {
                                const li = document.createElement('li');
                                li.textContent = precaucao;
                                precaucoesLista.appendChild(li);
                            }
                        });
                    }
                    
                    // Adiciona avisos de validação se houver
                    if (avisos && Array.isArray(avisos) && avisos.length > 0) {
                        const avisosTitulo = document.createElement('li');
                        avisosTitulo.innerHTML = '<strong>Avisos de segurança:</strong>';
                        precaucoesLista.appendChild(avisosTitulo);
                        
                        avisos.forEach(aviso => {
                            if (aviso) {
                                const li = document.createElement('li');
                                li.innerHTML = `<span class="aviso-seguranca">${aviso}</span>`;
                                precaucoesLista.appendChild(li);
                            }
                        });
                    }
                }
            } catch (error) {
                console.error('Erro ao exibir resultados na interface:', error);
                showAlert('Ocorreu um erro ao exibir os resultados do cálculo', 'warning');
            }
            
            // Adiciona referências médicas com verificação de elementos nulos
            try {
                if (referenciasHTML) {
                    const resultadoContent = document.getElementById('resultado-content');
                    if (resultadoContent) {
                        const refsContainer = document.createElement('div');
                        refsContainer.className = 'referencias-container';
                        refsContainer.innerHTML = `<h4>Referências Médicas</h4>${referenciasHTML}`;
                        resultadoContent.appendChild(refsContainer);
                    } else {
                        console.warn('Elemento resultado-content não encontrado para adicionar referências');
                    }
                }
            } catch (error) {
                console.error('Erro ao adicionar referências médicas:', error);
            }
            
            // Mostra o resultado
            resultadoContainer.classList.remove('hidden');
            showAlert('Cálculo realizado com sucesso!', 'success');
        };  // Fim da função continuarCalculo
        
        // Verifica se precisa de dupla verificação e executa o fluxo adequado
        if (requerDuplaVerificacao) {
            try {
                // Configura o modal de dupla verificação
                const modal = document.getElementById('confirmacao-modal');
                const listaAvisos = document.getElementById('confirmacao-lista-avisos');
                const btnCancelar = document.getElementById('confirmacao-cancelar');
                const btnConfirmar = document.getElementById('confirmacao-confirmar');
                
                if (modal && listaAvisos && btnCancelar && btnConfirmar) {
                    // Limpa e preenche a lista de avisos no modal
                    listaAvisos.innerHTML = '';
                    if (validacaoResultado && validacaoResultado.avisos) {
                        validacaoResultado.avisos.forEach(aviso => {
                            const li = document.createElement('li');
                            li.textContent = aviso;
                            listaAvisos.appendChild(li);
                        });
                    }
                    
                    // Exibe o modal
                    modal.style.display = 'flex';
                    
                    // Configura os botões
                    btnCancelar.onclick = () => {
                        modal.style.display = 'none';
                        showAlert('Cálculo cancelado pelo usuário', 'warning');
                    };
                    
                    btnConfirmar.onclick = () => {
                        modal.style.display = 'none';
                        continuarCalculo();
                    };
                } else {
                    console.error('Um ou mais elementos do modal não foram encontrados');
                    showAlert('Erro ao exibir confirmação. Continuando cálculo sem validação.', 'warning');
                    continuarCalculo();
                }
            } catch (error) {
                console.error('Erro ao mostrar modal de confirmação:', error);
                showAlert('Erro ao exibir confirmação. Continuando cálculo sem validação.', 'warning');
                continuarCalculo();
            }
        } else {
            // Se não precisa de dupla verificação, segue direto
            continuarCalculo();
        }
    });
    
    // Limpa o formulário
    limparBtn.addEventListener('click', function() {
        pesoInput.value = '';
        medicamentoSelect.selectedIndex = 0;
        indicacaoSelect.innerHTML = '<option value="">Selecione...</option>';
        viaSelect.innerHTML = '<option value="">Selecione...</option>';
        indicacaoSelect.disabled = true;
        viaSelect.disabled = true;
        resultadoContainer.classList.add('hidden');
    });
    
    // Impressão
    document.getElementById('imprimir-dose').addEventListener('click', function() {
        window.print();
    });
}

// Calculadora de Eletrólitos
function initElectrolyteCalculator() {
    const electrolyteType = document.getElementById('electrolyte-type');
    const sodioForm = document.getElementById('sodio-form');
    const potassioForm = document.getElementById('potassio-form');
    const calcioForm = document.getElementById('calcio-form');
    
    // Mostra o formulário correto quando o tipo de eletrólito muda
    electrolyteType.addEventListener('change', function() {
        sodioForm.style.display = 'none';
        potassioForm.style.display = 'none';
        calcioForm.style.display = 'none';
        
        switch(this.value) {
            case 'sodio':
                sodioForm.style.display = 'block';
                break;
            case 'potassio':
                potassioForm.style.display = 'block';
                break;
            case 'calcio':
                calcioForm.style.display = 'block';
                break;
        }
    });
    
    // Cálculo de sódio
    document.getElementById('calcular-sodio').addEventListener('click', function() {
        const peso = parseFloat(document.getElementById('sodio-peso').value);
        const sodioAtual = parseFloat(document.getElementById('sodio-atual').value);
        const sodioDesejado = parseFloat(document.getElementById('sodio-desejado').value);
        
        if (!peso || !sodioAtual || !sodioDesejado) {
            showAlert('Por favor, preencha todos os campos.', 'danger');
            return;
        }
        
        const deficit = FORMULAS.deficitSodio(peso, sodioAtual, sodioDesejado);
        const velocidade = sodioAtual < 120 ? 'Corrigir 4-6 mEq/L nas primeiras 24h' : 'Corrigir 8-10 mEq/L nas primeiras 24h';
        
        document.getElementById('deficit-sodio').textContent = deficit.toFixed(2) + ' mEq';
        document.getElementById('velocidade-sodio').textContent = velocidade;
        document.getElementById('resultado-sodio').classList.remove('hidden');
        showAlert('Cálculo de sódio realizado com sucesso!', 'success');
    });
    
    // Cálculo de potássio
    document.getElementById('calcular-potassio').addEventListener('click', function() {
        const peso = parseFloat(document.getElementById('potassio-peso').value);
        const potassioAtual = parseFloat(document.getElementById('potassio-atual').value);
        const potassioDesejado = parseFloat(document.getElementById('potassio-desejado').value);
        
        if (!peso || !potassioAtual || !potassioDesejado) {
            showAlert('Por favor, preencha todos os campos.', 'danger');
            return;
        }
        
        const deficit = FORMULAS.correcaoPotassio(peso, potassioAtual, potassioDesejado);
        const velocidade = potassioAtual < 2.5 ? 'Corrigir imediatamente com KCl IV' : 'Corrigir com KCl oral ou IV em 24-48h';
        
        document.getElementById('deficit-potassio').textContent = deficit.toFixed(2) + ' mEq';
        document.getElementById('velocidade-potassio').textContent = velocidade;
        document.getElementById('resultado-potassio').classList.remove('hidden');
        showAlert('Cálculo de potássio realizado com sucesso!', 'success');
    });
    
    // Cálculo de cálcio
    document.getElementById('calcular-calcio').addEventListener('click', function() {
        const peso = parseFloat(document.getElementById('calcio-peso').value);
        const calcioAtual = parseFloat(document.getElementById('calcio-atual').value);
        const calcioDesejado = parseFloat(document.getElementById('calcio-desejado').value);
        
        if (!peso || !calcioAtual || !calcioDesejado) {
            showAlert('Por favor, preencha todos os campos.', 'danger');
            return;
        }
        
        const deficit = FORMULAS.correcaoCalcio(peso, calcioAtual, calcioDesejado);
        const velocidade = calcioAtual < 7 ? 'Corrigir imediatamente com gluconato de cálcio IV' : 'Corrigir com suplementos orais em 24-48h';
        
        document.getElementById('deficit-calcio').textContent = deficit.toFixed(2) + ' mg';
        document.getElementById('velocidade-calcio').textContent = velocidade;
        document.getElementById('resultado-calcio').classList.remove('hidden');
        showAlert('Cálculo de cálcio realizado com sucesso!', 'success');
    });
}

// Interpretador de Gasometria
function initGasometryCalculator() {
    document.getElementById('analyze-gasometry').addEventListener('click', function() {
        const ph = parseFloat(document.getElementById('ph').value);
        const pco2 = parseFloat(document.getElementById('pco2').value);
        const hco3 = parseFloat(document.getElementById('hco3').value);
        const na = parseFloat(document.getElementById('na').value);
        const cl = parseFloat(document.getElementById('cl').value);
        
        if (!ph || !pco2 || !hco3 || !na || !cl) {
            showAlert('Por favor, preencha todos os campos obrigatórios.', 'danger');
            return;
        }
        
        let resultado = "<h4>Análise da Gasometria</h4>";
        
        // Avaliação primária do pH
        if (ph < 7.35) {
            resultado += "<p><strong>Acidemia</strong> (pH baixo)</p>";
        } else if (ph > 7.45) {
            resultado += "<p><strong>Alcalemia</strong> (pH alto)</p>";
        } else {
            resultado += "<p><strong>pH normal</strong></p>";
        }
        
        // Avaliação do componente respiratório
        if (pco2 > 45 && ph < 7.35) {
            resultado += "<p>Acidose respiratória primária</p>";
        } else if (pco2 < 35 && ph > 7.45) {
            resultado += "<p>Alcalose respiratória primária</p>";
        } else if (pco2 > 45 && ph > 7.45) {
            resultado += "<p>Compensação metabólica para alcalose metabólica crônica</p>";
        } else if (pco2 < 35 && ph < 7.35) {
            resultado += "<p>Compensação respiratória para acidose metabólica</p>";
        }
        
        // Avaliação do componente metabólico
        if (hco3 < 22 && ph < 7.35) {
            resultado += "<p>Acidose metabólica primária</p>";
            
            // Cálculo do anion gap
            const anionGap = FORMULAS.anionGap(na, cl, hco3);
            resultado += `<p>Anion Gap: ${anionGap.toFixed(1)} mEq/L (normal: 8-16 mEq/L)</p>`;
            
            if (anionGap > 16) {
                resultado += "<p>Anion Gap elevado - acidose metabólica com anion gap alto</p>";
            } else {
                resultado += "<p>Anion Gap normal - acidose metabólica hiperclorêmica</p>";
            }
            
            // Cálculo do excesso de base
            const excessoBase = FORMULAS.excessoBase(hco3);
            resultado += `<p>Excesso de Base: ${excessoBase.toFixed(1)} mEq/L</p>`;
            
        } else if (hco3 > 26 && ph > 7.45) {
            resultado += "<p>Alcalose metabólica primária</p>";
        }
        
        // Avaliação da oxigenação (se disponível)
        const lactato = document.getElementById('lactato').value;
        if (lactato) {
            const lactatoNum = parseFloat(lactato);
            if (lactatoNum > 2) {
                resultado += `<p><strong>Elevação de lactato</strong> (${lactatoNum} mmol/L) - possível hipoperfusão tecidual</p>`;
            }
        }
        
        document.getElementById('gasometry-analysis').innerHTML = resultado;
        document.getElementById('gasometry-result').classList.remove('hidden');
        showAlert('Análise de gasometria concluída!', 'success');
    });
}

// Protocolos Clínicos
function initProtocols() {
    const protocoloSelect = document.getElementById('protocolo');
    
    // Verifica se o objeto PROTOCOLOS existe
    if (typeof PROTOCOLOS === 'undefined' || !PROTOCOLOS) {
        console.warn('Objeto PROTOCOLOS não está definido. Verificando se está sendo carregado...');
        return; // Sai da função se o objeto não estiver disponível
    }
    
    // Preenche os protocolos
    protocoloSelect.innerHTML = '<option value="">Selecione...</option>';
    Object.keys(PROTOCOLOS).forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        try {
            // Verifica se o protocolo e a propriedade titulo existem
            if (PROTOCOLOS[key] && PROTOCOLOS[key].titulo) {
                option.textContent = PROTOCOLOS[key].titulo.replace('Protocolo de Tratamento para ', '');
            } else {
                // Se não tiver título, usa o nome do protocolo formatado
                option.textContent = key.charAt(0).toUpperCase() + key.slice(1);
                console.log(`Protocolo ${key} não tem título definido. Usando nome padrão.`);
            }
        } catch (error) {
            console.error(`Erro ao processar protocolo ${key}:`, error);
            option.textContent = key; // Usa a chave como fallback
        }
        protocoloSelect.appendChild(option);
    });
    
    // Mostra o protocolo selecionado
    protocoloSelect.addEventListener('change', function() {
        const protocolo = this.value;
        const container = document.getElementById('protocolo-content');
        
        if (!protocolo) {
            container.classList.add('hidden');
            return;
        }
        
        document.getElementById('protocolo-title').textContent = PROTOCOLOS[protocolo].titulo;
        document.getElementById('protocolo-text').innerHTML = PROTOCOLOS[protocolo].conteudo;
        container.classList.remove('hidden');
    });
}

// Ferramentas Úteis
function initTools() {
    // Calculadora de percentis
    document.getElementById('calculate-percentile').addEventListener('click', function() {
        const gender = document.getElementById('child-gender').value;
        const age = parseInt(document.getElementById('child-age').value);
        const weight = parseFloat(document.getElementById('child-weight').value);
        const height = parseFloat(document.getElementById('child-height').value);
        
        if (!age || age < 0 || age > 60) {
            showAlert('Por favor, insira uma idade válida (0-60 meses).', 'danger');
            return;
        }
        
        // Encontra os dados de percentil para a idade
        const weightData = PERCENTIS.pesoIdade[gender === 'male' ? 'meninos' : 'meninas'].find(d => d.idade === Math.min(age, 60));
        const heightData = PERCENTIS.alturaIdade[gender === 'male' ? 'meninos' : 'meninas'].find(d => d.idade === Math.min(age, 60));
        
        if (!weightData || !heightData) {
            showAlert('Dados não disponíveis para esta idade.', 'warning');
            return;
        }
        
        // Calcula percentil de peso
        let weightPercentile = 'Abaixo do P3';
        if (weight >= weightData.p97) weightPercentile = 'Acima do P97';
        else if (weight >= weightData.p85) weightPercentile = 'P85-P97';
        else if (weight >= weightData.p50) weightPercentile = 'P50-P85';
        else if (weight >= weightData.p15) weightPercentile = 'P15-P50';
        else if (weight >= weightData.p3) weightPercentile = 'P3-P15';
        
        // Calcula percentil de altura
        let heightPercentile = 'Abaixo do P3';
        if (height >= heightData.p97) heightPercentile = 'Acima do P97';
        else if (height >= heightData.p85) heightPercentile = 'P85-P97';
        else if (height >= heightData.p50) heightPercentile = 'P50-P85';
        else if (height >= heightData.p15) heightPercentile = 'P15-P50';
        else if (height >= heightData.p3) heightPercentile = 'P3-P15';
        
        document.getElementById('percentil-peso').textContent = weightPercentile;
        document.getElementById('percentil-altura').textContent = heightPercentile;
        document.getElementById('percentile-result').classList.remove('hidden');
        showAlert('Percentil calculado com sucesso!', 'success');
    });
    
    // Status do paciente
    document.getElementById('save-status').addEventListener('click', function() {
        const status = document.getElementById('patient-status').value;
        const statusIndicator = document.getElementById('current-status');
        
        // Atualiza o indicador de status
        statusIndicator.className = `status-${status}`;
        statusIndicator.textContent = 
            status === 'stable' ? 'Estável' : 
            status === 'observation' ? 'Em Observação' : 'Crítico';
        
        document.getElementById('status-indicator').classList.remove('hidden');
        
        // Mostra alerta
        showAlert(`Status do paciente atualizado para: ${statusIndicator.textContent}`, 'success');
    });
}

// Função auxiliar para mostrar alertas modernos
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.innerHTML = `
        <div class="alert-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'warning' ? 'fa-exclamation-triangle' : 'fa-times-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Remove o alerta após 3 segundos
    setTimeout(() => {
        alertDiv.style.opacity = '0';
        setTimeout(() => alertDiv.remove(), 300);
    }, 3000);
}

// Inicializa a calculadora laboratorial
function initLabCalculator() {
    // Tabs de navegação
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Remove active class de todos os botões e conteúdos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Adiciona active class ao botão clicado e conteúdo correspondente
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Análise de hemograma
    document.getElementById('analisar-hemograma').addEventListener('click', analyzeHemogram);
    document.getElementById('limpar-hemograma').addEventListener('click', clearHemogram);
    
    // Análise de bioquímica
    document.getElementById('analisar-bioquimica').addEventListener('click', analyzeBiochemistry);
    document.getElementById('limpar-bioquimica').addEventListener('click', clearBiochemistry);
}

// Valores de referência para hemograma (pediátricos)
const HEMOGRAM_REFERENCE = {
    hemoglobina: { min: 11.5, max: 15.5, unidade: 'g/dL' },
    hematocrito: { min: 35, max: 45, unidade: '%' },
    leucocitos: { min: 5, max: 15, unidade: 'x10³/µL' },
    plaquetas: { min: 150, max: 450, unidade: 'x10³/µL' },
    neutrofilos: { min: 30, max: 60, unidade: '%' },
    linfocitos: { min: 20, max: 50, unidade: '%' },
    monocitos: { min: 2, max: 10, unidade: '%' },
    eosinofilos: { min: 1, max: 6, unidade: '%' },
    bastonetes: { min: 0, max: 5, unidade: '%' }
};

// Valores de referência para bioquímica (pediátricos)
const BIOCHEMISTRY_REFERENCE = {
    glicemia: { min: 70, max: 100, unidade: 'mg/dL', jejum: true },
    ureia: { min: 10, max: 40, unidade: 'mg/dL' },
    creatinina: { 
        '0-1mes': { min: 0.2, max: 0.5 },
        '1mes-1ano': { min: 0.2, max: 0.4 },
        '1-5anos': { min: 0.3, max: 0.5 },
        '5-10anos': { min: 0.5, max: 0.8 },
        '>10anos': { min: 0.6, max: 1.1 },
        unidade: 'mg/dL'
    },
    tgo: { min: 10, max: 40, unidade: 'U/L' },
    tgp: { min: 10, max: 35, unidade: 'U/L' },
    bilirrubinaTotal: { min: 0.2, max: 1.2, unidade: 'mg/dL' },
    bilirrubinaDireta: { min: 0, max: 0.3, unidade: 'mg/dL' },
    proteinasTotais: { min: 6, max: 8, unidade: 'g/dL' },
    albumina: { min: 3.5, max: 5.5, unidade: 'g/dL' },
    sodio: { min: 135, max: 145, unidade: 'mEq/L' },
    potassio: { min: 3.5, max: 5.0, unidade: 'mEq/L' },
    calcio: { min: 8.5, max: 10.5, unidade: 'mg/dL' }
};

// Analisa o hemograma
function analyzeHemogram() {
    const results = {};
    const alerts = [];
    
    // Coleta todos os valores
    for (const [key, ref] of Object.entries(HEMOGRAM_REFERENCE)) {
        const value = parseFloat(document.getElementById(key).value);
        if (!isNaN(value)) {
            results[key] = {
                value,
                status: getValueStatus(value, ref.min, ref.max),
                ref: `${ref.min}-${ref.max} ${ref.unidade}`
            };
            
            // Gera alertas para valores fora da faixa
            if (value < ref.min || value > ref.max) {
                const severity = getSeverityLevel(value, ref.min, ref.max);
                alerts.push({
                    parameter: key,
                    value,
                    refRange: `${ref.min}-${ref.max}`,
                    severity,
                    message: getHemogramMessage(key, value, ref.min, ref.max)
                });
            }
        }
    }
    
    // Exibe os resultados em tabela
    displayHemogramResults(results);
    
    // Exibe os alertas
    displayHemogramAlerts(alerts);
    
    // Mostra a seção de resultados
    document.getElementById('resultado-hemograma').classList.remove('hidden');
}

// Analisa a bioquímica
function analyzeBiochemistry() {
    // Estado da sessão
    const sessionState = {
        isPaused: false,
        pauseDuration: 30, // segundos
        autoPauseAfter: 5, // análises
        analysisCount: 0,
        priorityLevel: 'medium' // low/medium/high
    };

    // Novo: Função para pausar a análise
    function pauseAnalysis(duration = sessionState.pauseDuration) {
        sessionState.isPaused = true;
        console.log(`Análise pausada por ${duration} segundos`);
        
        // Temporizador para retomar automaticamente
        setTimeout(() => {
            if (sessionState.isPaused) {
                resumeAnalysis();
            }
        }, duration * 1000);
    }

    // Novo: Função para retomar a análise
    function resumeAnalysis() {
        sessionState.isPaused = false;
        console.log('Análise retomada');
        updateSessionStatusUI();
    }

    // Novo: Atualizar UI com estado da sessão
    function updateSessionStatusUI() {
        const statusElement = document.getElementById('session-status');
        if (statusElement) {
            statusElement.textContent = sessionState.isPaused 
                ? '⏸ PAUSADA' 
                : '▶ EXECUTANDO';
            statusElement.className = sessionState.isPaused 
                ? 'session-paused' 
                : 'session-running';
        }
    }

    // Modificação: Verificar estado de pausa antes de cada análise
    function safeAnalyze() {
        if (sessionState.isPaused) {
            console.warn('Tentativa de análise durante pausa ignorada');
            return;
        }

        // Contador para pausa automática
        sessionState.analysisCount++;
        if (sessionState.analysisCount >= sessionState.autoPauseAfter) {
            pauseAnalysis();
            sessionState.analysisCount = 0;
        }

        const results = {};
        const alerts = [];
        
        // Mapeamento de IDs para chaves de referência
        const paramMap = {
            'bio-glicemia': 'glicemia',
            'bio-ureia': 'ureia',
            'bio-creatinina': 'creatinina',
            'bio-tgo': 'tgo',
            'bio-tgp': 'tgp',
            'bio-bilirrubina-total': 'bilirrubinaTotal',
            'bio-bilirrubina-direta': 'bilirrubinaDireta',
            'bio-proteinas-totais': 'proteinasTotais',
            'bio-albumina': 'albumina',
            'bio-sodio': 'sodio',
            'bio-potassio': 'potassio',
            'bio-calcio': 'calcio'
        };
        
        // Coleta todos os valores
        for (const [id, param] of Object.entries(paramMap)) {
            const inputElement = document.getElementById(id);
            if (!inputElement) continue;
            
            const value = parseFloat(inputElement.value);
            if (isNaN(value)) continue;
            
            const ref = BIOCHEMISTRY_REFERENCE[param];
            if (!ref) continue;
            
            // Tratamento especial para creatinina (varia com idade)
            if (param === 'creatinina') {
                // Obter idade do paciente
                const age = getPatientAge(); // Implementar esta função
                
                // Selecionar faixa etária apropriada
                let ageRef;
                if (age < 1) ageRef = ref['<1ano'];
                else if (age < 5) ageRef = ref['1-5anos'];
                else if (age < 10) ageRef = ref['5-10anos'];
                else ageRef = ref['>10anos'];
                
                // Validar valor clinicamente possível
                if (value > 15 || value < 0.1) {
                    alerts.push({
                        parameter: param,
                        value,
                        severity: 'critico',
                        message: 'Valor de creatinina clinicamente improvável! Verificar medida.'
                    });
                    continue;
                }
                
                results[param] = {
                    value,
                    status: getValueStatus(value, ageRef.min, ageRef.max),
                    ref: `${ageRef.min}-${ageRef.max} ${ref.unidade}`
                };
                
                if (value < ageRef.min || value > ageRef.max) {
                    // Usar critérios KDIGO para lesão renal aguda
                    const baseline = 0.7; // Valor basal estimado
                    const severity = 
                        value >= baseline * 3 ? 'grave' :
                        value >= baseline * 2 ? 'moderado' : 'leve';
                    
                    alerts.push({
                        parameter: param,
                        value,
                        refRange: `${ageRef.min}-${ageRef.max}`,
                        severity,
                        message: getBiochemistryMessage(param, value, ageRef.min, ageRef.max, age)
                    });
                }
            } else {
                results[param] = {
                    value,
                    status: getValueStatus(value, ref.min, ref.max),
                    ref: `${ref.min}-${ref.max} ${ref.unidade}`
                };
                
                if (value < ref.min || value > ref.max) {
                    const severity = getSeverityLevel(value, ref.min, ref.max);
                    alerts.push({
                        parameter: param,
                        value,
                        refRange: `${ref.min}-${ref.max}`,
                        severity,
                        message: getBiochemistryMessage(param, value, ref.min, ref.max)
                    });
                }
            }
        }
        
        // Exibe os resultados em tabela
        displayBiochemistryResults(results);
        
        // Exibe os alertas
        displayBiochemistryAlerts(alerts);
        
        // Mostra a seção de resultados
        document.getElementById('resultado-bioquimica').classList.remove('hidden');
    }

    safeAnalyze();
}

// Determina o status do valor (normal, alerta, crítico)
function getValueStatus(value, min, max) {
    const margin = (max - min) * 0.2; // 20% da faixa normal
    
    if (value >= min && value <= max) return 'normal';
    if (value < min - margin || value > max + margin) return 'critico';
    return 'alerta';
}

// Determina o nível de severidade
function getSeverityLevel(value, min, max) {
    const range = max - min;
    
    if (value < min) {
        const deviation = (min - value) / range;
        if (deviation > 0.5) return 'grave';
        if (deviation > 0.3) return 'moderado';
        return 'leve';
    } else {
        const deviation = (value - max) / range;
        if (deviation > 0.5) return 'grave';
        if (deviation > 0.3) return 'moderado';
        return 'leve';
    }
}

// Mensagens específicas para hemograma
function getHemogramMessage(param, value, min, max) {
    const paramNames = {
        hemoglobina: 'Hemoglobina',
        hematocrito: 'Hematócrito',
        leucocitos: 'Leucócitos',
        plaquetas: 'Plaquetas',
        neutrofilos: 'Neutrófilos',
        linfocitos: 'Linfócitos',
        monocitos: 'Monócitos',
        eosinofilos: 'Eosinófilos',
        bastonetes: 'Bastonetes'
    };
    
    const name = paramNames[param] || param;
    
    if (value < min) {
        return `${name} baixo (${value} ${HEMOGRAM_REFERENCE[param].unidade}). Pode indicar ${getHemogramLowCause(param)}.`;
    } else {
        return `${name} alto (${value} ${HEMOGRAM_REFERENCE[param].unidade}). Pode indicar ${getHemogramHighCause(param)}.`;
    }
}

// Causas para valores baixos no hemograma
function getHemogramLowCause(param) {
    const causes = {
        hemoglobina: 'anemia, hemorragia ou doença crônica',
        hematocrito: 'anemia ou hiperidratação',
        leucocitos: 'leucopenia, infecções virais ou efeito de medicamentos',
        plaquetas: 'trombocitopenia, doenças da medula óssea ou coagulopatias',
        neutrofilos: 'neutropenia, infecções virais ou doenças autoimunes',
        linfocitos: 'linfopenia, imunodeficiências ou uso de corticoides',
        monocitos: 'pouco comum, pode ocorrer em algumas leucemias',
        eosinofilos: 'geralmente sem significado clínico quando baixo'
    };
    return causes[param] || 'causas diversas';
}

// Causas para valores altos no hemograma
function getHemogramHighCause(param) {
    const causes = {
        hemoglobina: 'policitemia, desidratação ou hipóxia crônica',
        hematocrito: 'policitemia ou desidratação',
        leucocitos: 'leucocitose, infecções bacterianas ou processos inflamatórios',
        plaquetas: 'trombocitose, processos inflamatórios ou doenças mieloproliferativas',
        neutrofilos: 'neutrofilia, infecções bacterianas ou estresse',
        linfocitos: 'linfocitose, infecções virais ou leucemias linfoides',
        monocitos: 'monocitose, infecções crônicas ou doenças mieloproliferativas',
        eosinofilos: 'eosinofilia, alergias, parasitoses ou doenças autoimunes',
        bastonetes: 'desvio à esquerda, indicando infecção bacteriana aguda'
    };
    return causes[param] || 'causas diversas';
}

// Mensagens específicas para bioquímica
function getBiochemistryMessage(param, value, min, max, age) {
    const paramNames = {
        glicemia: 'Glicemia',
        ureia: 'Uréia',
        creatinina: 'Creatinina',
        tgo: 'TGO/AST',
        tgp: 'TGP/ALT',
        bilirrubinaTotal: 'Bilirrubina Total',
        bilirrubinaDireta: 'Bilirrubina Direta',
        proteinasTotais: 'Proteínas Totais',
        albumina: 'Albumina',
        sodio: 'Sódio',
        potassio: 'Potássio',
        calcio: 'Cálcio'
    };
    
    const name = paramNames[param] || param;
    const unit = BIOCHEMISTRY_REFERENCE[param].unidade;
    
    if (value < min) {
        return `${name} baixo (${value} ${unit}). ${getBiochemistryLowImplication(param)}`;
    } else {
        return `${name} alto (${value} ${unit}). ${getBiochemistryHighImplication(param)}`;
    }
}

// Implicações para valores baixos na bioquímica
function getBiochemistryLowImplication(param) {
    const implications = {
        glicemia: 'Pode indicar hipoglicemia, jejum prolongado ou hiperinsulinismo.',
        ureia: 'Pode ocorrer em desnutrição, síndrome hepatorrenal ou hiperidratação.',
        creatinina: 'Pode ocorrer em baixa massa muscular ou desnutrição.',
        tgo: 'Sem significado clínico importante quando baixo.',
        tgp: 'Sem significado clínico importante quando baixo.',
        bilirrubinaTotal: 'Sem significado clínico importante quando baixo.',
        bilirrubinaDireta: 'Sem significado clínico importante quando baixo.',
        proteinasTotais: 'Pode indicar desnutrição, síndrome nefrótica ou enteropatias perdedoras de proteínas.',
        albumina: 'Pode indicar desnutrição, doença hepática crônica ou perda renal de proteínas.',
        sodio: 'Pode indicar hiponatremia por excesso de água ou perda de sódio.',
        potassio: 'Pode indicar hipocalemia por perda renal ou gastrointestinal.',
        calcio: 'Pode indicar hipocalcemia por deficiência de vitamina D ou hipoparatireoidismo.'
    };
    return implications[param] || 'Avaliar contexto clínico.';
}

// Implicações para valores altos na bioquímica
function getBiochemistryHighImplication(param) {
    const implications = {
        glicemia: 'Pode indicar hiperglicemia, diabetes mellitus ou estresse.',
        ureia: 'Pode indicar desidratação, dieta hiperproteica ou insuficiência renal.',
        creatinina: 'Sugere redução da função renal ou obstrução do trato urinário.',
        tgo: 'Pode indicar lesão hepática, muscular ou cardíaca.',
        tgp: 'Mais específico para lesão hepática.',
        bilirrubinaTotal: 'Pode indicar icterícia por hemólise, hepatite ou obstrução biliar.',
        bilirrubinaDireta: 'Sugere colestase ou doença hepatocelular.',
        proteinasTotais: 'Pode ocorrer em desidratação ou gamopatias monoclonais.',
        albumina: 'Geralmente por desidratação.',
        sodio: 'Pode indicar hipernatremia por perda de água ou excesso de sódio.',
        potassio: 'Pode indicar hipercalemia por insuficiência renal ou acidose.',
        calcio: 'Pode indicar hipercalcemia por hiperparatireoidismo ou neoplasias.'
    };
    return implications[param] || 'Avaliar contexto clínico.';
}

// Exibe os resultados do hemograma em tabela
function displayHemogramResults(results) {
    let html = `
        <div class="table-container">
            <table class="result-table">
                <thead>
                    <tr>
                        <th>Parâmetro</th>
                        <th>Valor</th>
                        <th>Referência</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    for (const [param, data] of Object.entries(results)) {
        const paramNames = {
            hemoglobina: 'Hemoglobina',
            hematocrito: 'Hematócrito',
            leucocitos: 'Leucócitos',
            plaquetas: 'Plaquetas',
            neutrofilos: 'Neutrófilos',
            linfocitos: 'Linfócitos',
            monocitos: 'Monócitos',
            eosinofilos: 'Eosinófilos',
            bastonetes: 'Bastonetes'
        };
        
        const name = paramNames[param] || param;
        const statusClass = data.status === 'normal' ? 'normal' : 
                          data.status === 'alerta' ? 'alerta' : 'critico';
        const statusIcon = data.status === 'normal' ? 'fa-check-circle' : 
                          data.status === 'alerta' ? 'fa-exclamation-triangle' : 'fa-times-circle';
        
        html += `
            <tr>
                <td data-label="Parâmetro">${name}</td>
                <td data-label="Valor">${data.value} ${HEMOGRAM_REFERENCE[param].unidade}</td>
                <td data-label="Referência">${data.ref}</td>
                <td data-label="Status" class="${statusClass}">
                    <i class="fas ${statusIcon} status-icon"></i>
                    ${data.status === 'normal' ? 'Normal' : 
                     data.status === 'alerta' ? 'Alerta' : 'Crítico'}
                </td>
            </tr>
        `;
    }
    
    html += `
                </tbody>
            </table>
        </div>
    `;
    
    document.getElementById('analise-hemograma').innerHTML = html;
}

// Exibe os alertas do hemograma
function displayHemogramAlerts(alerts) {
    const container = document.getElementById('alertas-hemograma');
    container.innerHTML = '';
    
    if (alerts.length === 0) {
        container.innerHTML = '<p class="normal">Todos os parâmetros dentro dos valores de referência.</p>';
        return;
    }
    
    // Ordena por severidade (grave primeiro)
    alerts.sort((a, b) => {
        const severityOrder = { grave: 3, moderado: 2, leve: 1 };
        return severityOrder[b.severity] - severityOrder[a.severity];
    });
    
    for (const alert of alerts) {
        const alertClass = alert.severity === 'leve' ? 'alerta-leve' : 
                          alert.severity === 'moderado' ? 'alerta-moderado' : 'alerta-grave';
        const alertIcon = alert.severity === 'leve' ? 'fa-info-circle' : 
                         alert.severity === 'moderado' ? 'fa-exclamation-triangle' : 'fa-exclamation-circle';
        
        const alertElement = document.createElement('div');
        alertElement.className = `alerta-laboratorio ${alertClass}`;
        alertElement.innerHTML = `
            <i class="fas ${alertIcon}"></i>
            <div>
                <strong>${alert.parameter.toUpperCase()}:</strong> ${alert.message}
                <div class="small">Valor de referência: ${alert.refRange} ${HEMOGRAM_REFERENCE[alert.parameter].unidade}</div>
            </div>
        `;
        
        container.appendChild(alertElement);
    }
}

// Exibe os resultados da bioquímica em tabela
function displayBiochemistryResults(results) {
    let html = `
        <table class="result-table">
            <thead>
                <tr>
                    <th>Parâmetro</th>
                <th>Valor</th>
                <th>Referência</th>
                <th>Status</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    for (const [param, data] of Object.entries(results)) {
        const paramNames = {
            glicemia: 'Glicemia',
            ureia: 'Uréia',
            creatinina: 'Creatinina',
            tgo: 'TGO/AST',
            tgp: 'TGP/ALT',
            bilirrubinaTotal: 'Bilirrubina Total',
            bilirrubinaDireta: 'Bilirrubina Direta',
            proteinasTotais: 'Proteínas Totais',
            albumina: 'Albumina',
            sodio: 'Sódio',
            potassio: 'Potássio',
            calcio: 'Cálcio'
        };
        
        const name = paramNames[param] || param;
        const statusClass = data.status === 'normal' ? 'normal' : 
                          data.status === 'alerta' ? 'alerta' : 'critico';
        const statusIcon = data.status === 'normal' ? 'fa-check-circle' : 
                          data.status === 'alerta' ? 'fa-exclamation-triangle' : 'fa-times-circle';
        
        html += `
            <tr>
                <td>${name}</td>
                <td>${data.value} ${BIOCHEMISTRY_REFERENCE[param].unidade}</td>
                <td>${data.ref}</td>
                <td class="${statusClass}">
                    <i class="fas ${statusIcon} status-icon"></i>
                    ${data.status === 'normal' ? 'Normal' : 
                     data.status === 'alerta' ? 'Alerta' : 'Crítico'}
                </td>
            </tr>
        `;
    }
    
    html += `
            </tbody>
        </table>
    `;
    
    document.getElementById('analise-bioquimica').innerHTML = html;
}

// Exibe os alertas da bioquímica
function displayBiochemistryAlerts(alerts) {
    const container = document.getElementById('alertas-bioquimica');
    container.innerHTML = '';
    
    if (alerts.length === 0) {
        container.innerHTML = '<p class="normal">Todos os parâmetros dentro dos valores de referência.</p>';
        return;
    }
    
    // Ordena por severidade (grave primeiro)
    alerts.sort((a, b) => {
        const severityOrder = { grave: 3, moderado: 2, leve: 1 };
        return severityOrder[b.severity] - severityOrder[a.severity];
    });
    
    for (const alert of alerts) {
        const alertClass = alert.severity === 'leve' ? 'alerta-leve' : 
                          alert.severity === 'moderado' ? 'alerta-moderado' : 'alerta-grave';
        const alertIcon = alert.severity === 'leve' ? 'fa-info-circle' : 
                         alert.severity === 'moderado' ? 'fa-exclamation-triangle' : 'fa-exclamation-circle';
        
        const alertElement = document.createElement('div');
        alertElement.className = `alerta-laboratorio ${alertClass}`;
        alertElement.innerHTML = `
            <i class="fas ${alertIcon}"></i>
            <div>
                <strong>${alert.parameter.toUpperCase()}:</strong> ${alert.message}
                <div class="small">Valor de referência: ${alert.refRange} ${BIOCHEMISTRY_REFERENCE[alert.parameter].unidade}</div>
            </div>
        `;
        
        container.appendChild(alertElement);
    }
}

// Limpa o formulário de hemograma
function clearHemogram() {
    const inputs = document.querySelectorAll('#hemograma input[type="number"]');
    inputs.forEach(input => input.value = '');
    document.getElementById('resultado-hemograma').classList.add('hidden');
}

// Limpa o formulário de bioquímica
function clearBiochemistry() {
    const inputs = document.querySelectorAll('#bioquimica input[type="number"]');
    inputs.forEach(input => input.value = '');
    document.getElementById('resultado-bioquimica').classList.add('hidden');
}

// Função para classificar status clínico
function classifyResult(param, value) {
    const criticalValues = {
        glicemia: { min: 70, max: 140 },
        creatinina: { min: 0.6, max: 1.3 },
        // Adicionar outros parâmetros
    };
    
    if (!criticalValues[param]) return 'normal';
    if (value < criticalValues[param].min) return 'baixo';
    if (value > criticalValues[param].max) return 'alto';
    return 'normal';
}