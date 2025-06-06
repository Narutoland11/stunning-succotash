/**
 * Novos medicamentos para a Calculadora Pediátrica de Dose
 * Este arquivo complementa o banco de dados de medicamentos.js
 */

// Função para adicionar os medicamentos ao objeto global MEDICAMENTOS
function adicionarNovosMedicamentos() {
    // Verificar se o objeto MEDICAMENTOS existe
    if (typeof MEDICAMENTOS === 'undefined') {
        console.error('Erro: Objeto MEDICAMENTOS não definido. Certifique-se de que medicamentos.js está carregado antes deste arquivo.');
        return;
    }
    
    try {
        // Ampicilina
        MEDICAMENTOS.ampicilina = {
            nome: "Ampicilina",
            formas: {
                iv: {
                    descricao: "Solução injetável 500mg, 1g",
                    tipo: "solucao",
                    passos: [
                        "Reconstituir com água estéril para injeção",
                        "Administrar lentamente em 10-15 minutos",
                        "É essencial seguir técnica asséptica"
                    ],
                    precaucoes: [
                        "Verificar histórico de alergia a penicilinas",
                        "Observar reações cutâneas",
                        "Ajustar dose em insuficiência renal"
                    ],
                    indicacoes: {
                        pneumonia: {
                            dose: "50-100 mg/kg/dia",
                            doseMaxima: "12 g/dia",
                            frequencia: "A cada 6 horas",
                            duracao: "7-10 dias"
                        },
                        meningite: {
                            dose: "200-400 mg/kg/dia",
                            doseMaxima: "12 g/dia",
                            frequencia: "A cada 4-6 horas",
                            duracao: "10-14 dias"
                        },
                        sepse: {
                            dose: "100-200 mg/kg/dia",
                            doseMaxima: "12 g/dia",
                            frequencia: "A cada 6 horas",
                            duracao: "7-14 dias"
                        }
                    }
                },
                oral: {
                    descricao: "Suspensão oral 250mg/5mL",
                    tipo: "suspensao",
                    passos: [
                        "Agitar bem antes de cada dose",
                        "Medir com precisão usando seringa oral",
                        "Armazenar na geladeira após reconstituição"
                    ],
                    precaucoes: [
                        "Administrar longe das refeições",
                        "Verificar histórico de alergia a penicilinas",
                        "Observar reações cutâneas"
                    ],
                    indicacoes: {
                        otite: {
                            dose: "50-100 mg/kg/dia",
                            doseMaxima: "4 g/dia",
                            frequencia: "A cada 6 horas",
                            duracao: "7-10 dias"
                        },
                        pneumonia: {
                            dose: "50-100 mg/kg/dia",
                            doseMaxima: "4 g/dia",
                            frequencia: "A cada 6 horas",
                            duracao: "7-10 dias"
                        }
                    }
                }
            }
        };

        // Ceftriaxona
        MEDICAMENTOS.ceftriaxona = {
            nome: "Ceftriaxona",
            formas: {
                iv: {
                    descricao: "Pó para solução injetável 500mg, 1g",
                    tipo: "solucao",
                    passos: [
                        "Reconstituir com água estéril para injeção ou soro",
                        "Usar concentração máxima de 100 mg/mL",
                        "Infusão lenta em 30 minutos"
                    ],
                    precaucoes: [
                        "Incompatível com soluções contendo cálcio",
                        "Não usar em recém-nascidos hiperbilirrubinêmicos",
                        "Monitorar função renal e hepática"
                    ],
                    indicacoes: {
                        meningite: {
                            dose: "100 mg/kg/dia",
                            doseMaxima: "4 g/dia",
                            frequencia: "1-2 vezes ao dia",
                            duracao: "10-14 dias"
                        },
                        sepse: {
                            dose: "75-100 mg/kg/dia",
                            doseMaxima: "4 g/dia",
                            frequencia: "1-2 vezes ao dia",
                            duracao: "7-10 dias"
                        }
                    }
                },
                im: {
                    descricao: "Pó para solução injetável 250mg",
                    tipo: "solucao",
                    passos: [
                        "Reconstituir com lidocaína 1% para reduzir dor",
                        "Aplicar no quadrante superior externo do glúteo",
                        "Não exceder 1g por aplicação IM"
                    ],
                    precaucoes: [
                        "Doloroso na aplicação IM",
                        "Contraindicado em hiperbilirrubinemia neonatal",
                        "Pode precipitar com cálcio"
                    ],
                    indicacoes: {
                        pneumonia: {
                            dose: "50-75 mg/kg/dia",
                            doseMaxima: "2 g/dia",
                            frequencia: "1-2 vezes ao dia",
                            duracao: "5-7 dias"
                        }
                    }
                }
            }
        };

        console.log('Medicamentos ampicilina e ceftriaxona adicionados com sucesso!');
    } catch (error) {
        console.error('Erro ao adicionar medicamentos (parte 1):', error);
    }
}

// Executar automaticamente a adição de medicamentos quando o script for carregado
document.addEventListener('DOMContentLoaded', function() {
    adicionarNovosMedicamentos();
    console.log('Inicialização dos novos medicamentos concluída');
});
