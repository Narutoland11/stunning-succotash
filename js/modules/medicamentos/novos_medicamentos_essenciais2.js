/**
 * Medicamentos Essenciais Adicionais para a Calculadora Pediátrica de Dose
 * Este arquivo adiciona mais medicamentos da lista de essenciais
 * Inclui mais medicamentos com iniciais X, Y, Z e outros importantes
 */

function adicionarMedicamentosEssenciais2() {
    // Verificar se o objeto MEDICAMENTOS existe
    if (typeof MEDICAMENTOS === 'undefined') {
        console.error('Erro: Objeto MEDICAMENTOS não definido. Certifique-se de que medicamentos.js está carregado antes deste arquivo.');
        return;
    }
    
    try {
        // Xylocaína com adrenalina - outra variante começando com X
        MEDICAMENTOS.xylocainaAdrenalina = {
            nome: "Xylocaína com Adrenalina",
            formas: {
                topica: {
                    descricao: "Solução injetável 2% com epinefrina 1:200.000",
                    tipo: "injetavel",
                    passos: [
                        "Aspirar antes de injetar para evitar injeção intravascular",
                        "Administrar lentamente",
                        "Usar a menor dose eficaz"
                    ],
                    precaucoes: [
                        "Evitar uso em extremidades (dedos, orelhas)",
                        "Contraindicada em áreas com circulação terminal",
                        "Monitorar sinais vitais durante o procedimento"
                    ],
                    indicacoes: {
                        anestesiaLocal: {
                            dose: "3-5 mg/kg (máximo 7 mg/kg com adrenalina)",
                            doseMaxima: "Crianças: 5-7 mg/kg, não exceder 300 mg",
                            frequencia: "Dose única, pode repetir após 2-4 horas se necessário",
                            duracao: "Conforme duração do procedimento"
                        }
                    }
                }
            }
        };

        // Zanamivir - antiviral começando com Z
        MEDICAMENTOS.zanamivir = {
            nome: "Zanamivir",
            formas: {
                nebulizacao: {
                    descricao: "Pó para inalação 5mg/dose",
                    tipo: "inalatorio",
                    passos: [
                        "Usar o dispositivo de inalação específico",
                        "Inspirar profunda e lentamente",
                        "Segurar a respiração por 10 segundos após a inalação"
                    ],
                    precaucoes: [
                        "Pode causar broncoespasmo em pacientes asmáticos",
                        "Utilizar broncodilatador antes da medicação em pacientes com doença respiratória",
                        "Eficácia máxima se iniciado nas primeiras 48h dos sintomas"
                    ],
                    indicacoes: {
                        gripe: {
                            dose: "Crianças ≥7 anos: 10mg (2 inalações)",
                            doseMaxima: "20mg/dia",
                            frequencia: "2 vezes ao dia",
                            duracao: "5 dias para tratamento, 10 dias para profilaxia"
                        }
                    }
                }
            }
        };

        // Yasmin (etinilestradiol + drospirenona) - começando com Y
        MEDICAMENTOS.yasmin = {
            nome: "Yasmin (Etinilestradiol + Drospirenona)",
            formas: {
                oral: {
                    descricao: "Comprimidos 0,03mg + 3mg",
                    tipo: "comprimido",
                    passos: [
                        "Tomar no mesmo horário todos os dias",
                        "Iniciar no primeiro dia da menstruação",
                        "Tomar por 21 dias, seguido de 7 dias de intervalo"
                    ],
                    precaucoes: [
                        "Uso apenas para adolescentes pós-menarca",
                        "Contraindicado em pacientes com histórico de trombose",
                        "Interação com vários medicamentos"
                    ],
                    indicacoes: {
                        contracepção: {
                            dose: "1 comprimido por dia",
                            doseMaxima: "1 comprimido por dia",
                            frequencia: "1 vez ao dia",
                            duracao: "Contínuo conforme orientação médica"
                        },
                        acne: {
                            dose: "1 comprimido por dia",
                            doseMaxima: "1 comprimido por dia",
                            frequencia: "1 vez ao dia",
                            duracao: "Pelo menos 6 ciclos para efeito na acne"
                        }
                    }
                }
            }
        };

        // Xilitol - começando com X
        MEDICAMENTOS.xilitol = {
            nome: "Xilitol",
            formas: {
                oral: {
                    descricao: "Pó ou goma de mascar",
                    tipo: "adjuvante",
                    passos: [
                        "Usar após as refeições",
                        "Mascar a goma por pelo menos 5 minutos",
                        "Não engolir a goma"
                    ],
                    precaucoes: [
                        "Pode causar efeito laxativo em doses altas",
                        "Uso limitado em crianças muito pequenas devido ao risco de aspiração",
                        "Não substitui escovação dental"
                    ],
                    indicacoes: {
                        prevencaoCarie: {
                            dose: "Crianças >4 anos: 1-2 pastilhas ou gomas",
                            doseMaxima: "5-7 pastilhas ou gomas por dia",
                            frequencia: "Após refeições e lanches",
                            duracao: "Uso contínuo conforme recomendação"
                        }
                    }
                }
            }
        };

        // Zetalerg (cetirizina) - antihistamínico começando com Z
        MEDICAMENTOS.zetalerg = {
            nome: "Zetalerg (Cetirizina)",
            formas: {
                oral: {
                    descricao: "Solução oral 1mg/mL, comprimidos 10mg",
                    tipo: "solucao",
                    passos: [
                        "Administrar com ou sem alimentos",
                        "Para solução oral, usar seringa dosadora",
                        "Armazenar em temperatura ambiente"
                    ],
                    precaucoes: [
                        "Pode causar sonolência",
                        "Ajustar dose em insuficiência renal",
                        "Monitorar função hepática em uso prolongado"
                    ],
                    indicacoes: {
                        riniteAlergica: {
                            dose: "6-12 meses: 2.5mg, 1-2 anos: 2.5mg, 2-5 anos: 2.5-5mg, 6+ anos: 5-10mg",
                            doseMaxima: "6-12 meses: 2.5mg/dia, 1-5 anos: 5mg/dia, 6+ anos: 10mg/dia",
                            frequencia: "1 vez ao dia",
                            duracao: "Conforme necessário, geralmente 1-4 semanas"
                        },
                        urticaria: {
                            dose: "6-12 meses: 2.5mg, 1-2 anos: 2.5mg, 2-5 anos: 2.5-5mg, 6+ anos: 5-10mg",
                            doseMaxima: "6-12 meses: 2.5mg/dia, 1-5 anos: 5mg/dia, 6+ anos: 10mg/dia",
                            frequencia: "1 vez ao dia",
                            duracao: "Até resolução dos sintomas, geralmente 1-2 semanas"
                        }
                    }
                }
            }
        };

        // Xeroftalmia (Vitamina A) - nomenclatura com X para condição tratada com vitamina A
        MEDICAMENTOS.xeroftalmiaVitA = {
            nome: "Vitamina A para Xeroftalmia",
            formas: {
                oral: {
                    descricao: "Cápsula 100.000 UI, 200.000 UI",
                    tipo: "capsula",
                    passos: [
                        "Administrar com alimentos para melhor absorção",
                        "Para crianças pequenas, perfurar a cápsula e espremer o conteúdo",
                        "Administrar dose única imediatamente após diagnóstico"
                    ],
                    precaucoes: [
                        "Evitar doses excessivas em gestantes (teratogênico)",
                        "Doses altas podem causar toxicidade (cefaleia, náuseas, vômitos)",
                        "Armazenar em local fresco e protegido da luz"
                    ],
                    indicacoes: {
                        deficienciaVitaminaA: {
                            dose: "<6 meses: 50.000 UI, 6-12 meses: 100.000 UI, >12 meses: 200.000 UI",
                            doseMaxima: "200.000 UI por dose",
                            frequencia: "Dia 1, 2 e 14",
                            duracao: "3 doses totais"
                        },
                        sarampo: {
                            dose: "6-12 meses: 100.000 UI, >12 meses: 200.000 UI",
                            doseMaxima: "200.000 UI por dose",
                            frequencia: "2 doses: dia 1 e dia 2",
                            duracao: "2 doses totais"
                        }
                    }
                }
            }
        };

        // Yersiniose (tratamento com antibiótico) - nomenclatura com Y para infecção
        MEDICAMENTOS.yersinioseAntibiotico = {
            nome: "Antibiótico para Yersiniose",
            formas: {
                oral: {
                    descricao: "Ciprofoxacino 250mg, 500mg; TMP-SMX 80mg+400mg/5mL",
                    tipo: "comprimido",
                    passos: [
                        "Administrar com estômago vazio (1h antes ou 2h após refeições)",
                        "Garantir hidratação adequada durante o tratamento",
                        "Completar todo o curso de tratamento"
                    ],
                    precaucoes: [
                        "Ciprofloxacino não é primeira escolha para crianças",
                        "Monitorar efeitos adversos em tendões e articulações",
                        "TMP-SMX pode causar reações cutâneas graves"
                    ],
                    indicacoes: {
                        infeccaoEntericaGrave: {
                            dose: "TMP-SMX: 8-10mg/kg/dia (TMP); Ciprofloxacino (>12 anos): 20-30mg/kg/dia",
                            doseMaxima: "TMP-SMX: 320mg/dia (TMP); Ciprofloxacino: 1.5g/dia",
                            frequencia: "TMP-SMX: 2 vezes ao dia; Ciprofloxacino: 2 vezes ao dia",
                            duracao: "5-7 dias"
                        }
                    }
                }
            }
        };

        console.log('Medicamentos essenciais adicionais adicionados com sucesso! Incluindo mais medicamentos com iniciais X, Y e Z');
    } catch (error) {
        console.error('Erro ao adicionar medicamentos essenciais adicionais:', error);
    }
}

// Executar automaticamente a adição de medicamentos quando o script for carregado
document.addEventListener('DOMContentLoaded', function() {
    adicionarMedicamentosEssenciais2();
    console.log('Inicialização dos medicamentos essenciais adicionais concluída');
});
