/**
 * Script emergencial para correção direta da base de medicamentos
 * Este arquivo força a adição dos medicamentos antiepilépticos e outros medicamentos essenciais
 * Versão 3.0 - Refatoração para eliminar duplicações de código
 */

// Função auto-executável para isolar o código
(function() {
    console.log('=== CORREÇÃO EMERGENCIAL DE MEDICAMENTOS ===');
    
    // Verificar se utils está disponível ou carregar dinamicamente
    let utils = window.utils;
    if (!utils) {
        console.log('Utils não encontrado, tentando carregar dinamicamente...');
        // Tentativa de carregar utils.js se não estiver disponível
        const script = document.createElement('script');
        script.src = '/js/modules/medicamentos/utils.js';
        document.head.appendChild(script);
        
        // Esperar carregar antes de continuar
        setTimeout(function() {
            utils = window.utils || {};
            iniciarCorrecaoMedicamentos();
        }, 500);
    } else {
        iniciarCorrecaoMedicamentos();
    }
    
    // Função principal de inicialização
    function iniciarCorrecaoMedicamentos() {
        // Verificar e iniciar objetos necessários
        const MEDICAMENTOS = verificarMedicamentos();
        
        console.log('Iniciando adição emergencial de medicamentos...');
        adicionarMedicamentosEmergencial();
        atualizarContadores();
    }
    
    // Função simplificada para verificar e iniciar objeto MEDICAMENTOS
    function verificarMedicamentos() {
        if (utils && typeof utils.verificarObjetosGlobais === 'function') {
            return utils.verificarObjetosGlobais();
        } else {
            if (typeof window.MEDICAMENTOS === 'undefined' || Object.keys(window.MEDICAMENTOS).length === 0) {
                console.warn("Criando objeto MEDICAMENTOS que não existia ou estava vazio");
                window.MEDICAMENTOS = {};
            }
            
            // Verificar outros objetos necessários
            if (typeof window.INDICACOES === 'undefined') {
                console.warn("Criando objeto INDICACOES que não existia");
                window.INDICACOES = {};
            }
            
            if (typeof window.VIAS === 'undefined') {
                console.warn("Criando objeto VIAS que não existia");
                window.VIAS = {};
            }
            
            // Adicionar vias padrão se não existirem
            if (!window.VIAS.oral) window.VIAS.oral = "Via Oral";
            if (!window.VIAS.iv) window.VIAS.iv = "Intravenoso";
            
            return window.MEDICAMENTOS;
        }
    }
    
    // Função para atualizar contadores na interface
    function atualizarContadores() {
        if (utils && typeof utils.atualizarContadoresInterface === 'function') {
            utils.atualizarContadoresInterface();
        } else {
            try {
                const MEDICAMENTOS = verificarMedicamentos();
                const total = Object.keys(MEDICAMENTOS).length;
                console.log(`Total de medicamentos: ${total}`);
                
                // Atualizar elementos na interface
                const elementosContagem = document.querySelectorAll('.total-medicamentos, #total-medicamentos, [data-medicamentos-count]');
                elementosContagem.forEach(elem => {
                    if (elem) {
                        elem.textContent = total;
                    }
                });
                
                // Executar análise de medicamentos se disponível
                if (typeof window.analisarMedicamentos === 'function') {
                    const stats = window.analisarMedicamentos();
                    
                    if (typeof window.atualizarEstatisticasInterface === 'function') {
                        window.atualizarEstatisticasInterface(stats);
                    }
                    
                    // Avisar sobre a atualização
                    if (typeof window.ALERTA_SISTEMA !== 'undefined') {
                        window.ALERTA_SISTEMA.sucesso(`Base de medicamentos atualizada! Total: ${total} medicamentos.`, {
                            duracao: 8000,
                            fechavel: true
                        });
                    }
                }
            } catch (error) {
                console.error('Erro ao atualizar contagem:', error);
            }
        }
    }

    // Função genérica para adicionar medicamento
    function adicionarMedicamento(chave, definicao) {
        try {
            if (utils && typeof utils.adicionarMedicamento === 'function') {
                return utils.adicionarMedicamento(chave, definicao);
            } else {
                const MEDICAMENTOS = verificarMedicamentos();
                MEDICAMENTOS[chave] = definicao;
                console.log(`Medicamento ${definicao.nome} adicionado com sucesso`);
                return true;
            }
        } catch (error) {
            console.error(`Erro ao adicionar medicamento ${chave}:`, error);
            return false;
        }
    }

    // Função para adicionar azitromicina 
    function adicionarAzitromicina() {
        console.log('Adicionando azitromicina ao objeto MEDICAMENTOS...');
        
        try {
            // Definição do medicamento
            const azitromicina = {
                nome: "Azitromicina",
                formas: {
                    oral: {
                        descricao: "Suspensão oral 200mg/5mL",
                        tipo: "suspensao",
                        passos: [
                            "Agitar bem antes de usar",
                            "Administrar 1 hora antes ou 2 horas após as refeições",
                            "Administrar com seringa dosadora específica"
                        ],
                        precaucoes: [
                            "Risco de prolongamento do QT",
                            "Interação com antiácidos e ergotamínicos",
                            "Monitorar função hepática"
                        ],
                        indicacoes: {
                            pneumonia: {
                                dose: "10 mg/kg no dia 1, depois 5 mg/kg",
                                doseMaxima: "500 mg no dia 1, 250 mg depois",
                                frequencia: "1 vez ao dia",
                                duracao: "5 dias"
                            },
                            otite: {
                                dose: "10 mg/kg/dia",
                                doseMaxima: "500 mg/dia",
                                frequencia: "1 vez ao dia",
                                duracao: "3 dias"
                            },
                            sinusite: {
                                dose: "10 mg/kg/dia",
                                doseMaxima: "500 mg/dia",
                                frequencia: "1 vez ao dia",
                                duracao: "3 dias"
                            },
                            faringite: {
                                dose: "12 mg/kg/dia",
                                doseMaxima: "500 mg/dia",
                                frequencia: "1 vez ao dia",
                                duracao: "5 dias"
                            }
                        }
                    }
                }
            };
            
            adicionarMedicamento('azitromicina', azitromicina);
            
            // Adicionar indicacoes
            if (typeof window.INDICACOES !== 'undefined') {
                window.INDICACOES.pneumonia = "Pneumonia";
                window.INDICACOES.otite = "Otite Média Aguda";
                window.INDICACOES.sinusite = "Sinusite Aguda";
                window.INDICACOES.faringite = "Faringite Estreptocócica";
            }
            
            console.log('Azitromicina adicionada com sucesso!');
            return true;
        } catch (error) {
            console.error('Erro ao adicionar azitromicina:', error);
            return false;
        }
    }

    // Função principal para adicionar os medicamentos diretamente
    function adicionarMedicamentosEmergencial() {
        console.log('Iniciando adição emergencial de medicamentos...');
        let medicamentosAdicionados = 0;
        
        try {
            // === CARBAMAZEPINA ===
            adicionarMedicamento('carbamazepina', {
                nome: "Carbamazepina",
                formas: {
                    oral: {
                        descricao: "Comprimidos 200mg, 400mg; Suspensão oral 20mg/mL",
                        tipo: "comprimido",
                        passos: [
                            "Iniciar com doses baixas e aumentar gradualmente",
                            "Administrar com alimentos para reduzir irritação gástrica",
                            "Manter intervalo regular entre doses"
                        ],
                        precaucoes: [
                            "Monitorar níveis séricos periodicamente",
                            "Risco de reações cutâneas graves",
                            "Múltiplas interações medicamentosas",
                            "Monitorar hemograma e enzimas hepáticas"
                        ],
                        indicacoes: {
                            epilepsia: {
                                dose: "Inicial: 5-10 mg/kg/dia; Manutenção: 10-35 mg/kg/dia",
                                doseMaxima: "1200 mg/dia em crianças, 1600 mg/dia em adultos",
                                frequencia: "2-3 vezes ao dia",
                                duracao: "Tratamento contínuo, conforme necessário"
                            }
                        }
                    }
                }
            });
            
            // === VALPROATO ===
            adicionarMedicamento('valproato', {
                nome: "Valproato de Sódio",
                formas: {
                    oral: {
                        descricao: "Comprimidos 250mg, 500mg; Solução oral 50mg/mL",
                        tipo: "comprimido",
                        passos: [
                            "Iniciar com dose baixa e aumentar gradualmente",
                            "Administrar com alimentos para reduzir efeitos gastrointestinais",
                            "Monitorar função hepática"
                        ],
                        precaucoes: [
                            "Hepatotoxicidade grave, especialmente em crianças < 2 anos",
                            "Monitorar função hepática nos primeiros 6 meses de tratamento",
                            "Teratogenicidade - evitar em mulheres em idade fértil se possível",
                            "Monitorar contagem de plaquetas e coagulação"
                        ],
                        indicacoes: {
                            epilepsiaGeral: {
                                dose: "Inicial: 10-15 mg/kg/dia; Manutenção: 30-60 mg/kg/dia",
                                doseMaxima: "60 mg/kg/dia ou 3000 mg/dia",
                                frequencia: "2-3 vezes ao dia",
                                duracao: "Tratamento contínuo, conforme necessário"
                            }
                        }
                    }
                }
            });
            
            // === FENITOÍNA ===
            adicionarMedicamento('fenitoina', {
                nome: "Fenitoína",
                formas: {
                    oral: {
                        descricao: "Comprimidos 100mg; Suspensão oral 50mg/mL",
                        tipo: "comprimido",
                        passos: [
                            "Administrar durante ou após as refeições",
                            "Agitar bem a suspensão antes de usar",
                            "Manter intervalo regular entre doses"
                        ],
                        precaucoes: [
                            "Monitorar níveis séricos regularmente",
                            "Risco de hiperplasia gengival",
                            "Interações medicamentosas significativas",
                            "Administração com cuidado em idosos"
                        ],
                        indicacoes: {
                            epilepsia: {
                                dose: "4-8 mg/kg/dia",
                                doseMaxima: "300 mg/dia",
                                frequencia: "1-2 vezes ao dia",
                                duracao: "Tratamento contínuo, conforme necessário"
                            }
                        }
                    }
                }
            });
            
            // === OXCARBAZEPINA ===
            adicionarMedicamento('oxcarbazepina', {
                nome: "Oxcarbazepina",
                formas: {
                    oral: {
                        descricao: "Comprimidos 300mg, 600mg; Suspensão oral 60mg/mL",
                        tipo: "comprimido",
                        passos: [
                            "Administrar com alimentos",
                            "Iniciar com dose baixa e aumentar gradualmente",
                            "Usar seringa dosadora para suspensão oral"
                        ],
                        precaucoes: [
                            "Risco de hiponatremia - monitorar sódio sérico",
                            "Menor indução enzimática que carbamazepina",
                            "Reações cutâneas menos frequentes que carbamazepina",
                            "Risco de tontura e diplopia"
                        ],
                        indicacoes: {
                            epilepsiaMonoterapia: {
                                dose: "Semanas 1-2: 0,5 mg/kg/dia; Semanas 3-4: 1 mg/kg/dia; Manutenção: 5-15 mg/kg/dia",
                                doseMaxima: "200 mg/dia (crianças), 500 mg/dia (adultos)",
                                frequencia: "1-2 vezes ao dia",
                                duracao: "Tratamento contínuo, conforme necessário"
                            }
                        }
                    }
                }
            });
            
            // Chamar função específica para adicionar azitromicina
            adicionarAzitromicina();
            
            // Contar quantos medicamentos foram adicionados
            const medicamentosObj = verificarMedicamentos();
            medicamentosAdicionados = Object.keys(medicamentosObj).length;
            console.log(`Medicamentos disponíveis: ${medicamentosAdicionados}`);            
            return medicamentosAdicionados;
        } catch (error) {
            console.error('Erro ao adicionar medicamentos emergencialmente:', error);
            return 0;
        }
    }
})();
