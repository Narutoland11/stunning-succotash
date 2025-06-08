/**
 * Interações Medicamentosas - InteraMed
 * Este módulo implementa a funcionalidade avançada de verificação de interações entre medicamentos
 * Baseado em bases de dados farmacológicas reconhecidas internacionalmente (DrugBank, Micromedex, UpToDate)
 * e adaptado para o contexto de Moçambique
 */

// Classificações internacionais de interações
const CLASSIFICACAO_INTERACOES = {
    // Classificação de gravidade (baseada no sistema Micromedex)
    GRAVIDADE: {
        CONTRAINDICADA: {
            id: 'contraindicada',
            nome: 'CONTRAINDICADA',
            descricao: 'Combinação absolutamente contraindicada - não devem ser administrados concomitantemente',
            classe: 'interacao-contraindicada',
            icone: 'fa-skull'
        },
        GRAVE: {
            id: 'grave',
            nome: 'GRAVE',
            descricao: 'Pode representar perigo à vida e/ou requerer intervenção médica para minimizar efeitos adversos graves',
            classe: 'interacao-grave',
            icone: 'fa-exclamation-triangle'
        },
        MODERADA: {
            id: 'moderada',
            nome: 'MODERADA',
            descricao: 'Pode resultar em exacerbação da condição do paciente e/ou requerer alteração no tratamento',
            classe: 'interacao-moderada',
            icone: 'fa-exclamation-circle'
        },
        LEVE: {
            id: 'leve',
            nome: 'LEVE',
            descricao: 'Tem efeitos clínicos limitados. As manifestações podem incluir aumento na frequência ou gravidade dos efeitos adversos, mas geralmente não requerem alteração significativa no tratamento',
            classe: 'interacao-leve',
            icone: 'fa-info-circle'
        }
    },
    
    // Classificação de evidência (baseada no sistema UpToDate/Lexicomp)
    EVIDENCIA: {
        EXCELENTE: {
            id: 'excelente',
            nome: 'A',
            descricao: 'Estudos controlados demonstram a interação',
            classe: 'evidencia-a'
        },
        BOA: {
            id: 'boa',
            nome: 'B',
            descricao: 'Estudos sugerem fortemente a interação, mas faltam estudos controlados',
            classe: 'evidencia-b'
        },
        RAZOAVEL: {
            id: 'razoavel',
            nome: 'C',
            descricao: 'Evidência limitada, mas considerações farmacológicas levam os clínicos a suspeitar da interação',
            classe: 'evidencia-c'
        },
        POBRE: {
            id: 'pobre',
            nome: 'D',
            descricao: 'Evidência limitada a poucos relatos de caso',
            classe: 'evidencia-d'
        }
    },
    
    // Classificação da ação necessária (baseada no DrugBank)
    ACAO: {
        EVITAR: {
            id: 'evitar',
            nome: 'EVITAR',
            descricao: 'Combinação deve ser evitada completamente'
        },
        MONITORAR: {
            id: 'monitorar',
            nome: 'MONITORAR',
            descricao: 'Monitorar paciente para possíveis efeitos adversos'
        },
        AJUSTAR: {
            id: 'ajustar',
            nome: 'AJUSTAR',
            descricao: 'Ajustar dose ou intervalo de administração'
        },
        OBSERVAR: {
            id: 'observar',
            nome: 'OBSERVAR',
            descricao: 'Observar possíveis sinais/sintomas'
        }
    }
};

// Base de dados de interações medicamentosas (aprimorada com classificações internacionais)
const INTERACOES_MEDICAMENTOSAS = {
    // Antibióticos
    amoxicilina: {
        warfarina: {
            gravidade: CLASSIFICACAO_INTERACOES.GRAVIDADE.MODERADA,
            evidencia: CLASSIFICACAO_INTERACOES.EVIDENCIA.BOA,
            acao: CLASSIFICACAO_INTERACOES.ACAO.MONITORAR,
            efeito: "Aumento do risco de sangramento",
            mecanismo: "Alteração da flora intestinal que produz vitamina K",
            recomendacao: "Monitorar INR e sinais de sangramento",
            inicio: "Lento (3-7 dias)",
            duracao: "Enquanto durar o tratamento e até uma semana após",
            manejo: "Considerar redução prévia da dose de warfarina em 25% se tratamento prolongado"
        },
        contraceptivosOrais: {
            gravidade: CLASSIFICACAO_INTERACOES.GRAVIDADE.MODERADA,
            evidencia: CLASSIFICACAO_INTERACOES.EVIDENCIA.RAZOAVEL,
            acao: CLASSIFICACAO_INTERACOES.ACAO.OBSERVAR,
            efeito: "Redução da eficácia contraceptiva",
            mecanismo: "Alteração da circulação entero-hepática dos estrógenos",
            recomendacao: "Considerar método contraceptivo adicional",
            inicio: "Variável",
            duracao: "Durante o tratamento e por 7 dias após",
            manejo: "Método contraceptivo de barreira adicional durante o tratamento"
        }
    },
    
    // Antirretrovirais
    nevirapina: {
        contraceptivosOrais: {
            gravidade: CLASSIFICACAO_INTERACOES.GRAVIDADE.GRAVE,
            evidencia: CLASSIFICACAO_INTERACOES.EVIDENCIA.EXCELENTE,
            acao: CLASSIFICACAO_INTERACOES.ACAO.EVITAR,
            efeito: "Redução significativa da eficácia contraceptiva (>40%)",
            mecanismo: "Indução do citocromo P450 3A4 hepático que acelera o metabolismo dos estrógenos",
            recomendacao: "Usar métodos contraceptivos alternativos não hormonais",
            inicio: "Rápido (1-2 dias)",
            duracao: "Enquanto durar o tratamento e até 28 dias após",
            manejo: "Métodos contraceptivos de barreira ou dispositivo intrauterino",
            referencia: "WHO Guidelines, 2021"
        },
        fluconazol: {
            gravidade: CLASSIFICACAO_INTERACOES.GRAVIDADE.MODERADA,
            evidencia: CLASSIFICACAO_INTERACOES.EVIDENCIA.BOA,
            acao: CLASSIFICACAO_INTERACOES.ACAO.MONITORAR,
            efeito: "Aumento do risco de hepatotoxicidade e rash cutâneo",
            mecanismo: "Efeito aditivo hepatotóxico e indução da resposta imune a metabolitos",
            recomendacao: "Monitorar função hepática a cada 2 semanas no primeiro mês de uso concomitante",
            inicio: "Variável (2-6 semanas)",
            duracao: "Durante todo o tratamento conjunto",
            manejo: "Considerar suspensão se AST/ALT > 5x o limite superior normal ou sinais clínicos de hepatite",
            referencia: "ACTG Guidelines, 2019"
        },
        rifampicina: {
            gravidade: CLASSIFICACAO_INTERACOES.GRAVIDADE.CONTRAINDICADA,
            evidencia: CLASSIFICACAO_INTERACOES.EVIDENCIA.EXCELENTE,
            acao: CLASSIFICACAO_INTERACOES.ACAO.EVITAR,
            efeito: "Redução significativa (>50%) dos níveis séricos de nevirapina",
            mecanismo: "Forte indução do CYP3A4 pela rifampicina aumentando o metabolismo da nevirapina",
            recomendacao: "Evitar uso concomitante. Considerar efavirenz em vez de nevirapina em pacientes com tuberculose",
            inicio: "Rápido (24-48h)",
            duracao: "Até 2-3 semanas após a descontinuação da rifampicina",
            manejo: "Se não houver alternativa, considerar aumentar dose de nevirapina com monitoramento rigoroso de carga viral",
            referencia: "WHO TB/HIV Guidelines, 2022",
            alternativas: ["efavirenz", "dolutegravir (dose ajustada)"]
        },
        atazanavir: {
            gravidade: CLASSIFICACAO_INTERACOES.GRAVIDADE.CONTRAINDICADA, 
            evidencia: CLASSIFICACAO_INTERACOES.EVIDENCIA.EXCELENTE,
            acao: CLASSIFICACAO_INTERACOES.ACAO.EVITAR,
            efeito: "Redução significativa dos níveis de atazanavir e potencial aumento de nevirapina",
            mecanismo: "Indução enzimática mútua alterando o metabolismo de ambos os medicamentos",
            recomendacao: "Combinação contraindicada - utilizar classes alternativas de antirretrovirais",
            inicio: "Rápido", 
            duracao: "Persistente", 
            referencia: "PEPFAR Guidelines, 2023"
        }
    },
    
    // Antimaláricos
    quinino: {
        digoxina: {
            gravidade: CLASSIFICACAO_INTERACOES.GRAVIDADE.MODERADA,
            evidencia: CLASSIFICACAO_INTERACOES.EVIDENCIA.BOA,
            acao: CLASSIFICACAO_INTERACOES.ACAO.MONITORAR,
            efeito: "Aumento dos níveis séricos de digoxina em 30-100%",
            mecanismo: "Redução da depuração renal da digoxina e possível inibição da glicoproteína-P",
            recomendacao: "Monitorar níveis séricos de digoxina e sinais de toxicidade (náuseas, vômitos, arritmias)",
            inicio: "48-72 horas",
            duracao: "Durante o tratamento com quinino",
            manejo: "Considerar redução da dose de digoxina em 30-50% ao iniciar o quinino",
            referencia: "Malaria Treatment Guidelines, WHO 2023",
            populacaoRisco: "Idosos e pacientes com função renal diminuida"
        },
        rifampicina: {
            gravidade: CLASSIFICACAO_INTERACOES.GRAVIDADE.MODERADA,
            evidencia: CLASSIFICACAO_INTERACOES.EVIDENCIA.RAZOAVEL,
            acao: CLASSIFICACAO_INTERACOES.ACAO.AJUSTAR,
            efeito: "Redução de até 70% dos níveis plasmáticos de quinino",
            mecanismo: "Indução do CYP3A4 hepático pela rifampicina",
            recomendacao: "Aumentar dose de quinino se possível ou usar alternativa para a malária",
            inicio: "3-5 dias",
            duracao: "Até 2 semanas após descontinuar rifampicina",
            manejo: "Considerar artemisinin como alternativa em pacientes com TB+Malária",
            referencia: "International Journal of Antimicrobial Agents, 2020",
            alternativas: ["artesunato", "artemeter"]
        },
        amiodarona: {
            gravidade: CLASSIFICACAO_INTERACOES.GRAVIDADE.CONTRAINDICADA,
            evidencia: CLASSIFICACAO_INTERACOES.EVIDENCIA.BOA,
            acao: CLASSIFICACAO_INTERACOES.ACAO.EVITAR,
            efeito: "Prolongamento significativo do intervalo QT e risco de torsades de pointes",
            mecanismo: "Efeito aditivo na repolarização cardíaca com bloqueio de canais de potássio",
            recomendacao: "Evitar combinação - risco de morte súbita cardíaca",
            inicio: "Rápido",
            duracao: "Durante o uso concomitante e até eliminação da amiodarona (meia-vida longa)",
            manejo: "Utilizar alternativa antimalárica sem efeito sobre QT em pacientes que necessitam amiodarona",
            referencia: "WHO/ISC Drug Alert 2023",
            monitoramento: "ECG seriados com medição de QTc"
        }
    },
    
    // Anti-tuberculosos (RHZE componentes)
    rifampicina: {
        warfarina: {
            gravidade: "grave",
            efeito: "Redução do efeito anticoagulante",
            mecanismo: "Indução do metabolismo da warfarina",
            recomendacao: "Monitorar INR frequentemente e ajustar dose de warfarina"
        },
        contraceptivosOrais: {
            gravidade: "grave",
            efeito: "Perda da eficácia contraceptiva",
            mecanismo: "Indução enzimática das enzimas metabolizadoras",
            recomendacao: "Usar método contraceptivo alternativo"
        },
        metadona: {
            gravidade: "grave",
            efeito: "Síndrome de abstinência em pacientes em tratamento com metadona",
            mecanismo: "Indução do metabolismo da metadona",
            recomendacao: "Monitorar sinais de abstinência e ajustar dose de metadona"
        }
    },
    isoniazida: {
        fenitoina: {
            gravidade: "moderada",
            efeito: "Aumento dos níveis de fenitoína e toxicidade",
            mecanismo: "Inibição do metabolismo da fenitoína",
            recomendacao: "Monitorar níveis de fenitoína e sinais de toxicidade"
        },
        carbamazepina: {
            gravidade: "moderada",
            efeito: "Aumento dos níveis de carbamazepina e toxicidade",
            mecanismo: "Inibição do metabolismo da carbamazepina",
            recomendacao: "Monitorar níveis de carbamazepina"
        }
    },
    
    // Antiparasitários
    mebendazol: {
        carbamazepina: {
            gravidade: "leve",
            efeito: "Redução dos níveis séricos de mebendazol",
            mecanismo: "Aumento do metabolismo de mebendazol",
            recomendacao: "Considerar aumento da dose de mebendazol"
        },
        metronidazol: {
            gravidade: "moderada",
            efeito: "Aumento do risco de efeitos adversos gastrointestinais",
            mecanismo: "Efeito aditivo na irritação gastrointestinal",
            recomendacao: "Administrar com alimentos e monitorar sintomas GI"
        }
    },
    
    // Anti-hipertensivos
    enalapril: {
        espironolactona: {
            gravidade: "moderada",
            efeito: "Risco de hipercalemia",
            mecanismo: "Ambos reduzem a excreção de potássio",
            recomendacao: "Monitorar níveis séricos de potássio regularmente"
        },
        anti_inflamatorios: {
            gravidade: "moderada",
            efeito: "Redução do efeito anti-hipertensivo",
            mecanismo: "Retenção de sódio e água pelos AINEs",
            recomendacao: "Monitorar pressão arterial e considerar ajuste de dose"
        }
    },
    
    // Adicionais para completar base mais robusta para o contexto de Moçambique
    artemisinina: {
        efavirenz: {
            gravidade: "moderada",
            efeito: "Redução dos níveis de artemisinina",
            mecanismo: "Indução enzimática do metabolismo",
            recomendacao: "Monitorar eficácia do tratamento da malária"
        }
    },
    
    zidovudina: {
        cotrimoxazol: {
            gravidade: "moderada",
            efeito: "Aumento dos níveis de zidovudina",
            mecanismo: "Inibição da glucuronidação da zidovudina",
            recomendacao: "Monitorar toxicidade da zidovudina (anemia, neutropenia)"
        }
    },
    
    fluconazol: {
        nevirapina: {
            gravidade: "moderada",
            efeito: "Aumento do risco de hepatotoxicidade",
            mecanismo: "Efeito aditivo hepatotóxico",
            recomendacao: "Monitorar função hepática cuidadosamente"
        }
    }
};

/**
 * Inicializa a funcionalidade de verificação de interações medicamentosas
 */
function initInteracoesMedicamentosas() {
    const medicamento1Select = document.getElementById('interacao-medicamento1');
    const medicamento2Select = document.getElementById('interacao-medicamento2');
    const verificarButton = document.getElementById('verificar-interacao');
    const resultadoInteracao = document.getElementById('resultado-interacao');
    const limparButton = document.getElementById('limpar-interacao');
    
    if (!medicamento1Select || !medicamento2Select || !verificarButton || !resultadoInteracao || !limparButton) {
        console.error('Elementos necessários para verificação de interações não encontrados');
        return;
    }

    // Preencher os selects com os medicamentos disponíveis
    preencherSelectMedicamentos(medicamento1Select);
    preencherSelectMedicamentos(medicamento2Select);

    // Configurar evento de verificação
    verificarButton.addEventListener('click', function() {
        const med1 = medicamento1Select.value;
        const med2 = medicamento2Select.value;
        
        if (!med1 || !med2) {
            exibirMensagemErro(resultadoInteracao, 'Selecione dois medicamentos para verificar interações.');
            return;
        }
        
        if (med1 === med2) {
            exibirMensagemErro(resultadoInteracao, 'Selecione medicamentos diferentes para verificação.');
            return;
        }
        
        verificarInteracao(med1, med2);
    });
    
    // Configurar evento de limpar
    limparButton.addEventListener('click', function() {
        medicamento1Select.value = '';
        medicamento2Select.value = '';
        resultadoInteracao.classList.add('hidden');
    });
}

/**
 * Preenche o select com os medicamentos disponíveis na base de dados
 * @param {HTMLElement} selectElement - Elemento select a ser preenchido
 */
function preencherSelectMedicamentos(selectElement) {
    // Limpar opções existentes, mantendo apenas a primeira (placeholder)
    while (selectElement.options.length > 1) {
        selectElement.remove(1);
    }
    
    // Adicionar todos os medicamentos disponíveis em MEDICAMENTOS global
    if (typeof MEDICAMENTOS !== 'undefined') {
        const medicamentosKeys = Object.keys(MEDICAMENTOS).sort();
        
        medicamentosKeys.forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = MEDICAMENTOS[key].nome || key;
            selectElement.appendChild(option);
        });
        
        console.log(`${medicamentosKeys.length} medicamentos adicionados ao seletor de interações`);
    } else {
        console.error('Base de dados de medicamentos não disponível');
    }
    
    // Adicionar medicamentos da base de interações que possam não estar na base principal
    const medicamentosInteracao = Object.keys(INTERACOES_MEDICAMENTOSAS);
    medicamentosInteracao.forEach(med => {
        // Verificar se já existe no select (pode já ter sido adicionado da base MEDICAMENTOS)
        let exists = false;
        for (let i = 0; i < selectElement.options.length; i++) {
            if (selectElement.options[i].value === med) {
                exists = true;
                break;
            }
        }
        
        // Se não existir, adicionar
        if (!exists) {
            const option = document.createElement('option');
            option.value = med;
            // Usar primeira letra maiúscula como nome se não houver um nome formal
            option.textContent = med.charAt(0).toUpperCase() + med.slice(1);
            selectElement.appendChild(option);
        }
    });
}

/**
 * Verifica interação entre dois medicamentos
 * @param {string} med1 - Nome/chave do primeiro medicamento
 * @param {string} med2 - Nome/chave do segundo medicamento
 */
function verificarInteracaoMedicamentosa(medicamento1, medicamento2) {
    // Validação básica
    if (!medicamento1 || !medicamento2 || medicamento1 === medicamento2) {
        return null;
    }

    let resultado = null;
    let interacaoEncontrada = false;

    // Verifica se medicamento1 tem interação com medicamento2
    if (INTERACOES_MEDICAMENTOSAS[medicamento1] && INTERACOES_MEDICAMENTOSAS[medicamento1][medicamento2]) {
        resultado = INTERACOES_MEDICAMENTOSAS[medicamento1][medicamento2];
        interacaoEncontrada = true;
        resultado.medicamentoOrigem = medicamento1;
        resultado.medicamentoAlvo = medicamento2;
    }
    // Verifica se medicamento2 tem interação com medicamento1 (bidirecional)
    else if (INTERACOES_MEDICAMENTOSAS[medicamento2] && INTERACOES_MEDICAMENTOSAS[medicamento2][medicamento1]) {
        resultado = INTERACOES_MEDICAMENTOSAS[medicamento2][medicamento1];
        interacaoEncontrada = true;
        resultado.medicamentoOrigem = medicamento2;
        resultado.medicamentoAlvo = medicamento1;
    }

    // Registrar a pesquisa no histórico
    registrarPesquisaInteracao(medicamento1, medicamento2, interacaoEncontrada);

    return resultado;
}

/**
 * Registra pesquisas de interações para fins de auditoria e melhoria da base de dados
 * 
 * @param {string} med1 - Primeiro medicamento pesquisado
 * @param {string} med2 - Segundo medicamento pesquisado
 * @param {boolean} encontrada - Se a interação foi encontrada na base de dados
 */
function registrarPesquisaInteracao(med1, med2, encontrada) {
    // Armazena localmente o histórico de pesquisas de interações
    const historicoPesquisas = JSON.parse(localStorage.getItem('interaMedHistorico') || '[]');
    
    // Adiciona pesquisa atual ao histórico
    historicoPesquisas.push({
        timestamp: new Date().toISOString(),
        medicamentos: [med1, med2].sort(), // Ordena para facilitar análises futuras
        resultado: encontrada ? 'encontrada' : 'não encontrada'
    });
    
    // Mantém apenas as 50 últimas pesquisas
    if (historicoPesquisas.length > 50) {
        historicoPesquisas.shift();
    }
    
    // Salva o histórico atualizado
    localStorage.setItem('interaMedHistorico', JSON.stringify(historicoPesquisas));
}
/**
 * Verifica interação entre dois medicamentos e exibe o resultado na interface
 * @param {string} med1 - Nome/chave do primeiro medicamento
 * @param {string} med2 - Nome/chave do segundo medicamento
 */
function verificarInteracao(med1, med2) {
    const resultadoContainer = document.getElementById('resultado-interacao');
    const analiseInteracao = document.getElementById('analise-interacao');
    
    // Limpar conteúdo anterior
    analiseInteracao.innerHTML = '';
    
    // Se algum dos medicamentos não foi selecionado
    if (!med1 || !med2) {
        exibirMensagemErro(resultadoContainer, 'Selecione dois medicamentos para verificar interações.');
        return;
    }
    
    // Se o mesmo medicamento foi selecionado duas vezes
    if (med1 === med2) {
        exibirMensagemErro(resultadoContainer, 'Selecione medicamentos diferentes para verificar interações.');
        return;
    }
    
    // Utilizar a função de verificação de interações
    const interacao = verificarInteracaoMedicamentosa(med1, med2);
    
    // Mostrar resultado
    resultadoContainer.classList.remove('hidden');
    
    if (interacao) {
        // Obter os nomes formais dos medicamentos
        const nomeMed1 = (typeof MEDICAMENTOS !== 'undefined' && MEDICAMENTOS[med1]) 
            ? MEDICAMENTOS[med1].nome 
            : med1.charAt(0).toUpperCase() + med1.slice(1);
        
        const nomeMed2 = (typeof MEDICAMENTOS !== 'undefined' && MEDICAMENTOS[med2]) 
            ? MEDICAMENTOS[med2].nome 
            : med2.charAt(0).toUpperCase() + med2.slice(1);
        
        // Obter classificação de gravidade e ícones associados
        const categoriaGravidade = interacao.gravidade || CLASSIFICACAO_INTERACOES.GRAVIDADE.LEVE;
        const classeGravidade = categoriaGravidade.classe || 'interacao-leve';
        const iconeGravidade = '<i class="fas ' + (categoriaGravidade.icone || 'fa-info-circle') + '"></i>';
        const nomeGravidade = categoriaGravidade.nome || 'LEVE';
        
        // Obter classificação de evidência (se existir)
        const evidencia = interacao.evidencia || CLASSIFICACAO_INTERACOES.EVIDENCIA.RAZOAVEL;
        const classeEvidencia = evidencia.classe || 'evidencia-c';
        const nomeEvidencia = evidencia.nome || 'C';
        
        // Obter ação recomendada (se existir)
        const acao = interacao.acao || CLASSIFICACAO_INTERACOES.ACAO.OBSERVAR;
        const nomeAcao = acao.nome || 'OBSERVAR';

        // Construir a exibição da interação - formato aprimorado
        let html = `
            <div class="interacao-header ${classeGravidade}">
                ${iconeGravidade} Interação ${nomeGravidade} detectada
            </div>
            <div class="interacao-medicamentos">
                <span>${nomeMed1}</span> <i class="fas fa-exchange-alt"></i> <span>${nomeMed2}</span>
            </div>
            
            <div class="interacao-classificacao">
                <div class="classificacao-item ${classeGravidade}">
                    <span class="classificacao-titulo">Gravidade</span>
                    <span class="classificacao-valor">${nomeGravidade}</span>
                </div>
                <div class="classificacao-item ${classeEvidencia}">
                    <span class="classificacao-titulo">Evidência</span>
                    <span class="classificacao-valor">${nomeEvidencia}</span>
                </div>
                <div class="classificacao-item acao-${acao.id}">
                    <span class="classificacao-titulo">Ação</span>
                    <span class="classificacao-valor">${nomeAcao}</span>
                </div>
            </div>

            <div class="interacao-detalhes">
                <div class="detalhe-item">
                    <strong>Efeito:</strong> ${interacao.efeito}
                </div>
                <div class="detalhe-item">
                    <strong>Mecanismo:</strong> ${interacao.mecanismo}
                </div>
                <div class="detalhe-item">
                    <strong>Recomendação:</strong> ${interacao.recomendacao}
                </div>
                ${interacao.inicio ? `<div class="detalhe-item"><strong>Início do efeito:</strong> ${interacao.inicio}</div>` : ''}
                ${interacao.duracao ? `<div class="detalhe-item"><strong>Duração:</strong> ${interacao.duracao}</div>` : ''}
                ${interacao.manejo ? `<div class="detalhe-item"><strong>Manejo clínico:</strong> ${interacao.manejo}</div>` : ''}
                ${interacao.populacaoRisco ? `<div class="detalhe-item"><strong>População de risco:</strong> ${interacao.populacaoRisco}</div>` : ''}
            </div>

            ${interacao.alternativas ? `
                <div class="interacao-alternativas">
                    <strong><i class="fas fa-exchange-alt"></i> Alternativas sugeridas:</strong>
                    <ul>${interacao.alternativas.map(alt => `<li>${alt}</li>`).join('')}</ul>
                </div>` : ''
            }

            <div class="interacao-referencia">
                ${interacao.referencia ? 
                    `<div class="referencia-item"><i class="fas fa-book-medical"></i> Fonte: ${interacao.referencia}</div>` : 
                    ''
                }
                <div class="interacao-aviso interacao-aviso-compacto">
                    <i class="fas fa-exclamation-circle"></i> Avalie sempre o risco-benefício para cada paciente.
                </div>
            </div>
        `;
        
        analiseInteracao.innerHTML = html;
    } else {
        // Se não há interação conhecida
        const nomeMed1 = (typeof MEDICAMENTOS !== 'undefined' && MEDICAMENTOS[med1]) 
            ? MEDICAMENTOS[med1].nome 
            : med1.charAt(0).toUpperCase() + med1.slice(1);
        
        const nomeMed2 = (typeof MEDICAMENTOS !== 'undefined' && MEDICAMENTOS[med2]) 
            ? MEDICAMENTOS[med2].nome 
            : med2.charAt(0).toUpperCase() + med2.slice(1);
        
        // Exibir mensagem de segurança relativa        
        let html = `
            <div class="interacao-header interacao-segura">
                <i class="fas fa-check-circle"></i> Nenhuma interação conhecida
            </div>
            <div class="interacao-medicamentos">
                <span>${nomeMed1}</span> <i class="fas fa-plus"></i> <span>${nomeMed2}</span>
            </div>
            
            <div class="interacao-status-seguro">
                <i class="fas fa-shield-alt"></i>
                <div class="status-mensagem">Interação não documentada na base de dados</div>
            </div>
            
            <div class="interacao-aviso interacao-aviso-simples">
                <p><i class="fas fa-info-circle"></i> <strong>Nota:</strong> A ausência de registro não garante que não existam interações.</p>
                <p>Consulte sempre fontes atualizadas.</p>
            </div>
        `;
        
        analiseInteracao.innerHTML = html;
    }
    
    // Exibir resultado
    resultadoContainer.classList.remove('hidden');
}

/**
 * Exibe mensagem de erro no contêiner de resultado
 * @param {HTMLElement} container - Elemento que exibirá o erro
 * @param {string} mensagem - Mensagem de erro a ser exibida
 */
function exibirMensagemErro(container, mensagem) {
    // Encontrar o container de análise dentro do container principal
    const analiseInteracao = container.querySelector('#analise-interacao') || container;
    
    analiseInteracao.innerHTML = `
        <div class="erro-interacao">
            <i class="fas fa-exclamation-circle"></i> ${mensagem}
        </div>
    `;
    
    container.classList.remove('hidden');
}

// Executar inicialização quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initInteracoesMedicamentosas();
});
