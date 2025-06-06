/**
 * Medicamentos adicionais para contexto africano/moçambicano - Parte 6
 * Medicamentos especificamente utilizados para condições comuns em Moçambique
 */

function adicionarMedicamentosMocambique6() {
    if (typeof MEDICAMENTOS === 'undefined') {
        console.error('Erro: Objeto MEDICAMENTOS não definido.');
        return;
    }
    
    try {
        // Lopinavir/Ritonavir - Importante para HIV pediátrico
        MEDICAMENTOS.lopinavirRitonavir = {
            nome: "Lopinavir/Ritonavir",
            formas: {
                oral: {
                    descricao: "Comprimidos 100mg/25mg, 200mg/50mg, Solução oral 80mg/20mg/mL",
                    tipo: "comprimido_solucao",
                    passos: [
                        "Administrar com alimentos para aumentar absorção",
                        "A solução oral deve ser refrigerada até utilização",
                        "Usar seringa oral calibrada para solução"
                    ],
                    precaucoes: [
                        "Monitorar função hepática",
                        "Interações medicamentosas significativas",
                        "Solução oral contém álcool - cuidado em crianças pequenas"
                    ],
                    indicacoes: {
                        hiv: {
                            dose: "Crianças (solução): 16/4 mg/kg ou 300/75 mg/m², Adultos: 400/100mg",
                            doseMaxima: "800/200mg/dia",
                            frequencia: "2 vezes ao dia",
                            duracao: "Tratamento contínuo"
                        }
                    }
                }
            }
        };

        // Arteméter - Para malária grave/complicada
        MEDICAMENTOS.artemeter = {
            nome: "Arteméter",
            formas: {
                im: {
                    descricao: "Solução injetável 80mg/mL",
                    tipo: "injetavel",
                    passos: [
                        "Administrar por via intramuscular profunda",
                        "Aplicar no músculo anterolateral da coxa em crianças",
                        "Monitorar resposta clínica e parasitemia"
                    ],
                    precaucoes: [
                        "Não administrar por via IV",
                        "Contraindicado no primeiro trimestre de gravidez",
                        "Monitorar função cardíaca em tratamentos prolongados"
                    ],
                    indicacoes: {
                        malariaGrave: {
                            dose: "Dose inicial: 3,2 mg/kg, Manutenção: 1,6 mg/kg",
                            doseMaxima: "160mg dose inicial",
                            frequencia: "1x/dia (após dose inicial de 2x no primeiro dia)",
                            duracao: "Mínimo 3 dias, depois trocar para via oral"
                        }
                    }
                }
            }
        };

        // Zinbactam - Antibiótico para pneumonias graves
        MEDICAMENTOS.zinbactam = {
            nome: "Zinbactam (Piperacilina-Tazobactam)",
            formas: {
                iv: {
                    descricao: "Pó para solução injetável 2g+0,25g, 4g+0,5g",
                    tipo: "injetavel",
                    passos: [
                        "Reconstituir com solvente adequado",
                        "Administrar por infusão lenta (30 minutos)",
                        "Verificar compatibilidade antes de misturar com outros medicamentos"
                    ],
                    precaucoes: [
                        "Ajustar dose em insuficiência renal",
                        "Monitorar eletrólitos (principalmente potássio)",
                        "Risco de convulsões em doses elevadas"
                    ],
                    indicacoes: {
                        pneumoniaGrave: {
                            dose: "Crianças: 300-400 mg/kg/dia (componente piperacilina); Adultos: 4g+0,5g",
                            doseMaxima: "16g+2g/dia",
                            frequencia: "A cada 6-8 horas",
                            duracao: "7-14 dias"
                        },
                        sepse: {
                            dose: "Crianças: 300-400 mg/kg/dia (componente piperacilina); Adultos: 4g+0,5g",
                            doseMaxima: "16g+2g/dia",
                            frequencia: "A cada 6 horas",
                            duracao: "7-14 dias"
                        }
                    }
                }
            }
        };

        // Zukovudina - Para tuberculose multirresistente
        MEDICAMENTOS.zukovudina = {
            nome: "Zukovudina (Bedaquilina)",
            formas: {
                oral: {
                    descricao: "Comprimidos 100mg",
                    tipo: "comprimido",
                    passos: [
                        "Administrar com alimentos para aumentar absorção",
                        "Tomar no mesmo horário todos os dias",
                        "Sempre usar em combinação com outros tuberculostáticos"
                    ],
                    precaucoes: [
                        "Monitorar ECG (prolongamento QT)",
                        "Realizar enzimas hepáticas regularmente",
                        "Evitar medicamentos que prolongam intervalo QT"
                    ],
                    indicacoes: {
                        tuberculoseResistente: {
                            dose: "Crianças >12 anos e adultos: 400mg/dia nas 2 primeiras semanas, depois 200mg 3x/semana",
                            doseMaxima: "600mg/semana após primeiras 2 semanas",
                            frequencia: "Diariamente por 2 semanas, depois 3x/semana",
                            duracao: "24 semanas"
                        }
                    }
                }
            }
        };

        // Amodiaquina - Para tratamento combinado da malária
        MEDICAMENTOS.amodiaquina = {
            nome: "Amodiaquina",
            formas: {
                oral: {
                    descricao: "Comprimidos 153mg base (200mg sal)",
                    tipo: "comprimido",
                    passos: [
                        "Administrar com alimentos ou água",
                        "Tomar nos mesmos horários todos os dias",
                        "Sempre combinar com outro antimalárico (ex: artesunato)"
                    ],
                    precaucoes: [
                        "Monitorar função hepática",
                        "Risco de agranulocitose e hepatite",
                        "Não reutilizar em caso de reação prévia"
                    ],
                    indicacoes: {
                        malaria: {
                            dose: "Crianças: 10 mg/kg/dia (base); Adultos: 612mg (base)",
                            doseMaxima: "612mg base/dia",
                            frequencia: "1 vez ao dia",
                            duracao: "3 dias"
                        }
                    }
                }
            }
        };

        // Ácido Zoledrônico - Para oncologia e HIV
        MEDICAMENTOS.acidoZoledronico = {
            nome: "Ácido Zoledrônico",
            formas: {
                iv: {
                    descricao: "Solução para infusão 4mg/100mL",
                    tipo: "injetavel",
                    passos: [
                        "Hidratar o paciente adequadamente antes da infusão",
                        "Administrar por infusão lenta (mínimo 15 minutos)",
                        "Monitorar função renal e eletrólitos"
                    ],
                    precaucoes: [
                        "Não administrar em pacientes com insuficiência renal grave",
                        "Risco de osteonecrose de mandíbula",
                        "Avaliar saúde bucal antes do tratamento"
                    ],
                    indicacoes: {
                        hipercalcemia: {
                            dose: "4mg",
                            doseMaxima: "4mg/dose",
                            frequencia: "Dose única, repetir após 7 dias se necessário",
                            duracao: "Conforme necessário"
                        },
                        metastasesOsseas: {
                            dose: "4mg",
                            doseMaxima: "4mg/dose",
                            frequencia: "A cada 3-4 semanas",
                            duracao: "Conforme resposta clínica"
                        }
                    }
                }
            }
        };

        console.log('Adicionados mais medicamentos específicos para contexto moçambicano!');
    } catch (error) {
        console.error('Erro ao adicionar medicamentos extras para Moçambique (6):', error);
    }
}

// Executar automaticamente a adição de medicamentos quando o script for carregado
document.addEventListener('DOMContentLoaded', function() {
    adicionarMedicamentosMocambique6();
});
