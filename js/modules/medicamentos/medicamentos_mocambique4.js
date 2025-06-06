/**
 * Medicamentos adicionais para contexto africano/moçambicano - Parte 4
 * Zidovudina e outros medicamentos importantes
 */

function adicionarMedicamentosMocambique4() {
    if (typeof MEDICAMENTOS === 'undefined') {
        console.error('Erro: Objeto MEDICAMENTOS não definido.');
        return;
    }
    
    try {
        // Zidovudina (AZT) - Antirretroviral importante
        MEDICAMENTOS.zidovudina = {
            nome: "Zidovudina (AZT)",
            formas: {
                oral: {
                    descricao: "Cápsulas 100mg, Comprimidos 300mg, Solução oral 50mg/5mL",
                    tipo: "capsula_solucao",
                    passos: [
                        "Pode ser administrado com ou sem alimentos",
                        "Administrar a cada 12 horas em horários regulares",
                        "Agitar bem a solução oral antes de usar"
                    ],
                    precaucoes: [
                        "Monitorar hemograma regularmente (risco de anemia)",
                        "Monitorar função hepática",
                        "Pode causar miopatias e acidose láctica"
                    ],
                    indicacoes: {
                        hiv: {
                            dose: "Neonatos: 4mg/kg/dose, Crianças: 180-240mg/m²/dose, Adultos: 300mg",
                            doseMaxima: "600mg/dia",
                            frequencia: "2 vezes ao dia",
                            duracao: "Tratamento contínuo"
                        },
                        prevencaoTransmissaoVertical: {
                            dose: "Gestantes: 300mg, Trabalho de parto: 600mg inicial, depois 300mg/3h, RN: 2mg/kg/6h",
                            doseMaxima: "600mg por dose",
                            frequencia: "Gestantes: 2x/dia, Parto: dose inicial + 3/3h, RN: 4x/dia",
                            duracao: "Gestação, parto e 6 semanas pós-parto para RN"
                        }
                    }
                },
                iv: {
                    descricao: "Solução injetável 10mg/mL",
                    tipo: "injetavel",
                    passos: [
                        "Diluir em solução glicosada 5%",
                        "Administrar por infusão lenta (1 hora)",
                        "Trocar para via oral assim que possível"
                    ],
                    precaucoes: [
                        "Monitorar hemograma diariamente durante uso IV",
                        "Incompatível com sangue e hemoderivados",
                        "Proteger da luz durante a infusão"
                    ],
                    indicacoes: {
                        prevencaoTransmissaoVerticalParto: {
                            dose: "2 mg/kg na primeira hora, seguido de 1 mg/kg/hora até clampeamento do cordão",
                            doseMaxima: "Baseada no peso",
                            frequencia: "Infusão contínua durante o parto",
                            duracao: "Durante o trabalho de parto"
                        }
                    }
                }
            }
        };

        // Lamivudina (3TC) - Componente essencial em esquemas ARV
        MEDICAMENTOS.lamivudina = {
            nome: "Lamivudina (3TC)",
            formas: {
                oral: {
                    descricao: "Comprimidos 150mg, 300mg, Solução oral 10mg/mL",
                    tipo: "comprimido_solucao",
                    passos: [
                        "Pode ser administrado com ou sem alimentos",
                        "Tomar no mesmo horário todos os dias",
                        "Manter intervalo regular entre doses"
                    ],
                    precaucoes: [
                        "Ajustar dose em insuficiência renal",
                        "Monitorar função hepática em caso de hepatite B",
                        "Risco de exacerbação de hepatite B após descontinuação"
                    ],
                    indicacoes: {
                        hiv: {
                            dose: "Crianças: 4 mg/kg/dose (máx 150mg); Adultos: 150mg ou 300mg",
                            doseMaxima: "300mg/dia",
                            frequencia: "2 vezes ao dia (150mg) ou 1 vez ao dia (300mg)",
                            duracao: "Tratamento contínuo"
                        },
                        hepatiteB: {
                            dose: "Crianças: 3 mg/kg/dia; Adultos: 100mg",
                            doseMaxima: "100mg/dia para hepatite B",
                            frequencia: "1 vez ao dia",
                            duracao: "Tratamento contínuo (mínimo 1 ano)"
                        }
                    }
                }
            }
        };

        // Abacavir (ABC) - ARV importante em pediatria
        MEDICAMENTOS.abacavir = {
            nome: "Abacavir (ABC)",
            formas: {
                oral: {
                    descricao: "Comprimidos 300mg, 600mg, Solução oral 20mg/mL",
                    tipo: "comprimido_solucao",
                    passos: [
                        "Pode ser administrado com ou sem alimentos",
                        "Realizar teste HLA-B*5701 antes de iniciar tratamento",
                        "Instruir o paciente sobre reação de hipersensibilidade"
                    ],
                    precaucoes: [
                        "Risco de reação de hipersensibilidade grave (febre, erupção, sintomas GI)",
                        "Nunca reintroduzir após reação de hipersensibilidade",
                        "Fornecer cartão de alerta ao paciente"
                    ],
                    indicacoes: {
                        hiv: {
                            dose: "Crianças: 8 mg/kg/dose (máx 300mg); Adultos: 300mg ou 600mg",
                            doseMaxima: "600mg/dia",
                            frequencia: "2 vezes ao dia (300mg) ou 1 vez ao dia (600mg)",
                            duracao: "Tratamento contínuo"
                        }
                    }
                }
            }
        };

        // Fancida - Combinação Sulfadoxina-Pirimetamina para malária
        MEDICAMENTOS.fancida = {
            nome: "Fancida (Sulfadoxina-Pirimetamina)",
            formas: {
                oral: {
                    descricao: "Comprimidos 500mg+25mg",
                    tipo: "comprimido",
                    passos: [
                        "Administrar com alimentos para reduzir irritação gástrica",
                        "Dose única supervisionada",
                        "Garantir ingestão adequada de líquidos"
                    ],
                    precaucoes: [
                        "Contraindicado em alergia a sulfonamidas",
                        "Não usar no primeiro trimestre da gravidez",
                        "Evitar em pacientes com deficiência de G6PD"
                    ],
                    indicacoes: {
                        malaria: {
                            dose: "5-10kg: 0,5 comp, 11-20kg: 1 comp, 21-30kg: 1,5 comp, 31-45kg: 2 comp, >45kg: 3 comp",
                            doseMaxima: "3 comprimidos (dose única)",
                            frequencia: "Dose única",
                            duracao: "Dose única"
                        },
                        tratamentoPresuntivo: {
                            dose: "Para gestantes >16 sem: 3 comprimidos",
                            doseMaxima: "3 comprimidos por dose",
                            frequencia: "A cada consulta pré-natal programada (mínimo 1 mês intervalo)",
                            duracao: "Durante a gestação após primeiro trimestre"
                        }
                    }
                }
            }
        };

        // Zilepton - Derivado de β-lactama para infecções bacterianas
        MEDICAMENTOS.zilepton = {
            nome: "Zilepton (Cefalosporina de 4ª geração)",
            formas: {
                oral: {
                    descricao: "Comprimidos 400mg, 800mg",
                    tipo: "comprimido",
                    passos: [
                        "Administrar com ou sem alimentos",
                        "Tomar com um copo cheio de água",
                        "Completar todo o tratamento prescrito"
                    ],
                    precaucoes: [
                        "Verificar histórico de alergia a cefalosporinas e penicilinas",
                        "Ajustar dose em insuficiência renal",
                        "Pode alterar resultados de testes laboratoriais"
                    ],
                    indicacoes: {
                        infeccoesTratoRespiratório: {
                            dose: "Crianças >12 anos e adultos: 400mg",
                            doseMaxima: "800mg/dia",
                            frequencia: "2 vezes ao dia",
                            duracao: "7-14 dias"
                        }
                    }
                },
                iv: {
                    descricao: "Pó para solução injetável 1g, 2g",
                    tipo: "injetavel",
                    passos: [
                        "Reconstituir com água estéril para injeção",
                        "Administrar por infusão lenta (30 min)",
                        "Verificar compatibilidade antes de misturar com outros medicamentos"
                    ],
                    precaucoes: [
                        "Monitorar função renal",
                        "Observar sinais de superinfecção",
                        "Risco de reação alérgica"
                    ],
                    indicacoes: {
                        infeccoesGraves: {
                            dose: "Crianças: 50 mg/kg/dose; Adultos: 1-2g",
                            doseMaxima: "4g/dia",
                            frequencia: "2-3 vezes ao dia",
                            duracao: "7-14 dias"
                        }
                    }
                }
            }
        };

        console.log('Zidovudina e medicamentos adicionais para contexto africano/moçambicano adicionados com sucesso!');
    } catch (error) {
        console.error('Erro ao adicionar Zidovudina e outros medicamentos:', error);
    }
}

// Executar automaticamente a adição de medicamentos quando o script for carregado
document.addEventListener('DOMContentLoaded', function() {
    adicionarMedicamentosMocambique4();
});
