// ==================== CONFIGURAÇÕES GERAIS ====================
const INDICACOES = {
    pneumonia: "Pneumonia",
    meningite: "Meningite",
    sepse: "Sepse",
    malaria: "Malária",
    febre: "Febre",
    dor: "Dor",
    otite: "Otite Média",
    diarreia: "Diarreia Aguda",
    desidratacao: "Desidratação",
    hiponatremia: "Hiponatremia",
    hipernatremia: "Hipernatremia",
    hipocalemia: "Hipocalemia",
    hipercalemia: "Hipercalemia",
    hipocalcemia: "Hipocalcemia",
    acidose: "Acidose Metabólica",
    alcalose: "Alcalose Metabólica",
    malariaGrave: "Malária Grave",
    profilaxiaMalaria: "Profilaxia de Malária",
    doencaChagas: "Doença de Chagas",
    hiv: "HIV",
    hepatiteB: "Hepatite B",
    tuberculose: "Tuberculose",
    profilaxiaTb: "Profilaxia de TB",
    disenteriaAmebiana: "Disenteria Amebiana",
    giardíase: "Giardíase",
    infeccaoAnaerobia: "Infecção Anaeróbia",
    ascaridíase: "Ascaridíase",
    teníase: "Teníase",
    oxiuríase: "Oxiuríase",
    esquistossomose: "Esquistossomose",
    oncocercose: "Oncocercose",
    estrongiloidíase: "Estrongiloidíase",
    artrite: "Artrite",
    tracoma: "Tracoma",
   
    anafilaxia: "Anafilaxia",
    paradaCardiaca: "Parada cardíaca",
    choqueAnafilatico: "Choque anafilático",
    laringite: "Laringite",
    herpesZoster: "Herpes zoster",
    herpesNeonatal: "Herpes neonatal",
    encefaliteHerpetica: "Encefalite herpética",
    bradicardia: "Bradicardia",
    intoxicacaoOrganofosforados: "Intoxicação por organofosforados",
    preAnestesia: "Pré-anestesia",
    hipoglicemia: "Hipoglicemia",
    coqueluche: "Coqueluche",
    infeccaoGrave: "Infecção grave",
    febreTifoide: "Febre tifoide",
    hipertensao: "Hipertensão",
    edemaAgudoPulmonar: "Edema agudo de pulmão",
    insuficienciaRenal: "Insuficiência renal",
    ascite: "Ascite",
    ansiedade: "Ansiedade",
    sedacao: "Sedação",
    broncoespasmo: "Broncoespasmo",
    sibilancia: "Sibilância",
    asma: "Asma",
    escabiose: "Escabiose",
    pediculose: "Pediculose",
    infeccaoUrinaria: "Infecção urinária",
    alergia: "Alergia",
    riniteAlergica: "Rinite alérgica",
    anestesiaLocal: "Anestesia local",
    diarreiaAguda: "Diarreia aguda",
    infeccaoCutanea: "Infecção cutânea",
    candidiase: "Candidíase",
    candidiaseOral: "Candidíase oral",
    candidiaseDermatologica: "Candidíase dermatológica",
    inducaoTrabalhoParto: "Indução do trabalho de parto",
    infeccaoEstreptococica: "Infecção estreptocócica",
    anemia: "Anemia",
    deficienciaFerro: "Deficiência de ferro",
    deficienciaAcidoFolico: "Deficiência de ácido fólico",
    deficienciaVitaminaA: "Deficiência de vitamina A",
    deficienciaVitaminaE: "Deficiência de vitamina E"
};

const VIAS = {
    sublingual: "Sublingual",
    oftalmica: "Oftálmica",
    auricular: "Auricular",
    oral: "Oral",
    iv: "Intravenosa (IV)",
    im: "Intramuscular (IM)",
    sc: "Subcutânea (SC)",
    retal: "Retal",
    nebulizacao: "Nebulização",
    ev: "Endovenosa (EV)",
    intranasal: "Intranasal",
    topica: "Tópica",
    vaginal: "Vaginal"
};

const FORMULAS = {
    deficitSodio: (peso, sodioAtual, sodioDesejado) => peso * 0.6 * (sodioDesejado - sodioAtual),
    correcaoPotassio: (peso, potassioAtual, potassioDesejado) => peso * 0.3 * (potassioDesejado - potassioAtual),
    correcaoCalcio: (peso, calcioAtual, calcioDesejado) => peso * 0.2 * (calcioDesejado - calcioAtual),
    aguaTotalCorporal: (peso) => peso * 0.6,
    anionGap: (na, cl, hco3) => na - (cl + hco3),
    excessoBase: (hco3) => hco3 - 24
};

// ==================== BANCO DE DADOS DE MEDICAMENTOS ====================
const MEDICAMENTOS = {
    artemeterLumefantrina: {
        nome: "Artemeter + Lumefantrina",
        formas: {
            oral: {
                descricao: "Comprimidos 20mg/120mg",
                tipo: "comprimido",
                passos: [
                    "Administrar com alimentos ricos em gordura",
                    "Dose inicial, depois em 8, 24, 36, 48 e 60 horas"
                ],
                precaucoes: [
                    "Não usar no primeiro trimestre de gravidez",
                    "Monitorar resposta ao tratamento"
                ],
                indicacoes: {
                    malaria: {
                        dose: "1,5-3 mg/kg (artemeter) por dose",
                        doseMaxima: "6 comprimidos/dia",
                        frequencia: "Dose inicial, depois em 8, 24, 36, 48 e 60 horas",
                        duracao: "3 dias"
                    }
                }
            }
        }
    },
    ibuprofeno: {
        nome: "Ibuprofeno",
        formas: {
            oral: {
                descricao: "Suspensão oral 100mg/5mL",
                tipo: "suspensao",
                concentracao: "100mg/5mL",
                passos: [
                    "Agitar bem antes de usar",
                    "Medir com seringa dosadora",
                    "Administrar com alimentos"
                ],
                precaucoes: [
                    "Contraindicado em <6 meses",
                    "Não exceder 40 mg/kg/dia",
                    "Monitorar função renal"
                ],
                indicacoes: {
                    febre: {
                        dose: "5-10 mg/kg/dose",
                        doseMaxima: "400 mg/dose",
                        frequencia: "A cada 6-8 horas",
                        duracao: "Até 3 dias"
                    },
                    dor: {
                        dose: "5-10 mg/kg/dose",
                        doseMaxima: "40 mg/kg/dia",
                        frequencia: "A cada 6-8 horas",
                        duracao: "Até 5 dias"
                    }
                }
            }
        }
    },

    // Aspirina
    aspirina: {
        nome: "Aspirina (Ácido Acetilsalicílico)",
        formas: {
            oral: {
                descricao: "Comprimidos 100mg, 500mg",
                tipo: "comprimido",
                passos: [
                    "Administrar com alimentos",
                    "Pode ser dissolvida em água"
                ],
                precaucoes: [
                    "Contraindicada em <12 anos (Reye)",
                    "Evitar em dengue",
                    "Monitorar sangramentos"
                ],
                calculoDose: function(peso, indicacao) {
                    if (indicacao === 'kawasaki') {
                        const doseDiaria = Math.min(80 * peso, 4000);
                        return {
                            dose: `${doseDiaria} mg/dia`,
                            detalhes: "Dividir em 4 doses",
                            forma: "Comprimido de 100mg"
                        };
                    }
                    return null; // Retorna null para usar cálculo padrão
                },
                indicacoes: {
                    kawasaki: {
                        dose: "80-100 mg/kg/dia",
                        doseMaxima: "4000 mg/dia",
                        frequencia: "4 vezes ao dia",
                        duracao: "14 dias"
                    }
                }
            }
        }
    },

    // Adrenalina (Epinefrina)
    adrenalina: {
        nome: "Adrenalina (Epinefrina)",
        formas: {
            im: {
                descricao: "Solução injetável 1mg/mL (1:1000)",
                tipo: "solucao",
                concentracao: "1mg/mL",
                passos: [
                    "Aspirar dose correta",
                    "Administrar IM na coxa lateral"
                ],
                precaucoes: [
                    "Monitorar frequência cardíaca",
                    "Não administrar IV nesta concentração"
                ],
                calculoDose: function(peso) {
                    const doseMg = Math.min(0.01 * peso, 0.5);
                    const volume = doseMg; // 1mg/mL
                    return {
                        dose: `${doseMg.toFixed(2)} mg (${volume.toFixed(2)} mL)`,
                        detalhes: "Repetir em 5-15 min se necessário"
                    };
                },
                indicacoes: {
                    anafilaxia: {
                        dose: "0,01 mg/kg",
                        doseMaxima: "0,5 mg",
                        frequencia: "Repetir em 5-15 min",
                        duracao: "Até resolução"
                    }
                }
            }
        }
    },

    // Omeprazol
    omeprazol: {
        nome: "Omeprazol",
        formas: {
            oral: {
                descricao: "Cápsulas 10mg, 20mg",
                tipo: "capsula",
                passos: [
                    "Administrar em jejum 30 min antes do café",
                    "Pode abrir cápsula e misturar com suco ácido"
                ],
                precaucoes: [
                    "Monitorar magnésio em uso prolongado"
                ],
                calculoDose: function(peso, indicacao) {
                    let doseDiaria;
                    if (indicacao === 'refluxo') {
                        doseDiaria = Math.min(1 * peso, 20);
                    } else {
                        doseDiaria = Math.min(2 * peso, 40);
                    }
                    
                    // Arredonda para a cápsula disponível mais próxima
                    const doseAjustada = doseDiaria <= 20 ? 20 : 40;
                    return {
                        dose: `${doseAjustada} mg/dia`,
                        detalhes: doseDiaria <= 20 ? "1 cápsula de 20mg" : "2 cápsulas de 20mg"
                    };
                },
                indicacoes: {
                    refluxo: {
                        dose: "1 mg/kg/dia",
                        doseMaxima: "20 mg/dia",
                        frequencia: "1 vez ao dia",
                        duracao: "4-8 semanas"
                    },
                    ulcera: {
                        dose: "2 mg/kg/dia",
                        doseMaxima: "40 mg/dia",
                        frequencia: "1 vez ao dia",
                        duracao: "4-8 semanas"
                    }
                }
            }
        }
    },

    // Furosemida
    furosemida: {
        nome: "Furosemida",
        formas: {
            oral: {
                descricao: "Solução oral 10mg/mL",
                tipo: "solucao",
                concentracao: "10mg/mL",
                passos: [
                    "Agitar antes de usar",
                    "Medir com seringa dosadora"
                ],
                precaucoes: [
                    "Monitorar potássio e sódio",
                    "Avaliar hidratação"
                ],
                indicacoes: {
                    edema: {
                        dose: "1-2 mg/kg/dose",
                        doseMaxima: "40 mg/dose",
                        frequencia: "1-2 vezes ao dia",
                        duracao: "Conforme necessidade"
                    }
                }
            },
            iv: {
                descricao: "Solução injetável 10mg/mL",
                tipo: "solucao",
                concentracao: "10mg/mL",
                passos: [
                    "Administrar em bolus lento (1-2 min)"
                ],
                precaucoes: [
                    "Monitorar diurese",
                    "Evitar em anúria"
                ],
                calculoDose: function(peso) {
                    const doseMg = Math.min(1 * peso, 40);
                    const volume = doseMg / 10; // 10mg/mL
                    return {
                        dose: `${doseMg} mg (${volume.toFixed(1)} mL)`,
                        detalhes: "Repetir em 6-8h se necessário"
                    };
                },
                indicacoes: {
                    edemaAgudoPulmonar: {
                        dose: "1 mg/kg/dose",
                        doseMaxima: "40 mg/dose",
                        frequencia: "Repetir em 6-8h",
                        duracao: "Até melhora"
                    }
                }
            }
        }
    },

    // Amoxicilina
    amoxicilina: {
        nome: "Amoxicilina",
        formas: {
            oral: {
                descricao: "Suspensão oral 250mg/5mL",
                tipo: "suspensao",
                concentracao: "250mg/5mL",
                passos: [
                    "Agitar bem antes de usar",
                    "Medir com seringa dosadora",
                    "Administrar com ou sem alimentos"
                ],
                precaucoes: [
                    "Verificar histórico de alergia a penicilinas",
                    "Ajustar dose em insuficiência renal"
                ],
                calculoDose: function(peso, indicacao) {
                    let doseDiaria;
                    if (indicacao === 'pneumonia') {
                        doseDiaria = Math.min(50 * peso, 1500);
                    } else {
                        doseDiaria = Math.min(40 * peso, 1000);
                    }
                    const doseUnica = doseDiaria / 3;
                    const volume = (doseUnica * 5) / 250; // 250mg/5mL
                    return {
                        dose: `${doseUnica.toFixed(0)} mg (${volume.toFixed(1)} mL) por dose`,
                        detalhes: "Administrar 3 vezes ao dia"
                    };
                },
                indicacoes: {
                    pneumonia: {
                        dose: "50 mg/kg/dia",
                        doseMaxima: "1500 mg/dia",
                        frequencia: "8/8 horas",
                        duracao: "7-10 dias"
                    },
                    otite: {
                        dose: "40 mg/kg/dia",
                        doseMaxima: "1000 mg/dia",
                        frequencia: "8/8 horas",
                        duracao: "7-10 dias"
                    }
                }
            }
        }
    },

    // Azitromicina
    azitromicina: {
        nome: "Azitromicina",
        formas: {
            oral: {
                descricao: "Suspensão oral 200mg/5mL",
                tipo: "suspensao",
                concentracao: "200mg/5mL",
                passos: [
                    "Agitar bem antes de usar",
                    "Administrar 1 hora antes ou 2 horas após refeições"
                ],
                precaucoes: [
                    "Monitorar função hepática",
                    "Evitar em pacientes com arritmias"
                ],
                calculoDose: function(peso) {
                    const doseDia1 = Math.min(10 * peso, 500);
                    const doseManutencao = Math.min(5 * peso, 250);
                    const volumeDia1 = (doseDia1 * 5) / 200; // 200mg/5mL
                    const volumeManutencao = (doseManutencao * 5) / 200;
                    return {
                        dose: `Dia 1: ${doseDia1.toFixed(0)} mg (${volumeDia1.toFixed(1)} mL)\nDias 2-5: ${doseManutencao.toFixed(0)} mg (${volumeManutencao.toFixed(1)} mL)`,
                        detalhes: "Administrar 1 vez ao dia"
                    };
                },
                indicacoes: {
                    pneumonia: {
                        dose: "10 mg/kg no dia 1, depois 5 mg/kg/dia",
                        doseMaxima: "500 mg no dia 1, depois 250 mg/dia",
                        frequencia: "1 vez ao dia",
                        duracao: "5 dias"
                    },
                    otite: {
                        dose: "10 mg/kg no dia 1, depois 5 mg/kg/dia",
                        doseMaxima: "500 mg no dia 1, depois 250 mg/dia",
                        frequencia: "1 vez ao dia",
                        duracao: "3 dias"
                    }
                }
            }
        }
    },

    // Prednisolona
    prednisolona: {
        nome: "Prednisolona",
        formas: {
            oral: {
                descricao: "Solução oral 3mg/mL",
                tipo: "solucao",
                concentracao: "3mg/mL",
                passos: [
                    "Agitar antes de usar",
                    "Administrar com alimentos",
                    "Não interromper abruptamente"
                ],
                precaucoes: [
                    "Monitorar glicemia",
                    "Risco de imunossupressão",
                    "Evitar vacinas vivas durante tratamento"
                ],
                calculoDose: function(peso, indicacao) {
                    let doseDiaria;
                    if (indicacao === 'asma') {
                        doseDiaria = Math.min(1 * peso, 40);
                    } else {
                        doseDiaria = Math.min(2 * peso, 60);
                    }
                    const volume = doseDiaria / 3; // 3mg/mL
                    return {
                        dose: `${doseDiaria.toFixed(0)} mg/dia (${volume.toFixed(1)} mL)`,
                        detalhes: "Administrar pela manhã"
                    };
                },
                indicacoes: {
                    asma: {
                        dose: "1-2 mg/kg/dia",
                        doseMaxima: "40 mg/dia",
                        frequencia: "1 vez ao dia",
                        duracao: "3-5 dias"
                    },
                    alergia: {
                        dose: "1-2 mg/kg/dia",
                        doseMaxima: "60 mg/dia",
                        frequencia: "1 vez ao dia",
                        duracao: "3-7 dias"
                    }
                }
            }
        }
    },
    
    // Ambroxol
    ambroxol: {
        nome: "Ambroxol",
        formas: {
            oral: {
                descricao: "Xarope 15mg/5mL",
                tipo: "solucao",
                concentracao: "15mg/5mL",
                passos: [
                    "Agitar antes de usar",
                    "Medir com seringa dosadora",
                    "Administrar após as refeições"
                ],
                precaucoes: [
                    "Usar com cautela em pacientes com úlcera gástrica",
                    "Pode causar náuseas"
                ],
                calculoDose: function(peso) {
                    const doseDiaria = Math.min(1.2 * peso, 60);
                    const doseUnica = doseDiaria / 2;
                    const volume = (doseUnica * 5) / 15; // 15mg/5mL
                    return {
                        dose: `${doseUnica.toFixed(1)} mg (${volume.toFixed(1)} mL) por dose`,
                        detalhes: "Administrar 2 vezes ao dia"
                    };
                },
                indicacoes: {
                    bronquite: {
                        dose: "1-1.2 mg/kg/dose",
                        doseMaxima: "60 mg/dia",
                        frequencia: "12/12 horas",
                        duracao: "7-10 dias"
                    }
                }
            }
        }
    },
    
    // Cefalexina
    cefalexina: {
        nome: "Cefalexina",
        formas: {
            oral: {
                descricao: "Suspensão oral 250mg/5mL",
                tipo: "suspensao",
                concentracao: "250mg/5mL",
                passos: [
                    "Agitar bem antes de usar",
                    "Medir com seringa dosadora",
                    "Armazenar na geladeira após reconstituição"
                ],
                precaucoes: [
                    "Verificar histórico de alergia a cefalosporinas",
                    "Ajustar dose em insuficiência renal"
                ],
                calculoDose: function(peso, indicacao) {
                    let doseDiaria;
                    if (indicacao === 'infeccaoCutanea') {
                        doseDiaria = Math.min(50 * peso, 2000);
                    } else {
                        doseDiaria = Math.min(40 * peso, 1500);
                    }
                    const doseUnica = doseDiaria / 4;
                    const volume = (doseUnica * 5) / 250; // 250mg/5mL
                    return {
                        dose: `${doseUnica.toFixed(0)} mg (${volume.toFixed(1)} mL) por dose`,
                        detalhes: "Administrar 4 vezes ao dia"
                    };
                },
                indicacoes: {
                    infeccaoCutanea: {
                        dose: "50 mg/kg/dia",
                        doseMaxima: "2000 mg/dia",
                        frequencia: "6/6 horas",
                        duracao: "7-10 dias"
                    },
                    infeccaoUrinaria: {
                        dose: "40 mg/kg/dia",
                        doseMaxima: "1500 mg/dia",
                        frequencia: "6/6 horas",
                        duracao: "7-14 dias"
                    }
                }
            }
        }
    },
    
    // Dexametasona
    dexametasona: {
        nome: "Dexametasona",
        formas: {
            oral: {
                descricao: "Elixir 0,1mg/mL",
                tipo: "solucao",
                concentracao: "0,1mg/mL",
                passos: [
                    "Agitar antes de usar",
                    "Administrar com alimentos",
                    "Não interromper abruptamente"
                ],
                precaucoes: [
                    "Monitorar glicemia",
                    "Risco de imunossupressão",
                    "Evitar vacinas vivas durante tratamento"
                ],
                calculoDose: function(peso, indicacao) {
                    let doseDiaria;
                    if (indicacao === 'laringite') {
                        doseDiaria = Math.min(0.6 * peso, 16);
                    } else {
                        doseDiaria = Math.min(0.3 * peso, 8);
                    }
                    const volume = doseDiaria / 0.1; // 0,1mg/mL
                    return {
                        dose: `${doseDiaria.toFixed(1)} mg/dia (${volume.toFixed(1)} mL)`,
                        detalhes: "Administrar em dose única ou dividida em 2 doses"
                    };
                },
                indicacoes: {
                    laringite: {
                        dose: "0.6 mg/kg/dia",
                        doseMaxima: "16 mg/dia",
                        frequencia: "1-2 vezes ao dia",
                        duracao: "3-5 dias"
                    },
                    riniteAlergica: {
                        dose: "0.3 mg/kg/dia",
                        doseMaxima: "8 mg/dia",
                        frequencia: "1-2 vezes ao dia",
                        duracao: "3-7 dias"
                    }
                }
            }
        }
    },
    
    // Dipirona
    dipirona: {
        nome: "Dipirona",
        formas: {
            oral: {
                descricao: "Solução oral 500mg/mL",
                tipo: "solucao",
                concentracao: "500mg/mL",
                passos: [
                    "Diluir em água antes de administrar",
                    "Medir com conta-gotas"
                ],
                precaucoes: [
                    "Contraindicado em <3 meses",
                    "Risco de agranulocitose",
                    "Monitorar sinais de reação alérgica"
                ],
                calculoDose: function(peso) {
                    const doseMg = Math.min(15 * peso, 500);
                    const volumeGotas = doseMg / 25; // 1 gota = 25mg
                    return {
                        dose: `${doseMg.toFixed(0)} mg (${Math.round(volumeGotas)} gotas) por dose`,
                        detalhes: "Repetir a cada 6 horas se necessário"
                    };
                },
                indicacoes: {
                    febre: {
                        dose: "10-15 mg/kg/dose",
                        doseMaxima: "500 mg/dose",
                        frequencia: "A cada 6 horas",
                        duracao: "Até 3 dias"
                    },
                    dor: {
                        dose: "10-15 mg/kg/dose",
                        doseMaxima: "500 mg/dose",
                        frequencia: "A cada 6 horas",
                        duracao: "Até 5 dias"
                    }
                }
            }
        }
    },
    
    // Loratadina
    loratadina: {
        nome: "Loratadina",
        formas: {
            oral: {
                descricao: "Xarope 1mg/mL",
                tipo: "solucao",
                concentracao: "1mg/mL",
                passos: [
                    "Agitar antes de usar",
                    "Medir com seringa dosadora",
                    "Pode ser administrado com ou sem alimentos"
                ],
                precaucoes: [
                    "Ajustar dose em insuficiência hepática",
                    "Pode causar sonolência"
                ],
                calculoDose: function(peso) {
                    let dose;
                    if (peso <= 30) {
                        dose = 5;
                    } else {
                        dose = 10;
                    }
                    const volume = dose / 1; // 1mg/mL
                    return {
                        dose: `${dose.toFixed(0)} mg (${volume.toFixed(0)} mL) por dia`,
                        detalhes: "Administrar em dose única diária"
                    };
                },
                indicacoes: {
                    riniteAlergica: {
                        dose: "5 mg/dia (<30kg) ou 10 mg/dia (>30kg)",
                        doseMaxima: "10 mg/dia",
                        frequencia: "1 vez ao dia",
                        duracao: "7-14 dias"
                    },
                    alergia: {
                        dose: "5 mg/dia (<30kg) ou 10 mg/dia (>30kg)",
                        doseMaxima: "10 mg/dia",
                        frequencia: "1 vez ao dia",
                        duracao: "7-14 dias"
                    }
                }
            }
        }
    },
    
    // Metronidazol
    metronidazol: {
        nome: "Metronidazol",
        formas: {
            oral: {
                descricao: "Suspensão oral 40mg/mL",
                tipo: "suspensao",
                concentracao: "40mg/mL",
                passos: [
                    "Agitar bem antes de usar",
                    "Medir com seringa dosadora",
                    "Administrar com alimentos"
                ],
                precaucoes: [
                    "Evitar bebidas alcoólicas",
                    "Pode escurecer a urina",
                    "Monitorar efeitos neurológicos"
                ],
                calculoDose: function(peso, indicacao) {
                    let doseDiaria;
                    if (indicacao === 'giardíase') {
                        doseDiaria = Math.min(15 * peso, 750);
                    } else {
                        doseDiaria = Math.min(30 * peso, 1500);
                    }
                    const doseUnica = doseDiaria / 3;
                    const volume = doseUnica / 40; // 40mg/mL
                    return {
                        dose: `${doseUnica.toFixed(0)} mg (${volume.toFixed(1)} mL) por dose`,
                        detalhes: "Administrar 3 vezes ao dia"
                    };
                },
                indicacoes: {
                    giardíase: {
                        dose: "15 mg/kg/dia",
                        doseMaxima: "750 mg/dia",
                        frequencia: "8/8 horas",
                        duracao: "5-7 dias"
                    },
                    disenteriaAmebiana: {
                        dose: "30 mg/kg/dia",
                        doseMaxima: "1500 mg/dia",
                        frequencia: "8/8 horas",
                        duracao: "7-10 dias"
                    }
                }
            }
        }
    },
    
    // Nistatina
    nistatina: {
        nome: "Nistatina",
        formas: {
            oral: {
                descricao: "Suspensão oral 100.000 UI/mL",
                tipo: "suspensao",
                concentracao: "100.000 UI/mL",
                passos: [
                    "Agitar bem antes de usar",
                    "Aplicar com conta-gotas ou cotonete",
                    "Manter na boca o maior tempo possível antes de engolir"
                ],
                precaucoes: [
                    "Continuar tratamento por 48h após desaparecimento dos sintomas",
                    "Verificar interações medicamentosas"
                ],
                calculoDose: function() {
                    return {
                        dose: "100.000 UI (1 mL) por aplicação",
                        detalhes: "Aplicar em cada lado da boca 4 vezes ao dia"
                    };
                },
                indicacoes: {
                    candidiaseOral: {
                        dose: "100.000 UI por aplicação",
                        doseMaxima: "400.000 UI/dia",
                        frequencia: "4 vezes ao dia",
                        duracao: "7-14 dias"
                    }
                }
            },
            topica: {
                descricao: "Creme 25.000 UI/g",
                tipo: "creme",
                passos: [
                    "Limpar a área afetada antes da aplicação",
                    "Aplicar fina camada do creme",
                    "Massagear suavemente"
                ],
                precaucoes: [
                    "Evitar contato com os olhos",
                    "Interromper uso se ocorrer irritação"
                ],
                indicacoes: {
                    candidiaseDermatologica: {
                        dose: "Aplicação tópica",
                        doseMaxima: "3 aplicações/dia",
                        frequencia: "2-3 vezes ao dia",
                        duracao: "7-14 dias"
                    }
                }
            }
        }
    },
    
    // Paracetamol
    paracetamol: {
        nome: "Paracetamol",
        formas: {
            oral: {
                descricao: "Solução oral 200mg/mL",
                tipo: "solucao",
                concentracao: "200mg/mL",
                passos: [
                    "Agitar antes de usar",
                    "Medir com seringa dosadora",
                    "Pode ser administrado com ou sem alimentos"
                ],
                precaucoes: [
                    "Não exceder dose máxima diária",
                    "Monitorar função hepática em uso prolongado",
                    "Evitar uso com outros medicamentos contendo paracetamol"
                ],
                calculoDose: function(peso) {
                    const doseMg = Math.min(15 * peso, 750);
                    const volume = doseMg / 200; // 200mg/mL
                    return {
                        dose: `${doseMg.toFixed(0)} mg (${volume.toFixed(2)} mL) por dose`,
                        detalhes: "Repetir a cada 6 horas se necessário"
                    };
                },
                indicacoes: {
                    febre: {
                        dose: "10-15 mg/kg/dose",
                        doseMaxima: "750 mg/dose",
                        frequencia: "A cada 6 horas",
                        duracao: "Até 5 dias"
                    },
                    dor: {
                        dose: "10-15 mg/kg/dose",
                        doseMaxima: "750 mg/dose",
                        frequencia: "A cada 6 horas",
                        duracao: "Até 5 dias"
                    }
                }
            }
        }
    },
    
    // Permetrina
    permetrina: {
        nome: "Permetrina",
        formas: {
            topica: {
                descricao: "Loção 1% e 5%",
                tipo: "locao",
                passos: [
                    "Aplicar em toda a superfície corporal, do pescoço para baixo",
                    "Deixar agir por 8-12 horas",
                    "Enxaguar completamente após o período de ação"
                ],
                precaucoes: [
                    "Evitar contato com olhos e mucosas",
                    "Não usar em crianças menores de 2 meses",
                    "Pode causar irritação cutânea"
                ],
                calculoDose: function() {
                    return {
                        dose: "Aplicação tópica de loção 1% (pediculose) ou 5% (escabiose)",
                        detalhes: "Aplicar em toda a superfície corporal afetada"
                    };
                },
                indicacoes: {
                    escabiose: {
                        dose: "Aplicação tópica de loção 5%",
                        doseMaxima: "1 aplicação",
                        frequencia: "Dose única, repetir após 7 dias se necessário",
                        duracao: "Aplicação única"
                    },
                    pediculose: {
                        dose: "Aplicação tópica de loção 1%",
                        doseMaxima: "1 aplicação",
                        frequencia: "Dose única, repetir após 7 dias se necessário",
                        duracao: "Aplicação única"
                    }
                }
            }
        }
    },
    
    // Sulfametoxazol + Trimetoprima
    sulfametoxazolTrimetoprima: {
        nome: "Sulfametoxazol + Trimetoprima",
        formas: {
            oral: {
                descricao: "Suspensão oral 200mg+40mg/5mL",
                tipo: "suspensao",
                concentracao: "200mg+40mg/5mL",
                passos: [
                    "Agitar bem antes de usar",
                    "Medir com seringa dosadora",
                    "Administrar com bastante água"
                ],
                precaucoes: [
                    "Contraindicado em <2 meses",
                    "Monitorar função renal e hepática",
                    "Risco de reações cutâneas graves",
                    "Manter hidratação adequada"
                ],
                calculoDose: function(peso, indicacao) {
                    let doseDiaria;
                    if (indicacao === 'infeccaoUrinaria') {
                        doseDiaria = Math.min(40 * peso, 1600); // Dose baseada no componente SMX
                    } else {
                        doseDiaria = Math.min(50 * peso, 2000); // Dose baseada no componente SMX
                    }
                    const doseUnica = doseDiaria / 2;
                    const volume = (doseUnica * 5) / 200; // 200mg/5mL (SMX)
                    return {
                        dose: `${doseUnica.toFixed(0)} mg SMX (${volume.toFixed(1)} mL) por dose`,
                        detalhes: "Administrar 2 vezes ao dia"
                    };
                },
                indicacoes: {
                    infeccaoUrinaria: {
                        dose: "40 mg/kg/dia SMX",
                        doseMaxima: "1600 mg SMX/dia",
                        frequencia: "12/12 horas",
                        duracao: "7-10 dias"
                    },
                    pneumonia: {
                        dose: "50 mg/kg/dia SMX",
                        doseMaxima: "2000 mg SMX/dia",
                        frequencia: "12/12 horas",
                        duracao: "7-14 dias"
                    }
                }
            }
        }
    },

    // Salbutamol
    salbutamol: {
        nome: "Salbutamol",
        formas: {
            nebulizacao: {
                descricao: "Solução para nebulização 5mg/mL",
                tipo: "solucao",
                concentracao: "5mg/mL",
                passos: [
                    "Diluir em soro fisiológico",
                    "Usar máscara ou bocal",
                    "Nebulizar por 5-10 minutos"
                ],
                precaucoes: [
                    "Monitorar frequência cardíaca",
                    "Observar tremores",
                    "Risco de hipocalemia"
                ],
                calculoDose: function(peso) {
                    const doseMg = Math.min(0.15 * peso, 5);
                    const volume = doseMg / 5; // 5mg/mL
                    return {
                        dose: `${doseMg.toFixed(2)} mg (${volume.toFixed(2)} mL) diluído em 3-4 mL de SF 0,9%`,
                        detalhes: "Repetir a cada 20 min se necessário, até 3 doses"
                    };
                },
                indicacoes: {
                    asma: {
                        dose: "0,15 mg/kg/dose",
                        doseMaxima: "5 mg/dose",
                        frequencia: "A cada 20 min se necessário",
                        duracao: "Até 3 doses na crise"
                    },
                    broncoespasmo: {
                        dose: "0,15 mg/kg/dose",
                        doseMaxima: "5 mg/dose",
                        frequencia: "A cada 20 min se necessário",
                        duracao: "Até 3 doses na crise"
                    }
                }
            }
        }
    },

    // Paracetamol
    paracetamolGotas: {
        nome: "Paracetamol (Gotas)",
        formas: {
            oral: {
                descricao: "Solução oral 200mg/mL",
                tipo: "solucao",
                concentracao: "200mg/mL",
                passos: [
                    "Agitar antes de usar",
                    "Medir com seringa dosadora"
                ],
                precaucoes: [
                    "Não exceder dose máxima diária",
                    "Cuidado em pacientes com doença hepática"
                ],
                calculoDose: function(peso) {
                    const doseMg = Math.min(15 * peso, 750);
                    const volume = doseMg / 200; // 200mg/mL
                    return {
                        dose: `${doseMg.toFixed(0)} mg (${volume.toFixed(1)} mL)`,
                        detalhes: "Repetir a cada 6 horas se necessário"
                    };
                },
                indicacoes: {
                    febre: {
                        dose: "10-15 mg/kg/dose",
                        doseMaxima: "750 mg/dose",
                        frequencia: "A cada 6 horas",
                        duracao: "Até 5 dias"
                    },
                    dor: {
                        dose: "10-15 mg/kg/dose",
                        doseMaxima: "750 mg/dose",
                        frequencia: "A cada 6 horas",
                        duracao: "Até 5 dias"
                    }
                }
            }
        }
    },

    // Dipirona
    dipironaGotas: {
        nome: "Dipirona (Gotas)",
        formas: {
            oral: {
                descricao: "Solução oral 500mg/mL",
                tipo: "solucao",
                concentracao: "500mg/mL",
                passos: [
                    "Diluir em água antes de administrar",
                    "Usar seringa dosadora"
                ],
                precaucoes: [
                    "Risco de agranulocitose",
                    "Contraindicada em <3 meses",
                    "Monitorar reações alérgicas"
                ],
                calculoDose: function(peso) {
                    const doseMg = Math.min(15 * peso, 1000);
                    const volume = doseMg / 500; // 500mg/mL
                    return {
                        dose: `${doseMg.toFixed(0)} mg (${volume.toFixed(2)} mL)`,
                        detalhes: "Repetir a cada 6 horas se necessário"
                    };
                },
                indicacoes: {
                    febre: {
                        dose: "10-15 mg/kg/dose",
                        doseMaxima: "1000 mg/dose",
                        frequencia: "A cada 6 horas",
                        duracao: "Até 3 dias"
                    },
                    dor: {
                        dose: "10-15 mg/kg/dose",
                        doseMaxima: "1000 mg/dose",
                        frequencia: "A cada 6 horas",
                        duracao: "Até 3 dias"
                    }
                }
            }
        }
    },

    // Cefalexina
    cefalexinaSuspensao: {
        nome: "Cefalexina (Suspensão)",
        formas: {
            oral: {
                descricao: "Suspensão oral 250mg/5mL",
                tipo: "suspensao",
                concentracao: "250mg/5mL",
                passos: [
                    "Agitar bem antes de usar",
                    "Conservar em geladeira após reconstituição",
                    "Descartar após 14 dias"
                ],
                precaucoes: [
                    "Verificar histórico de alergia a cefalosporinas",
                    "Ajustar dose em insuficiência renal"
                ],
                calculoDose: function(peso) {
                    const doseDiaria = Math.min(50 * peso, 2000);
                    const doseUnica = doseDiaria / 4;
                    const volume = (doseUnica * 5) / 250; // 250mg/5mL
                    return {
                        dose: `${doseUnica.toFixed(0)} mg (${volume.toFixed(1)} mL) por dose`,
                        detalhes: "Administrar 4 vezes ao dia"
                    };
                },
                indicacoes: {
                    infeccaoCutanea: {
                        dose: "50 mg/kg/dia",
                        doseMaxima: "2000 mg/dia",
                        frequencia: "6/6 horas",
                        duracao: "7-10 dias"
                    },
                    infeccaoUrinaria: {
                        dose: "50 mg/kg/dia",
                        doseMaxima: "2000 mg/dia",
                        frequencia: "6/6 horas",
                        duracao: "7-14 dias"
                    }
                }
            }
        }
    },

    // Dexametasona
    dexametasonaTopico: {
        nome: "Dexametasona (Tópico)",
        formas: {
            oral: {
                descricao: "Elixir 0,1mg/mL",
                tipo: "solucao",
                concentracao: "0,1mg/mL",
                passos: [
                    "Agitar antes de usar",
                    "Administrar com alimentos"
                ],
                precaucoes: [
                    "Monitorar glicemia",
                    "Não interromper abruptamente",
                    "Maior potência que prednisolona"
                ],
                calculoDose: function(peso, indicacao) {
                    let doseDiaria;
                    if (indicacao === 'laringite') {
                        doseDiaria = Math.min(0.6 * peso, 16);
                    } else {
                        doseDiaria = Math.min(0.3 * peso, 8);
                    }
                    const volume = doseDiaria / 0.1; // 0,1mg/mL
                    return {
                        dose: `${doseDiaria.toFixed(2)} mg/dia (${volume.toFixed(0)} mL)`,
                        detalhes: "Dividir em 2-4 doses"
                    };
                },
                indicacoes: {
                    laringite: {
                        dose: "0,6 mg/kg/dia",
                        doseMaxima: "16 mg/dia",
                        frequencia: "A cada 6 horas",
                        duracao: "3-5 dias"
                    },
                    alergia: {
                        dose: "0,3 mg/kg/dia",
                        doseMaxima: "8 mg/dia",
                        frequencia: "A cada 6-12 horas",
                        duracao: "3-5 dias"
                    }
                }
            }
        }
    },

    // Loratadina
    loratadinaXarope: {
        nome: "Loratadina (Xarope)",
        formas: {
            oral: {
                descricao: "Xarope 1mg/mL",
                tipo: "solucao",
                concentracao: "1mg/mL",
                passos: [
                    "Agitar antes de usar",
                    "Pode ser administrado com ou sem alimentos"
                ],
                precaucoes: [
                    "Ajustar dose em insuficiência hepática",
                    "Menor sedação que anti-histamínicos de 1ª geração"
                ],
                calculoDose: function(peso, idade) {
                    let dose;
                    let volume;
                    
                    if (idade < 2) {
                        return {
                            dose: "Não recomendado para menores de 2 anos",
                            detalhes: "Consultar pediatra"
                        };
                    } else if (idade >= 2 && idade <= 5) {
                        dose = 5;
                        volume = 5;
                    } else if (peso < 30) {
                        dose = 5;
                        volume = 5;
                    } else {
                        dose = 10;
                        volume = 10;
                    }
                    
                    return {
                        dose: `${dose} mg (${volume} mL)`,
                        detalhes: "Administrar 1 vez ao dia"
                    };
                },
                indicacoes: {
                    riniteAlergica: {
                        dose: "5 mg/dia (2-5 anos), 10 mg/dia (>5 anos)",
                        doseMaxima: "10 mg/dia",
                        frequencia: "1 vez ao dia",
                        duracao: "Conforme necessidade"
                    },
                    alergia: {
                        dose: "5 mg/dia (2-5 anos), 10 mg/dia (>5 anos)",
                        doseMaxima: "10 mg/dia",
                        frequencia: "1 vez ao dia",
                        duracao: "7-14 dias"
                    }
                }
            }
        }
    },

    // Nistatina
    nistatinaPomada: {
        nome: "Nistatina (Pomada)",
        formas: {
            oral: {
                descricao: "Suspensão oral 100.000 UI/mL",
                tipo: "suspensao",
                concentracao: "100.000 UI/mL",
                passos: [
                    "Agitar bem antes de usar",
                    "Aplicar metade da dose em cada lado da boca",
                    "Manter na boca o maior tempo possível antes de engolir"
                ],
                precaucoes: [
                    "Continuar tratamento por 48h após resolução dos sintomas",
                    "Verificar interações medicamentosas"
                ],
                calculoDose: function(idade) {
                    let dose;
                    let volume;
                    
                    if (idade < 1) {
                        dose = 100000;
                        volume = 1;
                    } else {
                        dose = 400000;
                        volume = 4;
                    }
                    
                    return {
                        dose: `${dose} UI (${volume} mL)`,
                        detalhes: "Aplicar em cada lado da boca 4 vezes ao dia"
                    };
                },
                indicacoes: {
                    candidiaseOral: {
                        dose: "100.000 UI (<1 ano) ou 400.000 UI (>1 ano) por dose",
                        doseMaxima: "400.000 UI/dose",
                        frequencia: "4 vezes ao dia",
                        duracao: "7-14 dias"
                    }
                }
            }
        }
    },

    prometazina: {
        nome: "Prometazina",
        formas: {
            oral: {
                descricao: "Xarope 5mg/5mL",
                tipo: "solucao",
                passos: [
                    "Agitar levemente antes de usar",
                    "Medir com seringa dosadora"
                ],
                precaucoes: [
                    "Contraindicada em <2 anos (risco de depressão respiratória)",
                    "Pode causar sedação excessiva",
                    "Evitar exposição solar"
                ],
                indicacoes: {
                    vomitos: {
                        dose: "0,25-0,5 mg/kg/dose",
                        doseMaxima: "25 mg/dose",
                        frequencia: "A cada 6-8 horas",
                        duracao: "Até 2 dias"
                    },
                    alergia: {
                        dose: "0,5 mg/kg/dose",
                        doseMaxima: "25 mg/dose",
                        frequencia: "A cada 6-8 horas",
                        duracao: "Até 5 dias"
                    }
                }
            },
            im: {
                descricao: "Solução injetável 25mg/mL",
                tipo: "solucao",
                passos: [
                    "Aspirar dose correta",
                    "Administrar por via intramuscular profunda"
                ],
                precaucoes: [
                    "Monitorar depressão respiratória",
                    "Aplicar em locais alternados"
                ],
                indicacoes: {
                    alergiaGrave: {
                        dose: "0,5-1 mg/kg/dose",
                        doseMaxima: "25 mg/dose",
                        frequencia: "A cada 6-8 horas",
                        duracao: "Até 2 dias"
                    }
                }
            }
        }
    },

    diazepam: {
        nome: "Diazepam",
        formas: {
            oral: {
                descricao: "Solução oral 5mg/5mL",
                tipo: "solucao",
                passos: [
                    "Agitar levemente antes de usar",
                    "Medir com seringa dosadora"
                ],
                precaucoes: [
                    "Monitorar depressão respiratória",
                    "Evitar uso prolongado",
                    "Não suspender abruptamente"
                ],
                indicacoes: {
                    ansiedade: {
                        dose: "0,1-0,3 mg/kg/dose",
                        doseMaxima: "10 mg/dose",
                        frequencia: "A cada 6-8 horas",
                        duracao: "Curto prazo"
                    }
                }
            },
            iv: {
                descricao: "Solução injetável 5mg/mL",
                tipo: "solucao",
                passos: [
                    "Diluir em SF 0,9%",
                    "Administrar em infusão lenta (1 mg/min)"
                ],
                precaucoes: [
                    "Monitorar frequência respiratória",
                    "Ter equipamento de reanimação disponível"
                ],
                indicacoes: {
                    statusEpilepticus: {
                        dose: "0,2-0,3 mg/kg/dose",
                        doseMaxima: "10 mg/dose",
                        frequencia: "Repetir em 5-10 min se necessário",
                        duracao: "Até controle da crise"
                    }
                }
            },
            retal: {
                descricao: "Solução retal 5mg/mL",
                tipo: "solucao",
                passos: [
                    "Remover tampa do aplicador",
                    "Inserir suavemente no reto",
                    "Pressionar o êmbolo completamente"
                ],
                precaucoes: [
                    "Não usar se houver lesão retal",
                    "Monitorar nível de consciência"
                ],
                indicacoes: {
                    convulsoes: {
                        dose: "0,5 mg/kg/dose",
                        doseMaxima: "10 mg/dose",
                        frequencia: "Repetir em 10 min se necessário",
                        duracao: "Até controle da crise"
                    }
                }
            }
        }
    },
    midazolam: {
        nome: "Midazolam",
        formas: {
            oral: {
                descricao: "Solução oral 2mg/mL",
                tipo: "solucao",
                passos: [
                    "Medir com seringa dosadora",
                    "Administrar diretamente na boca"
                ],
                precaucoes: [
                    "Monitorar depressão respiratória",
                    "Evitar em insuficiência hepática grave"
                ],
                indicacoes: {
                    sedacao: {
                        dose: "0,25-0,5 mg/kg/dose",
                        doseMaxima: "10 mg/dose",
                        frequencia: "Dose única",
                        duracao: "1 dia"
                    }
                }
            },
            iv: {
                descricao: "Solução injetável 5mg/mL",
                tipo: "solucao",
                passos: [
                    "Diluir em SF 0,9%",
                    "Administrar em infusão lenta (1 mg/min)"
                ],
                precaucoes: [
                    "Monitorar frequência respiratória",
                    "Ter equipamento de reanimação disponível"
                ],
                indicacoes: {
                    statusEpilepticus: {
                        dose: "0,1-0,2 mg/kg/dose",
                        doseMaxima: "5 mg/dose",
                        frequencia: "Repetir em 5 min se necessário",
                        duracao: "Até controle da crise"
                    },
                    sedacao: {
                        dose: "0,05-0,1 mg/kg/dose",
                        doseMaxima: "5 mg/dose",
                        frequencia: "Dose única",
                        duracao: "1 dia"
                    }
                }
            },
            intranasal: {
                descricao: "Solução para uso intranasal 5mg/mL",
                tipo: "solucao",
                passos: [
                    "Aspirar dose correta",
                    "Administrar 0,1 mL/narina com seringa"
                ],
                precaucoes: [
                    "Pode causar irritação nasal",
                    "Monitorar depressão respiratória"
                ],
                indicacoes: {
                    convulsoes: {
                        dose: "0,2 mg/kg/dose",
                        doseMaxima: "5 mg/dose",
                        frequencia: "Repetir em 10 min se necessário",
                        duracao: "Até controle da crise"
                    }
                }
            }
        }
    },

    ranitidina: {
        nome: "Ranitidina",
        formas: {
            oral: {
                descricao: "Solução oral 15mg/mL",
                tipo: "solucao",
                passos: [
                    "Agitar levemente antes de usar",
                    "Medir com seringa dosadora"
                ],
                precaucoes: [
                    "Ajustar dose em insuficiência renal",
                    "Monitorar função hepática"
                ],
                indicacoes: {
                    refluxo: {
                        dose: "2-4 mg/kg/dia",
                        doseMaxima: "300 mg/dia",
                        frequencia: "Dividida em 2 doses",
                        duracao: "4-8 semanas"
                    },
                    ulcera: {
                        dose: "4-6 mg/kg/dia",
                        doseMaxima: "300 mg/dia",
                        frequencia: "Dividida em 2 doses",
                        duracao: "6-8 semanas"
                    }
                }
            },
            iv: {
                descricao: "Solução injetável 25mg/mL",
                tipo: "solucao",
                passos: [
                    "Diluir em SF 0,9%",
                    "Administrar em infusão lenta (5 min)"
                ],
                precaucoes: [
                    "Monitorar arritmias",
                    "Ajustar dose em insuficiência renal"
                ],
                indicacoes: {
                    sangramentoDigestivo: {
                        dose: "1-2 mg/kg/dose",
                        doseMaxima: "50 mg/dose",
                        frequencia: "A cada 6-8 horas",
                        duracao: "Até controle do sangramento"
                    }
                }
            }
        }
    },

    omeprazolCapsulas: {
        nome: "Omeprazol (Cápsulas)",
        formas: {
            oral: {
                descricao: "Cápsulas 10mg, 20mg",
                tipo: "capsula",
                passos: [
                    "Administrar em jejum 30 min antes do café",
                    "Pode abrir cápsula e misturar com suco ácido"
                ],
                precaucoes: [
                    "Monitorar magnésio em uso prolongado",
                    "Pode interferir com outros medicamentos"
                ],
                indicacoes: {
                    refluxo: {
                        dose: "0,5-1 mg/kg/dia",
                        doseMaxima: "20 mg/dia",
                        frequencia: "1 vez ao dia",
                        duracao: "4-8 semanas"
                    },
                    ulcera: {
                        dose: "1-2 mg/kg/dia",
                        doseMaxima: "40 mg/dia",
                        frequencia: "1 vez ao dia",
                        duracao: "4-8 semanas"
                    }
                }
            },
            iv: {
                descricao: "Pó para solução injetável 40mg",
                tipo: "solucao",
                passos: [
                    "Reconstituir com 10 mL de SF 0,9%",
                    "Administrar em infusão lenta (5 min)"
                ],
                precaucoes: [
                    "Monitorar pH gástrico",
                    "Ajustar dose em insuficiência hepática"
                ],
                indicacoes: {
                    sangramentoDigestivo: {
                        dose: "0,5-1 mg/kg/dose",
                        doseMaxima: "40 mg/dose",
                        frequencia: "1 vez ao dia",
                        duracao: "3-5 dias"
                    }
                }
            }
        }
    },

    adrenalinaInjetavel: {
        nome: "Adrenalina (Epinefrina)",
        formas: {
            im: {
                descricao: "Solução injetável 1mg/mL (1:1000)",
                tipo: "solucao",
                passos: [
                    "Aspirar dose correta",
                    "Administrar por via intramuscular na coxa"
                ],
                precaucoes: [
                    "Monitorar frequência cardíaca",
                    "Não administrar IV nesta concentração"
                ],
                indicacoes: {
                    anafilaxia: {
                        dose: "0,01 mg/kg/dose",
                        doseMaxima: "0,5 mg/dose",
                        frequencia: "Repetir em 5-15 min se necessário",
                        duracao: "Até resolução dos sintomas"
                    }
                }
            },
            iv: {
                descricao: "Solução injetável 0,1mg/mL (1:10.000)",
                tipo: "solucao",
                passos: [
                    "Diluir 1mL de adrenalina 1:1000 em 9mL de SF 0,9%",
                    "Administrar em infusão lenta (3-5 min)"
                ],
                precaucoes: [
                    "Monitorar ECG continuamente",
                    "Ter equipamento de reanimação disponível"
                ],
                indicacoes: {
                    paradaCardiaca: {
                        dose: "0,01 mg/kg/dose",
                        doseMaxima: "1 mg/dose",
                        frequencia: "A cada 3-5 min",
                        duracao: "Até retorno da circulação"
                    },
                    choqueAnafilatico: {
                        dose: "0,01 mg/kg/dose",
                        doseMaxima: "0,5 mg/dose",
                        frequencia: "Infusão contínua 0,1-1 mcg/kg/min",
                        duracao: "Até estabilização hemodinâmica"
                    }
                }
            },
            nebulizacao: {
                descricao: "Solução para nebulização 1mg/mL",
                tipo: "solucao",
                passos: [
                    "Diluir 0,5 mL em 3 mL de SF 0,9%",
                    "Nebulizar com máscara facial"
                ],
                precaucoes: [
                    "Monitorar frequência cardíaca",
                    "Observar tremores como efeito colateral"
                ],
                indicacoes: {
                    laringite: {
                        dose: "0,5 mL/kg/dose (máx 5 mL)",
                        doseMaxima: "5 mL/dose",
                        frequencia: "A cada 4-6 horas",
                        duracao: "Até melhora dos sintomas"
                    }
                }
            }
        }
    },

    aciclovir: {
        nome: "Aciclovir",
        formas: {
            oral: {
                descricao: "Suspensão oral 200mg/5mL",
                tipo: "suspensao",
                passos: [
                    "Agitar bem antes de usar",
                    "Administrar com abundante água"
                ],
                precaucoes: [
                    "Manter hidratação adequada",
                    "Monitorar função renal"
                ],
                indicacoes: {
                    herpesSimples: {
                        dose: "20 mg/kg/dose",
                        doseMaxima: "800 mg/dose",
                        frequencia: "4 vezes ao dia",
                        duracao: "5-10 dias"
                    },
                    herpesZoster: {
                        dose: "20 mg/kg/dose",
                        doseMaxima: "800 mg/dose",
                        frequencia: "4 vezes ao dia",
                        duracao: "7-10 dias"
                    }
                }
            },
            iv: {
                descricao: "Pó para solução injetável 250mg",
                tipo: "solucao",
                passos: [
                    "Reconstituir com 10 mL de água para injetáveis",
                    "Diluir em 50-100 mL de SF 0,9%",
                    "Administrar em infusão lenta (1 hora)"
                ],
                precaucoes: [
                    "Monitorar função renal",
                    "Observar sinais de flebite"
                ],
                indicacoes: {
                    herpesNeonatal: {
                        dose: "20 mg/kg/dose",
                        doseMaxima: "500 mg/dose",
                        frequencia: "A cada 8 horas",
                        duracao: "14-21 dias"
                    },
                    encefaliteHerpetica: {
                        dose: "20 mg/kg/dose",
                        doseMaxima: "500 mg/dose",
                        frequencia: "A cada 8 horas",
                        duracao: "21 dias"
                    }
                }
            }
        }
    },

    atropina: {
        nome: "Atropina",
        formas: {
            iv: {
                descricao: "Solução injetável 0,1mg/mL",
                tipo: "solucao",
                passos: [
                    "Aspirar dose correta",
                    "Administrar em bolus rápido"
                ],
                precaucoes: [
                    "Monitorar frequência cardíaca",
                    "Evitar em glaucoma"
                ],
                indicacoes: {
                    bradicardia: {
                        dose: "0,02 mg/kg/dose",
                        doseMaxima: "0,5 mg/dose",
                        frequencia: "Repetir em 5 min se necessário",
                        duracao: "Até resolução"
                    },
                    intoxicacaoOrganofosforados: {
                        dose: "0,05-0,1 mg/kg/dose",
                        doseMaxima: "2 mg/dose",
                        frequencia: "A cada 5-10 min até atropinização",
                        duracao: "Até resolução dos sintomas"
                    }
                }
            },
            im: {
                descricao: "Solução injetável 0,1mg/mL",
                tipo: "solucao",
                passos: [
                    "Aspirar dose correta",
                    "Administrar por via intramuscular"
                ],
                precaucoes: [
                    "Monitorar sinais de atropinização",
                    "Aplicar em locais alternados"
                ],
                indicacoes: {
                    preAnestesia: {
                        dose: "0,01-0,02 mg/kg/dose",
                        doseMaxima: "0,5 mg/dose",
                        frequencia: "30 min antes do procedimento",
                        duracao: "Dose única"
                    }
                }
            }
        }
    },

    dextrose: {
        nome: "Dextrose",
        formas: {
            iv: {
                descricao: "Solução injetável 10%, 25%, 50%",
                tipo: "solucao",
                passos: [
                    "Verificar concentração prescrita",
                    "Administrar em veia calibrosa"
                ],
                precaucoes: [
                    "Monitorar glicemia capilar",
                    "Evitar extravasamento (risco de necrose)"
                ],
                indicacoes: {
                    hipoglicemia: {
                        dose: "2-4 mL/kg de D10% ou 1-2 mL/kg de D25%",
                        doseMaxima: "25 g/dose",
                        frequencia: "Conforme necessidade",
                        duracao: "Até normalização glicêmica"
                    }
                }
            }
        }
    },

    eritromicina: {
        nome: "Eritromicina",
        formas: {
            oral: {
                descricao: "Suspensão oral 250mg/5mL",
                tipo: "suspensao",
                passos: [
                    "Agitar bem antes de usar",
                    "Administrar com alimentos"
                ],
                precaucoes: [
                    "Pode causar irritação gástrica",
                    "Monitorar interações medicamentosas"
                ],
                indicacoes: {
                    pneumonia: {
                        dose: "40-50 mg/kg/dia",
                        doseMaxima: "2000 mg/dia",
                        frequencia: "Dividida em 4 doses",
                        duracao: "10 dias"
                    },
                    coqueluche: {
                        dose: "40-50 mg/kg/dia",
                        doseMaxima: "2000 mg/dia",
                        frequencia: "Dividida em 4 doses",
                        duracao: "14 dias"
                    }
                }
            },
            iv: {
                descricao: "Pó para solução injetável 500mg",
                tipo: "solucao",
                passos: [
                    "Reconstituir com 10 mL de água para injetáveis",
                    "Diluir em 100-250 mL de SF 0,9%",
                    "Administrar em infusão lenta (1 hora)"
                ],
                precaucoes: [
                    "Monitorar flebite",
                    "Ajustar dose em insuficiência hepática"
                ],
                indicacoes: {
                    infeccaoGrave: {
                        dose: "40-50 mg/kg/dia",
                        doseMaxima: "4000 mg/dia",
                        frequencia: "Dividida em 4 doses",
                        duracao: "7-14 dias"
                    }
                }
            }
        }
    },

    ampicilina: {
        nome: "Ampicilina",
        formas: {
            iv: {
                descricao: "Pó para solução injetável 500mg, 1g",
                tipo: "solucao",
                passos: [
                    "Reconstituir com 5-10 mL de água para injetáveis",
                    "Administrar em infusão lenta (3-5 min)"
                ],
                precaucoes: [
                    "Verificar alergias a penicilinas",
                    "Monitorar reações de hipersensibilidade"
                ],
                indicacoes: {
                    meningite: {
                        dose: "200-300 mg/kg/dia",
                        doseMaxima: "12000 mg/dia",
                        frequencia: "Dividida em 4-6 doses",
                        duracao: "10-14 dias"
                    },
                    sepse: {
                        dose: "100-200 mg/kg/dia",
                        doseMaxima: "8000 mg/dia",
                        frequencia: "Dividida em 4 doses",
                        duracao: "7-10 dias"
                    }
                }
            },
            im: {
                descricao: "Pó para solução injetável 500mg, 1g",
                tipo: "solucao",
                passos: [
                    "Reconstituir com 1-2 mL de água para injetáveis",
                    "Administrar por via intramuscular profunda"
                ],
                precaucoes: [
                    "Pode causar dor no local da injeção",
                    "Aplicar em locais alternados"
                ],
                indicacoes: {
                    pneumonia: {
                        dose: "50-100 mg/kg/dia",
                        doseMaxima: "4000 mg/dia",
                        frequencia: "Dividida em 2-3 doses",
                        duracao: "7-10 dias"
                    }
                }
            }
        }
    },

    cefotaxima: {
        nome: "Cefotaxima",
        formas: {
            iv: {
                descricao: "Pó para solução injetável 1g",
                tipo: "solucao",
                passos: [
                    "Reconstituir com 10 mL de água para injetáveis",
                    "Administrar em infusão lenta (3-5 min)"
                ],
                precaucoes: [
                    "Verificar alergias a cefalosporinas",
                    "Monitorar função renal"
                ],
                indicacoes: {
                    meningite: {
                        dose: "200 mg/kg/dia",
                        doseMaxima: "8000 mg/dia",
                        frequencia: "Dividida em 4 doses",
                        duracao: "10-14 dias"
                    },
                    sepse: {
                        dose: "100-150 mg/kg/dia",
                        doseMaxima: "6000 mg/dia",
                        frequencia: "Dividida em 3-4 doses",
                        duracao: "7-10 dias"
                    }
                }
            },
            im: {
                descricao: "Pó para solução injetável 500mg",
                tipo: "solucao",
                passos: [
                    "Reconstituir com 2 mL de água para injetáveis",
                    "Administrar por via intramuscular profunda"
                ],
                precaucoes: [
                    "Pode causar dor no local da injeção",
                    "Aplicar em locais alternados"
                ],
                indicacoes: {
                    infeccaoModerada: {
                        dose: "50-100 mg/kg/dia",
                        doseMaxima: "4000 mg/dia",
                        frequencia: "Dividida em 2-3 doses",
                        duracao: "7-10 dias"
                    }
                }
            }
        }
    },
    cloranfenicol: {
        nome: "Cloranfenicol",
        formas: {
            iv: {
                descricao: "Solução injetável 1g",
                tipo: "solucao",
                passos: [
                    "Diluir em 100 mL de SF 0,9%",
                    "Administrar em infusão lenta (30-60 min)"
                ],
                precaucoes: [
                    "Monitorar hemograma semanal",
                    "Evitar uso prolongado (>14 dias)"
                ],
                indicacoes: {
                    meningite: {
                        dose: "75-100 mg/kg/dia",
                        doseMaxima: "4000 mg/dia",
                        frequencia: "Dividida em 4 doses",
                        duracao: "10-14 dias"
                    },
                    febreTifoide: {
                        dose: "50-75 mg/kg/dia",
                        doseMaxima: "3000 mg/dia",
                        frequencia: "Dividida em 4 doses",
                        duracao: "14 dias"
                    }
                }
            },
            oral: {
                descricao: "Cápsulas 250mg",
                tipo: "capsula",
                passos: [
                    "Administrar 1 hora antes ou 2 horas após refeições"
                ],
                precaucoes: [
                    "Monitorar sinais de anemia aplásica",
                    "Não usar em <2 anos"
                ],
                indicacoes: {
                    febreTifoide: {
                        dose: "50-75 mg/kg/dia",
                        doseMaxima: "3000 mg/dia",
                        frequencia: "Dividida em 4 doses",
                        duracao: "14 dias"
                    }
                }
            }
        }
    },
    furosemidaInjetavel: {
        nome: "Furosemida (Injetável)",
        formas: {
            oral: {
                descricao: "Solução oral 10mg/mL",
                tipo: "solucao",
                passos: [
                    "Agitar levemente antes de usar",
                    "Medir com seringa dosadora"
                ],
                precaucoes: [
                    "Monitorar eletrólitos (K⁺, Na⁺)",
                    "Ajustar dose em insuficiência renal"
                ],
                indicacoes: {
                    edema: {
                        dose: "1-2 mg/kg/dose",
                        doseMaxima: "40 mg/dose",
                        frequencia: "1-2 vezes ao dia",
                        duracao: "Conforme necessidade"
                    },
                    hipertensao: {
                        dose: "0,5-1 mg/kg/dose",
                        doseMaxima: "20 mg/dose",
                        frequencia: "1-2 vezes ao dia",
                        duracao: "Conforme necessidade"
                    }
                }
            },
            iv: {
                descricao: "Solução injetável 10mg/mL",
                tipo: "solucao",
                passos: [
                    "Administrar em bolus lento (1-2 min)"
                ],
                precaucoes: [
                    "Monitorar diurese e eletrólitos",
                    "Evitar em anúria"
                ],
                indicacoes: {
                    edemaAgudoPulmonar: {
                        dose: "1-2 mg/kg/dose",
                        doseMaxima: "40 mg/dose",
                        frequencia: "Repetir em 6-8 horas se necessário",
                        duracao: "Até melhora dos sintomas"
                    },
                    insuficienciaRenal: {
                        dose: "1-2 mg/kg/dose",
                        doseMaxima: "40 mg/dose",
                        frequencia: "A cada 6-12 horas",
                        duracao: "Conforme resposta"
                    }
                }
            }
        }
    },
    espironolactona: {
        nome: "Espironolactona",
        formas: {
            oral: {
                descricao: "Comprimidos 25mg, 100mg",
                tipo: "comprimido",
                passos: [
                    "Administrar com alimentos",
                    "Pode ser dividido ou triturado"
                ],
                precaucoes: [
                    "Monitorar potássio sérico",
                    "Evitar em insuficiência renal grave"
                ],
                indicacoes: {
                    hipertensao: {
                        dose: "1-2 mg/kg/dia",
                        doseMaxima: "100 mg/dia",
                        frequencia: "1-2 vezes ao dia",
                        duracao: "Longo prazo"
                    },
                    ascite: {
                        dose: "1-3 mg/kg/dia",
                        doseMaxima: "200 mg/dia",
                        frequencia: "1-2 vezes ao dia",
                        duracao: "Conforme necessidade"
                    }
                }
            }
        }
    },
    sulfadoxinaPirimetamina: {
        nome: "Sulfadoxina + Pirimetamina",
        formas: {
            oral: {
                descricao: "Comprimidos 500mg/25mg",
                tipo: "comprimido",
                passos: [
                    "Administrar com água em jejum"
                ],
                precaucoes: [
                    "Contraindicado em alérgicos a sulfas",
                    "Monitorar reações cutâneas"
                ],
                indicacoes: {
                    malaria: {
                        dose: "25/1,25 mg/kg (dose única)",
                        doseMaxima: "3 comprimidos/dose",
                        frequencia: "Dose única",
                        duracao: "1 dia"
                    },
                    profilaxiaMalaria: {
                        dose: "25/1,25 mg/kg",
                        doseMaxima: "3 comprimidos/dose",
                        frequencia: "A cada 4 semanas",
                        duracao: "Durante período de risco"
                    }
                }
            }
        }
    },
    artesunato: {
        nome: "Artesunato",
        formas: {
            iv: {
                descricao: "Pó para solução injetável 60mg",
                tipo: "solucao",
                passos: [
                    "Reconstituir com bicarbonato de sódio 5%",
                    "Agitar até dissolução completa",
                    "Administrar em infusão lenta"
                ],
                precaucoes: [
                    "Monitorar sinais vitais durante administração",
                    "Reservado para malária grave"
                ],
                indicacoes: {
                    malariaGrave: {
                        dose: "2,4 mg/kg/dose",
                        doseMaxima: "120 mg/dose",
                        frequencia: "0, 12 e 24h, depois diariamente",
                        duracao: "Até 7 dias"
                    }
                }
            }
        }
    },
    benznidazol: {
        nome: "Benznidazol",
        formas: {
            oral: {
                descricao: "Comprimidos 100mg",
                tipo: "comprimido",
                passos: [
                    "Administrar com alimentos",
                    "Dividir comprimidos se necessário"
                ],
                precaucoes: [
                    "Monitorar reações dermatológicas",
                    "Contraindicado em gravidez"
                ],
                indicacoes: {
                    doencaChagas: {
                        dose: "5-7 mg/kg/dia",
                        doseMaxima: "300 mg/dia",
                        frequencia: "Dividida em 2 doses",
                        duracao: "60 dias"
                    }
                }
            }
        }
    },
    efavirenz: {
        nome: "Efavirenz",
        formas: {
            oral: {
                descricao: "Cápsulas 200mg, 600mg",
                tipo: "capsula",
                passos: [
                    "Administrar ao deitar",
                    "Tomar em jejum ou com refeição leve"
                ],
                precaucoes: [
                    "Pode causar tonturas e pesadelos",
                    "Monitorar efeitos neuropsiquiátricos"
                ],
                indicacoes: {
                    hiv: {
                        dose: "10-15 kg: 200mg/dia; 15-25 kg: 250mg/dia; 25-32,5 kg: 350mg/dia; >32,5 kg: 600mg/dia",
                        doseMaxima: "600 mg/dia",
                        frequencia: "1 vez ao dia",
                        duracao: "Indefinida"
                    }
                }
            }
        }
    },
    lamivudina: {
        nome: "Lamivudina",
        formas: {
            oral: {
                descricao: "Solução oral 10mg/mL, comprimidos 150mg, 300mg",
                tipo: "solucao",
                passos: [
                    "Agitar bem antes de usar",
                    "Medir dose com seringa dosadora"
                ],
                precaucoes: [
                    "Monitorar função hepática",
                    "Não interromper tratamento abruptamente"
                ],
                indicacoes: {
                    hiv: {
                        dose: "4 mg/kg/dose",
                        doseMaxima: "150 mg/dose",
                        frequencia: "2 vezes ao dia",
                        duracao: "Indefinida"
                    },
                    hepatiteB: {
                        dose: "3 mg/kg/dia",
                        doseMaxima: "100 mg/dia",
                        frequencia: "1 vez ao dia",
                        duracao: "Longo prazo"
                    }
                }
            }
        }
    },
    tenofovir: {
        nome: "Tenofovir",
        formas: {
            oral: {
                descricao: "Comprimidos 300mg",
                tipo: "comprimido",
                passos: [
                    "Administrar com alimentos"
                ],
                precaucoes: [
                    "Monitorar função renal",
                    "Contraindicado em insuficiência renal grave"
                ],
                indicacoes: {
                    hiv: {
                        dose: "8-12 mg/kg/dia",
                        doseMaxima: "300 mg/dia",
                        frequencia: "1 vez ao dia",
                        duracao: "Indefinida"
                    },
                    hepatiteB: {
                        dose: "8-12 mg/kg/dia",
                        doseMaxima: "300 mg/dia",
                        frequencia: "1 vez ao dia",
                        duracao: "Longo prazo"
                    }
                }
            }
        }
    },
    isoniazida: {
        nome: "Isoniazida",
        formas: {
            oral: {
                descricao: "Comprimidos 100mg, 300mg",
                tipo: "comprimido",
                passos: [
                    "Administrar em jejum"
                ],
                precaucoes: [
                    "Suplementar com piridoxina em risco de neuropatia",
                    "Monitorar função hepática"
                ],
                indicacoes: {
                    tuberculose: {
                        dose: "10 mg/kg/dia",
                        doseMaxima: "300 mg/dia",
                        frequencia: "1 vez ao dia",
                        duracao: "6 meses"
                    },
                    profilaxiaTb: {
                        dose: "10 mg/kg/dia",
                        doseMaxima: "300 mg/dia",
                        frequencia: "1 vez ao dia",
                        duracao: "6-9 meses"
                    }
                }
            }
        }
    },
    rifampicina: {
        nome: "Rifampicina",
        formas: {
            oral: {
                descricao: "Cápsulas 150mg, 300mg",
                tipo: "capsula",
                passos: [
                    "Administrar em jejum",
                    "Alertar que pode colorir fluidos corporais de laranja"
                ],
                precaucoes: [
                    "Interage com muitos medicamentos",
                    "Monitorar função hepática"
                ],
                indicacoes: {
                    tuberculose: {
                        dose: "10-20 mg/kg/dia",
                        doseMaxima: "600 mg/dia",
                        frequencia: "1 vez ao dia",
                        duracao: "6 meses"
                    },
                    meningite: {
                        dose: "10-20 mg/kg/dia",
                        doseMaxima: "600 mg/dia",
                        frequencia: "1 vez ao dia",
                        duracao: "10-14 dias"
                    }
                }
            }
        }
    },
    pirazinamida: {
        nome: "Pirazinamida",
        formas: {
            oral: {
                descricao: "Comprimidos 500mg",
                tipo: "comprimido",
                passos: [
                    "Administrar com alimentos"
                ],
                precaucoes: [
                    "Monitorar ácido úrico",
                    "Contraindicado em hepatopatia grave"
                ],
                indicacoes: {
                    tuberculose: {
                        dose: "30-35 mg/kg/dia",
                        doseMaxima: "2000 mg/dia",
                        frequencia: "1 vez ao dia",
                        duracao: "2 meses"
                    }
                }
            }
        }
    },
    etambutol: {
        nome: "Etambutol",
        formas: {
            oral: {
                descricao: "Comprimidos 400mg",
                tipo: "comprimido",
                passos: [
                    "Administrar com alimentos"
                ],
                precaucoes: [
                    "Monitorar acuidade visual",
                    "Contraindicado em crianças pequenas"
                ],
                indicacoes: {
                    tuberculose: {
                        dose: "15-20 mg/kg/dia",
                        doseMaxima: "1600 mg/dia",
                        frequencia: "1 vez ao dia",
                        duracao: "2 meses"
                    }
                }
            }
        }
    },
    doxiciclina: {
        nome: "Doxiciclina",
        formas: {
            oral: {
                descricao: "Comprimidos 100mg",
                tipo: "comprimido",
                passos: [
                    "Administrar com água abundante",
                    "Evitar deitar por 30 minutos após dose"
                ],
                precaucoes: [
                    "Contraindicado em <8 anos e gestantes",
                    "Evitar exposição solar"
                ],
                indicacoes: {
                    malaria: {
                        dose: "3,5 mg/kg/dia",
                        doseMaxima: "100 mg/dia",
                        frequencia: "1 vez ao dia",
                        duracao: "7 dias"
                    },
                    pneumonia: {
                        dose: "4 mg/kg/dia",
                        doseMaxima: "200 mg/dia",
                        frequencia: "Dividida em 2 doses",
                        duracao: "10 dias"
                    }
                }
            }
        }
    },
    azitromicinaInfantil: {
        nome: "Azitromicina (Infantil)",
        formas: {
            oral: {
                descricao: "Comprimidos 250mg, suspensão 200mg/5mL",
                tipo: "suspensao",
                passos: [
                    "Agitar bem antes de usar",
                    "Administrar 1 hora antes ou 2 horas após refeições"
                ],
                precaucoes: [
                    "Monitorar arritmias em pacientes de risco",
                    "Pode causar diarreia"
                ],
                indicacoes: {
                    pneumonia: {
                        dose: "10 mg/kg/dia",
                        doseMaxima: "500 mg/dia",
                        frequencia: "1 vez ao dia",
                        duracao: "3 dias"
                    },
                    tracoma: {
                        dose: "20 mg/kg (dose única)",
                        doseMaxima: "1000 mg/dose",
                        frequencia: "Dose única",
                        duracao: "1 dia"
                    }
                }
            }
        }
    },
    ceftriaxona: {
        nome: "Ceftriaxona",
        formas: {
            iv: {
                descricao: "Pó para solução injetável 1g",
                tipo: "solucao",
                passos: [
                    "Reconstituir com água para injetáveis",
                    "Agitar até dissolução completa",
                    "Administrar em infusão lenta (2-4 minutos)"
                ],
                precaucoes: [
                    "Verificar alergias a cefalosporinas",
                    "Monitorar reações no local da injeção"
                ],
                indicacoes: {
                    meningite: {
                        dose: "100 mg/kg/dia",
                        doseMaxima: "4000 mg/dia",
                        frequencia: "1-2 doses diárias",
                        duracao: "10-14 dias"
                    },
                    sepse: {
                        dose: "50-100 mg/kg/dia",
                        doseMaxima: "4000 mg/dia",
                        frequencia: "1-2 doses diárias",
                        duracao: "7-10 dias"
                    }
                }
            },
            im: {
                descricao: "Pó para solução injetável 1g",
                tipo: "solucao",
                passos: [
                    "Reconstituir com lidocaína a 1%",
                    "Agitar até dissolução completa",
                    "Administrar por via intramuscular profunda"
                ],
                precaucoes: [
                    "Verificar alergias a cefalosporinas",
                    "Pode causar dor no local da injeção"
                ],
                indicacoes: {
                    pneumonia: {
                        dose: "50 mg/kg/dia",
                        doseMaxima: "2000 mg/dia",
                        frequencia: "1 dose diária",
                        duracao: "7-10 dias"
                    }
                }
            }
        }
    },
    metronidazolTopico: {
        nome: "Metronidazol (Tópico)",
        formas: {
            oral: {
                descricao: "Comprimidos 250mg, suspensão 200mg/5mL",
                tipo: "suspensao",
                passos: [
                    "Agitar bem antes de usar",
                    "Administrar com alimentos"
                ],
                precaucoes: [
                    "Evitar álcool durante tratamento",
                    "Pode causar gosto metálico"
                ],
                indicacoes: {
                    disenteriaAmebiana: {
                        dose: "30-50 mg/kg/dia",
                        doseMaxima: "2000 mg/dia",
                        frequencia: "Dividida em 3 doses",
                        duracao: "7-10 dias"
                    },
                    giardíase: {
                        dose: "15 mg/kg/dia",
                        doseMaxima: "750 mg/dia",
                        frequencia: "Dividida em 3 doses",
                        duracao: "5 dias"
                    }
                }
            },
            iv: {
                descricao: "Solução injetável 500mg/100mL",
                tipo: "solucao",
                passos: [
                    "Administrar em infusão lenta (30-60 minutos)"
                ],
                precaucoes: [
                    "Monitorar reações neurológicas",
                    "Evitar uso prolongado"
                ],
                indicacoes: {
                    infeccaoAnaerobia: {
                        dose: "30 mg/kg/dia",
                        doseMaxima: "1500 mg/dia",
                        frequencia: "Dividida em 3 doses",
                        duracao: "7-10 dias"
                    }
                }
            }
        }
    },
    albendazol: {
        nome: "Albendazol",
        formas: {
            oral: {
                descricao: "Comprimidos 400mg, suspensão 100mg/5mL",
                tipo: "suspensao",
                passos: [
                    "Agitar bem antes de usar",
                    "Administrar com alimentos gordurosos"
                ],
                precaucoes: [
                    "Contraindicado em gestantes",
                    "Monitorar função hepática"
                ],
                indicacoes: {
                    ascaridíase: {
                        dose: "400 mg (dose única)",
                        doseMaxima: "400 mg/dose",
                        frequencia: "Dose única",
                        duracao: "1 dia"
                    },
                    teníase: {
                        dose: "400 mg/dia",
                        doseMaxima: "400 mg/dia",
                        frequencia: "1 vez ao dia",
                        duracao: "3 dias"
                    }
                }
            }
        }
    },
    mebendazol: {
        nome: "Mebendazol",
        formas: {
            oral: {
                descricao: "Comprimidos 100mg",
                tipo: "comprimido",
                passos: [
                    "Mastigar ou esmagar comprimidos para crianças"
                ],
                precaucoes: [
                    "Contraindicado em gestantes",
                    "Pode causar dor abdominal"
                ],
                indicacoes: {
                    ascaridíase: {
                        dose: "100 mg 2 vezes ao dia",
                        doseMaxima: "200 mg/dia",
                        frequencia: "2 vezes ao dia",
                        duracao: "3 dias"
                    },
                    oxiuríase: {
                        dose: "100 mg (dose única)",
                        doseMaxima: "100 mg/dose",
                        frequencia: "Dose única",
                        duracao: "1 dia"
                    }
                }
            }
        }
    },
    praziquantel: {
        nome: "Praziquantel",
        formas: {
            oral: {
                descricao: "Comprimidos 600mg",
                tipo: "comprimido",
                passos: [
                    "Administrar com alimentos",
                    "Dividir comprimidos se necessário"
                ],
                precaucoes: [
                    "Contraindicado em neurocisticercose ocular",
                    "Pode causar tonturas"
                ],
                indicacoes: {
                    esquistossomose: {
                        dose: "40-60 mg/kg (dose única)",
                        doseMaxima: "2400 mg/dose",
                        frequencia: "Dose única",
                        duracao: "1 dia"
                    },
                    teníase: {
                        dose: "10-25 mg/kg (dose única)",
                        doseMaxima: "1500 mg/dose",
                        frequencia: "Dose única",
                        duracao: "1 dia"
                    }
                }
            }
        }
    },
    ivermectina: {
        nome: "Ivermectina",
        formas: {
            oral: {
                descricao: "Comprimidos 3mg, 6mg",
                tipo: "comprimido",
                passos: [
                    "Administrar com água"
                ],
                precaucoes: [
                    "Contraindicado em crianças <15kg ou <90cm",
                    "Monitorar reações alérgicas"
                ],
                indicacoes: {
                    oncocercose: {
                        dose: "150 mcg/kg (dose única)",
                        doseMaxima: "12 mg/dose",
                        frequencia: "A cada 6-12 meses",
                        duracao: "Vários anos"
                    },
                    estrongiloidíase: {
                        dose: "200 mcg/kg/dia",
                        doseMaxima: "12 mg/dia",
                        frequencia: "1 vez ao dia",
                        duracao: "2 dias"
                    }
                }
            }
        }
    },
    cloroquina: {
        nome: "Cloroquina",
        formas: {
            oral: {
                descricao: "Comprimidos 150mg (base)",
                tipo: "comprimido",
                passos: [
                    "Administrar com alimentos"
                ],
                precaucoes: [
                    "Contraindicado em psoríase",
                    "Monitorar retina em uso prolongado"
                ],
                indicacoes: {
                    malaria: {
                        dose: "10 mg base/kg/dose",
                        doseMaxima: "600 mg base/dose",
                        frequencia: "Dose inicial, depois em 6, 24 e 48h",
                        duracao: "3 dias"
                    },
                    artrite: {
                        dose: "5 mg base/kg/dia",
                        doseMaxima: "300 mg base/dia",
                        frequencia: "1 vez ao dia",
                        duracao: "Longo prazo"
                    }
                }
            }
        }
    },
    amoxicilinaSuspensao: {
        nome: "Amoxicilina (Suspensão)",
        formas: {
            oral: {
                descricao: "Suspensão oral 250mg/5mL",
                tipo: "suspensao",
                passos: [
                    "Agitar bem o frasco antes de usar",
                    "Medir a dose com seringa dosadora",
                    "Administrar diretamente na boca da criança"
                ],
                precaucoes: [
                    "Verificar alergias a penicilinas",
                    "Pode causar diarreia - monitorar",
                    "Administrar com alimentos para reduzir desconforto gástrico"
                ],
                indicacoes: {
                    pneumonia: {
                        dose: "40-50 mg/kg/dia",
                        doseMaxima: "1000 mg/dia",
                        frequencia: "Dividida em 2-3 doses",
                        duracao: "7-10 dias"
                    },
                    otite: {
                        dose: "40-50 mg/kg/dia",
                        doseMaxima: "1000 mg/dia",
                        frequencia: "Dividida em 2-3 doses",
                        duracao: "5-7 dias"
                    }
                }
            },
            iv: {
                descricao: "Pó para solução injetável 500mg",
                tipo: "solucao",
                passos: [
                    "Reconstituir com água para injetáveis",
                    "Agitar até dissolução completa",
                    "Administrar em infusão lenta (3-4 minutos)"
                ],
                precaucoes: [
                    "Verificar alergias a penicilinas",
                    "Monitorar reações no local da injeção",
                    "Não misturar com outros medicamentos na mesma seringa"
                ],
                indicacoes: {
                    pneumonia: {
                        dose: "50 mg/kg/dia",
                        doseMaxima: "2000 mg/dia",
                        frequencia: "Dividida em 3-4 doses",
                        duracao: "7-10 dias"
                    },
                    meningite: {
                        dose: "100 mg/kg/dia",
                        doseMaxima: "4000 mg/dia",
                        frequencia: "Dividida em 4 doses",
                        duracao: "10-14 dias"
                    }
                }
            }
        }
    },
    paracetamolInfantil: {
        nome: "Paracetamol (Infantil)",
        formas: {
            oral: {
                descricao: "Suspensão oral 100mg/mL",
                tipo: "suspensao",
                passos: [
                    "Agitar bem o frasco antes de usar",
                    "Medir a dose com seringa dosadora",
                    "Administrar diretamente na boca da criança"
                ],
                precaucoes: [
                    "Não exceder a dose máxima diária",
                    "Evitar uso prolongado sem supervisão médica",
                    "Monitorar função hepática em uso prolongado"
                ],
                indicacoes: {
                    febre: {
                        dose: "10-15 mg/kg/dose",
                        doseMaxima: "60 mg/kg/dia",
                        frequencia: "A cada 4-6 horas",
                        duracao: "Até 3 dias"
                    },
                    dor: {
                        dose: "10-15 mg/kg/dose",
                        doseMaxima: "60 mg/kg/dia",
                        frequencia: "A cada 4-6 horas",
                        duracao: "Até 5 dias"
                    }
                }
            },
            retal: {
                descricao: "Supositório 100mg",
                tipo: "supositorio",
                passos: [
                    "Remover a embalagem",
                    "Lubrificar com gel lubrificante",
                    "Inserir supositório no reto"
                ],
                precaucoes: [
                    "Não exceder a dose máxima diária",
                    "Não usar se houver lesão retal",
                    "Monitorar resposta terapêutica"
                ],
                indicacoes: {
                    febre: {
                        dose: "15-20 mg/kg/dose",
                        doseMaxima: "60 mg/kg/dia",
                        frequencia: "A cada 6-8 horas",
                        duracao: "Até 3 dias"
                    }
                }
            }
        }
    },
    aminoflina: {
        nome: "Aminofilina",
        formas: {
            iv: {
                descricao: "Solução injetável 25mg/mL",
                tipo: "solucao",
                passos: [
                    "Diluir em 100-200 mL de SF 0,9%",
                    "Administrar em infusão lenta (20-30 min)",
                    "Monitorar frequência cardíaca durante administração"
                ],
                precaucoes: [
                    "Contraindicada em arritmias cardíacas",
                    "Monitorar níveis séricos em uso prolongado",
                    "Evitar em pacientes com epilepsia"
                ],
                calculoDose: function(peso) {
                    const doseMg = 5 * peso; // Dose de carga
                    const volume = doseMg / 25; // 25mg/mL
                    return {
                        dose: `${doseMg} mg (${volume.toFixed(1)} mL)`,
                        detalhes: "Infundir em 20-30 minutos"
                    };
                },
                indicacoes: {
                    broncoespasmo: {
                        dose: "5 mg/kg (dose de carga)",
                        doseMaxima: "500 mg",
                        frequencia: "Dose única inicial",
                        duracao: "1 dia"
                    },
                    asma: {
                        dose: "5 mg/kg (dose de carga) seguido de 0,5-1 mg/kg/hora",
                        doseMaxima: "500 mg/dose",
                        frequencia: "Infusão contínua após dose de carga",
                        duracao: "Até melhora dos sintomas"
                    }
                }
            }
        }
    },

    penicilinaProcaina: {
        nome: "Penicilina Procaína",
        formas: {
            im: {
                descricao: "Suspensão injetável 400.000 UI/mL",
                tipo: "suspensao",
                passos: [
                    "Agitar levemente antes de usar",
                    "Aspirar dose correta",
                    "Administrar por via intramuscular profunda"
                ],
                precaucoes: [
                    "Testar sensibilidade antes de administrar",
                    "Aplicar em locais alternados",
                    "Monitorar reações alérgicas"
                ],
                indicacoes: {
                    infeccaoEstreptococica: {
                        dose: "50.000 UI/kg/dia",
                        doseMaxima: "2.400.000 UI/dia",
                        frequencia: "1 vez ao dia",
                        duracao: "10 dias"
                    },
                    sifilis: {
                        dose: "50.000 UI/kg/dia",
                        doseMaxima: "2.400.000 UI/dia",
                        frequencia: "1 vez ao dia",
                        duracao: "10-14 dias"
                    }
                }
            }
        }
    },

    benzoatoBenzila: {
        nome: "Benzoato de Benzila",
        formas: {
            topica: {
                descricao: "Loção 25%",
                tipo: "locao",
                passos: [
                    "Aplicar no corpo todo do pescoço para baixo",
                    "Deixar agir por 12-24 horas",
                    "Lavar com água e sabão após o período de ação"
                ],
                precaucoes: [
                    "Evitar contato com olhos e mucosas",
                    "Não usar em crianças <2 anos",
                    "Pode causar irritação cutânea"
                ],
                indicacoes: {
                    escabiose: {
                        dose: "Aplicação única em todo o corpo",
                        doseMaxima: "Aplicar fina camada",
                        frequencia: "Repetir em 7 dias se necessário",
                        duracao: "1-2 aplicações"
                    },
                    pediculose: {
                        dose: "Aplicar no couro cabeludo e cabelos",
                        doseMaxima: "Aplicar quantidade suficiente",
                        frequencia: "Repetir em 7 dias",
                        duracao: "1-2 aplicações"
                    }
                }
            }
        }
    },

    ciprofloxacina: {
        nome: "Ciprofloxacina",
        formas: {
            oral: {
                descricao: "Comprimidos 250mg, 500mg",
                tipo: "comprimido",
                passos: [
                    "Administrar com água abundante",
                    "Evitar administrar com lácteos"
                ],
                precaucoes: [
                    "Contraindicada em <18 anos (exceto casos específicos)",
                    "Monitorar tendinites",
                    "Evitar exposição solar"
                ],
                indicacoes: {
                    infeccaoUrinaria: {
                        dose: "20-30 mg/kg/dia",
                        doseMaxima: "1000 mg/dia",
                        frequencia: "Dividida em 2 doses",
                        duracao: "7-10 dias"
                    },
                    diarreiaInfecciosa: {
                        dose: "15-20 mg/kg/dia",
                        doseMaxima: "1000 mg/dia",
                        frequencia: "Dividida em 2 doses",
                        duracao: "3-5 dias"
                    }
                }
            },
            iv: {
                descricao: "Solução injetável 200mg/100mL",
                tipo: "solucao",
                passos: [
                    "Administrar em infusão lenta (60 min)"
                ],
                precaucoes: [
                    "Monitorar reações no local da infusão",
                    "Ajustar dose em insuficiência renal"
                ],
                indicacoes: {
                    infeccaoGrave: {
                        dose: "20-30 mg/kg/dia",
                        doseMaxima: "1200 mg/dia",
                        frequencia: "Dividida em 2 doses",
                        duracao: "7-14 dias"
                    }
                }
            }
        }
    },

    clorfenamina: {
        nome: "Clorfenamina",
        formas: {
            oral: {
                descricao: "Xarope 2mg/5mL",
                tipo: "solucao",
                passos: [
                    "Agitar levemente antes de usar",
                    "Medir com seringa dosadora"
                ],
                precaucoes: [
                    "Pode causar sedação",
                    "Evitar em crianças <2 anos",
                    "Monitorar efeitos anticolinérgicos"
                ],
                indicacoes: {
                    alergia: {
                        dose: "0,35 mg/kg/dia",
                        doseMaxima: "12 mg/dia",
                        frequencia: "Dividida em 3-4 doses",
                        duracao: "5-7 dias"
                    },
                    riniteAlergica: {
                        dose: "0,35 mg/kg/dia",
                        doseMaxima: "12 mg/dia",
                        frequencia: "Dividida em 3-4 doses",
                        duracao: "Até controle dos sintomas"
                    }
                }
            }
        }
    },

    lidocaina: {
        nome: "Lidocaína",
        formas: {
            topica: {
                descricao: "Gel ou pomada 2%",
                tipo: "gel",
                passos: [
                    "Aplicar fina camada na área a ser anestesiada",
                    "Cobrir com curativo oclusivo se necessário",
                    "Aguardar 30-60 minutos para efeito"
                ],
                precaucoes: [
                    "Não aplicar em grandes áreas",
                    "Evitar em mucosas lesadas",
                    "Monitorar reações alérgicas"
                ],
                indicacoes: {
                    anestesiaLocal: {
                        dose: "Aplicar camada fina",
                        doseMaxima: "4,5 mg/kg",
                        frequencia: "A cada 3-4 horas",
                        duracao: "Até 3 dias"
                    }
                }
            },
            sc: {
                descricao: "Solução injetável 1%, 2%",
                tipo: "solucao",
                passos: [
                    "Aspirar antes de injetar",
                    "Administrar lentamente",
                    "Observar sinais de toxicidade"
                ],
                precaucoes: [
                    "Não exceder dose máxima",
                    "Monitorar arritmias",
                    "Evitar em pacientes com bloqueio cardíaco"
                ],
                calculoDose: function(peso) {
                    const doseMg = 4 * peso; // 4mg/kg
                    const volume1 = doseMg / 10; // 1% = 10mg/mL
                    const volume2 = doseMg / 20; // 2% = 20mg/mL
                    return {
                        dose: `${doseMg} mg (1%: ${volume1.toFixed(1)} mL ou 2%: ${volume2.toFixed(1)} mL)`,
                        detalhes: "Dose máxima: 300 mg"
                    };
                },
                indicacoes: {
                    anestesiaLocal: {
                        dose: "4 mg/kg",
                        doseMaxima: "300 mg",
                        frequencia: "A cada 3-4 horas",
                        duracao: "Conforme necessidade"
                    }
                }
            }
        }
    },

    loperamida: {
        nome: "Loperamida",
        formas: {
            oral: {
                descricao: "Cápsulas 2mg, solução oral 1mg/5mL",
                tipo: "solucao",
                passos: [
                    "Administrar após cada evacuação líquida",
                    "Manter hidratação adequada"
                ],
                precaucoes: [
                    "Contraindicada em diarreia sanguinolenta",
                    "Não usar em <2 anos",
                    "Suspender se houver distensão abdominal"
                ],
                indicacoes: {
                    diarreiaAguda: {
                        dose: "0,1-0,2 mg/kg/dia",
                        doseMaxima: "8 mg/dia",
                        frequencia: "Dividida após cada evacuação",
                        duracao: "Até 2 dias"
                    }
                }
            }
        }
    },

    tetraciclina: {
        nome: "Tetraciclina",
        formas: {
            oral: {
                descricao: "Cápsulas 250mg, 500mg",
                tipo: "capsula",
                passos: [
                    "Administrar com água abundante",
                    "Evitar administrar com lácteos ou antiácidos"
                ],
                precaucoes: [
                    "Contraindicada em <8 anos e gestantes",
                    "Pode causar fotossensibilidade",
                    "Monitorar função hepática"
                ],
                indicacoes: {
                    infeccaoCutanea: {
                        dose: "25-50 mg/kg/dia",
                        doseMaxima: "2000 mg/dia",
                        frequencia: "Dividida em 4 doses",
                        duracao: "7-10 dias"
                    },
                    tracoma: {
                        dose: "25 mg/kg (dose única)",
                        doseMaxima: "1000 mg/dose",
                        frequencia: "Dose única",
                        duracao: "1 dia"
                    }
                }
            },
            topica: {
                descricao: "Pomada oftálmica 1%",
                tipo: "pomada",
                passos: [
                    "Aplicar pequena quantidade no saco conjuntival",
                    "Repetir a cada 2-4 horas"
                ],
                precaucoes: [
                    "Não usar por mais de 7 dias",
                    "Monitorar irritação ocular"
                ],
                indicacoes: {
                    conjuntivite: {
                        dose: "Aplicar pequena quantidade",
                        doseMaxima: "4 vezes ao dia",
                        frequencia: "A cada 2-4 horas",
                        duracao: "5-7 dias"
                    }
                }
            }
        }
    },

    clotrimazol: {
        nome: "Clotrimazol",
        formas: {
            topica: {
                descricao: "Creme 1%, solução 1%",
                tipo: "creme",
                passos: [
                    "Aplicar fina camada na área afetada",
                    "Massagear suavemente até completa absorção"
                ],
                precaucoes: [
                    "Evitar contato com os olhos",
                    "Não usar em feridas abertas",
                    "Monitorar irritação local"
                ],
                indicacoes: {
                    candidiaseDermatologica: {
                        dose: "Aplicar 2-3 vezes ao dia",
                        doseMaxima: "Aplicar camada fina",
                        frequencia: "2-3 vezes ao dia",
                        duracao: "2-4 semanas"
                    }
                }
            },
            vaginal: {
                descricao: "Creme vaginal 1%, óvulos 100mg",
                tipo: "creme",
                passos: [
                    "Aplicar intravaginalmente antes de dormir",
                    "Usar aplicador fornecido"
                ],
                precaucoes: [
                    "Evitar relações sexuais durante tratamento",
                    "Pode causar irritação local"
                ],
                indicacoes: {
                    candidiase: {
                        dose: "1 aplicação ao dia",
                        doseMaxima: "100 mg/dia",
                        frequencia: "1 vez ao dia",
                        duracao: "3-7 dias"
                    }
                }
            }
        }
    },

    clorexidinaCetrimida: {
        nome: "Clorexidina + Cetrimida",
        formas: {
            topica: {
                descricao: "Solução tópica 0,5% + 1,5%",
                tipo: "solucao",
                passos: [
                    "Diluir conforme necessário (1:40 para feridas)",
                    "Aplicar com compressa estéril",
                    "Não enxaguar após aplicação"
                ],
                precaucoes: [
                    "Evitar contato com olhos e ouvidos",
                    "Não usar em queimaduras extensas",
                    "Pode causar irritação cutânea"
                ],
                indicacoes: {
                    antissepsia: {
                        dose: "Aplicar conforme necessidade",
                        doseMaxima: "Área afetada",
                        frequencia: "1-2 vezes ao dia",
                        duracao: "Até cicatrização"
                    }
                }
            }
        }
    },

    nistatinaPomada: {
        nome: "Nistatina (Pomada)",
        formas: {
            oral: {
                descricao: "Suspensão oral 100.000 UI/mL",
                tipo: "suspensao",
                passos: [
                    "Agitar bem antes de usar",
                    "Manter na boca por vários minutos antes de engolir",
                    "Administrar após alimentação"
                ],
                precaucoes: [
                    "Continuar tratamento por 48h após melhora",
                    "Monitorar efeitos gastrointestinais"
                ],
                indicacoes: {
                    candidiaseOral: {
                        dose: "100.000 UI 4 vezes ao dia",
                        doseMaxima: "500.000 UI/dose",
                        frequencia: "4 vezes ao dia",
                        duracao: "7-14 dias"
                    }
                }
            },
            topica: {
                descricao: "Creme 100.000 UI/g",
                tipo: "creme",
                passos: [
                    "Aplicar fina camada na área afetada",
                    "Massagear suavemente"
                ],
                precaucoes: [
                    "Não usar em feridas abertas",
                    "Monitorar irritação local"
                ],
                indicacoes: {
                    candidiaseDermatologica: {
                        dose: "Aplicar 2-3 vezes ao dia",
                        doseMaxima: "Área afetada",
                        frequencia: "2-3 vezes ao dia",
                        duracao: "2-4 semanas"
                    }
                }
            }
        }
    },

    oxitocina: {
        nome: "Oxitocina",
        formas: {
            iv: {
                descricao: "Solução injetável 10 UI/mL",
                tipo: "solucao",
                passos: [
                    "Diluir em SF 0,9%",
                    "Administrar em bomba de infusão",
                    "Monitorar contrações uterinas"
                ],
                precaucoes: [
                    "Monitorar frequência cardíaca fetal",
                    "Ajustar dose conforme resposta",
                    "Suspender em hipertonia uterina"
                ],
                indicacoes: {
                    inducaoTrabalhoParto: {
                        dose: "1-2 mUI/min",
                        doseMaxima: "20 mUI/min",
                        frequencia: "Aumentar a cada 30-60 min",
                        duracao: "Até trabalho de parto estabelecido"
                    },
                    hemorragiaPosParto: {
                        dose: "10 UI",
                        doseMaxima: "40 UI/dia",
                        frequencia: "Dose única ou infusão contínua",
                        duracao: "Até controle do sangramento"
                    }
                }
            },
            im: {
                descricao: "Solução injetável 10 UI/mL",
                tipo: "solucao",
                passos: [
                    "Aspirar dose correta",
                    "Administrar por via intramuscular"
                ],
                precaucoes: [
                    "Monitorar pressão arterial",
                    "Evitar em pacientes com cardiopatia"
                ],
                indicacoes: {
                    hemorragiaPosParto: {
                        dose: "10 UI",
                        doseMaxima: "40 UI/dia",
                        frequencia: "Repetir em 2-4h se necessário",
                        duracao: "Até controle do sangramento"
                    }
                }
            }
        }
    },

    penicilinaVPotassio: {
        nome: "Penicilina V Potássio",
        formas: {
            oral: {
                descricao: "Comprimidos 250mg, 500mg",
                tipo: "comprimido",
                passos: [
                    "Administrar com água",
                    "Tomar 1 hora antes ou 2 horas após refeições"
                ],
                precaucoes: [
                    "Testar sensibilidade se histórico de alergia",
                    "Monitorar reações alérgicas",
                    "Completar curso completo de tratamento"
                ],
                indicacoes: {
                    infeccaoEstreptococica: {
                        dose: "25-50 mg/kg/dia",
                        doseMaxima: "2000 mg/dia",
                        frequencia: "Dividida em 3-4 doses",
                        duracao: "10 dias"
                    },
                    profilaxiaFebreReumatica: {
                        dose: "250 mg 2 vezes ao dia",
                        doseMaxima: "500 mg/dia",
                        frequencia: "2 vezes ao dia",
                        duracao: "Longo prazo"
                    }
                }
            }
        }
    },

    praziquantelPediatrico: {
        nome: "Praziquantel (Pediátrico)",
        formas: {
            oral: {
                descricao: "Comprimidos 600mg",
                tipo: "comprimido",
                passos: [
                    "Administrar com alimentos",
                    "Dividir comprimidos se necessário"
                ],
                precaucoes: [
                    "Contraindicado em neurocisticercose ocular",
                    "Pode causar tonturas",
                    "Monitorar reações alérgicas"
                ],
                indicacoes: {
                    esquistossomose: {
                        dose: "40-60 mg/kg (dose única)",
                        doseMaxima: "2400 mg/dose",
                        frequencia: "Dose única",
                        duracao: "1 dia"
                    },
                    teníase: {
                        dose: "10-25 mg/kg (dose única)",
                        doseMaxima: "1500 mg/dose",
                        frequencia: "Dose única",
                        duracao: "1 dia"
                    }
                }
            }
        }
    },

    saisReidratacaoOral: {
        nome: "Sais de Reidratação Oral",
        formas: {
            oral: {
                descricao: "Pó para reconstituição (pacote padrão OMS)",
                tipo: "solucao",
                passos: [
                    "Dissolver 1 pacote em 1 litro de água potável",
                    "Administrar pequenos volumes frequentemente",
                    "Continuar aleitamento materno"
                ],
                precaucoes: [
                    "Não adicionar açúcar ou outros sabores",
                    "Descartar solução após 24 horas",
                    "Monitorar sinais de desidratação"
                ],
                indicacoes: {
                    desidratacao: {
                        dose: "50-100 mL/kg em 4 horas",
                        doseMaxima: "Conforme tolerância",
                        frequencia: "A cada 5-10 minutos",
                        duracao: "Até reidratação completa"
                    },
                    diarreia: {
                        dose: "10 mL/kg após cada evacuação líquida",
                        doseMaxima: "Conforme perdas",
                        frequencia: "Após cada evacuação",
                        duracao: "Até cessar a diarreia"
                    }
                }
            }
        }
    },

    salbutamolNebulizacao: {
        nome: "Salbutamol (Nebulização)",
        formas: {
            nebulizacao: {
                descricao: "Solução para nebulização 5mg/mL",
                tipo: "solucao",
                passos: [
                    "Diluir 0,5 mL (2,5 mg) em 2,5 mL de SF 0,9%",
                    "Nebulizar com máscara facial ou bucal",
                    "Monitorar frequência cardíaca"
                ],
                precaucoes: [
                    "Pode causar tremores e taquicardia",
                    "Evitar uso excessivo",
                    "Monitorar resposta terapêutica"
                ],
                indicacoes: {
                    broncoespasmo: {
                        dose: "0,15 mg/kg/dose",
                        doseMaxima: "5 mg/dose",
                        frequencia: "A cada 4-6 horas",
                        duracao: "Até resolução"
                    },
                    asma: {
                        dose: "0,15 mg/kg/dose",
                        doseMaxima: "5 mg/dose",
                        frequencia: "A cada 20 min (3 doses) em crise",
                        duracao: "Até controle da crise"
                    }
                }
            },
            inalacao: {
                descricao: "Spray dosimetrado 100 mcg/dose",
                tipo: "spray",
                passos: [
                    "Agitar antes de usar",
                    "Coordenar inalação com ativação do spray",
                    "Manter apneia por 10 segundos após inalação"
                ],
                precaucoes: [
                    "Ensinar técnica de uso adequada",
                    "Monitorar uso excessivo",
                    "Lavar boca após uso para evitar candidíase"
                ],
                indicacoes: {
                    broncoespasmo: {
                        dose: "1-2 inalações",
                        doseMaxima: "8 inalações/dia",
                        frequencia: "A cada 4-6 horas",
                        duracao: "Conforme necessidade"
                    }
                }
            }
        }
    },

    sulfatoFerroso: {
        nome: "Sulfato Ferroso",
        formas: {
            oral: {
                descricao: "Gotas 25mg Fe/mL, comprimidos 40mg Fe",
                tipo: "solucao",
                passos: [
                    "Administrar com suco de frutas cítricas",
                    "Evitar administrar com lácteos ou antiácidos",
                    "Usar canudo para evitar manchas dentárias"
                ],
                precaucoes: [
                    "Pode causar constipação e fezes escuras",
                    "Manter fora do alcance de crianças (risco de intoxicação)",
                    "Monitorar resposta hematológica"
                ],
                indicacoes: {
                    anemia: {
                        dose: "3-6 mg Fe/kg/dia",
                        doseMaxima: "200 mg Fe/dia",
                        frequencia: "1-2 vezes ao dia",
                        duracao: "3-6 meses"
                    },
                    deficienciaFerro: {
                        dose: "3-6 mg Fe/kg/dia",
                        doseMaxima: "200 mg Fe/dia",
                        frequencia: "1-2 vezes ao dia",
                        duracao: "2-3 meses após correção da anemia"
                    }
                }
            }
        }
    },

    acidoFolico: {
        nome: "Ácido Fólico",
        formas: {
            oral: {
                descricao: "Comprimidos 1mg, 5mg",
                tipo: "comprimido",
                passos: [
                    "Administrar com água",
                    "Pode ser triturado se necessário"
                ],
                precaucoes: [
                    "Monitorar resposta hematológica",
                    "Suplementar vitamina B12 se necessário"
                ],
                indicacoes: {
                    deficienciaAcidoFolico: {
                        dose: "1-5 mg/dia",
                        doseMaxima: "5 mg/dia",
                        frequencia: "1 vez ao dia",
                        duracao: "1-4 meses"
                    },
                    anemiaMegaloblastica: {
                        dose: "5 mg/dia",
                        doseMaxima: "5 mg/dia",
                        frequencia: "1 vez ao dia",
                        duracao: "Até normalização hematológica"
                    }
                }
            }
        }
    },

    vitaminaA: {
        nome: "Vitamina A",
        formas: {
            oral: {
                descricao: "Cápsulas 50.000 UI, 200.000 UI",
                tipo: "capsula",
                passos: [
                    "Administrar dose única conforme protocolo",
                    "Pode abrir cápsula e misturar com alimento"
                ],
                precaucoes: [
                    "Não exceder dose recomendada",
                    "Monitorar sinais de toxicidade em uso prolongado"
                ],
                indicacoes: {
                    deficienciaVitaminaA: {
                        dose: "<6 meses: 50.000 UI; 6-12 meses: 100.000 UI; >12 meses: 200.000 UI",
                        doseMaxima: "200.000 UI/dose",
                        frequencia: "Dose única ou a cada 6 meses",
                        duracao: "Conforme necessidade"
                    },
                    xeroftalmia: {
                        dose: "50.000-200.000 UI conforme idade",
                        doseMaxima: "200.000 UI/dose",
                        frequencia: "Dose única no dia 1, 2 e 14",
                        duracao: "3 doses"
                    }
                }
            }
        }
    },

    vitaminaE: {
        nome: "Vitamina E",
        formas: {
            oral: {
                descricao: "Cápsulas 100 UI, 200 UI",
                tipo: "capsula",
                passos: [
                    "Administrar com alimentos",
                    "Pode abrir cápsula se necessário"
                ],
                precaucoes: [
                    "Monitorar coagulação em altas doses",
                    "Evitar em pacientes com deficiência de vitamina K"
                ],
                indicacoes: {
                    deficienciaVitaminaE: {
                        dose: "10-50 UI/kg/dia",
                        doseMaxima: "400 UI/dia",
                        frequencia: "1-2 vezes ao dia",
                        duracao: "Conforme necessidade"
                    }
                }
            }
        }
    },

    ceftriaxonaInjetavel: {
        nome: "Ceftriaxona (Injetável)",
        formas: {
            iv: {
                descricao: "Pó para solução injetável 1g",
                tipo: "solucao",
                passos: [
                    "Reconstituir com água para injetáveis",
                    "Agitar até dissolução completa",
                    "Administrar em infusão lenta (2-4 minutos)"
                ],
                precaucoes: [
                    "Verificar alergias a cefalosporinas",
                    "Monitorar reações no local da injeção",
                    "Não misturar com soluções contendo cálcio"
                ],
                indicacoes: {
                    meningite: {
                        dose: "100 mg/kg/dia",
                        doseMaxima: "4000 mg/dia",
                        frequencia: "1-2 doses diárias",
                        duracao: "10-14 dias"
                    },
                    sepse: {
                        dose: "50-100 mg/kg/dia",
                        doseMaxima: "4000 mg/dia",
                        frequencia: "1-2 doses diárias",
                        duracao: "7-10 dias"
                    }
                }
            },
            im: {
                descricao: "Pó para solução injetável 1g",
                tipo: "solucao",
                passos: [
                    "Reconstituir com lidocaína a 1%",
                    "Agitar até dissolução completa",
                    "Administrar por via intramuscular profunda"
                ],
                precaucoes: [
                    "Verificar alergias a cefalosporinas",
                    "Pode causar dor no local da injeção",
                    "Não usar em neonatos com hiperbilirrubinemia"
                ],
                indicacoes: {
                    pneumonia: {
                        dose: "50 mg/kg/dia",
                        doseMaxima: "2000 mg/dia",
                        frequencia: "1 dose diária",
                        duracao: "7-10 dias"
                    }
                }
            }
        }
    }
};

// ==================== SISTEMA DE PERCENTIS (OMS) ====================
const PERCENTIS = {
    pesoIdade: {
        meninos: [
            { idade: 0, p3: 2.5, p15: 2.9, p50: 3.3, p85: 3.9, p97: 4.3 },
            { idade: 1, p3: 3.4, p15: 3.9, p50: 4.5, p85: 5.1, p97: 5.6 },
            { idade: 2, p3: 4.3, p15: 4.9, p50: 5.6, p85: 6.3, p97: 6.9 },
            { idade: 3, p3: 5.0, p15: 5.6, p50: 6.4, p85: 7.2, p97: 7.9 },
            { idade: 4, p3: 5.6, p15: 6.2, p50: 7.0, p85: 7.8, p97: 8.6 },
            { idade: 5, p3: 6.0, p15: 6.7, p50: 7.5, p85: 8.4, p97: 9.2 },
            { idade: 6, p3: 6.4, p15: 7.1, p50: 8.0, p85: 8.9, p97: 9.7 },
            { idade: 7, p3: 6.7, p15: 7.4, p50: 8.3, p85: 9.3, p97: 10.2 },
            { idade: 8, p3: 6.9, p15: 7.7, p50: 8.6, p85: 9.6, p97: 10.5 },
            { idade: 9, p3: 7.1, p15: 7.9, p50: 8.9, p85: 9.9, p97: 10.9 },
            { idade: 10, p3: 7.4, p15: 8.1, p50: 9.1, p85: 10.2, p97: 11.2 },
            { idade: 11, p3: 7.6, p15: 8.4, p50: 9.4, p85: 10.5, p97: 11.5 },
            { idade: 12, p3: 7.7, p15: 8.6, p50: 9.6, p85: 10.8, p97: 11.8 },
            { idade: 18, p3: 8.4, p15: 9.3, p50: 10.5, p85: 11.8, p97: 13.0 },
            { idade: 24, p3: 9.0, p15: 10.0, p50: 11.3, p85: 12.7, p97: 14.0 },
            { idade: 36, p3: 10.2, p15: 11.3, p50: 12.7, p85: 14.3, p97: 15.8 },
            { idade: 48, p3: 11.3, p15: 12.5, p50: 14.1, p85: 15.9, p97: 17.5 },
            { idade: 60, p3: 12.4, p15: 13.7, p50: 15.4, p85: 17.4, p97: 19.2 }
        ],
        meninas: [
            { idade: 0, p3: 2.4, p15: 2.8, p50: 3.2, p85: 3.7, p97: 4.1 },
            { idade: 1, p3: 3.2, p15: 3.7, p50: 4.2, p85: 4.8, p97: 5.3 },
            { idade: 2, p3: 4.0, p15: 4.5, p50: 5.1, p85: 5.8, p97: 6.4 },
            { idade: 3, p3: 4.6, p15: 5.2, p50: 5.8, p85: 6.6, p97: 7.3 },
            { idade: 4, p3: 5.1, p15: 5.7, p50: 6.4, p85: 7.3, p97: 8.0 },
            { idade: 5, p3: 5.5, p15: 6.2, p50: 6.9, p85: 7.8, p97: 8.6 },
            { idade: 6, p3: 5.8, p15: 6.5, p50: 7.3, p85: 8.3, p97: 9.2 },
            { idade: 7, p3: 6.1, p15: 6.8, p50: 7.6, p85: 8.6, p97: 9.6 },
            { idade: 8, p3: 6.3, p15: 7.0, p50: 7.9, p85: 9.0, p97: 10.0 },
            { idade: 9, p3: 6.6, p15: 7.3, p50: 8.2, p85: 9.3, p97: 10.4 },
            { idade: 10, p3: 6.8, p15: 7.5, p50: 8.5, p85: 9.6, p97: 10.7 },
            { idade: 11, p3: 7.0, p15: 7.7, p50: 8.7, p85: 9.9, p97: 11.1 },
            { idade: 12, p3: 7.1, p15: 7.9, p50: 8.9, p85: 10.1, p97: 11.3 },
            { idade: 18, p3: 7.8, p15: 8.6, p50: 9.7, p85: 11.0, p97: 12.3 },
            { idade: 24, p3: 8.4, p15: 9.3, p50: 10.5, p85: 11.9, p97: 13.3 },
            { idade: 36, p3: 9.6, p15: 10.6, p50: 12.0, p85: 13.6, p97: 15.0 },
            { idade: 48, p3: 10.6, p15: 11.7, p50: 13.3, p85: 15.0, p97: 16.6 },
            { idade: 60, p3: 11.7, p15: 12.9, p50: 14.5, p85: 16.4, p97: 18.2 }
        ]
    },
    alturaIdade: {
        meninos: [
            { idade: 0, p3: 46.1, p15: 47.5, p50: 49.9, p85: 52.3, p97: 54.7 },
            { idade: 1, p3: 51.5, p15: 53.0, p50: 55.6, p85: 58.2, p97: 60.8 },
            { idade: 2, p3: 55.3, p15: 56.9, p50: 59.6, p85: 62.3, p97: 65.0 },
            { idade: 3, p3: 58.4, p15: 60.1, p50: 63.0, p85: 65.9, p97: 68.8 },
            { idade: 4, p3: 61.0, p15: 62.8, p50: 65.8, p85: 68.8, p97: 71.8 },
            { idade: 5, p3: 63.3, p15: 65.1, p50: 68.2, p85: 71.3, p97: 74.4 },
            { idade: 6, p3: 65.3, p15: 67.1, p50: 70.3, p85: 73.5, p97: 76.7 },
            { idade: 7, p3: 67.1, p15: 68.9, p50: 72.1, p85: 75.3, p97: 78.5 },
            { idade: 8, p3: 68.7, p15: 70.5, p50: 73.7, p85: 76.9, p97: 80.1 },
            { idade: 9, p3: 70.2, p15: 72.0, p50: 75.2, p85: 78.4, p97: 81.6 },
            { idade: 10, p3: 71.6, p15: 73.4, p50: 76.6, p85: 79.8, p97: 83.0 },
            { idade: 11, p3: 72.9, p15: 74.7, p50: 77.9, p85: 81.1, p97: 84.3 },
            { idade: 12, p3: 74.1, p15: 75.9, p50: 79.1, p85: 82.3, p97: 85.5 },
            { idade: 18, p3: 78.0, p15: 79.9, p50: 83.3, p85: 86.7, p97: 90.1 },
            { idade: 24, p3: 81.3, p15: 83.3, p50: 86.8, p85: 90.3, p97: 93.8 },
            { idade: 36, p3: 87.4, p15: 89.6, p50: 93.3, p85: 97.0, p97: 100.7 },
            { idade: 48, p3: 92.4, p15: 94.7, p50: 98.4, p85: 102.1, p97: 105.8 },
            { idade: 60, p3: 96.7, p15: 99.1, p50: 102.7, p85: 106.3, p97: 109.9 }
        ],
        meninas: [
            { idade: 0, p3: 45.6, p15: 47.0, p50: 49.1, p85: 51.2, p97: 53.3 },
            { idade: 1, p3: 50.5, p15: 52.0, p50: 54.7, p85: 57.4, p97: 60.1 },
            { idade: 2, p3: 54.4, p15: 56.0, p50: 58.7, p85: 61.4, p97: 64.1 },
            { idade: 3, p3: 57.5, p15: 59.2, p50: 62.1, p85: 65.0, p97: 67.9 },
            { idade: 4, p3: 60.1, p15: 61.8, p50: 64.7, p85: 67.6, p97: 70.5 },
            { idade: 5, p3: 62.4, p15: 64.1, p50: 67.1, p85: 70.1, p97: 73.1 },
            { idade: 6, p3: 64.4, p15: 66.2, p50: 69.3, p85: 72.4, p97: 75.5 },
            { idade: 7, p3: 66.2, p15: 68.0, p50: 71.3, p85: 74.6, p97: 77.9 },
            { idade: 8, p3: 67.9, p15: 69.7, p50: 73.1, p85: 76.5, p97: 79.9 },
            { idade: 9, p3: 69.5, p15: 71.3, p50: 74.8, p85: 78.3, p97: 81.8 },
            { idade: 10, p3: 71.0, p15: 72.8, p50: 76.4, p85: 80.0, p97: 83.6 },
            { idade: 11, p3: 72.5, p15: 74.3, p50: 77.9, p85: 81.5, p97: 85.1 },
            { idade: 12, p3: 73.9, p15: 75.7, p50: 79.3, p85: 82.9, p97: 86.5 },
            { idade: 18, p3: 77.8, p15: 79.7, p50: 83.3, p85: 86.9, p97: 90.5 },
            { idade: 24, p3: 81.1, p15: 83.1, p50: 86.8, p85: 90.5, p97: 94.2 },
            { idade: 36, p3: 87.1, p15: 89.3, p50: 93.0, p85: 96.7, p97: 100.4 },
            { idade: 48, p3: 92.1, p15: 94.4, p50: 98.1, p85: 101.8, p97: 105.5 },
            { idade: 60, p3: 96.4, p15: 98.8, p50: 102.7, p85: 106.6, p97: 110.5 }
        ]
    }
};

// ==================== PROTOCOLOS CLÍNICOS ====================
const PROTOCOLOS = {
    pneumonia: {
        titulo: "Protocolo Avançado de Manejo de Pneumonia em Pediatria",
        conteudo: `
            <div class="protocol-header">
                <h4>Critérios Diagnósticos (OMS Modificados)</h4>
                <div class="severity-indicators">
                    <span class="severity-mild">Leve</span>
                    <span class="severity-moderate">Moderada</span>
                    <span class="severity-severe">Grave</span>
                </div>
            </div>
            
            <div class="diagnostic-criteria">
                <div class="criteria-card">
                    <h5>Essenciais</h5>
                    <ul>
                        <li>Febre > 38.5°C persistente > 48h</li>
                        <li>Taquipneia idade-dependente:
                            <ul class="age-specific">
                                <li>< 2 meses: ≥ 60 rpm</li>
                                <li>2-12 meses: ≥ 50 rpm</li>
                                <li>1-5 anos: ≥ 40 rpm</li>
                                <li>>5 anos: ≥ 30 rpm</li>
                            </ul>
                        </li>
                        <li>SatO₂ < 92% em ar ambiente</li>
                    </ul>
                </div>
                
                <div class="criteria-card">
                    <h5>Acessórios</h5>
                    <ul>
                        <li>Retrações subcostais/intercostais</li>
                        <li>Batimento de asa nasal</li>
                        <li>Quebrageamento costal</li>
                        <li>Alteração do estado mental</li>
                    </ul>
                </div>
            </div>
            
            <h4 class="management-title">Manejo Terapêutico</h4>
            
            <div class="management-tabs">
                <div class="tab active" data-tab="ambulatorial">Ambulatorial</div>
                <div class="tab" data-tab="hospitalar">Hospitalar</div>
                <div class="tab" data-tab="uti">UTI</div>
            </div>
            
            <div class="tab-content active" id="ambulatorial">
                <div class="therapy-card first-line">
                    <h5>Primeira Linha</h5>
                    <div class="result-grid">
                        <div><span class="label">Medicação:</span> <span class="value">Amoxicilina</span></div>
                        <div><span class="label">Dose:</span> <span class="value">80-90 mg/kg/dia</span></div>
                        <div><span class="label">Apresentação:</span> <span class="value">Suspensão 250mg/5mL</span></div>
                        <div><span class="label">Esquema:</span> <span class="value">8/8h (3x/dia)</span></div>
                        <div><span class="label">Duração:</span> <span class="value">7-10 dias</span></div>
                    </div>
                    <div class="notes">
                        <strong>Observações:</strong> Aumentar dose para 90 mg/kg/dia em áreas com resistência
                    </div>
                </div>
                
                <div class="therapy-card alternative">
                    <h5>Alternativa para Alérgicos</h5>
                    <div class="result-grid">
                        <div><span class="label">Medicação:</span> <span class="value">Azitromicina</span></div>
                        <div><span class="label">Dose:</span> <span class="value">10 mg/kg/dia</span></div>
                        <div><span class="label">Duração:</span> <span class="value">3 dias</span></div>
                    </div>
                </div>
            </div>
            
            <div class="tab-content" id="hospitalar">
                <div class="therapy-card">
                    <h5>Padrão Ouro Hospitalar</h5>
                    <div class="result-grid">
                        <div><span class="label">Medicação:</span> <span class="value">Ampicilina + Gentamicina</span></div>
                        <div><span class="label">Dose Amp:</span> <span class="value">200 mg/kg/dia IV (6/6h)</span></div>
                        <div><span class="label">Dose Genta:</span> <span class="value">7.5 mg/kg/dia IV (1x/dia)</span></div>
                        <div><span class="label">Monitorar:</span> <span class="value">Função renal, audiometria</span></div>
                    </div>
                </div>
                
                <div class="combo-therapy">
                    <h5>Associações Recomendadas</h5>
                    <div class="combination">
                        <span class="drug">Oxigenioterapia</span> +
                        <span class="drug">Fisioterapia Respiratória</span> +
                        <span class="drug">Hidratação IV</span>
                    </div>
                </div>
            </div>
            
            <div class="alert-card danger">
                <h4><i class="fas fa-exclamation-triangle"></i> Critérios de Internação Obrigatória</h4>
                <div class="warning-grid">
                    <div><i class="fas fa-baby"></i> Idade < 3 meses</div>
                    <div><i class="fas fa-lungs"></i> SatO₂ < 90% em ar ambiente</div>
                    <div><i class="fas fa-heartbeat"></i> Taquicardia persistente</div>
                    <div><i class="fas fa-brain"></i> Alteração do sensório</div>
                </div>
            </div>
            
            <h4>Monitorização</h4>
            <div class="monitoring-schedule">
                <div class="monitoring-point">
                    <span class="time">24-48h</span>
                    <span class="action">Reavaliação clínica obrigatória</span>
                </div>
                <div class="monitoring-point">
                    <span class="time">72h</span>
                    <span class="action">Controle radiológico se sem melhora</span>
                </div>
            </div>
        `
    },

    meningite: {
        titulo: "Protocolo de Manejo de Meningite Bacteriana em Pediatria",
        conteudo: `
            <div class="protocol-header">
                <h4>Triagem e Classificação de Gravidade</h4>
                <div class="meningitis-score">
                    <span class="score-item">Escala de Glasgow ≤ 8</span>
                    <span class="score-item">PCR > 80 mg/L</span>
                    <span class="score-item">Pleocitose > 1000 células</span>
                </div>
            </div>
            
            <h4>Abordagem Diagnóstica</h4>
            <div class="diagnostic-flow">
                <div class="flow-step">
                    <div class="step-number">1</div>
                    <div class="step-content">Punção lombar imediata se estável</div>
                </div>
                <div class="flow-step">
                    <div class="step-number">2</div>
                    <div class="step-content">Hemograma, PCR, hemocultura</div>
                </div>
                <div class="flow-step">
                    <div class="step-number">3</div>
                    <div class="step-content">Bandeletas urinárias (sepsis)</div>
                </div>
            </div>
            
            <h4>Terapia Antimicrobiana Empírica</h4>
            <div class="age-specific-therapy">
                <div class="age-group">
                    <h5>Neonatos (0-28 dias)</h5>
                    <div class="result-grid">
                        <div><span class="label">Esquema:</span> <span class="value">Ampicilina + Cefotaxima</span></div>
                        <div><span class="label">Dose Amp:</span> <span class="value">200 mg/kg/dia (8/8h)</span></div>
                        <div><span class="label">Dose Cefo:</span> <span class="value">200 mg/kg/dia (6/8h)</span></div>
                        <div><span class="label">Duração:</span> <span class="value">14-21 dias</span></div>
                    </div>
                </div>
                
                <div class="age-group">
                    <h5>1-3 meses</h5>
                    <div class="result-grid">
                        <div><span class="label">Esquema:</span> <span class="value">Ceftriaxona + Vancomicina</span></div>
                        <div><span class="label">Dose Cef:</span> <span class="value">100 mg/kg/dia (12/12h)</span></div>
                        <div><span class="label">Dose Vanco:</span> <span class="value">60 mg/kg/dia (6/6h)</span></div>
                    </div>
                </div>
            </div>
            
            <div class="adjuvant-therapy">
                <h5>Terapias Adjuvantes</h5>
                <div class="adjuvant-card">
                    <div class="adjuvant-name">Dexametasona</div>
                    <div class="adjuvant-details">0.15 mg/kg (máx 10 mg) 6/6h por 4 dias</div>
                    <div class="adjuvant-note">Iniciar 15 min antes ou com 1ª dose de ATB</div>
                </div>
            </div>
            
            <div class="alert-card warning">
                <h4><i class="fas fa-vial"></i> Monitorização Intensiva</h4>
                <ul>
                    <li>PIC: Manter PAM > 50 mmHg</li>
                    <li>Eletrólitos: Sódio sérico 6/6h (risco de SIADH)</li>
                    <li>Glicemia: Controle rigoroso (70-140 mg/dL)</li>
                </ul>
            </div>
            
            <h4>Complicações e Manejo</h4>
            <div class="complications-grid">
                <div class="complication">
                    <div class="comp-title">Convulsões</div>
                    <div class="comp-management">Lorazepam 0.1 mg/kg IV</div>
                </div>
                <div class="complication">
                    <div class="comp-title">Hidrocefalia</div>
                    <div class="comp-management">Derivação ventricular emergencial</div>
                </div>
            </div>
        `
    },

    hiv: {
        titulo: "Protocolo de Manejo de HIV Pediátrico",
        conteudo: `
            <div class="hiv-protocol">
                <h4>Diagnóstico e Classificação</h4>
                <div class="diagnostic-cards">
                    <div class="diagnostic-card">
                        <h5>Testes Diagnósticos</h5>
                        <ul>
                            <li>< 18 meses: PCR-DNA (2 amostras)</li>
                            <li>> 18 meses: Teste rápido + ELISA</li>
                            <li>Carga viral basal</li>
                        </ul>
                    </div>
                    <div class="diagnostic-card">
                        <h5>Classificação Imunológica</h5>
                        <ul>
                            <li>CD4%: < 25% (grave)</li>
                            <li>CD4 absoluto: Idade-dependente</li>
                        </ul>
                    </div>
                </div>
                
                <h4>Terapia Antirretroviral Inicial</h4>
                <div class="art-regimens">
                    <div class="regimen-card first-line">
                        <h5>Primeira Linha (OMS)</h5>
                        <div class="regimen-details">
                            <div class="drug-combo">
                                <span class="drug">ABC</span> +
                                <span class="drug">3TC</span> +
                                <span class="drug">LPV/r</span>
                            </div>
                            <div class="dosing">
                                <p><strong>Doses:</strong></p>
                                <ul>
                                    <li>ABC: 60 mg BID (3-6kg)</li>
                                    <li>3TC: 30 mg BID (<14kg)</li>
                                    <li>LPV/r: 12/3 mg/kg BID</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div class="regimen-card alternative">
                        <h5>Alternativa</h5>
                        <div class="regimen-details">
                            <div class="drug-combo">
                                <span class="drug">AZT</span> +
                                <span class="drug">3TC</span> +
                                <span class="drug">NVP</span>
                            </div>
                            <div class="dosing">
                                <p><strong>Observação:</strong> Para mães expostas a NNRTI</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <h4>Monitorização</h4>
                <div class="monitoring-schedule">
                    <div class="monitoring-phase">
                        <h5>Fase Inicial (0-6 meses)</h5>
                        <ul>
                            <li>Carga viral mensal</li>
                            <li>CD4 trimestral</li>
                            <li>Perfil lipídico</li>
                        </ul>
                    </div>
                    <div class="monitoring-phase">
                        <h5>Manutenção</h5>
                        <ul>
                            <li>CV a cada 3-6 meses</li>
                            <li>CD4 semestral</li>
                        </ul>
                    </div>
                </div>
                
                <div class="alert-card warning">
                    <h4><i class="fas fa-pills"></i> Profilaxias Oportunistas</h4>
                    <div class="prophylaxis-grid">
                        <div>
                            <span class="proph-drug">Cotrimoxazol</span>
                            <span class="proph-dose">5 mg/kg/dia</span>
                        </div>
                        <div>
                            <span class="proph-indication">PCP, toxo</span>
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    poliomielite: {
        titulo: "Protocolo de Manejo de Poliomielite e PAFP",
        conteudo: `
            <div class="polio-protocol">
                <h4>Vigilância e Diagnóstico</h4>
                <div class="surveillance-criteria">
                    <div class="criteria-card">
                        <h5>Definição de Caso</h5>
                        <ul>
                            <li>Febre + paralisia flácida aguda</li>
                            <li>Assimetria de membros</li>
                            <li>Exclusão de GBS e mielite</li>
                        </ul>
                    </div>
                    <div class="criteria-card">
                        <h5>Coleta de Amostras</h5>
                        <ul>
                            <li>2 fezes (24h intervalo)</li>
                            <li>LCR para análise</li>
                            <li>Swab retal</li>
                        </ul>
                    </div>
                </div>
                
                <h4>Manejo Clínico</h4>
                <div class="management-steps">
                    <div class="step">
                        <div class="step-number">1</div>
                        <div class="step-content">Isolamento respiratório e entérico</div>
                    </div>
                    <div class="step">
                        <div class="step-number">2</div>
                        <div class="step-content">Repouso absoluto (prevenção progressão)</div>
                    </div>
                    <div class="step">
                        <div class="step-number">3</div>
                        <div class="step-content">Analgesia (paracetamol)</div>
                    </div>
                </div>
                
                <h4>Complicações e Manejo</h4>
                <div class="complications-grid">
                    <div class="complication">
                        <div class="comp-title">Insuficiência Respiratória</div>
                        <div class="comp-management">Ventilação mecânica precoce</div>
                    </div>
                    <div class="complication">
                        <div class="comp-title">Bulbar</div>
                        <div class="comp-management">NGT para alimentação</div>
                    </div>
                </div>
                
                <div class="alert-card warning">
                    <h4><i class="fas fa-syringe"></i> Vacinação de Contatos</h4>
                    <ul>
                        <li>Vacina oral (bivalente) para todos contatos</li>
                        <li>Bloqueio vacinal em raio de 5km</li>
                    </ul>
                </div>
            </div>
        `
    },

    asfixiaNeonatal: {
        titulo: "Protocolo de Reanimação Neonatal e Manejo de Asfixia",
        conteudo: `
            <div class="resuscitation-protocol">
                <h4>Algoritmo de Reanimação (ILCOR 2023)</h4>
                <div class="algorithm-steps">
                    <div class="algorithm-phase">
                        <h5>Fase Inicial (0-30s)</h5>
                        <ul>
                            <li>Secar, estimular, posicionar</li>
                            <li>Avaliar respiração e FC</li>
                        </ul>
                    </div>
                    <div class="algorithm-phase">
                        <h5>Ventilação (30-60s)</h5>
                        <ul>
                            <li>PIP 20-25 cmH₂O</li>
                            <li>FiO₂ 21-30% inicial</li>
                        </ul>
                    </div>
                    <div class="algorithm-phase">
                        <h5>Compressões (FC<60)</h5>
                        <ul>
                            <li>Relação 3:1 (90 eventos/min)</li>
                            <li>Profundidade 1/3 AP</li>
                        </ul>
                    </div>
                </div>
                
                <h4>Pós-Reanimação</h4>
                <div class="post-resus-management">
                    <div class="management-card">
                        <h5>Hipotermia Terapêutica</h5>
                        <ul>
                            <li>Iniciar nas primeiras 6h</li>
                            <li>Alvo: 33.5°C por 72h</li>
                            <li>Monitorar EEG contínuo</li>
                        </ul>
                    </div>
                    <div class="management-card">
                        <h5>Suporte Avançado</h5>
                        <ul>
                            <li>Glicemia: 70-100 mg/dL</li>
                            <li>PAM: > GA + 5 mmHg</li>
                        </ul>
                    </div>
                </div>
                
                <div class="alert-card danger">
                    <h4><i class="fas fa-brain"></i> Avaliação Neurológica</h4>
                    <ul>
                        <li>EEG amplitude-integrado</li>
                        <li>RMN cerebral dia 3-5</li>
                        <li>Sarnat modificado</li>
                    </ul>
                </div>
            </div>
        `
    },

    reanimacao: {
        titulo: "Protocolo Avançado de Suporte Vital Pediátrico",
        conteudo: `
            <div class="pals-protocol">
                <h4>Algoritmo de PCR Pediátrico</h4>
                <div class="pals-algorithm">
                    <div class="algorithm-step">
                        <div class="step-title">Suporte Básico</div>
                        <div class="step-content">
                            <ul>
                                <li>Compressões 100-120/min</li>
                                <li>Ventilação 10-12/min</li>
                                <li>Relação 15:2 (1 socorrista)</li>
                            </ul>
                        </div>
                    </div>
                    <div class="algorithm-step">
                        <div class="step-title">Ritmo Chocável</div>
                        <div class="step-content">
                            <ul>
                                <li>Desfibrilação: 4 J/kg</li>
                                <li>Adrenalina: 0.01 mg/kg</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <h4>Medicações de Emergência</h4>
                <div class="medication-grid">
                    <div class="med-card">
                        <div class="med-name">Adrenalina</div>
                        <div class="med-dose">0.01 mg/kg (1:10,000)</div>
                        <div class="med-frequency">3-5 min</div>
                    </div>
                    <div class="med-card">
                        <div class="med-name">Amiodarona</div>
                        <div class="med-dose">5 mg/kg (máx 300mg)</div>
                    </div>
                </div>
                
                <div class="alert-card warning">
                    <h4><i class="fas fa-heartbeat"></i> Pós-Ressuscitação</h4>
                    <ul>
                        <li>Oxigenação normotérmica</li>
                        <li>Ventilação protetora</li>
                        <li>Controle glicêmico</li>
                    </ul>
                </div>
            </div>
        `
    },

    varicela: {
        titulo: "Protocolo de Manejo de Varicela e Complicações",
        conteudo: `
            <div class="varicella-protocol">
                <h4>Critérios Diagnósticos</h4>
                <div class="diagnostic-features">
                    <div class="feature-card">
                        <h5>Clássicos</h5>
                        <ul>
                            <li>Febre baixa + pródromo</li>
                            <li>Lesões em "gotas de orvalho"</li>
                            <li>Polimorfismo cutâneo</li>
                        </ul>
                    </div>
                    <div class="feature-card">
                        <h5>Graves</h5>
                        <ul>
                            <li>Febre > 39°C persistente</li>
                            <li>Lesões hemorrágicas</li>
                            <li>Sinais neurológicos</li>
                        </ul>
                    </div>
                </div>
                
                <h4>Terapia Antiviral</h4>
                <div class="treatment-options">
                    <div class="option-card">
                        <h5>Imunocompetentes</h5>
                        <div class="treatment-details">
                            <div class="drug">Aciclovir</div>
                            <div class="dose">20 mg/kg/dose (máx 800mg)</div>
                            <div class="frequency">8/8h por 5 dias</div>
                        </div>
                    </div>
                    <div class="option-card">
                        <h5>Imunodeprimidos</h5>
                        <div class="treatment-details">
                            <div class="drug">Aciclovir IV</div>
                            <div class="dose">10 mg/kg/dose</div>
                            <div class="frequency">8/8h por 7-10 dias</div>
                        </div>
                    </div>
                </div>
                
                <h4>Profilaxia Pós-Exposição</h4>
                <div class="prophylaxis-options">
                    <div class="proph-card">
                        <div class="proph-type">Vacina</div>
                        <div class="proph-details">Dose única em até 5 dias</div>
                    </div>
                    <div class="proph-card">
                        <div class="proph-type">IG Varicela</div>
                        <div class="proph-details">400 mg/kg em até 10 dias</div>
                    </div>
                </div>
                
                <div class="alert-card warning">
                    <h4><i class="fas fa-lungs"></i> Complicações</h4>
                    <div class="complications-grid">
                        <div>Pneumonite varicelosa</div>
                        <div>Encefalite</div>
                        <div>Síndrome de Reye</div>
                    </div>
                </div>
            </div>
        `
    },

    malaria: {
        titulo: "Protocolo Avançado de Manejo de Malária",
        conteudo: `
            <div class="malaria-protocol">
                <h4>Classificação de Gravidade (OMS 2023)</h4>
                <div class="severity-criteria">
                    <div class="criteria-card">
                        <h5>Malária Não Complicada</h5>
                        <ul>
                            <li>Febre + teste positivo</li>
                            <li>Sem sinais de alarme</li>
                        </ul>
                    </div>
                    <div class="criteria-card severe">
                        <h5>Malária Grave</h5>
                        <ul>
                            <li>Coma (GCS ≤ 11)</li>
                            <li>Hipoglicemia (< 40 mg/dL)</li>
                            <li>Acidose metabólica</li>
                        </ul>
                    </div>
                </div>
                
                <h4>Terapia Específica</h4>
                <div class="treatment-options">
                    <div class="option-card">
                        <h5>Não Complicada</h5>
                        <div class="treatment-details">
                            <div class="drug">ACT (Artemeter-Lumefantrina)</div>
                            <div class="dose">Peso-dependente (3 dias)</div>
                            <div class="note">Com alimentos gordurosos</div>
                        </div>
                    </div>
                    <div class="option-card severe">
                        <h5>Grave</h5>
                        <div class="treatment-details">
                            <div class="drug">Artesunato IV</div>
                            <div class="dose">2.4 mg/kg (0,12,24h)</div>
                            <div class="note">Monitorar hemólise</div>
                        </div>
                    </div>
                </div>
                
                <h4>Manejo de Complicações</h4>
                <div class="complications-management">
                    <div class="comp-card">
                        <div class="comp-title">Hipoglicemia</div>
                        <div class="comp-treatment">Dextrose 10% 5 mL/kg</div>
                    </div>
                    <div class="comp-card">
                        <div class="comp-title">Anemia Grave</div>
                        <div class="comp-treatment">Transfusão se Hb < 5 g/dL</div>
                    </div>
                </div>
                
                <div class="alert-card warning">
                    <h4><i class="fas fa-microscope"></i> Monitorização</h4>
                    <ul>
                        <li>Parasitemia diária</li>
                        <li>Hemoglobina sérica</li>
                        <li>Função renal</li>
                    </ul>
                </div>
            </div>
        `
    },

    desidratacao: {
        titulo: "Protocolo Avançado de Manejo de Desidratação",
        conteudo: `
            <div class="dehydration-protocol">
                <h4>Avaliação Clínica</h4>
                <div class="assessment-grid">
                    <div class="assessment-card mild">
                        <h5>Leve (3-5%)</h5>
                        <ul>
                            <li>Sede leve</li>
                            <li>Mucosas levemente secas</li>
                        </ul>
                    </div>
                    <div class="assessment-card moderate">
                        <h5>Moderada (6-9%)</h5>
                        <ul>
                            <li>Olhos fundos</li>
                            <li>Pele com turgor reduzido</li>
                        </ul>
                    </div>
                    <div class="assessment-card severe">
                        <h5>Grave (>10%)</h5>
                        <ul>
                            <li>Choque hipovolêmico</li>
                            <li>Consciência alterada</li>
                        </ul>
                    </div>
                </div>
                
                <h4>Terapia de Reidratação</h4>
                <div class="rehydration-options">
                    <div class="option-card oral">
                        <h5>Via Oral (Plano A/B)</h5>
                        <div class="treatment-details">
                            <div class="fluid">SRO (50-100 mL/kg)</div>
                            <div class="schedule">5 mL a cada 5 min</div>
                        </div>
                    </div>
                    <div class="option-card iv">
                        <h5>Via IV (Plano C)</h5>
                        <div class="treatment-details">
                            <div class="fluid">Ringer Lactato</div>
                            <div class="schedule">20 mL/kg em 30 min</div>
                        </div>
                    </div>
                </div>
                
                <h4>Monitorização</h4>
                <div class="monitoring-table">
                    <div class="monitoring-row header">
                        <div>Parâmetro</div>
                        <div>Frequência</div>
                    </div>
                    <div class="monitoring-row">
                        <div>Diurese</div>
                        <div>Hora em hora</div>
                    </div>
                    <div class="monitoring-row">
                        <div>Peso</div>
                        <div>6/6h</div>
                    </div>
                </div>
                
                <div class="alert-card warning">
                    <h4><i class="fas fa-exclamation-circle"></i> Sinais de Alarme</h4>
                    <ul>
                        <li>Vômitos incoercíveis</li>
                        <li>Distensão abdominal</li>
                        <li>Edema periférico</li>
                    </ul>
                </div>
            </div>
        `
    },

    // Metronidazol
    metronidazolTopico: {
        nome: "Metronidazol (Tópico)",
        formas: {
            oral: {
                descricao: "Suspensão oral 40mg/mL",
                tipo: "suspensao",
                concentracao: "40mg/mL",
                passos: [
                    "Agitar bem antes de usar",
                    "Administrar com alimentos para reduzir irritação gástrica"
                ],
                precaucoes: [
                    "Pode causar gosto metálico na boca",
                    "Evitar bebidas alcoólicas durante o tratamento",
                    "Urina pode ficar escura"
                ],
                calculoDose: function(peso, indicacao) {
                    let doseDiaria;
                    if (indicacao === 'giardíase') {
                        doseDiaria = Math.min(15 * peso, 750);
                        const doseUnica = doseDiaria;
                        const volume = doseUnica / 40; // 40mg/mL
                        return {
                            dose: `${doseUnica.toFixed(0)} mg (${volume.toFixed(1)} mL) por dia`,
                            detalhes: "Dose única diária por 3 dias"
                        };
                    } else {
                        doseDiaria = Math.min(30 * peso, 1500);
                        const doseUnica = doseDiaria / 3;
                        const volume = doseUnica / 40; // 40mg/mL
                        return {
                            dose: `${doseUnica.toFixed(0)} mg (${volume.toFixed(1)} mL) por dose`,
                            detalhes: "Administrar 3 vezes ao dia"
                        };
                    }
                },
                indicacoes: {
                    giardíase: {
                        dose: "15 mg/kg/dia",
                        doseMaxima: "750 mg/dia",
                        frequencia: "1 vez ao dia",
                        duracao: "3 dias"
                    },
                    amebíase: {
                        dose: "30 mg/kg/dia",
                        doseMaxima: "1500 mg/dia",
                        frequencia: "8/8 horas",
                        duracao: "7-10 dias"
                    }
                }
            }
        }
    },

    // Albendazol
    albendazol: {
        nome: "Albendazol",
        formas: {
            oral: {
                descricao: "Suspensão oral 40mg/mL",
                tipo: "suspensao",
                concentracao: "40mg/mL",
                passos: [
                    "Agitar bem antes de usar",
                    "Administrar com alimentos gordurosos para aumentar absorção"
                ],
                precaucoes: [
                    "Contraindicado em gestantes",
                    "Monitorar função hepática em tratamentos prolongados"
                ],
                calculoDose: function(peso, idade, indicacao) {
                    let dose;
                    let volume;
                    
                    if (idade < 2) {
                        return {
                            dose: "Não recomendado para menores de 2 anos",
                            detalhes: "Consultar pediatra"
                        };
                    } else if (indicacao === 'ascaridíase' || indicacao === 'oxiuríase') {
                        if (peso < 10) {
                            dose = 200;
                            volume = 5;
                        } else {
                            dose = 400;
                            volume = 10;
                        }
                        return {
                            dose: `${dose} mg (${volume} mL)`,
                            detalhes: "Dose única"
                        };
                    } else {
                        if (peso < 10) {
                            dose = 200;
                            volume = 5;
                        } else {
                            dose = 400;
                            volume = 10;
                        }
                        return {
                            dose: `${dose} mg (${volume} mL)`,
                            detalhes: "1 vez ao dia por 3 dias"
                        };
                    }
                },
                indicacoes: {
                    ascaridíase: {
                        dose: "400 mg (>10kg) ou 200 mg (<10kg)",
                        doseMaxima: "400 mg",
                        frequencia: "Dose única",
                        duracao: "1 dia"
                    },
                    oxiuríase: {
                        dose: "400 mg (>10kg) ou 200 mg (<10kg)",
                        doseMaxima: "400 mg",
                        frequencia: "Dose única",
                        duracao: "Repetir após 2 semanas"
                    },
                    giardíase: {
                        dose: "400 mg (>10kg) ou 200 mg (<10kg)",
                        doseMaxima: "400 mg",
                        frequencia: "1 vez ao dia",
                        duracao: "5 dias"
                    }
                }
            }
        }
    }
};