/**
 * Medicamentos específicos para contexto africano/moçambicano
 * Este arquivo adiciona medicamentos comumente utilizados em Moçambique e África
 * Foco em doenças tropicais e endêmicas da região
 */

function adicionarMedicamentosMocambique() {
    // Verificar se o objeto MEDICAMENTOS existe
    if (typeof MEDICAMENTOS === 'undefined') {
        console.error('Erro: Objeto MEDICAMENTOS não definido. Certifique-se de que medicamentos.js está carregado antes deste arquivo.');
        return;
    }
    
    try {
        // Artesunato-Amodiaquina - Combinação para malária comum em África
        MEDICAMENTOS.artesunatoAmodiaquina = {
            nome: "Artesunato-Amodiaquina",
            formas: {
                oral: {
                    descricao: "Comprimidos 50mg/135mg, 100mg/270mg",
                    tipo: "comprimido",
                    passos: [
                        "Administrar com água após uma refeição",
                        "Respeitar o horário das doses por 3 dias",
                        "Completar todo o tratamento mesmo se houver melhora"
                    ],
                    precaucoes: [
                        "Monitorar função hepática em tratamentos repetidos",
                        "Pode causar náuseas e vômitos",
                        "Evitar em pacientes com histórico de reações graves à amodiaquina"
                    ],
                    indicacoes: {
                        malaria: {
                            dose: "Artesunato 4mg/kg + Amodiaquina 10mg/kg",
                            doseMaxima: "Conforme peso do paciente",
                            frequencia: "1 vez ao dia",
                            duracao: "3 dias"
                        }
                    }
                }
            }
        };

        // Efavirenz - Essencial para tratamento de HIV em Moçambique
        MEDICAMENTOS.efavirenz = {
            nome: "Efavirenz",
            formas: {
                oral: {
                    descricao: "Comprimidos 50mg, 200mg, 600mg",
                    tipo: "comprimido",
                    passos: [
                        "Administrar antes de dormir para reduzir efeitos neuropsiquiátricos",
                        "Tomar com estômago vazio",
                        "Manter regularidade no horário"
                    ],
                    precaucoes: [
                        "Pode causar sonhos vívidos e alterações neuropsiquiátricas",
                        "Evitar em grávidas no primeiro trimestre",
                        "Interações medicamentosas significativas"
                    ],
                    indicacoes: {
                        hiv: {
                            dose: "Crianças 3-5 anos (13-15kg): 200mg, 3-5 anos (15-20kg): 250mg, 5-10 anos (20-25kg): 300mg, 10-15 anos (25-32.5kg): 350mg, 10-15 anos (32.5-40kg): 400mg, >40kg: 600mg",
                            doseMaxima: "600mg/dia",
                            frequencia: "1 vez ao dia",
                            duracao: "Tratamento contínuo"
                        }
                    }
                }
            }
        };

        // Lumefantrina-Artemeter (Coartem) - Outra forma de nome para medicamento já existente
        MEDICAMENTOS.coartem = {
            nome: "Coartem (Lumefantrina-Artemeter)",
            formas: {
                oral: {
                    descricao: "Comprimidos 20mg/120mg",
                    tipo: "comprimido",
                    passos: [
                        "Administrar com alimentos ricos em gorduras ou leite",
                        "Tomar a segunda dose após 8 horas e depois a cada 12 horas",
                        "Repetir dose se ocorrer vômitos dentro de 1 hora da administração"
                    ],
                    precaucoes: [
                        "Monitorar ECG em pacientes com problemas cardíacos",
                        "Interações com medicamentos que prolongam QT",
                        "Evitar no primeiro trimestre de gravidez"
                    ],
                    indicacoes: {
                        malaria: {
                            dose: "<3 anos (5-15kg): 1 comp, 3-8 anos (15-25kg): 2 comp, 8-12 anos (25-35kg): 3 comp, >12 anos (>35kg): 4 comp",
                            doseMaxima: "4 comprimidos por dose",
                            frequencia: "2 vezes por dia",
                            duracao: "3 dias (total de 6 doses)"
                        }
                    }
                }
            }
        };

        // Diidroartemisinina-piperaquina - Combinação usada em Moçambique
        MEDICAMENTOS.dhapiperaquina = {
            nome: "Diidroartemisinina-Piperaquina",
            formas: {
                oral: {
                    descricao: "Comprimidos 40mg/320mg",
                    tipo: "comprimido",
                    passos: [
                        "Administrar com água, sem alimentos (3h antes ou 3h depois)",
                        "Tomar uma vez por dia por 3 dias",
                        "Evitar ingestão de alimentos por 3 horas após a dose"
                    ],
                    precaucoes: [
                        "Pode prolongar o intervalo QT",
                        "Evitar em pacientes com arritmias",
                        "Monitorar função hepática"
                    ],
                    indicacoes: {
                        malaria: {
                            dose: "5-8kg: 0,5 comp, 8-11kg: 1 comp, 11-17kg: 1,5 comp, 17-25kg: 2 comp, 25-36kg: 3 comp, 36-60kg: 4 comp, 60-80kg: 5 comp",
                            doseMaxima: "5 comprimidos por dia",
                            frequencia: "1 vez ao dia",
                            duracao: "3 dias"
                        },
                        malariaGrave: {
                            dose: "Dose de DHA: 4 mg/kg/dia",
                            doseMaxima: "5 comprimidos por dia",
                            frequencia: "1 vez ao dia",
                            duracao: "3 dias"
                        }
                    }
                }
            }
        };

        // Praziquantel - Para esquistossomose, comum em Moçambique
        MEDICAMENTOS.praziquantel = {
            nome: "Praziquantel",
            formas: {
                oral: {
                    descricao: "Comprimidos 600mg",
                    tipo: "comprimido",
                    passos: [
                        "Administrar com alimentos e muita água",
                        "Triturar ou dividir se necessário para crianças",
                        "Pode ser necessário repetir em 4-6 semanas"
                    ],
                    precaucoes: [
                        "Pode causar dores abdominais e tonturas",
                        "Tratar todos os membros da família em áreas endêmicas",
                        "Evitar atividades que exigem atenção nas primeiras 24h"
                    ],
                    indicacoes: {
                        esquistossomose: {
                            dose: "40-60 mg/kg/dia",
                            doseMaxima: "3600 mg/dia",
                            frequencia: "2-3 doses em um único dia",
                            duracao: "1 dia, repetir após 4-6 semanas se necessário"
                        }
                    }
                }
            }
        };

        // Mefloquina - Para profilaxia e tratamento de malária resistente
        MEDICAMENTOS.mefloquina = {
            nome: "Mefloquina",
            formas: {
                oral: {
                    descricao: "Comprimidos 250mg",
                    tipo: "comprimido",
                    passos: [
                        "Administrar após uma refeição com bastante líquido",
                        "Tomar no mesmo dia da semana para profilaxia",
                        "Iniciar 2-3 semanas antes da viagem para áreas endêmicas"
                    ],
                    precaucoes: [
                        "Contraindicado em pacientes com distúrbios psiquiátricos",
                        "Pode causar pesadelos, insônia e alterações neuropsiquiátricas",
                        "Não usar em crianças <5kg ou <3 meses"
                    ],
                    indicacoes: {
                        malaria: {
                            dose: "25 mg/kg dose total",
                            doseMaxima: "1500 mg dose total",
                            frequencia: "Dose única ou dividida em 2-3 doses com 6-8h intervalo",
                            duracao: "Dose única (tratamento)"
                        },
                        profilaxiaMalaria: {
                            dose: "5 mg/kg",
                            doseMaxima: "250 mg/semana",
                            frequencia: "1 vez por semana",
                            duracao: "Iniciar 2-3 semanas antes e continuar 4 semanas após sair da área"
                        }
                    }
                }
            }
        };

        // Benznidazol - Para doença de Chagas
        MEDICAMENTOS.benznidazol = {
            nome: "Benznidazol",
            formas: {
                oral: {
                    descricao: "Comprimidos 100mg",
                    tipo: "comprimido",
                    passos: [
                        "Administrar após as refeições",
                        "Dividir a dose diária em 2-3 tomadas",
                        "Completar o tratamento mesmo com sintomas leves adversos"
                    ],
                    precaucoes: [
                        "Monitorar reações cutâneas e hematológicas",
                        "Contraindicado na gravidez",
                        "Ajustar dose em insuficiência hepática"
                    ],
                    indicacoes: {
                        doencaChagas: {
                            dose: "Crianças: 5-10 mg/kg/dia, Adultos: 5-7 mg/kg/dia",
                            doseMaxima: "300 mg/dia",
                            frequencia: "2-3 vezes ao dia",
                            duracao: "60 dias"
                        }
                    }
                }
            }
        };

        // Tenofovir - Para HIV e Hepatite B
        MEDICAMENTOS.tenofovir = {
            nome: "Tenofovir (TDF)",
            formas: {
                oral: {
                    descricao: "Comprimidos 300mg",
                    tipo: "comprimido",
                    passos: [
                        "Pode ser administrado com ou sem alimentos",
                        "Tomar no mesmo horário diariamente",
                        "Não interromper sem orientação médica"
                    ],
                    precaucoes: [
                        "Monitorar função renal",
                        "Risco de acidose láctica e hepatomegalia",
                        "Ajustar dose em insuficiência renal"
                    ],
                    indicacoes: {
                        hiv: {
                            dose: "≥35kg: 300mg",
                            doseMaxima: "300mg/dia",
                            frequencia: "1 vez ao dia",
                            duracao: "Tratamento contínuo"
                        },
                        hepatiteB: {
                            dose: "≥35kg: 300mg",
                            doseMaxima: "300mg/dia",
                            frequencia: "1 vez ao dia",
                            duracao: "Tratamento contínuo (geralmente longo prazo)"
                        }
                    }
                }
            }
        };

        // Ivermectina - Para tratamento de parasitoses
        MEDICAMENTOS.ivermectina = {
            nome: "Ivermectina",
            formas: {
                oral: {
                    descricao: "Comprimidos 3mg, 6mg",
                    tipo: "comprimido",
                    passos: [
                        "Administrar com água, com estômago vazio",
                        "Tomar 1 hora antes ou 2 horas após refeições",
                        "Pode ser necessária dose adicional após 1-2 semanas"
                    ],
                    precaucoes: [
                        "Contraindicado em crianças <15kg",
                        "Reações adversas podem ocorrer devido à morte dos parasitas",
                        "Não usar em áreas com Loa loa endêmica sem teste prévio"
                    ],
                    indicacoes: {
                        oncocercose: {
                            dose: "150-200 mcg/kg",
                            doseMaxima: "Baseada no peso",
                            frequencia: "Dose única, repetir a cada 6-12 meses",
                            duracao: "Tratamentos periódicos por anos"
                        },
                        escabiose: {
                            dose: "200 mcg/kg",
                            doseMaxima: "Baseada no peso",
                            frequencia: "Dose única, repetir após 1-2 semanas se necessário",
                            duracao: "1-2 doses"
                        }
                    }
                }
            }
        };

        // Artesunato + Mefloquina - Combinação para malária resistente
        MEDICAMENTOS.artesunatoMefloquina = {
            nome: "Artesunato + Mefloquina",
            formas: {
                oral: {
                    descricao: "Comprimidos 100mg + 200mg",
                    tipo: "comprimido",
                    passos: [
                        "Administrar após refeição leve",
                        "Iniciar com artesunato nos primeiros 3 dias",
                        "Administrar mefloquina no segundo e terceiro dias"
                    ],
                    precaucoes: [
                        "Monitorar efeitos neuropsiquiátricos",
                        "Evitar em pacientes com histórico de convulsões",
                        "Não usar no primeiro trimestre de gravidez"
                    ],
                    indicacoes: {
                        malaria: {
                            dose: "Artesunato: 4 mg/kg/dia; Mefloquina: 8,3 mg/kg/dia",
                            doseMaxima: "Artesunato: 200mg/dia; Mefloquina: 500mg/dia",
                            frequencia: "1 vez ao dia",
                            duracao: "3 dias"
                        }
                    }
                }
            }
        };

        console.log('Medicamentos específicos para contexto africano/moçambicano adicionados com sucesso!');
    } catch (error) {
        console.error('Erro ao adicionar medicamentos para Moçambique:', error);
    }
}

// Executar automaticamente a adição de medicamentos quando o script for carregado
document.addEventListener('DOMContentLoaded', function() {
    adicionarMedicamentosMocambique();
    console.log('Inicialização dos medicamentos para contexto africano/moçambicano concluída');
});
