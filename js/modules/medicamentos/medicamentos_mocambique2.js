/**
 * Medicamentos adicionais específicos para contexto africano/moçambicano - Parte 2
 * Complemento de medicamentos relevantes para Moçambique
 */

function adicionarMedicamentosMocambique2() {
    if (typeof MEDICAMENTOS === 'undefined') {
        console.error('Erro: Objeto MEDICAMENTOS não definido.');
        return;
    }
    
    try {
        // Nevirapina - Antirretroviral comum em Moçambique
        MEDICAMENTOS.nevirapina = {
            nome: "Nevirapina",
            formas: {
                oral: {
                    descricao: "Suspensão 10mg/mL, Comprimidos 200mg",
                    tipo: "suspensao",
                    passos: [
                        "Iniciar com metade da dose por 14 dias",
                        "Aumentar para dose plena se não houver reação cutânea",
                        "Agitar bem a suspensão antes de usar"
                    ],
                    precaucoes: [
                        "Monitorar função hepática nas primeiras 18 semanas",
                        "Suspender se ocorrer erupção cutânea grave",
                        "Evitar em mulheres com CD4 >250 e homens com CD4 >400"
                    ],
                    indicacoes: {
                        hiv: {
                            dose: "Crianças: 150-200 mg/m²/dose; Adultos: 200mg",
                            doseMaxima: "400mg/dia",
                            frequencia: "1x/dia (14 dias), depois 2x/dia",
                            duracao: "Tratamento contínuo"
                        }
                    }
                }
            }
        };

        // Quinino - Para malária grave
        MEDICAMENTOS.quinino = {
            nome: "Quinino",
            formas: {
                iv: {
                    descricao: "Solução injetável 300mg/mL",
                    tipo: "injetavel",
                    passos: [
                        "Diluir em solução glicosada 5%",
                        "Infundir lentamente durante 4 horas",
                        "Monitorar sinais vitais durante infusão"
                    ],
                    precaucoes: [
                        "Risco de hipoglicemia, especialmente em crianças",
                        "Monitorar ECG durante tratamento",
                        "Contraindcado em deficiência de G6PD"
                    ],
                    indicacoes: {
                        malariaGrave: {
                            dose: "Dose de ataque: 20mg/kg; Manutenção: 10mg/kg",
                            doseMaxima: "1400mg/dose",
                            frequencia: "A cada 8 horas",
                            duracao: "Até tolerar via oral, depois completar 7 dias"
                        }
                    }
                },
                oral: {
                    descricao: "Comprimidos 300mg",
                    tipo: "comprimido",
                    passos: [
                        "Administrar com alimentos para reduzir sintomas gastrointestinais",
                        "Completar o tratamento completo",
                        "Monitorar glicemia em crianças"
                    ],
                    precaucoes: [
                        "Pode causar cinchonismo (zumbido, tontura)",
                        "Interação com outros medicamentos",
                        "Evitar em histórico de arritmias"
                    ],
                    indicacoes: {
                        malaria: {
                            dose: "10mg/kg/dose",
                            doseMaxima: "600mg/dose",
                            frequencia: "A cada 8 horas",
                            duracao: "7 dias"
                        }
                    }
                }
            }
        };

        // RHZE - Combinação para tuberculose
        MEDICAMENTOS.rhze = {
            nome: "RHZE (Rifampicina+Isoniazida+Pirazinamida+Etambutol)",
            formas: {
                oral: {
                    descricao: "Comprimidos 150mg+75mg+400mg+275mg",
                    tipo: "comprimido",
                    passos: [
                        "Administrar em jejum (1h antes ou 2h após refeições)",
                        "Tomar todos os comprimidos de uma vez",
                        "Supervisionar tratamento (DOTS)"
                    ],
                    precaucoes: [
                        "Monitorar função hepática",
                        "Controle oftalmológico (etambutol)",
                        "Coloração alaranjada de fluidos corporais (inofensivo)"
                    ],
                    indicacoes: {
                        tuberculose: {
                            dose: "20-35kg: 2 comp, 36-50kg: 3 comp, >50kg: 4 comp",
                            doseMaxima: "4 comprimidos/dia",
                            frequencia: "1 vez ao dia",
                            duracao: "2 meses (fase intensiva)"
                        }
                    }
                }
            }
        };

        // Mebendazol - Para parasitoses intestinais
        MEDICAMENTOS.mebendazol = {
            nome: "Mebendazol",
            formas: {
                oral: {
                    descricao: "Comprimidos 100mg, 500mg",
                    tipo: "comprimido",
                    passos: [
                        "Pode ser mastigado ou engolido",
                        "Administrar com ou sem alimentos",
                        "Tratar todos os membros da família em áreas endêmicas"
                    ],
                    precaucoes: [
                        "Não recomendado para menores de 1 ano",
                        "Pode causar dor abdominal transitória",
                        "Interações com medicamentos antiepilépticos"
                    ],
                    indicacoes: {
                        helmintíase: {
                            dose: "100mg",
                            doseMaxima: "200mg/dia",
                            frequencia: "2 vezes ao dia",
                            duracao: "3 dias"
                        },
                        oxiuríase: {
                            dose: "100mg",
                            doseMaxima: "100mg",
                            frequencia: "Dose única, repetir após 2-3 semanas",
                            duracao: "Dose única"
                        }
                    }
                }
            }
        };

        // Nota: Efavirenz foi movido para medicamentos_mocambique.js para evitar duplicação

        console.log('Medicamentos específicos para contexto africano/moçambicano - Parte 2 adicionados com sucesso!');
    } catch (error) {
        console.error('Erro ao adicionar medicamentos para Moçambique (2):', error);
    }
}

// Executar automaticamente a adição de medicamentos quando o script for carregado
document.addEventListener('DOMContentLoaded', function() {
    adicionarMedicamentosMocambique2();
});
