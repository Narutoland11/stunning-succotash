/**
 * Medicamentos adicionais específicos para contexto africano/moçambicano - Parte 3
 * Complemento final de medicamentos relevantes para Moçambique e África
 */

function adicionarMedicamentosMocambique3() {
    if (typeof MEDICAMENTOS === 'undefined') {
        console.error('Erro: Objeto MEDICAMENTOS não definido.');
        return;
    }
    
    try {
        // Quinaxolinas (Primaquina) - Para malária
        MEDICAMENTOS.primaquina = {
            nome: "Primaquina",
            formas: {
                oral: {
                    descricao: "Comprimidos 15mg",
                    tipo: "comprimido",
                    passos: [
                        "Administrar com alimentos para reduzir desconforto gástrico",
                        "Verificar status G6PD antes de iniciar tratamento",
                        "Monitorar sintomas de hemólise"
                    ],
                    precaucoes: [
                        "Contraindicado em deficiência de G6PD",
                        "Evitar na gravidez",
                        "Pode causar hemólise em pacientes suscetíveis"
                    ],
                    indicacoes: {
                        malariaVivax: {
                            dose: "0,25-0,5 mg/kg/dia",
                            doseMaxima: "30mg/dia",
                            frequencia: "1 vez ao dia",
                            duracao: "14 dias"
                        },
                        malariaFalciparum: {
                            dose: "Dose única 0,25 mg/kg",
                            doseMaxima: "45mg dose única",
                            frequencia: "Dose única",
                            duracao: "1 dia"
                        }
                    }
                }
            }
        };

        // Tenofovir-Lamivudina-Dolutegravir (TLD) - Combinação ARV primeira linha
        MEDICAMENTOS.tld = {
            nome: "TLD (Tenofovir+Lamivudina+Dolutegravir)",
            formas: {
                oral: {
                    descricao: "Comprimidos 300mg+300mg+50mg",
                    tipo: "comprimido",
                    passos: [
                        "Pode ser administrado com ou sem alimentos",
                        "Tomar no mesmo horário todos os dias",
                        "Não pular doses"
                    ],
                    precaucoes: [
                        "Monitorar função renal (tenofovir)",
                        "Interação com antiácidos e suplementos de cálcio/ferro",
                        "Potencial aumento de peso como efeito colateral"
                    ],
                    indicacoes: {
                        hiv: {
                            dose: "Adultos e crianças >30kg: 1 comprimido",
                            doseMaxima: "1 comprimido/dia",
                            frequencia: "1 vez ao dia",
                            duracao: "Tratamento contínuo"
                        }
                    }
                }
            }
        };
        
        // Nota: Albendazol foi removido daqui pois já existe em novos_medicamentos2.js
        
        // Nota: Metronidazol foi removido daqui pois já existe em novos_medicamentos2.js

        // Cotrimoxazol (Sulfametoxazol+Trimetoprima) - Profilaxia em HIV
        MEDICAMENTOS.cotrimoxazol = {
            nome: "Cotrimoxazol (TMP-SMX)",
            formas: {
                oral: {
                    descricao: "Comprimidos 80mg+400mg, 160mg+800mg, Suspensão 8mg+40mg/mL",
                    tipo: "comprimido_suspensao",
                    passos: [
                        "Administrar com um copo cheio de água",
                        "Pode ser administrado com ou sem alimentos",
                        "Agitar bem a suspensão antes de usar"
                    ],
                    precaucoes: [
                        "Risco de reações cutâneas graves",
                        "Manter hidratação adequada",
                        "Monitorar hemograma em tratamentos prolongados"
                    ],
                    indicacoes: {
                        profilaxiaHIV: {
                            dose: "Crianças: 5 mg/kg/dia (TMP); Adultos: 160mg/800mg",
                            doseMaxima: "320mg/1600mg por dia",
                            frequencia: "1 vez ao dia",
                            duracao: "Contínuo conforme protocolo"
                        },
                        infecçõesTratoUrinário: {
                            dose: "Crianças: 8 mg/kg/dia (TMP); Adultos: 160mg/800mg",
                            doseMaxima: "320mg/1600mg por dia",
                            frequencia: "2 vezes ao dia",
                            duracao: "3-14 dias conforme infecção"
                        }
                    }
                }
            }
        };

        console.log('Medicamentos específicos para contexto africano/moçambicano - Parte 3 adicionados com sucesso!');
    } catch (error) {
        console.error('Erro ao adicionar medicamentos para Moçambique (3):', error);
    }
}

// Executar automaticamente a adição de medicamentos quando o script for carregado
document.addEventListener('DOMContentLoaded', function() {
    adicionarMedicamentosMocambique3();
});
