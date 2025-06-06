/**
 * Medicamentos Essenciais para a Calculadora Pediátrica de Dose
 * Este arquivo adiciona medicamentos essenciais com base na lista de medicamentos essenciais
 * Inclui medicamentos com iniciais X, Y e Z
 */

function adicionarMedicamentosEssenciais() {
    // Verificar se o objeto MEDICAMENTOS existe
    if (typeof MEDICAMENTOS === 'undefined') {
        console.error('Erro: Objeto MEDICAMENTOS não definido. Certifique-se de que medicamentos.js está carregado antes deste arquivo.');
        return;
    }
    
    try {
        // Xilocaína (Lidocaína) - começando com X
        MEDICAMENTOS.xilocaina = {
            nome: "Xilocaína (Lidocaína)",
            formas: {
                topica: {
                    descricao: "Gel 2%, Spray 10%",
                    tipo: "topico",
                    passos: [
                        "Aplicar em mucosas ou pele limpa",
                        "Evitar aplicação em áreas grandes ou com lesões",
                        "Aplicar quantidade mínima eficaz"
                    ],
                    precaucoes: [
                        "Evitar contato com olhos",
                        "Não usar em crianças menores de 2 anos sem supervisão médica",
                        "Não exceder a dose máxima recomendada"
                    ],
                    indicacoes: {
                        anestesiaLocal: {
                            dose: "Aplicação tópica conforme necessário",
                            doseMaxima: "4-5 mg/kg a cada 4 horas",
                            frequencia: "A cada 4-6 horas conforme necessário",
                            duracao: "Conforme necessário"
                        }
                    }
                },
                intranasal: {
                    descricao: "Spray nasal 2%",
                    tipo: "spray",
                    passos: [
                        "Limpar as narinas antes da aplicação",
                        "Aplicar 1-2 jatos em cada narina",
                        "Manter cabeça inclinada para trás por 1 minuto"
                    ],
                    precaucoes: [
                        "Não exceder a dose recomendada",
                        "Evitar uso prolongado",
                        "Suspender se ocorrer irritação local"
                    ],
                    indicacoes: {
                        dor: {
                            dose: "1-2 jatos por narina",
                            doseMaxima: "8 jatos por dia",
                            frequencia: "A cada 4-6 horas",
                            duracao: "Até 3 dias"
                        }
                    }
                }
            }
        };

        // Zinco - começando com Z
        MEDICAMENTOS.zinco = {
            nome: "Zinco (Sulfato)",
            formas: {
                oral: {
                    descricao: "Comprimidos 20mg, Xarope 10mg/5mL",
                    tipo: "comprimido",
                    passos: [
                        "Administrar com alimentos para reduzir desconforto gástrico",
                        "Comprimidos podem ser dissolvidos em água",
                        "Manter boa hidratação durante o tratamento"
                    ],
                    precaucoes: [
                        "Pode causar náuseas ou desconforto abdominal",
                        "Não exceder a dose diária recomendada",
                        "Monitorar efeitos adversos gastrointestinais"
                    ],
                    indicacoes: {
                        diarreia: {
                            dose: "10-20 mg/dia (<6 meses), 20 mg/dia (≥6 meses)",
                            doseMaxima: "20 mg/dia",
                            frequencia: "1 vez ao dia",
                            duracao: "10-14 dias"
                        },
                        deficienciaZinco: {
                            dose: "1-2 mg/kg/dia",
                            doseMaxima: "50 mg/dia",
                            frequencia: "1-2 vezes ao dia",
                            duracao: "1-3 meses"
                        }
                    }
                }
            }
        };

        // Yorvegelan (fitoterápico) - começando com Y
        MEDICAMENTOS.yorvegelan = {
            nome: "Yorvegelan (Extrato de Ervas)",
            formas: {
                oral: {
                    descricao: "Gotas 30mL, Comprimidos 250mg",
                    tipo: "fitoterápico",
                    passos: [
                        "Agitar bem o frasco de gotas antes de usar",
                        "Diluir as gotas em pequena quantidade de água",
                        "Administrar 30 minutos antes das refeições"
                    ],
                    precaucoes: [
                        "Não recomendado para menores de 12 anos",
                        "Descontinuar se ocorrer reações cutâneas",
                        "Consultar médico antes de usar em crianças com doenças crônicas"
                    ],
                    indicacoes: {
                        ansiedade: {
                            dose: "Gotas: 1 gota/kg/dose, Comprimidos: 250-500mg/dose (>12 anos)",
                            doseMaxima: "Gotas: 25 gotas/dose, Comprimidos: 500mg/dose",
                            frequencia: "3 vezes ao dia",
                            duracao: "Até 30 dias"
                        }
                    }
                }
            }
        };

        // Xarope de Ipeca - começando com X
        MEDICAMENTOS.xaropeIpeca = {
            nome: "Xarope de Ipeca",
            formas: {
                oral: {
                    descricao: "Xarope 7mg/mL",
                    tipo: "xarope",
                    passos: [
                        "Administrar apenas sob supervisão médica",
                        "Seguir com 240mL de água",
                        "Manter o paciente sob observação contínua"
                    ],
                    precaucoes: [
                        "Contraindicado em pacientes inconscientes",
                        "Não usar em intoxicações por cáusticos ou hidrocarbonetos",
                        "Pode causar arritmias cardíacas em doses excessivas"
                    ],
                    indicacoes: {
                        intoxicacao: {
                            dose: "6-12 meses: 5-10mL, 1-12 anos: 15mL, >12 anos: 30mL",
                            doseMaxima: "30mL dose única",
                            frequencia: "Dose única, repetir após 20 min se necessário (máx. 2 doses)",
                            duracao: "Dose única ou até induzir êmese"
                        }
                    }
                }
            }
        };

        // Zolpidem - começando com Z
        MEDICAMENTOS.zolpidem = {
            nome: "Zolpidem",
            formas: {
                oral: {
                    descricao: "Comprimidos 5mg, 10mg",
                    tipo: "comprimido",
                    passos: [
                        "Administrar imediatamente antes de deitar-se",
                        "Garantir pelo menos 8 horas de sono após a administração",
                        "Não administrar durante ou após refeições"
                    ],
                    precaucoes: [
                        "Uso não recomendado em menores de 18 anos",
                        "Pode causar dependência e tolerância",
                        "Risco de sonambulismo e outros comportamentos complexos durante o sono"
                    ],
                    indicacoes: {
                        insonia: {
                            dose: "5-10 mg (apenas para >18 anos)",
                            doseMaxima: "10 mg/dia",
                            frequencia: "1 vez ao dia ao deitar",
                            duracao: "Até 4 semanas"
                        }
                    }
                }
            }
        };

        // Xilometazolina - começando com X
        MEDICAMENTOS.xilometazolina = {
            nome: "Xilometazolina",
            formas: {
                intranasal: {
                    descricao: "Solução nasal 0,05% pediátrica, 0,1% adulto",
                    tipo: "soluçao",
                    passos: [
                        "Limpar as narinas antes da aplicação",
                        "Inclinar ligeiramente a cabeça para frente",
                        "Aplicar 1-2 gotas em cada narina"
                    ],
                    precaucoes: [
                        "Não usar por mais de 3-5 dias consecutivos",
                        "Pode causar congestão rebote",
                        "Evitar em crianças com menos de 2 anos"
                    ],
                    indicacoes: {
                        riniteAlergica: {
                            dose: "Crianças 2-6 anos: 0,05% 1-2 gotas, Crianças >6 anos: 0,05% 2-3 gotas",
                            doseMaxima: "3 gotas por narina",
                            frequencia: "A cada 8-12 horas",
                            duracao: "Máximo 3-5 dias"
                        }
                    }
                }
            }
        };

        // Yohimbina - começando com Y
        MEDICAMENTOS.yohimbina = {
            nome: "Yohimbina",
            formas: {
                oral: {
                    descricao: "Comprimidos 5.4mg",
                    tipo: "comprimido",
                    passos: [
                        "Administrar com o estômago vazio",
                        "Evitar administração à noite",
                        "Interromper uso se ocorrer taquicardia significativa"
                    ],
                    precaucoes: [
                        "Contraindicada em crianças e adolescentes",
                        "Pode aumentar pressão arterial e frequência cardíaca",
                        "Não usar em pacientes com hipertensão ou doenças cardíacas"
                    ],
                    indicacoes: {
                        hipotensao: {
                            dose: "Apenas para adultos: 5.4mg",
                            doseMaxima: "10.8mg por dose, 32.4mg por dia",
                            frequencia: "3 vezes ao dia",
                            duracao: "Conforme orientação médica"
                        }
                    }
                }
            }
        };

        console.log('Medicamentos essenciais adicionados com sucesso! Incluindo medicamentos com iniciais X, Y e Z');
    } catch (error) {
        console.error('Erro ao adicionar medicamentos essenciais:', error);
    }
}

// Executar automaticamente a adição de medicamentos quando o script for carregado
document.addEventListener('DOMContentLoaded', function() {
    adicionarMedicamentosEssenciais();
    console.log('Inicialização dos medicamentos essenciais concluída');
});
