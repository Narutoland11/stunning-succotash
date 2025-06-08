/**
 * Script emergencial para correção direta da base de medicamentos
 * Este arquivo força a adição dos medicamentos antiepilépticos e outros medicamentos essenciais
 * Versão 2.0 - Correção completa de sintaxe e dados
 */

// Função auto-executável para isolar o código
(function() {
    console.log('=== CORREÇÃO EMERGENCIAL DE MEDICAMENTOS ===');
    
    // Função para verificar e iniciar objeto MEDICAMENTOS
    function verificarMedicamentos() {
        if (typeof window.MEDICAMENTOS === 'undefined' || Object.keys(window.MEDICAMENTOS).length === 0) {
            console.warn("Criando objeto MEDICAMENTOS que não existia ou estava vazio");
            window.MEDICAMENTOS = {};
        }
        return window.MEDICAMENTOS;
    }

    // Verificar e inicializar os outros objetos globais necessários
    function verificarObjetosGlobais() {
        if (typeof window.INDICACOES === 'undefined' || Object.keys(window.INDICACOES).length === 0) {
            console.warn("Criando objeto INDICACOES que não existia ou estava vazio");
            window.INDICACOES = {};
        }
        
        if (typeof window.VIAS === 'undefined' || Object.keys(window.VIAS).length === 0) {
            console.warn("Criando objeto VIAS que não existia ou estava vazio");
            window.VIAS = {};
        }
        
        // Garantir que os objetos estejam disponíveis no escopo global
        if (typeof MEDICAMENTOS === 'undefined') {
            window.MEDICAMENTOS = window.MEDICAMENTOS;
        }
        
        if (typeof INDICACOES === 'undefined') {
            window.INDICACOES = window.INDICACOES;
        }
        
        if (typeof VIAS === 'undefined') {
            window.VIAS = window.VIAS;
        }
        
        // Adicionar vias padrão se não existirem
        if (typeof window.VIAS !== 'undefined') {
            if (!window.VIAS.oral) window.VIAS.oral = "Via Oral";
            if (!window.VIAS.iv) window.VIAS.iv = "Intravenoso";
        }
        
        console.log('Objetos globais verificados e inicializados com sucesso');
    }
    
    // Atualizar contagem de medicamentos na interface
    function atualizarContagem() {
        try {
            // Verificar se o objeto existe
            const MEDICAMENTOS = verificarMedicamentos();
            
            // Calcular contagem
            const total = Object.keys(MEDICAMENTOS).length;
            console.log(`Total de medicamentos: ${total}`);
            
            // Atualizar elementos na interface
            const elementosContagem = document.querySelectorAll('.total-medicamentos, #total-medicamentos, [data-medicamentos-count]');
            elementosContagem.forEach(elem => {
                if (elem) {
                    elem.textContent = total;
                    console.log('Elemento de contagem atualizado:', elem);
                }
            });
            
            // Executar análise de medicamentos se disponível
            if (typeof window.analisarMedicamentos === 'function') {
                console.log('Executando análise de medicamentos...');
                const stats = window.analisarMedicamentos();
                
                // Atualizar estatísticas na interface
                if (typeof window.atualizarEstatisticasInterface === 'function') {
                    window.atualizarEstatisticasInterface(stats);
                    console.log('Interface de estatísticas atualizada');
                }
                
                // Avisar sobre a atualização
                if (typeof window.ALERTA_SISTEMA !== 'undefined') {
                    window.ALERTA_SISTEMA.sucesso(`Base de medicamentos atualizada! Total de ${total} medicamentos disponíveis.`, {
                        duracao: 8000,
                        fechavel: true
                    });
                }
            }
        } catch (error) {
            console.error('Erro ao atualizar contagem:', error);
        }
    }

    // Função para adicionar azitromicina 
    function adicionarAzitromicina() {
        console.log('Adicionando azitromicina ao objeto MEDICAMENTOS...');
        const MEDICAMENTOS = verificarMedicamentos();
        
        try {
            // Adicionar azitromicina
            MEDICAMENTOS.azitromicina = {
                nome: "Azitromicina",
                formas: {
                    oral: {
                        descricao: "Suspensão oral 200mg/5mL",
                        tipo: "suspensao",
                        passos: [
                            "Agitar bem antes de usar",
                            "Administrar 1 hora antes ou 2 horas após as refeições",
                            "Administrar com seringa dosadora específica"
                        ],
                        precaucoes: [
                            "Risco de prolongamento do QT",
                            "Interação com antiácidos e ergotamínicos",
                            "Monitorar função hepática"
                        ],
                        indicacoes: {
                            pneumonia: {
                                dose: "10 mg/kg no dia 1, depois 5 mg/kg",
                                doseMaxima: "500 mg no dia 1, 250 mg depois",
                                frequencia: "1 vez ao dia",
                                duracao: "5 dias"
                            },
                            otite: {
                                dose: "10 mg/kg/dia",
                                doseMaxima: "500 mg/dia",
                                frequencia: "1 vez ao dia",
                                duracao: "3 dias"
                            },
                            sinusite: {
                                dose: "10 mg/kg/dia",
                                doseMaxima: "500 mg/dia",
                                frequencia: "1 vez ao dia",
                                duracao: "3 dias"
                            },
                            faringite: {
                                dose: "12 mg/kg/dia",
                                doseMaxima: "500 mg/dia",
                                frequencia: "1 vez ao dia",
                                duracao: "5 dias"
                            }
                        }
                    }
                }
            };
            
            // Adicionar indicacoes
            if (typeof window.INDICACOES !== 'undefined') {
                window.INDICACOES.pneumonia = "Pneumonia";
                window.INDICACOES.otite = "Otite Média Aguda";
                window.INDICACOES.sinusite = "Sinusite Aguda";
                window.INDICACOES.faringite = "Faringite Estreptocócica";
            }
            
            console.log('Azitromicina adicionada com sucesso!');
            return true;
        } catch (error) {
            console.error('Erro ao adicionar azitromicina:', error);
            return false;
        }
    }

    // Função principal para adicionar os medicamentos diretamente
    function adicionarMedicamentosEmergencial() {
        const MEDICAMENTOS = verificarMedicamentos();
        // Verificar e inicializar outros objetos globais necessários
        verificarObjetosGlobais();
        
        console.log('Iniciando adição emergencial de medicamentos...');
        let medicamentosAdicionados = 0;
        
        try {
            // === CARBAMAZEPINA ===
            MEDICAMENTOS.carbamazepina = {
                nome: "Carbamazepina",
                formas: {
                    oral: {
                        descricao: "Comprimidos 200mg, 400mg; Suspensão oral 20mg/mL",
                        tipo: "comprimido",
                        passos: [
                            "Iniciar com doses baixas e aumentar gradualmente",
                            "Administrar com alimentos para reduzir irritação gástrica",
                            "Manter intervalo regular entre doses"
                        ],
                        precaucoes: [
                            "Monitorar níveis séricos periodicamente",
                            "Risco de reações cutâneas graves",
                            "Múltiplas interações medicamentosas",
                            "Monitorar hemograma e enzimas hepáticas"
                        ],
                        indicacoes: {
                            epilepsia: {
                                dose: "Inicial: 5-10 mg/kg/dia; Manutenção: 10-35 mg/kg/dia",
                                doseMaxima: "1200 mg/dia em crianças, 1600 mg/dia em adultos",
                                frequencia: "2-3 vezes ao dia",
                                duracao: "Tratamento contínuo, conforme necessário"
                            }
                        }
                    }
                }
            };
            
            // === VALPROATO ===
            MEDICAMENTOS.valproato = {
                nome: "Valproato de Sódio",
                formas: {
                    oral: {
                        descricao: "Comprimidos 250mg, 500mg; Solução oral 50mg/mL",
                        tipo: "comprimido",
                        passos: [
                            "Iniciar com dose baixa e aumentar gradualmente",
                            "Administrar com alimentos para reduzir efeitos gastrointestinais",
                            "Monitorar função hepática"
                        ],
                        precaucoes: [
                            "Hepatotoxicidade grave, especialmente em crianças < 2 anos",
                            "Monitorar função hepática nos primeiros 6 meses de tratamento",
                            "Teratogenicidade - evitar em mulheres em idade fértil se possível",
                            "Monitorar contagem de plaquetas e coagulação"
                        ],
                        indicacoes: {
                            epilepsiaGeral: {
                                dose: "Inicial: 10-15 mg/kg/dia; Manutenção: 30-60 mg/kg/dia",
                                doseMaxima: "60 mg/kg/dia ou 3000 mg/dia",
                                frequencia: "2-3 vezes ao dia",
                                duracao: "Tratamento contínuo, conforme necessário"
                            }
                        }
                    }
                }
            };
            
            // === FENITOÍNA ===
            MEDICAMENTOS.fenitoina = {
                nome: "Fenitoína",
                formas: {
                    oral: {
                        descricao: "Comprimidos 100mg; Suspensão oral 20mg/mL",
                        tipo: "comprimido",
                        passos: [
                            "Administrar preferencialmente junto com as refeições",
                            "Manter horários regulares de administração",
                            "Agitar bem a suspensão antes de usar"
                        ],
                        precaucoes: [
                            "Monitorar níveis séricos",
                            "Pode causar hiperplasia gengival",
                            "Indução enzimática - múltiplas interações",
                            "Monitorar hemograma e função hepática"
                        ],
                        indicacoes: {
                            epilepsia: {
                                dose: "5-8 mg/kg/dia (dose de manutenção)",
                                doseMaxima: "300 mg/dia em crianças",
                                frequencia: "2-3 vezes ao dia",
                                duracao: "Tratamento contínuo, conforme necessário"
                            }
                        }
                    },
                    iv: {
                        descricao: "Solução injetável 50mg/mL",
                        tipo: "solucao",
                        passos: [
                            "Diluir em solução salina",
                            "Administrar lentamente (≤50 mg/min)",
                            "Monitorar ECG e sinais vitais durante administração"
                        ],
                        precaucoes: [
                            "Risco de hipotensão e arritmias na administração IV rápida",
                            "Incompatível com soluções glicosadas",
                            "Não administrar IM (cristalização e absorção errática)"
                        ],
                        indicacoes: {
                            statusEpilepticus: {
                                dose: "15-20 mg/kg dose de carga",
                                doseMaxima: "1000 mg dose única",
                                frequencia: "Infusão lenta (≤50 mg/min)",
                                duracao: "Dose única, seguida de manutenção"
                            }
                        }
                    }
                }
            };
            
            // === FENOBARBITAL ===
            MEDICAMENTOS.fenobarbital = {
                nome: "Fenobarbital",
                formas: {
                    oral: {
                        descricao: "Comprimidos 50mg, 100mg; Solução oral 40mg/mL",
                        tipo: "comprimido",
                        passos: [
                            "Administrar preferencialmente à noite",
                            "Não interromper abruptamente",
                            "Pode ser administrado com ou sem alimentos"
                        ],
                        precaucoes: [
                            "Sedação e alterações cognitivas",
                            "Risco de dependência física",
                            "Múltiplas interações medicamentosas",
                            "Efeito indutor enzimático significativo"
                        ],
                        indicacoes: {
                            epilepsia: {
                                dose: "3-5 mg/kg/dia",
                                doseMaxima: "8 mg/kg/dia ou 300 mg/dia",
                                frequencia: "1-2 vezes ao dia",
                                duracao: "Tratamento contínuo, conforme necessário"
                            }
                        }
                    },
                    iv: {
                        descricao: "Solução injetável 100mg/mL",
                        tipo: "solucao",
                        passos: [
                            "Diluir em água para injeção ou solução salina",
                            "Administrar lentamente (máx 60 mg/min)",
                            "Monitorar frequência respiratória"
                        ],
                        precaucoes: [
                            "Risco de depressão respiratória",
                            "Equipamento de ventilação deve estar disponível",
                            "Pode causar hipotensão"
                        ],
                        indicacoes: {
                            statusEpilepticus: {
                                dose: "15-20 mg/kg",
                                doseMaxima: "1000 mg dose única",
                                frequencia: "Infusão lenta (60 mg/min)",
                                duracao: "Dose única, seguida de manutenção"
                            }
                        }
                    }
                }
            };
            
            // === LAMOTRIGINA ===
            MEDICAMENTOS.lamotrigina = {
                nome: "Lamotrigina",
                formas: {
                    oral: {
                        descricao: "Comprimidos 25mg, 50mg, 100mg, 200mg",
                        tipo: "comprimido",
                        passos: [
                            "Iniciar com doses baixas e titular lentamente",
                            "Aumentar dose a cada 1-2 semanas",
                            "Administrar com ou sem alimentos"
                        ],
                        precaucoes: [
                            "Risco de reações cutâneas graves (incluindo Síndrome de Stevens-Johnson)",
                            "Monitorar sinais de rash, especialmente em crianças",
                            "Ajustar dose se usado com valproato",
                            "Monitorar para sinais de depressão e ideação suicida"
                        ],
                        indicacoes: {
                            epilepsiaMonoterapia: {
                                dose: "Semanas 1-2: 0,5 mg/kg/dia; Semanas 3-4: 1 mg/kg/dia; Manutenção: 5-15 mg/kg/dia",
                                doseMaxima: "200 mg/dia (crianças), 500 mg/dia (adultos)",
                                frequencia: "1-2 vezes ao dia",
                                duracao: "Tratamento contínuo, conforme necessário"
                            }
                        }
                    }
                }
            };
            
            // Chamar função específica para adicionar azitromicina
            adicionarAzitromicina();
            
            // Contar quantos medicamentos foram adicionados
            medicamentosAdicionados = Object.keys(MEDICAMENTOS).length;
            console.log(`Medicamentos adicionados com sucesso! Total na base: ${medicamentosAdicionados}`);            
            return medicamentosAdicionados;
        } catch (error) {
            console.error('Erro ao adicionar medicamentos emergencialmente:', error);
            return 0;
        }
    }
    
    // Função para atualizar contadores na interface
    function atualizarContadoresInterface() {
        try {
            // Calcular contagem total
            const total = Object.keys(verificarMedicamentos()).length;
            console.log(`Total de medicamentos disponíveis: ${total}`);
            
            // Atualizar elementos na interface
            const elementosContagem = document.querySelectorAll('.total-medicamentos, #total-medicamentos, [data-medicamentos-count]');
            if (elementosContagem.length > 0) {
                elementosContagem.forEach(elem => {
                    if (elem) {
                        elem.textContent = total;
                        console.log('Elemento de contagem atualizado:', elem);
                    }
                });
            } else {
                console.warn('Nenhum elemento de contagem encontrado na interface');
            }
            
            return total;
        } catch (error) {
            console.error('Erro ao atualizar contadores na interface:', error);
            return 0;
        }
    }
    
    // Execute quando a página estiver carregada
    window.addEventListener('load', function() {
        // Esperar um segundo para garantir que outros scripts foram carregados
        setTimeout(function() {
            console.log('Iniciando correção emergencial dos medicamentos...');
            verificarObjetosGlobais();
            const quantidadeAdicionada = adicionarMedicamentosEmergencial();
            
            if (quantidadeAdicionada > 0) {
                console.log(`${quantidadeAdicionada} medicamentos adicionados com sucesso!`);
                atualizarContagem();
                atualizarContadoresInterface();
            } else {
                console.warn('Nenhum medicamento foi adicionado. Verificando o MEDICAMENTOS...');
                console.log('Estado atual do MEDICAMENTOS:', Object.keys(verificarMedicamentos()));
            }
            
            console.log('=== FIM DA CORREÇÃO EMERGENCIAL ===');
        }, 1000);
    });
})();
