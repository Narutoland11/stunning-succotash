/**
 * Script emergencial para correção direta da base de medicamentos
 * Este arquivo força a adição dos medicamentos antiepilépticos
 */

// Função auto-executável para isolar o código
(function() {
    console.log('=== CORREÇÃO EMERGENCIAL DE MEDICAMENTOS ===');
    
    // Função para verificar se objeto global existe
    function verificarMedicamentos() {
        if (typeof window.MEDICAMENTOS === 'undefined') {
            console.error('MEDICAMENTOS não definido - criando objeto vazio');
            window.MEDICAMENTOS = {};
        }
        return window.MEDICAMENTOS;
    }
    
    // Função para adicionar os medicamentos diretamente
    function adicionarMedicamentosEmergencial() {
        const MEDICAMENTOS = verificarMedicamentos();
        
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
            
            console.log('Medicamentos antiepilépticos corrigidos. Verificando...');
            const medicamentosAdicionados = ['carbamazepina', 'valproato', 'fenitoina', 'fenobarbital', 'lamotrigina'];
            
            const verificacao = medicamentosAdicionados.filter(med => MEDICAMENTOS[med] !== undefined);
            console.log(`Verificação: ${verificacao.length}/${medicamentosAdicionados.length} medicamentos adicionados corretamente`);
            
            return verificacao.length;
        } catch (error) {
            console.error('Erro ao adicionar medicamentos emergenciais:', error);
            return 0;
        }
    }
    
    // Função para atualizar a interface após adição dos medicamentos
    function atualizarContagem() {
        try {
            // Calcular contagem total
            const total = Object.keys(verificarMedicamentos()).length;
            console.log(`Total de medicamentos após correção: ${total}`);
            
            // Atualizar elementos na interface
            const elementosContagem = document.querySelectorAll('.total-medicamentos, #total-medicamentos, [data-medicamentos-count]');
            elementosContagem.forEach(elem => {
                if (elem) {
                    elem.textContent = total;
                    console.log('Elemento de contagem atualizado:', elem);
                }
            });
            
            // Executar análise de medicamentos, se disponível
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
    
    // Executar quando a página estiver completamente carregada
    window.addEventListener('load', function() {
        // Dar um tempo para scripts anteriores terminarem
        setTimeout(function() {
            console.log('Iniciando correção emergencial dos medicamentos...');
            const quantidadeAdicionada = adicionarMedicamentosEmergencial();
            
            if (quantidadeAdicionada > 0) {
                console.log(`${quantidadeAdicionada} medicamentos adicionados com sucesso!`);
                atualizarContagem();
            } else {
                console.warn('Nenhum medicamento foi adicionado. Verificando o MEDICAMENTOS...');
                console.log('Estado atual do MEDICAMENTOS:', Object.keys(verificarMedicamentos()));
            }
            
            console.log('=== FIM DA CORREÇÃO EMERGENCIAL ===');
        }, 1000);
    });
})();
