/**
 * Continuação dos novos medicamentos para a Calculadora Pediátrica de Dose
 * Este arquivo complementa o banco de dados de medicamentos.js - parte 3
 */

// Função para adicionar mais medicamentos ao objeto global MEDICAMENTOS
function adicionarMedicamentosParte3() {
    // Verificar se o objeto MEDICAMENTOS existe
    if (typeof MEDICAMENTOS === 'undefined') {
        console.error('Erro: Objeto MEDICAMENTOS não definido. Certifique-se de que medicamentos.js está carregado antes deste arquivo.');
        return;
    }
    
    try {
        // Salbutamol
        MEDICAMENTOS.salbutamol = {
            nome: "Salbutamol (Albuterol)",
            formas: {
                nebulizacao: {
                    descricao: "Solução para nebulização 5mg/mL",
                    tipo: "solucao",
                    passos: [
                        "Diluir em solução salina 0,9%",
                        "Usar máscara ou bocal apropriados",
                        "Tempo de nebulização: 5-15 minutos"
                    ],
                    precaucoes: [
                        "Monitorar frequência cardíaca",
                        "Observar tremores e irritabilidade",
                        "Pode causar hipocalemia"
                    ],
                    calculoDose: function(peso, indicacao) {
                        let dose;
                        if (peso < 20) {
                            dose = 0.15; // 0.15 mL = 0.75 mg para < 20kg
                        } else {
                            dose = 0.5; // 0.5 mL = 2.5 mg para ≥ 20kg
                        }
                        return {
                            dose: `${dose} mL (${dose * 5} mg)`,
                            detalhes: `Diluir em ${2.5 - dose} mL de salina (total 2.5 mL)`
                        };
                    },
                    indicacoes: {
                        broncoespasmo: {
                            dose: "0.15 mL/kg (0.75 mg/kg) <20kg; 0.5 mL (2.5 mg) ≥20kg",
                            doseMaxima: "0.5 mL (2.5 mg) por dose",
                            frequencia: "A cada 20 min na 1ª hora, depois a cada 1-4h",
                            duracao: "Conforme necessário"
                        },
                        asma: {
                            dose: "0.15 mL/kg (0.75 mg/kg) <20kg; 0.5 mL (2.5 mg) ≥20kg",
                            doseMaxima: "0.5 mL (2.5 mg) por dose",
                            frequencia: "A cada 20 min na 1ª hora, depois a cada 1-4h",
                            duracao: "Conforme necessário"
                        }
                    }
                },
                oral: {
                    descricao: "Xarope 2mg/5mL",
                    tipo: "solucao",
                    passos: [
                        "Medir com seringa oral",
                        "Evitar administrar à noite para prevenir insônia"
                    ],
                    precaucoes: [
                        "Menos eficaz que via inalatória",
                        "Mais efeitos adversos sistêmicos",
                        "Pode causar tremores e taquicardia"
                    ],
                    indicacoes: {
                        asma: {
                            dose: "0.2-0.3 mg/kg/dose",
                            doseMaxima: "4 mg/dose",
                            frequencia: "A cada 6-8 horas",
                            duracao: "Conforme prescrito"
                        }
                    }
                }
            }
        };

        // Prednisolona
        MEDICAMENTOS.prednisolona = {
            nome: "Prednisolona",
            formas: {
                oral: {
                    descricao: "Solução oral 3mg/mL",
                    tipo: "solucao",
                    passos: [
                        "Agitar bem antes de administrar",
                        "Usar seringa oral para dosagem precisa",
                        "Administrar com alimentos para reduzir irritação gástrica"
                    ],
                    precaucoes: [
                        "Evitar suspensão abrupta",
                        "Pode suprimir o sistema imunológico",
                        "Pode afetar o crescimento em uso prolongado"
                    ],
                    calculoDose: function(peso, indicacao) {
                        let doseDiaria;
                        if (indicacao === 'asma') {
                            doseDiaria = Math.min(2 * peso, 60);
                            return {
                                dose: `${doseDiaria} mg/dia (${(doseDiaria / 3).toFixed(1)} mL)`,
                                detalhes: "Dose única pela manhã por 3-5 dias"
                            };
                        }
                        return null;
                    },
                    indicacoes: {
                        asma: {
                            dose: "1-2 mg/kg/dia",
                            doseMaxima: "60 mg/dia",
                            frequencia: "1 vez ao dia ou dividido em 2x",
                            duracao: "3-5 dias"
                        },
                        laringite: {
                            dose: "1-2 mg/kg/dia",
                            doseMaxima: "60 mg/dia",
                            frequencia: "1 vez ao dia ou dividido em 2x",
                            duracao: "3-5 dias"
                        }
                    }
                }
            }
        };

        // Paracetamol
        MEDICAMENTOS.paracetamol = {
            nome: "Paracetamol (Acetaminofeno)",
            formas: {
                oral: {
                    descricao: "Solução oral 200mg/5mL",
                    tipo: "solucao",
                    passos: [
                        "Usar dispositivo de medição preciso",
                        "Verificar concentração antes de administrar",
                        "Não exceder dose máxima diária"
                    ],
                    precaucoes: [
                        "Hepatotoxicidade em overdose",
                        "Verificar outros medicamentos que contenham paracetamol",
                        "Cuidado em pacientes com função hepática comprometida"
                    ],
                    indicacoes: {
                        febre: {
                            dose: "10-15 mg/kg/dose",
                            doseMaxima: "750 mg/dose, 4g/dia",
                            frequencia: "A cada 4-6 horas (máx 5 doses/dia)",
                            duracao: "Conforme necessário"
                        },
                        dor: {
                            dose: "10-15 mg/kg/dose",
                            doseMaxima: "750 mg/dose, 4g/dia",
                            frequencia: "A cada 4-6 horas (máx 5 doses/dia)",
                            duracao: "Conforme necessário"
                        }
                    }
                }
            }
        };

        // Amoxicilina
        MEDICAMENTOS.amoxicilina = {
            nome: "Amoxicilina",
            formas: {
                oral: {
                    descricao: "Suspensão 250mg/5mL",
                    tipo: "suspensao",
                    passos: [
                        "Agitar bem antes de usar",
                        "Armazenar na geladeira após reconstituição",
                        "Descartar após 14 dias"
                    ],
                    precaucoes: [
                        "Verificar alergia à penicilina",
                        "Pode causar diarreia",
                        "Completar tratamento mesmo com melhora"
                    ],
                    indicacoes: {
                        otite: {
                            dose: "80-90 mg/kg/dia",
                            doseMaxima: "3 g/dia",
                            frequencia: "2-3 vezes ao dia",
                            duracao: "10 dias"
                        },
                        pneumonia: {
                            dose: "80-90 mg/kg/dia",
                            doseMaxima: "3 g/dia",
                            frequencia: "2-3 vezes ao dia",
                            duracao: "7-10 dias"
                        }
                    }
                }
            }
        };

        console.log('Medicamentos salbutamol, prednisolona, paracetamol e amoxicilina adicionados com sucesso!');
    } catch (error) {
        console.error('Erro ao adicionar medicamentos (parte 3):', error);
    }
}
