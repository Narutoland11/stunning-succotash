/**
 * Antiepiléticos e Anticonvulsivantes - Parte 3
 * Este arquivo complementa o banco de dados de medicamentos.js com medicamentos adicionais
 */

// Garantir que o objeto MEDICAMENTOS exista
if (typeof MEDICAMENTOS === 'undefined') {
    console.error('Erro: MEDICAMENTOS não definido - criando objeto vazio');
    window.MEDICAMENTOS = {};
}

// Função para adicionar os medicamentos ao objeto global MEDICAMENTOS
function adicionarAntiepilepticosParte3() {
    
    try {
        // Topiramato
        MEDICAMENTOS.topiramato = {
            nome: "Topiramato",
            formas: {
                oral: {
                    descricao: "Comprimidos 25mg, 50mg, 100mg, sprinkle 15mg, 25mg",
                    tipo: "comprimido",
                    passos: [
                        "Iniciar com dose baixa e aumentar gradualmente",
                        "Cápsulas sprinkle podem ser abertas e espalhadas em pequena quantidade de alimento",
                        "Aumentar ingesta hídrica para prevenir cálculos renais"
                    ],
                    precaucoes: [
                        "Pode causar parestesias, perda de peso e alterações cognitivas",
                        "Risco de acidose metabólica e glaucoma",
                        "Aumentar ingesta hídrica (risco de litíase renal)",
                        "Evitar atividades que exijam alerta mental até adaptação"
                    ],
                    indicacoes: {
                        epilepsiaParcial: {
                            dose: "1-3 mg/kg/dia inicialmente, aumentar a cada 1-2 semanas até 5-9 mg/kg/dia",
                            doseMaxima: "400 mg/dia",
                            frequencia: "2 vezes ao dia",
                            duracao: "Tratamento contínuo, conforme necessário"
                        },
                        epilepsiaGeneralizada: {
                            dose: "1-3 mg/kg/dia inicialmente, aumentar a cada 1-2 semanas até 5-9 mg/kg/dia",
                            doseMaxima: "400 mg/dia",
                            frequencia: "2 vezes ao dia",
                            duracao: "Tratamento contínuo, conforme necessário"
                        },
                        enxaquecaProfilaxia: {
                            dose: "2-3 mg/kg/dia, iniciar com 0.5-1 mg/kg/dia",
                            doseMaxima: "200 mg/dia",
                            frequencia: "2 vezes ao dia",
                            duracao: "Tratamento contínuo por 3-6 meses"
                        }
                    }
                }
            }
        };

        // Oxcarbazepina
        MEDICAMENTOS.oxcarbazepina = {
            nome: "Oxcarbazepina",
            formas: {
                oral: {
                    descricao: "Suspensão oral 60mg/mL, comprimidos 300mg, 600mg",
                    tipo: "suspensao",
                    passos: [
                        "Agitar bem a suspensão antes de usar",
                        "Administrar durante ou após as refeições",
                        "Iniciar com dose baixa e aumentar gradualmente"
                    ],
                    precaucoes: [
                        "Monitorar níveis de sódio sérico (risco de hiponatremia)",
                        "Ajustar dose em insuficiência renal",
                        "Reações de hipersensibilidade cruzada com carbamazepina",
                        "Menos interações medicamentosas que carbamazepina"
                    ],
                    indicacoes: {
                        epilepsiaParcial: {
                            dose: "8-10 mg/kg/dia inicialmente, aumentando até 20-30 mg/kg/dia",
                            doseMaxima: "1800 mg/dia",
                            frequencia: "2 vezes ao dia",
                            duracao: "Tratamento contínuo, conforme necessário"
                        },
                        epilepsiaSecGeneralizada: {
                            dose: "8-10 mg/kg/dia inicialmente, aumentando até 20-30 mg/kg/dia",
                            doseMaxima: "1800 mg/dia",
                            frequencia: "2 vezes ao dia",
                            duracao: "Tratamento contínuo, conforme necessário"
                        }
                    }
                }
            }
        };

        // Clobazam
        MEDICAMENTOS.clobazam = {
            nome: "Clobazam",
            formas: {
                oral: {
                    descricao: "Comprimidos 10mg, 20mg",
                    tipo: "comprimido",
                    passos: [
                        "Administrar com ou sem alimentos",
                        "Iniciar com dose baixa e aumentar conforme necessário",
                        "Não suspender abruptamente (risco de crises)"
                    ],
                    precaucoes: [
                        "Pode causar sonolência e fadiga",
                        "Risco de dependência física e psicológica",
                        "Evitar uso com outros depressores do SNC",
                        "Monitorar efeitos cognitivos e comportamentais"
                    ],
                    indicacoes: {
                        epilepsiaRefrataria: {
                            dose: "0.2-0.5 mg/kg/dia inicialmente, aumentando até 1 mg/kg/dia",
                            doseMaxima: "40 mg/dia",
                            frequencia: "1-2 vezes ao dia",
                            duracao: "Tratamento contínuo, conforme necessário"
                        },
                        sindromeLennox: {
                            dose: "0.2-0.5 mg/kg/dia inicialmente, aumentando até 1 mg/kg/dia",
                            doseMaxima: "40 mg/dia",
                            frequencia: "1-2 vezes ao dia",
                            duracao: "Tratamento contínuo, conforme necessário"
                        }
                    }
                }
            }
        };

        // Etosuximida
        MEDICAMENTOS.etosuximida = {
            nome: "Etosuximida",
            formas: {
                oral: {
                    descricao: "Cápsulas 250mg, xarope 250mg/5mL",
                    tipo: "solucao",
                    passos: [
                        "Administrar com alimento para reduzir efeitos GI",
                        "Iniciar com dose baixa e aumentar gradualmente",
                        "Medir xarope com precisão usando seringa dosadora"
                    ],
                    precaucoes: [
                        "Monitorar hemograma e função hepática",
                        "Pode causar sintomas gastrointestinais",
                        "Observar alterações comportamentais",
                        "Pode provocar reações cutâneas"
                    ],
                    indicacoes: {
                        ausencias: {
                            dose: "15-20 mg/kg/dia inicialmente, aumentar gradualmente até 20-40 mg/kg/dia",
                            doseMaxima: "1500 mg/dia",
                            frequencia: "1-2 vezes ao dia",
                            duracao: "Tratamento contínuo, conforme necessário"
                        }
                    }
                }
            }
        };

        console.log('Antiepiléticos parte 3 adicionados com sucesso!');
    } catch (error) {
        console.error('Erro ao adicionar antiepiléticos (parte 3):', error);
    }
}

// Executar a adição de medicamentos imediatamente
adicionarAntiepilepticosParte3();
console.log('Inicialização dos antiepiléticos parte 3 concluída');
