/**
 * Medicamentos antiepilépticos e anticonvulsivantes (Parte 1)
 * Inclui: carbamazepina, valproato, fenitoína
 */

// Garantir que o objeto MEDICAMENTOS exista
if (typeof MEDICAMENTOS === 'undefined') {
    console.error('Erro: MEDICAMENTOS não definido - criando objeto vazio');
    window.MEDICAMENTOS = {};
}

// Função para adicionar medicamentos antiepilépticos (parte 1)
function adicionarAntiepilepticosParte1() {
    console.log('Adicionando antiepilépticos parte 1 (carbamazepina, valproato, fenitoína)...');
    
    try {
        // Carbamazepina
        MEDICAMENTOS.carbamazepina = {
            nome: "Carbamazepina",
            formas: {
                oral: {
                    descricao: "Suspensão 20mg/mL, comprimidos 200mg, 400mg",
                    tipo: "suspensao",
                    passos: [
                        "Agitar bem a suspensão antes de usar",
                        "Administrar durante ou após as refeições",
                        "Medir com seringa oral para dosagem precisa"
                    ],
                    precaucoes: [
                        "Monitorar hemograma e função hepática",
                        "Ajustar dose gradualmente",
                        "Interações medicamentosas numerosas",
                        "Pode diminuir a eficácia de contraceptivos"
                    ],
                    indicacoes: {
                        epilepsia: {
                            dose: "10-20 mg/kg/dia inicialmente, aumentando gradualmente",
                            doseMaxima: "35 mg/kg/dia ou 1000 mg/dia em crianças",
                            frequencia: "2-3 vezes ao dia",
                            duracao: "Tratamento contínuo, conforme necessário"
                        },
                        convulsoesParciais: {
                            dose: "10-20 mg/kg/dia inicialmente, aumentando gradualmente",
                            doseMaxima: "35 mg/kg/dia ou 1000 mg/dia em crianças",
                            frequencia: "2-3 vezes ao dia",
                            duracao: "Tratamento contínuo, conforme necessário"
                        }
                    }
                }
            }
        };

        // Valproato de Sódio / Ácido Valpróico
        MEDICAMENTOS.valproato = {
            nome: "Valproato de Sódio / Ácido Valpróico",
            formas: {
                oral: {
                    descricao: "Xarope 50mg/mL, comprimidos 250mg, 500mg",
                    tipo: "solucao",
                    passos: [
                        "Administrar com alimentos para reduzir irritação GI",
                        "Comprimidos podem ser partidos, mas não mastigados",
                        "Não administrar com leite (reduz absorção)"
                    ],
                    precaucoes: [
                        "Monitorar função hepática",
                        "Risco de pancreatite",
                        "Evitar em insuficiência hepática",
                        "Teratogênico - contraindicado na gravidez"
                    ],
                    indicacoes: {
                        epilepsiaGeneralizada: {
                            dose: "15-30 mg/kg/dia inicialmente, aumentar gradualmente",
                            doseMaxima: "60 mg/kg/dia",
                            frequencia: "2-3 vezes ao dia",
                            duracao: "Tratamento contínuo, conforme necessário"
                        },
                        ausencias: {
                            dose: "15-30 mg/kg/dia inicialmente",
                            doseMaxima: "60 mg/kg/dia",
                            frequencia: "2-3 vezes ao dia",
                            duracao: "Tratamento contínuo, conforme necessário"
                        },
                        epilepsiaRefrataria: {
                            dose: "20-40 mg/kg/dia",
                            doseMaxima: "60 mg/kg/dia",
                            frequencia: "3-4 vezes ao dia",
                            duracao: "Tratamento contínuo, conforme necessário"
                        }
                    }
                }
            }
        };

        // Fenitoína
        MEDICAMENTOS.fenitoina = {
            nome: "Fenitoína",
            formas: {
                oral: {
                    descricao: "Suspensão 50mg/mL, comprimidos 100mg",
                    tipo: "suspensao",
                    passos: [
                        "Agitar bem a suspensão antes de administrar",
                        "Administrar com alimentos se causar desconforto gástrico",
                        "Manter horários regulares de administração"
                    ],
                    precaucoes: [
                        "Monitorar níveis séricos",
                        "Pode causar hiperplasia gengival",
                        "Indução enzimática - múltiplas interações",
                        "Administração IV requer extremo cuidado (risco de arritmias)"
                    ],
                    indicacoes: {
                        epilepsia: {
                            dose: "5-8 mg/kg/dia (dose de manutenção)",
                            doseMaxima: "300 mg/dia em crianças",
                            frequencia: "2 vezes ao dia",
                            duracao: "Tratamento contínuo, conforme necessário"
                        },
                        statusEpilepticus: {
                            dose: "15-20 mg/kg dose de carga (IV)",
                            doseMaxima: "1000 mg dose única",
                            frequencia: "Dose única, seguida de manutenção após 24h",
                            duracao: "Conforme necessário"
                        }
                    }
                },
                iv: {
                    descricao: "Solução injetável 50mg/mL",
                    tipo: "solucao",
                    passos: [
                        "Diluir em solução salina",
                        "Administrar lentamente (≤50 mg/min)",
                        "Monitorar ECG e sinais vitais durante administração"
                    ],
                    precaucoes: [
                        "Risco de hipotensão e arritmias na administração IV rápida",
                        "Incompatível com soluções glicosadas",
                        "Não administrar IM (cristalização e absorção errática)"
                    ],
                    indicacoes: {
                        statusEpilepticus: {
                            dose: "15-20 mg/kg dose de carga",
                            doseMaxima: "1000 mg dose única",
                            frequencia: "Infusão lenta (≤50 mg/min)",
                            duracao: "Dose única, seguida de manutenção"
                        }
                    }
                }
            }
        };

        console.log('Antiepiléticos parte 1 adicionados com sucesso!');
    } catch (error) {
        console.error('Erro ao adicionar antiepiléticos (parte 1):', error);
    }
}

// Executar a adição de medicamentos imediatamente
adicionarAntiepilepticosParte1();
console.log('Inicialização dos antiepiléticos parte 1 concluída');
