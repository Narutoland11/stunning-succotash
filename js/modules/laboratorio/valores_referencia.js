/**
 * Valores de referência para exames laboratoriais
 * Adaptados para o contexto moçambicano
 */

const VALORES_REFERENCIA = {
    // Hemograma
    hemograma: {
        hemoglobina: {
            adultoMasculino: { min: 13.5, max: 17.5, unidade: "g/dL" },
            adultoFeminino: { min: 12.0, max: 16.0, unidade: "g/dL" },
            crianca612Anos: { min: 11.5, max: 15.5, unidade: "g/dL" },
            crianca24meses: { min: 10.5, max: 14.0, unidade: "g/dL" },
            neonato: { min: 14.0, max: 24.0, unidade: "g/dL" },
            gestante1Trim: { min: 11.0, max: 14.0, unidade: "g/dL" },
            gestante3Trim: { min: 10.5, max: 14.0, unidade: "g/dL" }
        },
        hematocrito: {
            adultoMasculino: { min: 41, max: 53, unidade: "%" },
            adultoFeminino: { min: 36, max: 46, unidade: "%" },
            crianca612Anos: { min: 35, max: 45, unidade: "%" },
            crianca24meses: { min: 33, max: 39, unidade: "%" },
            neonato: { min: 43, max: 63, unidade: "%" }
        },
        leucocitos: {
            adulto: { min: 4.5, max: 11.0, unidade: "x10³/µL" },
            crianca612Anos: { min: 4.5, max: 13.5, unidade: "x10³/µL" },
            crianca24meses: { min: 6.0, max: 17.5, unidade: "x10³/µL" },
            neonato: { min: 9.0, max: 30.0, unidade: "x10³/µL" }
        },
        plaquetas: {
            geral: { min: 150, max: 400, unidade: "x10³/µL" }
        },
        neutrofilos: {
            adultoPerc: { min: 40, max: 70, unidade: "%" },
            adultoAbs: { min: 1.8, max: 7.7, unidade: "x10³/µL" },
            criancaPerc: { min: 35, max: 65, unidade: "%" }
        },
        linfocitos: {
            adultoPerc: { min: 20, max: 45, unidade: "%" },
            adultoAbs: { min: 0.8, max: 4.0, unidade: "x10³/µL" },
            criancaPerc: { min: 25, max: 55, unidade: "%" }
        },
        monocitos: {
            adultoPerc: { min: 2, max: 10, unidade: "%" },
            adultoAbs: { min: 0.2, max: 1.0, unidade: "x10³/µL" }
        },
        eosinofilos: {
            adultoPerc: { min: 1, max: 6, unidade: "%" },
            adultoAbs: { min: 0.0, max: 0.5, unidade: "x10³/µL" },
            // Valores aumentados comuns em infecções parasitárias
            parasitosesSusp: { min: 6, max: null, nota: "Suspeita de parasitoses" }
        },
        basofilos: {
            adultoPerc: { min: 0, max: 2, unidade: "%" },
            adultoAbs: { min: 0.0, max: 0.2, unidade: "x10³/µL" }
        },
        bastonetes: {
            adultoPerc: { min: 0, max: 5, unidade: "%" },
            infeccaoSusp: { min: 5, max: null, nota: "Suspeita de infecção bacteriana" }
        }
    },
    
    // Bioquímica
    bioquimica: {
        glicemia: {
            jejum: { min: 70, max: 99, unidade: "mg/dL" },
            diabetes: { min: 126, max: null, unidade: "mg/dL" },
            preD: { min: 100, max: 125, unidade: "mg/dL" },
            hipoGrave: { min: null, max: 50, unidade: "mg/dL" },
            hipoModerada: { min: 50, max: 70, unidade: "mg/dL" }
        },
        ureia: {
            adulto: { min: 15, max: 40, unidade: "mg/dL" },
            crianca: { min: 5, max: 35, unidade: "mg/dL" }
        },
        creatinina: {
            masculino: { min: 0.7, max: 1.2, unidade: "mg/dL" },
            feminino: { min: 0.5, max: 1.0, unidade: "mg/dL" },
            crianca: { min: 0.3, max: 0.7, unidade: "mg/dL" }
        },
        tgo: {
            adultoMasculino: { min: null, max: 38, unidade: "U/L" },
            adultoFeminino: { min: null, max: 32, unidade: "U/L" },
            crianca: { min: null, max: 40, unidade: "U/L" }
        },
        tgp: {
            adultoMasculino: { min: null, max: 41, unidade: "U/L" },
            adultoFeminino: { min: null, max: 33, unidade: "U/L" },
            crianca: { min: null, max: 45, unidade: "U/L" }
        },
        bilirrubinaTotal: {
            adulto: { min: 0.3, max: 1.2, unidade: "mg/dL" },
            neonato: { min: null, max: 15.0, unidade: "mg/dL", 
                       nota: "Valores variam conforme dias de vida" }
        },
        bilirrubinaD: {
            adulto: { min: null, max: 0.3, unidade: "mg/dL" }
        },
        proteinasTotais: {
            adulto: { min: 6.4, max: 8.3, unidade: "g/dL" },
            crianca: { min: 6.0, max: 8.0, unidade: "g/dL" }
        },
        albumina: {
            adulto: { min: 3.5, max: 5.0, unidade: "g/dL" },
            desnutricaoLeve: { min: 3.0, max: 3.4, unidade: "g/dL" },
            desnutricaoModerada: { min: 2.5, max: 2.9, unidade: "g/dL" },
            desnutricaoGrave: { min: null, max: 2.4, unidade: "g/dL" }
        },
        sodio: {
            adulto: { min: 135, max: 145, unidade: "mEq/L" },
            hipoNaLeve: { min: 130, max: 134, unidade: "mEq/L" },
            hipoNaModerada: { min: 125, max: 129, unidade: "mEq/L" },
            hipoNaGrave: { min: null, max: 124, unidade: "mEq/L" },
            hiperNaLeve: { min: 146, max: 150, unidade: "mEq/L" },
            hiperNaGrave: { min: 151, max: null, unidade: "mEq/L" }
        },
        potassio: {
            adulto: { min: 3.5, max: 5.0, unidade: "mEq/L" },
            hipoKLeve: { min: 3.0, max: 3.4, unidade: "mEq/L" },
            hipoKModerada: { min: 2.5, max: 2.9, unidade: "mEq/L" },
            hipoKGrave: { min: null, max: 2.4, unidade: "mEq/L" },
            hiperKLeve: { min: 5.1, max: 5.5, unidade: "mEq/L" },
            hiperKGrave: { min: 5.6, max: null, unidade: "mEq/L" }
        },
        calcio: {
            adulto: { min: 8.5, max: 10.5, unidade: "mg/dL" },
            hipoCaLeve: { min: 8.0, max: 8.4, unidade: "mg/dL" },
            hipoCaGrave: { min: null, max: 7.9, unidade: "mg/dL" }
        }
    },
    
    // Específico para contexto de Moçambique
    malaria: {
        parasitemia: {
            leve: { min: 0.1, max: 1.0, unidade: "%" },
            moderada: { min: 1.1, max: 5.0, unidade: "%" },
            grave: { min: 5.1, max: null, unidade: "%" }
        }
    },
    
    hiv: {
        cd4: {
            normal: { min: 500, max: null, unidade: "células/mm³" },
            moderado: { min: 200, max: 499, unidade: "células/mm³" },
            grave: { min: null, max: 199, unidade: "células/mm³" }
        },
        cargaViral: {
            indetectavel: { min: null, max: 50, unidade: "cópias/mL" },
            baixa: { min: 51, max: 1000, unidade: "cópias/mL" },
            moderada: { min: 1001, max: 100000, unidade: "cópias/mL" },
            alta: { min: 100001, max: null, unidade: "cópias/mL" }
        }
    },
    
    tuberculose: {
        baciloscopia: {
            negativo: "Negativo",
            positivo1: "1+",
            positivo2: "2+",
            positivo3: "3+"
        }
    }
};

// Exportar para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VALORES_REFERENCIA;
} else {
    // Para uso direto no navegador
    window.VALORES_REFERENCIA = VALORES_REFERENCIA;
}
