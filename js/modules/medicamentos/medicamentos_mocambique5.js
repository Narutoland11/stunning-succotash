/**
 * Medicamentos adicionais para contexto africano/moçambicano - Parte 5
 * Mais medicamentos importantes para contexto local
 */

function adicionarMedicamentosMocambique5() {
    if (typeof MEDICAMENTOS === 'undefined') {
        console.error('Erro: Objeto MEDICAMENTOS não definido.');
        return;
    }
    
    try {
        // Ziduvidina/Lamivudina - Combinação ARV importante
        MEDICAMENTOS.zidovudinaLamivudina = {
            nome: "Zidovudina/Lamivudina (AZT/3TC)",
            formas: {
                oral: {
                    descricao: "Comprimidos 300mg/150mg",
                    tipo: "comprimido",
                    passos: [
                        "Pode ser administrado com ou sem alimentos",
                        "Tomar nos horários regulares para manter níveis sanguíneos",
                        "Não pular doses"
                    ],
                    precaucoes: [
                        "Monitorar hemograma regularmente (risco de anemia)",
                        "Ajustar dose em insuficiência renal",
                        "Pode causar cefaleia e fadiga nas primeiras semanas"
                    ],
                    indicacoes: {
                        hiv: {
                            dose: "Adultos e adolescentes >30kg: 1 comprimido",
                            doseMaxima: "2 comprimidos/dia",
                            frequencia: "2 vezes ao dia",
                            duracao: "Tratamento contínuo"
                        }
                    }
                }
            }
        };

        // Nota: Definição de Zinco (Sulfato) removida pois já existe em novos_medicamentos_essenciais.js com o ID "zinco"

        // Estreptomicina - Para tuberculose
        MEDICAMENTOS.estreptomicina = {
            nome: "Estreptomicina",
            formas: {
                im: {
                    descricao: "Pó para solução injetável 1g",
                    tipo: "injetavel",
                    passos: [
                        "Reconstituir com água estéril para injeção",
                        "Aplicar injeção profunda no músculo glúteo",
                        "Alternar locais de injeção"
                    ],
                    precaucoes: [
                        "Monitorar função renal e auditiva",
                        "Contraindicado na gravidez",
                        "Risco de ototoxicidade e nefrotoxicidade"
                    ],
                    indicacoes: {
                        tuberculose: {
                            dose: "Crianças: 20-40 mg/kg/dia; Adultos: 15 mg/kg/dia",
                            doseMaxima: "1g/dia",
                            frequencia: "1 vez ao dia",
                            duracao: "2-3 meses"
                        }
                    }
                }
            }
        };

        // Zingerol - Para náusea e vômito
        MEDICAMENTOS.zingerol = {
            nome: "Zingerol (Extrato de Zingiber officinale)",
            formas: {
                oral: {
                    descricao: "Cápsulas 250mg, Comprimidos 500mg",
                    tipo: "capsula",
                    passos: [
                        "Tomar com um copo cheio de água",
                        "Pode ser administrado com alimentos",
                        "Iniciar ao primeiro sinal de náusea"
                    ],
                    precaucoes: [
                        "Cautela em pacientes com cálculos biliares",
                        "Pode aumentar risco de sangramento (interação com anticoagulantes)",
                        "Evitar doses altas em gestantes"
                    ],
                    indicacoes: {
                        nausea: {
                            dose: "Crianças >6 anos: 250mg; Adultos: 500-1000mg",
                            doseMaxima: "2000mg/dia",
                            frequencia: "3-4 vezes ao dia",
                            duracao: "Conforme necessário"
                        },
                        nauseaGravidez: {
                            dose: "250mg",
                            doseMaxima: "1000mg/dia",
                            frequencia: "4 vezes ao dia",
                            duracao: "Conforme necessário, geralmente primeiro trimestre"
                        }
                    }
                }
            }
        };

        // Zedobina - Para shistossomíase
        MEDICAMENTOS.zedobina = {
            nome: "Zedobina (Praziquantel Modificado)",
            formas: {
                oral: {
                    descricao: "Comprimidos 600mg, 1200mg",
                    tipo: "comprimido",
                    passos: [
                        "Tomar com água durante as refeições",
                        "Os comprimidos podem ser divididos em doses menores",
                        "Administrar todas as doses no mesmo dia"
                    ],
                    precaucoes: [
                        "Pode causar tonturas e sonolência",
                        "Evitar atividades que exijam atenção nas primeiras 24h",
                        "Evitar em crises agudas de cisticercose"
                    ],
                    indicacoes: {
                        esquistossomose: {
                            dose: "40mg/kg",
                            doseMaxima: "3600mg/dia",
                            frequencia: "2-3 doses no mesmo dia",
                            duracao: "1 dia"
                        },
                        teníase: {
                            dose: "10-15mg/kg",
                            doseMaxima: "1200mg dose única",
                            frequencia: "Dose única",
                            duracao: "Dose única, repetir após 7 dias se necessário"
                        }
                    }
                }
            }
        };

        console.log('Adicionado mais medicamentos para contexto africano/moçambicano!');
    } catch (error) {
        console.error('Erro ao adicionar medicamentos extras para Moçambique:', error);
    }
}

// Executar automaticamente a adição de medicamentos quando o script for carregado
document.addEventListener('DOMContentLoaded', function() {
    adicionarMedicamentosMocambique5();
});
