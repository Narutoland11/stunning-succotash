/**
 * Interface de usuário para seção de laboratório
 * Conecta os módulos de análise à interface HTML
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar a interface do laboratório
    inicializarLaboratorio();
});

/**
 * Inicializa a interface de laboratório
 */
function inicializarLaboratorio() {
    // Configurar abas da seção de laboratório
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover classe active de todos os botões e conteúdos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            // Adicionar classe active ao botão clicado
            this.classList.add('active');
            
            // Mostrar o conteúdo correspondente
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Configurar botões de análise
    configurarAnaliseHemograma();
    configurarAnaliseBioquimica();
    configurarExamesEspecificos();
}

/**
 * Configura a análise de hemograma
 */
function configurarAnaliseHemograma() {
    const btnAnalisar = document.getElementById('analisar-hemograma');
    const btnLimpar = document.getElementById('limpar-hemograma');
    
    if (btnAnalisar) {
        btnAnalisar.addEventListener('click', function() {
            // Coletar dados do hemograma
            const dados = {
                hemoglobina: getNumericValue('hemoglobina'),
                hematocrito: getNumericValue('hematocrito'),
                leucocitos: getNumericValue('leucocitos'),
                plaquetas: getNumericValue('plaquetas'),
                neutrofilos: getNumericValue('neutrofilos'),
                linfocitos: getNumericValue('linfocitos'),
                monocitos: getNumericValue('monocitos'),
                eosinofilos: getNumericValue('eosinofilos'),
                bastonetes: getNumericValue('bastonetes')
            };
            
            // Coletar dados do paciente da seção de doses
            const paciente = {
                peso: getNumericValue('peso'),
                idade: getNumericValue('idade-num'),
                idadeUnidade: document.getElementById('idade-unidade')?.value || 'anos',
                sexo: document.querySelector('input[name="child-gender"]:checked')?.value || 'masculino'
            };
            
            // Validar dados essenciais
            if (!dados.hemoglobina && !dados.leucocitos && !dados.plaquetas) {
                alert('Por favor, preencha pelo menos um campo do hemograma para análise.');
                return;
            }
            
            // Analisar hemograma com o módulo avançado
            let resultado;
            try {
                resultado = ANALISE_LABORATORIO.analisarHemograma(dados, paciente);
            } catch (error) {
                console.error('Erro ao analisar hemograma:', error);
                alert('Ocorreu um erro ao analisar o hemograma. Verifique o console para mais detalhes.');
                return;
            }
            
            // Exibir resultado
            exibirResultadoLaboratorio('resultado-hemograma', 'analise-hemograma', 'alertas-hemograma', resultado);
        });
    }
    
    // Configurar botão limpar
    if (btnLimpar) {
        btnLimpar.addEventListener('click', function() {
            limparFormulario(['hemoglobina', 'hematocrito', 'leucocitos', 'plaquetas', 
                             'neutrofilos', 'linfocitos', 'monocitos', 'eosinofilos', 'bastonetes']);
            document.getElementById('resultado-hemograma').classList.add('hidden');
        });
    }
}

/**
 * Configura a análise de bioquímica
 */
function configurarAnaliseBioquimica() {
    const btnAnalisar = document.getElementById('analisar-bioquimica');
    const btnLimpar = document.getElementById('limpar-bioquimica');
    
    // Configurar checkbox para TFG
    const checkboxTFG = document.getElementById('bio-calcular-tfg');
    if (checkboxTFG) {
        checkboxTFG.addEventListener('change', function() {
            if (this.checked) {
                // Verificar se os campos necessários estão preenchidos
                const creatinina = getNumericValue('bio-creatinina');
                if (!creatinina) {
                    alert('É necessário preencher o valor da creatinina para calcular a TFG.');
                    this.checked = false;
                }
            }
        });
    }
    
    // Configurar checkbox para ânion gap
    const checkboxAnionGap = document.getElementById('bio-calcular-anion-gap');
    if (checkboxAnionGap) {
        checkboxAnionGap.addEventListener('change', function() {
            if (this.checked) {
                // Verificar se os campos necessários estão preenchidos
                const sodio = getNumericValue('bio-sodio');
                const cloro = getNumericValue('bio-cloro');
                const bicarbonato = getNumericValue('bio-bicarbonato');
                
                if (!sodio || !cloro || !bicarbonato) {
                    alert('É necessário preencher os valores de sódio, cloro e bicarbonato para calcular o ânion gap.');
                    this.checked = false;
                }
            }
        });
    }
    
    // Configurar checkbox para risco cardiovascular
    const checkboxRiscoCV = document.getElementById('bio-calcular-risco-cv');
    if (checkboxRiscoCV) {
        checkboxRiscoCV.addEventListener('change', function() {
            if (this.checked) {
                // Verificar se os campos necessários estão preenchidos
                const colesterol = getNumericValue('bio-colesterol');
                const hdl = getNumericValue('bio-hdl');
                
                if (!colesterol || !hdl) {
                    alert('É necessário preencher os valores de colesterol total e HDL para calcular o risco cardiovascular.');
                    this.checked = false;
                }
            }
        });
    }
    
    if (btnAnalisar) {
        btnAnalisar.addEventListener('click', function() {
            // Coletar dados bioquímicos comuns
            const dados = {
                glicemia: getNumericValue('bio-glicemia'),
                ureia: getNumericValue('bio-ureia'),
                creatinina: getNumericValue('bio-creatinina'),
                tgo: getNumericValue('bio-tgo'),
                tgp: getNumericValue('bio-tgp'),
                bilirrubinaTotal: getNumericValue('bio-bilirrubina-total'),
                bilirrubinaD: getNumericValue('bio-bilirrubina-direta'),
                proteinasTotais: getNumericValue('bio-proteinas-totais'),
                albumina: getNumericValue('bio-albumina'),
                sodio: getNumericValue('bio-sodio'),
                potassio: getNumericValue('bio-potassio'),
                calcio: getNumericValue('bio-calcio'),
                fosfataseAlcalina: getNumericValue('bio-fosfatase'),
                ggt: getNumericValue('bio-ggt')
            };
            
            // Adicionar dados de perfil lipídico avançado
            dados.perfilLipidico = {
                colesterolTotal: getNumericValue('bio-colesterol-total'),
                hdl: getNumericValue('bio-hdl'),
                ldl: getNumericValue('bio-ldl'),
                triglicerides: getNumericValue('bio-triglicerides')
            };
            
            // Adicionar dados de função pancreática
            dados.funcaoPancreatica = {
                amilase: getNumericValue('bio-amilase'),
                lipase: getNumericValue('bio-lipase')
            };
            
            // Adicionar dados de eletrólitos adicionais
            dados.eletrolitos = {
                magnesio: getNumericValue('bio-magnesio'),
                fosforo: getNumericValue('bio-fosforo'),
                cloro: getNumericValue('bio-cloro'),
                bicarbonato: getNumericValue('bio-bicarbonato')
            };
            
            // Coletar dados do paciente da seção de doses
            const paciente = {
                peso: getNumericValue('peso'),
                idade: getNumericValue('idade-num'),
                idadeUnidade: document.getElementById('idade-unidade')?.value || 'anos',
                sexo: document.querySelector('input[name="child-gender"]:checked')?.value || 'masculino'
            };
            
            // Validar dados básicos
            if (Object.values(dados).every(v => v === null || v === undefined || 
                (typeof v === 'object' && Object.values(v).every(val => val === null || val === undefined)))) {
                alert('Por favor, preencha pelo menos um campo para análise bioquímica.');
                return;
            }
            
            // Verificar cálculos avançados solicitados
            const calculos = {
                tfg: document.getElementById('bio-calcular-tfg')?.checked || false,
                anionGap: document.getElementById('bio-calcular-anion-gap')?.checked || false,
                riscoCV: document.getElementById('bio-calcular-risco-cv')?.checked || false,
                framingham: document.getElementById('bio-calcular-framingham')?.checked || false
            };
            
            // Realizar cálculos avançados solicitados
            
            // 1. Taxa de Filtração Glomerular (TFG)
            if (calculos.tfg) {
                if (!dados.creatinina) {
                    alert('É necessário preencher o valor da creatinina para calcular a TFG.');
                    return;
                }
                
                if (!paciente.idade || !paciente.sexo) {
                    alert('É necessário informar a idade e o sexo do paciente para calcular a TFG.');
                    return;
                }
                
                // Calcular TFG usando a fórmula CKD-EPI
                dados.tfgEstimada = calcularTFGEstimada(dados.creatinina, paciente);
            }
            
            // 2. Ânion Gap
            if (calculos.anionGap) {
                if (!dados.eletrolitos.sodio || !dados.eletrolitos.cloro || !dados.eletrolitos.bicarbonato) {
                    alert('É necessário preencher os valores de sódio, cloro e bicarbonato para calcular o ânion gap.');
                    return;
                }
                
                // Calcular ânion gap: Na+ - (Cl- + HCO3-)
                dados.anionGap = calcularAnionGap(dados.sodio, dados.eletrolitos.cloro, dados.eletrolitos.bicarbonato);
            }
            
            // 3. Risco Cardiovascular
            if (calculos.riscoCV || calculos.framingham) {
                if (!dados.perfilLipidico.colesterolTotal || !dados.perfilLipidico.hdl) {
                    alert('É necessário preencher os valores de colesterol total e HDL para calcular o risco cardiovascular.');
                    return;
                }
                
                if (!paciente.idade || !paciente.sexo) {
                    alert('É necessário informar a idade e o sexo do paciente para calcular o risco cardiovascular.');
                    return;
                }
                
                // Calcular a relação colesterol total/HDL
                dados.relacaoColesterolHDL = calcularRelacaoColesterolHDL(dados.perfilLipidico.colesterolTotal, dados.perfilLipidico.hdl);
                
                // Se solicitou escore de Framingham completo usando os novos campos
                if (calculos.framingham) {
                    const pressaoSistolica = getNumericValue('paciente-pas');
                    const fumante = document.getElementById('paciente-tabagismo')?.checked || false;
                    const diabetes = document.getElementById('paciente-diabetes')?.checked || false;
                    
                    if (!pressaoSistolica) {
                        alert('É necessário preencher a pressão arterial sistólica para o cálculo do Escore de Framingham.');
                        return;
                    }
                    
                    dados.escoreFramingham = calcularEscoreFramingham(
                        dados.perfilLipidico.colesterolTotal,
                        dados.perfilLipidico.hdl,
                        pressaoSistolica,
                        paciente.idade,
                        paciente.sexo,
                        fumante,
                        diabetes || dados.glicemia > 126 // diabetes por declaração ou glicemia
                    );
                }
            }
            
            // Analisar bioquímica com o módulo avançado
            let resultado;
            try {
                // Verificar se o módulo de análise laboratorial está disponível
                console.log('Verificando objetos globais disponíveis:', Object.keys(window).filter(k => k.includes('LABORATORIO') || k.includes('BIOQUIMICA') || k.includes('VALORES')));
                
                if (typeof ANALISE_LABORATORIO === 'undefined' || !ANALISE_LABORATORIO) {
                    console.error('Módulo ANALISE_LABORATORIO não está disponível. Usando análise simplificada.');
                    console.error('Tipo de ANALISE_LABORATORIO:', typeof ANALISE_LABORATORIO);
                    console.error('Valor global window.ANALISE_LABORATORIO:', window.ANALISE_LABORATORIO);
                    resultado = {
                        analises: [],
                        alertas: [],
                        condutas: []
                    };
                } else {
                    // Primeiro realiza a análise básica de bioquímica
                    resultado = ANALISE_LABORATORIO.analisarBioquimica(dados, paciente);
                }
                
                // Integra análises avançadas se o módulo estiver disponível
                if (window.BIOQUIMICA_AVANCADA_INTEGRADOR) {
                    console.log('Módulo de bioquímica avançada detectado. Realizando análises adicionais...');
                    
                    // Análise do perfil lipídico
                    if (dados.perfilLipidico.colesterolTotal) {
                        const analisePerfilLipidico = BIOQUIMICA_AVANCADA_INTEGRADOR.analisarPerfilLipidico(
                            dados.perfilLipidico.colesterolTotal,
                            dados.perfilLipidico.hdl,
                            dados.perfilLipidico.ldl,
                            dados.perfilLipidico.triglicerides,
                            paciente
                        );
                        
                        if (analisePerfilLipidico) {
                            resultado.analises.push(...analisePerfilLipidico.analises);
                            resultado.alertas.push(...analisePerfilLipidico.alertas);
                            resultado.condutas.push(...analisePerfilLipidico.condutas);
                        }
                    }
                    
                    // Análise do ânion gap
                    if (dados.sodio && dados.eletrolitos.cloro && dados.eletrolitos.bicarbonato) {
                        const analiseAnionGap = BIOQUIMICA_AVANCADA_INTEGRADOR.analisarAnionGap(
                            dados.sodio,
                            dados.eletrolitos.cloro,
                            dados.eletrolitos.bicarbonato
                        );
                        
                        if (analiseAnionGap) {
                            resultado.analises.push(...analiseAnionGap.analises);
                            resultado.alertas.push(...analiseAnionGap.alertas);
                            resultado.condutas.push(...analiseAnionGap.condutas);
                        }
                    }
                    
                    // Análise dos eletrólitos adicionais
                    if (dados.eletrolitos.magnesio || dados.eletrolitos.fosforo) {
                        const analiseEletrolitos = BIOQUIMICA_AVANCADA_INTEGRADOR.analisarEletrolitosAdicionais(
                            dados.eletrolitos.magnesio,
                            dados.eletrolitos.fosforo,
                            dados.eletrolitos.cloro,
                            dados.eletrolitos.bicarbonato
                        );
                        
                        if (analiseEletrolitos) {
                            resultado.analises.push(...analiseEletrolitos.analises);
                            resultado.alertas.push(...analiseEletrolitos.alertas);
                            resultado.condutas.push(...analiseEletrolitos.condutas);
                        }
                    }
                    
                    // Cálculo do Escore de Framingham com novos dados
                    if (dados.perfilLipidico.colesterolTotal && paciente.pressaoArterial?.sistolica) {
                        const idade = getNumericValue('paciente-idade');
                        const sexo = getSelectValue('paciente-sexo');
                        
                        if (idade && sexo) {
                            const analiseFramingham = BIOQUIMICA_AVANCADA_INTEGRADOR.calcularEscoreFramingham(
                                dados.perfilLipidico.colesterolTotal,
                                dados.perfilLipidico.hdl,
                                paciente.pressaoArterial.sistolica,
                                idade,
                                sexo,
                                paciente.tabagismo,
                                paciente.diabetes
                            );
                            
                            if (analiseFramingham) {
                                resultado.analises.push(...analiseFramingham.analises);
                                resultado.alertas.push(...analiseFramingham.alertas);
                                resultado.condutas.push(...analiseFramingham.condutas);
                            }
                        }
                    }
                }
            } catch (error) {
                console.error('Erro ao analisar bioquímica:', error);
                alert('Ocorreu um erro ao analisar os dados bioquímicos. Verifique o console para mais detalhes.');
                return;
            }
            
            // Exibir resultado
            exibirResultadoLaboratorio('resultado-bioquimica', 'analise-bioquimica', 'alertas-bioquimica', resultado);
        });
    }
    
    // Configurar botão limpar
    if (btnLimpar) {
        btnLimpar.addEventListener('click', function() {
            // Limpar campos de bioquímica básica
            limparFormulario([
                'bio-glicemia', 'bio-ureia', 'bio-creatinina', 'bio-tgo', 'bio-tgp',
                'bio-bilirrubina-total', 'bio-bilirrubina-direta', 'bio-proteinas-totais',
                'bio-albumina', 'bio-sodio', 'bio-potassio', 'bio-calcio', 'bio-fosfatase', 'bio-ggt'
            ]);
            
            // Limpar campos de perfil lipídico
            limparFormulario([
                'bio-colesterol-total', 'bio-hdl', 'bio-ldl', 'bio-triglicerides'
            ]);
            
            // Limpar campos de função pancreática
            limparFormulario([
                'bio-amilase', 'bio-lipase'
            ]);
            
            // Limpar campos de eletrólitos adicionais
            limparFormulario([
                'bio-magnesio', 'bio-fosforo', 'bio-cloro', 'bio-bicarbonato'
            ]);
            
            // Limpar campos de risco cardiovascular
            limparFormulario([
                'paciente-idade', 'paciente-pas', 'paciente-pad'
            ]);
            
            // Limpar checkboxes
            document.getElementById('paciente-diabetes').checked = false;
            document.getElementById('paciente-tabagismo').checked = false;
            
            // Resetar select de sexo
            const selectSexo = document.getElementById('paciente-sexo');
            if (selectSexo) selectSexo.selectedIndex = 0;
            
            // Limpar checkboxes de cálculos
            document.getElementById('bio-calcular-tfg').checked = false;
            document.getElementById('bio-calcular-anion-gap').checked = false;
            document.getElementById('bio-calcular-risco-cv').checked = false;
            document.getElementById('bio-calcular-framingham').checked = false;
            
            // Esconder resultado
            document.getElementById('resultado-bioquimica').classList.add('hidden');
        });
    }
}

/**
 * Configura a interface para exames específicos (malária, HIV, tuberculose)
 * Esta função será chamada após adicionar estes elementos à interface HTML
 */
function configurarExamesEspecificos() {
    // Verificar se a aba de exames específicos foi adicionada à HTML
    const tabEspecificos = document.getElementById('exames-especificos');
    if (!tabEspecificos) return; // Ainda não implementado na interface
    
    // Configurar análise de malária
    const btnAnalisarMalaria = document.getElementById('analisar-malaria');
    if (btnAnalisarMalaria) {
        btnAnalisarMalaria.addEventListener('click', function() {
            const dados = {
                testeRapido: getSelectValue('malaria-teste-rapido'),
                parasitemia: getNumericValue('malaria-parasitemia'),
                clinica: {
                    consciencia: getSelectValue('malaria-consciencia'),
                    convulsoes: document.getElementById('malaria-convulsoes')?.checked || false,
                    sangramento: document.getElementById('malaria-sangramento')?.checked || false,
                    ictericia: document.getElementById('malaria-ictericia')?.checked || false
                }
            };
            
            // Validar dados
            if (dados.testeRapido === null && dados.parasitemia === null) {
                alert('Por favor, preencha pelo menos um campo para análise de malária.');
                return;
            }
            
            // Analisar malária com o módulo específico
            let resultado;
            try {
                resultado = EXAMES_ESPECIFICOS.analisarMalaria(dados);
            } catch (error) {
                console.error('Erro ao analisar exame de malária:', error);
                alert('Ocorreu um erro ao analisar o exame de malária. Verifique o console para mais detalhes.');
                return;
            }
            
            // Exibir resultado
            exibirResultadoLaboratorio('resultado-malaria', 'analise-malaria', 'alertas-malaria', resultado);
        });
    }
    
    // Configurar botão limpar para malária
    const btnLimparMalaria = document.getElementById('limpar-malaria');
    if (btnLimparMalaria) {
        btnLimparMalaria.addEventListener('click', function() {
            // Limpar campos
            document.getElementById('malaria-teste-rapido').value = '';
            document.getElementById('malaria-parasitemia').value = '';
            document.getElementById('malaria-consciencia').value = 'normal';
            document.getElementById('malaria-convulsoes').checked = false;
            document.getElementById('malaria-sangramento').checked = false;
            document.getElementById('malaria-ictericia').checked = false;
            
            // Esconder resultado
            document.getElementById('resultado-malaria').classList.add('hidden');
        });
    }
    
    // Configurar análise de HIV
    const btnAnalisarHIV = document.getElementById('analisar-hiv');
    if (btnAnalisarHIV) {
        btnAnalisarHIV.addEventListener('click', function() {
            const dados = {
                teste: getSelectValue('hiv-teste'),
                cd4: getNumericValue('hiv-cd4'),
                cargaViral: getNumericValue('hiv-carga-viral')
            };
            
            // Validar dados
            if (dados.teste === null && dados.cd4 === null && dados.cargaViral === null) {
                alert('Por favor, preencha pelo menos um campo para análise de HIV.');
                return;
            }
            
            // Analisar HIV com o módulo específico
            let resultado;
            try {
                resultado = EXAMES_ESPECIFICOS.analisarHIV(dados);
            } catch (error) {
                console.error('Erro ao analisar exame de HIV:', error);
                alert('Ocorreu um erro ao analisar o exame de HIV. Verifique o console para mais detalhes.');
                return;
            }
            
            // Exibir resultado
            exibirResultadoLaboratorio('resultado-hiv', 'analise-hiv', 'alertas-hiv', resultado);
        });
    }
    
    // Configurar botão limpar para HIV
    const btnLimparHIV = document.getElementById('limpar-hiv');
    if (btnLimparHIV) {
        btnLimparHIV.addEventListener('click', function() {
            // Limpar campos
            document.getElementById('hiv-teste').value = '';
            document.getElementById('hiv-cd4').value = '';
            document.getElementById('hiv-carga-viral').value = '';
            
            // Esconder resultado
            document.getElementById('resultado-hiv').classList.add('hidden');
        });
    }
    
    // Configurar análise de tuberculose
    const btnAnalisarTB = document.getElementById('analisar-tb');
    if (btnAnalisarTB) {
        btnAnalisarTB.addEventListener('click', function() {
            const dados = {
                baciloscopia: getSelectValue('tb-baciloscopia'),
                genexpert: getSelectValue('tb-genexpert')
            };
            
            // Validar dados
            if (dados.baciloscopia === null && dados.genexpert === null) {
                alert('Por favor, preencha pelo menos um campo para análise de tuberculose.');
                return;
            }
            
            // Analisar tuberculose com o módulo específico
            let resultado;
            try {
                resultado = EXAMES_ESPECIFICOS.analisarTuberculose(dados);
            } catch (error) {
                console.error('Erro ao analisar exame de tuberculose:', error);
                alert('Ocorreu um erro ao analisar o exame de tuberculose. Verifique o console para mais detalhes.');
                return;
            }
            
            // Exibir resultado
            exibirResultadoLaboratorio('resultado-tb', 'analise-tb', 'alertas-tb', resultado);
        });
    }
    
    // Configurar botão limpar para tuberculose
    const btnLimparTB = document.getElementById('limpar-tb');
    if (btnLimparTB) {
        btnLimparTB.addEventListener('click', function() {
            // Limpar campos
            document.getElementById('tb-baciloscopia').value = '';
            document.getElementById('tb-genexpert').value = '';
            
            // Esconder resultado
            document.getElementById('resultado-tb').classList.add('hidden');
        });
    }
}

/**
 * Exibe o resultado da análise laboratorial na interface
 * @param {string} containerID - ID do container de resultado
 * @param {string} analiseID - ID do elemento para mostrar análises
 * @param {string} alertasID - ID do elemento para mostrar alertas
 * @param {Object} resultado - Resultado da análise
 */
function exibirResultadoLaboratorio(containerID, analiseID, alertasID, resultado) {
    const container = document.getElementById(containerID);
    const analiseEl = document.getElementById(analiseID);
    const alertasEl = document.getElementById(alertasID);
    
    if (!container || !analiseEl || !alertasEl) return;
    
    // Mostrar o container de resultado
    container.classList.remove('hidden');
    
    // Limpar conteúdo anterior
    analiseEl.innerHTML = '';
    alertasEl.innerHTML = '';
    
    // Exibir análises
    if (resultado.analises && resultado.analises.length > 0) {
        const table = document.createElement('table');
        table.className = 'resultado-table';
        
        // Cabeçalho
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        ['Parâmetro', 'Valor', 'Interpretação', 'Referência'].forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        // Corpo da tabela
        const tbody = document.createElement('tbody');
        resultado.analises.forEach(analise => {
            const row = document.createElement('tr');
            
            // Parâmetro
            const paramCell = document.createElement('td');
            paramCell.textContent = analise.parametro;
            row.appendChild(paramCell);
            
            // Valor
            const valorCell = document.createElement('td');
            valorCell.textContent = analise.valor || '-';
            row.appendChild(valorCell);
            
            // Interpretação
            const interpCell = document.createElement('td');
            interpCell.textContent = analise.interpretacao || 'Normal';
            
            // Adicionar classe de cor conforme interpretação
            if (analise.interpretacao) {
                const lowercaseInterp = analise.interpretacao.toLowerCase();
                if (lowercaseInterp.includes('grave') || 
                    lowercaseInterp.includes('alta') ||
                    lowercaseInterp.includes('elevada')) {
                    interpCell.className = 'valor-alto';
                } else if (lowercaseInterp.includes('baixa') || 
                          lowercaseInterp.includes('reduzida')) {
                    interpCell.className = 'valor-baixo';
                }
            }
            row.appendChild(interpCell);
            
            // Referência
            const refCell = document.createElement('td');
            refCell.textContent = analise.referencia || '-';
            row.appendChild(refCell);
            
            tbody.appendChild(row);
        });
        table.appendChild(tbody);
        analiseEl.appendChild(table);
    } else {
        analiseEl.innerHTML = '<p>Não foram encontradas alterações significativas.</p>';
    }
    
    // Exibir alertas
    if (resultado.alertas && resultado.alertas.length > 0) {
        const alertasDiv = document.createElement('div');
        alertasDiv.className = 'alertas-laboratorio';
        
        const alertasTitle = document.createElement('h4');
        alertasTitle.textContent = 'Alertas';
        alertasDiv.appendChild(alertasTitle);
        
        const alertasList = document.createElement('ul');
        resultado.alertas.forEach(alerta => {
            const alertaItem = document.createElement('li');
            alertaItem.className = `alerta-${alerta.tipo}`;
            alertaItem.textContent = alerta.mensagem;
            alertasList.appendChild(alertaItem);
        });
        alertasDiv.appendChild(alertasList);
        alertasEl.appendChild(alertasDiv);
    }
    
    // Exibir condutas sugeridas
    if (resultado.condutas && resultado.condutas.length > 0) {
        const condutasDiv = document.createElement('div');
        condutasDiv.className = 'condutas-laboratorio';
        
        const condutasTitle = document.createElement('h4');
        condutasTitle.textContent = 'Condutas Sugeridas';
        condutasDiv.appendChild(condutasTitle);
        
        resultado.condutas.forEach(conduta => {
            const condutaBox = document.createElement('div');
            condutaBox.className = 'conduta-box';
            
            const condutaTitle = document.createElement('h5');
            condutaTitle.textContent = conduta.titulo;
            condutaBox.appendChild(condutaTitle);
            
            const passosList = document.createElement('ul');
            conduta.passos.forEach(passo => {
                const passoItem = document.createElement('li');
                passoItem.textContent = passo;
                passosList.appendChild(passoItem);
            });
            condutaBox.appendChild(passosList);
            condutasDiv.appendChild(condutaBox);
        });
        
        alertasEl.appendChild(condutasDiv);
    }
}

/**
 * Obtém valor numérico de um campo de formulário
 * @param {string} id - ID do elemento
 * @returns {number|null} Valor numérico ou null se vazio
 */
function getNumericValue(id) {
    const el = document.getElementById(id);
    if (!el || el.value === '') return null;
    return parseFloat(el.value);
}

/**
 * Obtém valor de um select
 * @param {string} id - ID do elemento select
 * @returns {string|null} Valor selecionado ou null se vazio
 */
function getSelectValue(id) {
    const el = document.getElementById(id);
    if (!el || el.value === '') return null;
    return el.value;
}

/**
 * Calcula a Taxa de Filtração Glomerular estimada usando a fórmula CKD-EPI
 * @param {number} creatinina - Valor da creatinina em mg/dL
 * @param {Object} paciente - Objeto com dados do paciente (idade, sexo)
 * @returns {number} TFG estimada em mL/min/1.73m²
 */
function calcularTFGEstimada(creatinina, paciente) {
    // Converter idade para anos se estiver em meses
    let idadeAnos = paciente.idade;
    if (paciente.idadeUnidade === 'meses') {
        idadeAnos = paciente.idade / 12;
    }
    
    // Verificar se é adulto ou criança
    if (idadeAnos >= 18) {
        // Fórmula CKD-EPI para adultos
        const sexo = paciente.sexo.toLowerCase();
        const kappa = sexo === 'feminino' ? 0.7 : 0.9;
        const alpha = sexo === 'feminino' ? -0.329 : -0.411;
        const fatorSexo = sexo === 'feminino' ? 1.018 : 1;
        
        const creatRatio = creatinina / kappa;
        
        // Fórmula final para CKD-EPI
        let tfg = 141 * Math.pow(Math.min(creatRatio, 1), alpha) * 
                 Math.pow(Math.max(creatRatio, 1), -1.209) * 
                 Math.pow(0.993, idadeAnos) * fatorSexo;
                 
        return Math.round(tfg * 10) / 10; // Arredonda para 1 casa decimal
    } else {
        // Fórmula de Schwartz para crianças e adolescentes
        // Assumimos altura média para idade devido à falta desse dado
        // Isso é uma aproximação para fins educacionais
        let alturaEstimada = 0;
        
        if (idadeAnos <= 1) {
            alturaEstimada = 75; // cm para bebês
        } else if (idadeAnos <= 5) {
            alturaEstimada = 95 + (idadeAnos - 1) * 7; // aproximação para pré-escolar
        } else if (idadeAnos <= 12) {
            alturaEstimada = 115 + (idadeAnos - 5) * 5; // aproximação para crianças
        } else {
            // Adolescentes
            if (paciente.sexo.toLowerCase() === 'feminino') {
                alturaEstimada = 157;
            } else {
                alturaEstimada = 170;
            }
        }
        
        // Fórmula de Schwartz
        const k = 0.413; // constante
        let tfg = (k * alturaEstimada) / creatinina;
        
        return Math.round(tfg * 10) / 10; // Arredonda para 1 casa decimal
    }
}

/**
 * Calcula o ânion gap para avaliação de distúrbios ácido-básicos
 * @param {number} sodio - Valor do sódio em mEq/L
 * @param {number} cloro - Valor do cloro em mEq/L
 * @param {number} bicarbonato - Valor do bicarbonato em mEq/L
 * @returns {number} Ânion gap em mEq/L
 */
function calcularAnionGap(sodio, cloro, bicarbonato) {
    // Fórmula: Na+ - (Cl- + HCO3-)
    const anionGap = sodio - (cloro + bicarbonato);
    return Math.round(anionGap * 10) / 10; // Arredonda para 1 casa decimal
}

/**
 * Calcula a relação colesterol total/HDL para avaliação de risco cardiovascular
 * @param {number} colesterolTotal - Valor do colesterol total em mg/dL
 * @param {number} hdl - Valor do HDL em mg/dL
 * @returns {number} Relação colesterol total/HDL
 */
function calcularRelacaoColesterolHDL(colesterolTotal, hdl) {
    if (!hdl) return null; // Evitar divisão por zero
    
    const relacao = colesterolTotal / hdl;
    return Math.round(relacao * 10) / 10; // Arredonda para 1 casa decimal
}

/**
 * Calcula o escore de Framingham para estimar o risco cardiovascular em 10 anos
 * @param {number} colesterolTotal - Valor do colesterol total em mg/dL
 * @param {number} hdl - Valor do HDL em mg/dL
 * @param {number} pressaoSistolica - Valor da pressão arterial sistólica em mmHg
 * @param {number} idade - Idade do paciente em anos
 * @param {string} sexo - Sexo do paciente ('masculino' ou 'feminino')
 * @param {boolean} fumante - Se o paciente é fumante
 * @param {boolean} diabetes - Se o paciente tem diabetes
 * @returns {Object} Objeto com o escore e o risco em percentual
 */
function calcularEscoreFramingham(colesterolTotal, hdl, pressaoSistolica, idade, sexo, fumante, diabetes) {
    let pontos = 0;
    const sexoLower = sexo.toLowerCase();
    
    // Pontuação por idade
    if (sexoLower === 'masculino') {
        if (idade < 35) pontos -= 9;
        else if (idade < 40) pontos -= 4;
        else if (idade < 45) pontos += 0;
        else if (idade < 50) pontos += 3;
        else if (idade < 55) pontos += 6;
        else if (idade < 60) pontos += 8;
        else if (idade < 65) pontos += 10;
        else if (idade < 70) pontos += 12;
        else if (idade < 75) pontos += 14;
        else pontos += 16;
    } else {
        // Feminino
        if (idade < 35) pontos -= 7;
        else if (idade < 40) pontos -= 3;
        else if (idade < 45) pontos += 0;
        else if (idade < 50) pontos += 3;
        else if (idade < 55) pontos += 6;
        else if (idade < 60) pontos += 8;
        else if (idade < 65) pontos += 10;
        else if (idade < 70) pontos += 12;
        else if (idade < 75) pontos += 14;
        else pontos += 16;
    }
    
    // Pontuação por colesterol total
    if (colesterolTotal < 160) pontos += 0;
    else if (colesterolTotal < 200) pontos += 1;
    else if (colesterolTotal < 240) pontos += 2;
    else if (colesterolTotal < 280) pontos += 3;
    else pontos += 4;
    
    // Pontuação por HDL
    if (hdl < 35) pontos += 2;
    else if (hdl < 45) pontos += 1;
    else if (hdl < 60) pontos += 0;
    else pontos -= 2;
    
    // Pontuação por pressão sistólica
    if (pressaoSistolica < 120) pontos += 0;
    else if (pressaoSistolica < 130) pontos += 1;
    else if (pressaoSistolica < 140) pontos += 2;
    else if (pressaoSistolica < 160) pontos += 3;
    else pontos += 4;
    
    // Pontuação por tabagismo
    if (fumante) pontos += 2;
    
    // Pontuação por diabetes
    if (diabetes) pontos += 2;
    
    // Calcular risco baseado no escore
    let risco = 0;
    
    if (sexoLower === 'masculino') {
        if (pontos < 0) risco = 1;
        else if (pontos < 5) risco = 2;
        else if (pontos < 7) risco = 3;
        else if (pontos < 9) risco = 4;
        else if (pontos < 11) risco = 8;
        else if (pontos < 13) risco = 11;
        else if (pontos < 15) risco = 15;
        else if (pontos < 17) risco = 20;
        else risco = 25;
    } else {
        // Feminino
        if (pontos < 9) risco = 1;
        else if (pontos < 13) risco = 2;
        else if (pontos < 15) risco = 3;
        else if (pontos < 17) risco = 5;
        else if (pontos < 19) risco = 8;
        else if (pontos < 21) risco = 11;
        else if (pontos < 23) risco = 14;
        else if (pontos < 25) risco = 17;
        else risco = 22;
    }
    
    return {
        pontos: pontos,
        risco: risco, // porcentagem de risco em 10 anos
        classificacao: classificarRiscoCardiovascular(risco)
    };
}

/**
 * Classifica o risco cardiovascular baseado no percentual do escore de Framingham
 * @param {number} percentualRisco - Percentual de risco em 10 anos
 * @returns {string} Classificação do risco
 */
function classificarRiscoCardiovascular(percentualRisco) {
    if (percentualRisco < 5) {
        return 'Baixo';
    } else if (percentualRisco < 10) {
        return 'Moderado';
    } else if (percentualRisco < 20) {
        return 'Alto';
    } else {
        return 'Muito Alto';
    }
}

/**
 * Limpa os campos de um formulário
 * @param {Array<string>} campos - Lista de IDs dos campos a limpar
 */
function limparFormulario(campos) {
    campos.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
}
