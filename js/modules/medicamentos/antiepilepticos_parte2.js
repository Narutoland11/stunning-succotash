/**
 * Antiepiléticos e Anticonvulsivantes - Parte 2
 * Este arquivo complementa o banco de dados de medicamentos.js com mais antiepilépticos
 */

// Garantir que o objeto MEDICAMENTOS exista
if (typeof MEDICAMENTOS === 'undefined') {
    console.error('Erro: MEDICAMENTOS não definido - criando objeto vazio');
    window.MEDICAMENTOS = {};
}

// Função para adicionar os medicamentos ao objeto global MEDICAMENTOS
function adicionarAntiepilepticosParte2() {
    
    try {
        // Fenobarbital
        MEDICAMENTOS.fenobarbital = {
            nome: "Fenobarbital",
            formas: {
                oral: {
                    descricao: "Solução oral 40mg/mL, comprimidos 100mg",
                    tipo: "solucao",
                    passos: [
                        "Administrar à noite, preferencialmente",
                        "Pode ser administrado com ou sem alimentos",
                        "Agitar a solução antes de administrar"
                    ],
                    precaucoes: [
                        "Causa sonolência e diminuição da cognição",
                        "Indutor enzimático - múltiplas interações medicamentosas",
                        "Risco de dependência e síndrome de abstinência",
                        "Não suspender abruptamente"
                    ],
                    indicacoes: {
                        epilepsia: {
                            dose: "3-5 mg/kg/dia",
                            doseMaxima: "6 mg/kg/dia ou 300 mg/dia",
                            frequencia: "1-2 vezes ao dia",
                            duracao: "Tratamento contínuo, conforme necessário"
                        },
                        convulsoesPediatria: {
                            dose: "3-5 mg/kg/dia",
                            doseMaxima: "8 mg/kg/dia em crianças até 6 anos",
                            frequencia: "1 vez ao dia (preferencialmente à noite)",
                            duracao: "Tratamento contínuo, conforme necessário"
                        }
                    }
                },
                iv: {
                    descricao: "Solução injetável 100mg/mL",
                    tipo: "solucao",
                    passos: [
                        "Diluir em água estéril para injeção ou soro",
                        "Administrar lentamente (≤60 mg/min)",
                        "Verificar permeabilidade do acesso venoso"
                    ],
                    precaucoes: [
                        "Risco de depressão respiratória",
                        "Monitorar sinais vitais durante a administração",
                        "Ter equipamentos de reanimação disponíveis",
                        "Evitar extravasamento (necrose tecidual)"
                    ],
                    indicacoes: {
                        statusEpilepticus: {
                            dose: "15-20 mg/kg",
                            doseMaxima: "1000 mg dose única",
                            frequencia: "Infusão lenta, dose única",
                            duracao: "Seguir com dose de manutenção oral"
                        },
                        convulsoesNeonatais: {
                            dose: "15-20 mg/kg dose de ataque, 3-4 mg/kg/dia manutenção",
                            doseMaxima: "30 mg/kg dose total",
                            frequencia: "Dose de ataque única, manutenção diária",
                            duracao: "Conforme necessário"
                        }
                    }
                }
            }
        };

        // Lamotrigina
        MEDICAMENTOS.lamotrigina = {
            nome: "Lamotrigina",
            formas: {
                oral: {
                    descricao: "Comprimidos dispersíveis 5mg, 25mg, 50mg, 100mg",
                    tipo: "comprimido",
                    passos: [
                        "Iniciar com dose baixa e aumentar gradualmente",
                        "Pode ser disperso em água ou suco",
                        "Administrar com ou sem alimentos"
                    ],
                    precaucoes: [
                        "Risco de erupções cutâneas graves (Síndrome de Stevens-Johnson)",
                        "Aumentar dose muito lentamente, especialmente se em uso de valproato",
                        "Suspender imediatamente se surgirem erupções cutâneas",
                        "Ajustar dose com outros antiepilépticos"
                    ],
                    indicacoes: {
                        epilepsiaParcial: {
                            dose: "Semanas 1-2: 0,6 mg/kg/dia, semanas 3-4: 1,2 mg/kg/dia. Manutenção: 5-15 mg/kg/dia",
                            doseMaxima: "200 mg/dia (sem valproato), 100 mg/dia (com valproato)",
                            frequencia: "1-2 vezes ao dia",
                            duracao: "Tratamento contínuo, conforme necessário"
                        },
                        epilepsiaGeneralizada: {
                            dose: "Semanas 1-2: 0,3 mg/kg/dia com valproato. Aumentar lentamente até manutenção de 1-5 mg/kg/dia",
                            doseMaxima: "200 mg/dia (sem valproato), 100 mg/dia (com valproato)",
                            frequencia: "1-2 vezes ao dia",
                            duracao: "Tratamento contínuo, conforme necessário"
                        }
                    }
                }
            }
        };

        // Levetiracetam
        MEDICAMENTOS.levetiracetam = {
            nome: "Levetiracetam",
            formas: {
                oral: {
                    descricao: "Solução oral 100mg/mL, comprimidos 250mg, 500mg, 750mg",
                    tipo: "solucao",
                    passos: [
                        "Administrar com ou sem alimentos",
                        "Solução pode ser diluída em líquido",
                        "Utilizar seringa dosadora para solução oral"
                    ],
                    precaucoes: [
                        "Pode causar alterações comportamentais e psiquiátricas",
                        "Ajustar dose em insuficiência renal",
                        "Menor interação medicamentosa que outros antiepilépticos",
                        "Monitorar efeitos adversos psiquiátricos"
                    ],
                    indicacoes: {
                        epilepsiaParcial: {
                            dose: "10-20 mg/kg/dia inicialmente, aumentar até 20-40 mg/kg/dia",
                            doseMaxima: "60 mg/kg/dia ou 3000 mg/dia",
                            frequencia: "2 vezes ao dia",
                            duracao: "Tratamento contínuo, conforme necessário"
                        },
                        epilepsiaGeneralizada: {
                            dose: "10-20 mg/kg/dia inicialmente, aumentar até 20-40 mg/kg/dia",
                            doseMaxima: "60 mg/kg/dia ou 3000 mg/dia",
                            frequencia: "2 vezes ao dia",
                            duracao: "Tratamento contínuo, conforme necessário"
                        }
                    }
                },
                iv: {
                    descricao: "Solução injetável 100mg/mL",
                    tipo: "solucao",
                    passos: [
                        "Diluir em solução compatível",
                        "Administrar em 15 minutos",
                        "Mesma dose da forma oral"
                    ],
                    precaucoes: [
                        "Alternativa temporária quando via oral não é possível",
                        "Monitorar reações de infusão",
                        "Retornar à via oral assim que possível"
                    ],
                    indicacoes: {
                        epilepsiaParcial: {
                            dose: "10-20 mg/kg/dia inicialmente, aumentar até 20-40 mg/kg/dia",
                            doseMaxima: "60 mg/kg/dia ou 3000 mg/dia",
                            frequencia: "2 vezes ao dia",
                            duracao: "Tratamento temporário até poder usar via oral"
                        }
                    }
                }
            }
        };

        console.log('Antiepiléticos parte 2 adicionados com sucesso!');
    } catch (error) {
        console.error('Erro ao adicionar antiepiléticos (parte 2):', error);
    }
}

// Executar a adição de medicamentos imediatamente
adicionarAntiepilepticosParte2();
console.log('Inicialização dos antiepiléticos parte 2 concluída');
