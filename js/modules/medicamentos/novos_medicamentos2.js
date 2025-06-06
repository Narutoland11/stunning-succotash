/**
 * Continuação dos novos medicamentos para a Calculadora Pediátrica de Dose
 * Este arquivo complementa o banco de dados de medicamentos.js
 */

// Função para adicionar mais medicamentos ao objeto global MEDICAMENTOS
function adicionarMaisMedicamentos() {
    // Verificar se o objeto MEDICAMENTOS existe
    if (typeof MEDICAMENTOS === 'undefined') {
        console.error('Erro: Objeto MEDICAMENTOS não definido. Certifique-se de que medicamentos.js está carregado antes deste arquivo.');
        return;
    }
    
    try {
        // Azitromicina
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
                    calculoDose: function(peso, indicacao) {
                        if (indicacao === 'pneumonia') {
                            const doseDia1 = Math.min(10 * peso, 500);
                            const doseDiaSeguintes = Math.min(5 * peso, 250);
                            return {
                                dose: `Dia 1: ${doseDia1} mg, Dias 2-5: ${doseDiaSeguintes} mg`,
                                detalhes: "Dose única diária por 5 dias"
                            };
                        }
                        return null; // Usa o cálculo padrão para outras indicações
                    },
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
                        }
                    }
                }
            }
        };

        // Albendazol
        MEDICAMENTOS.albendazol = {
            nome: "Albendazol",
            formas: {
                oral: {
                    descricao: "Suspensão oral 40mg/mL",
                    tipo: "suspensao",
                    passos: [
                        "Agitar bem antes de cada dose",
                        "Administrar com alimentos gordurosos",
                        "Usar seringa oral para medição precisa"
                    ],
                    precaucoes: [
                        "Evitar em gestantes primeiro trimestre",
                        "Pode causar elevação das enzimas hepáticas",
                        "Terapia doses únicas ou repetidas conforme parasitose"
                    ],
                    indicacoes: {
                        ascaridíase: {
                            dose: "400 mg",
                            doseMaxima: "400 mg",
                            frequencia: "Dose única",
                            duracao: "1 dia"
                        },
                        teníase: {
                            dose: "400 mg",
                            doseMaxima: "400 mg",
                            frequencia: "1 vez ao dia",
                            duracao: "3 dias"
                        },
                        giardíase: {
                            dose: "400 mg",
                            doseMaxima: "400 mg",
                            frequencia: "1 vez ao dia",
                            duracao: "5 dias"
                        },
                        estrongiloidíase: {
                            dose: "400 mg",
                            doseMaxima: "400 mg",
                            frequencia: "2 vezes ao dia",
                            duracao: "3 dias"
                        }
                    }
                }
            }
        };

        // Metronidazol
        MEDICAMENTOS.metronidazol = {
            nome: "Metronidazol",
            formas: {
                oral: {
                    descricao: "Suspensão oral 40mg/mL",
                    tipo: "suspensao",
                    passos: [
                        "Agitar bem antes de cada dose",
                        "Administrar com as refeições",
                        "Evitar bebidas alcoólicas durante tratamento"
                    ],
                    precaucoes: [
                        "Sabor metálico na boca é comum",
                        "Pode dar coloração escura à urina",
                        "Evitar álcool (efeito antabuse)"
                    ],
                    indicacoes: {
                        giardíase: {
                            dose: "15-30 mg/kg/dia",
                            doseMaxima: "2 g/dia",
                            frequencia: "3 vezes ao dia",
                            duracao: "5-7 dias"
                        },
                        amebíase: {
                            dose: "35-50 mg/kg/dia",
                            doseMaxima: "2 g/dia",
                            frequencia: "3 vezes ao dia",
                            duracao: "7-10 dias"
                        },
                        infeccaoAnaerobia: {
                            dose: "30-40 mg/kg/dia",
                            doseMaxima: "4 g/dia",
                            frequencia: "3-4 vezes ao dia",
                            duracao: "7-14 dias"
                        }
                    }
                },
                iv: {
                    descricao: "Solução injetável 5mg/mL",
                    tipo: "solucao",
                    passos: [
                        "Administrar lentamente (infusão em 30-60 min)",
                        "Não misturar com outros medicamentos",
                        "Proteger da luz"
                    ],
                    precaucoes: [
                        "Monitorar sinais de neuropatia periférica",
                        "Não usar concomitante com álcool",
                        "Ajustar dose em insuficiência hepática"
                    ],
                    indicacoes: {
                        infeccaoAnaerobia: {
                            dose: "30 mg/kg/dia",
                            doseMaxima: "4 g/dia",
                            frequencia: "A cada 8 horas",
                            duracao: "7-14 dias"
                        }
                    }
                }
            }
        };

        console.log('Medicamentos azitromicina, albendazol e metronidazol adicionados com sucesso!');
    } catch (error) {
        console.error('Erro ao adicionar medicamentos (parte 2):', error);
    }
}
