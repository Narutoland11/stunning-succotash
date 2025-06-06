// ==================== REFERÊNCIAS MÉDICAS EXPLÍCITAS ====================

// Base de referências bibliográficas para fontes de informação médica
const REFERENCIAS_MEDICAS = {
    // Guias internacionais de referência
    oms: {
        titulo: "Organização Mundial de Saúde (OMS)",
        pediatrica: "Lista Modelo de Medicamentos Essenciais para Crianças da OMS - 8ª Lista (2021)",
        url: "https://www.who.int/publications/i/item/WHO-MHP-HPS-EML-2021.03",
        descricao: "Padrão internacional para uso racional de medicamentos em pediatria."
    },
    misau: {
        titulo: "Ministério da Saúde de Moçambique (MISAU)",
        pediatrica: "Formulário Nacional de Medicamentos - Edição Pediátrica",
        url: "https://www.misau.gov.mz/",
        descricao: "Guia oficial para tratamento medicamentoso em pediatria em Moçambique."
    },
    bnfc: {
        titulo: "British National Formulary for Children (BNFC)",
        pediatrica: "BNFC 2022-2023",
        url: "https://www.nice.org.uk/bnfc",
        descricao: "Referência detalhada sobre medicamentos pediátricos e doses."
    },
    lexi: {
        titulo: "Lexicomp Pediatric & Neonatal Dosage Handbook",
        pediatrica: "Edição 28 (2021-2022)",
        url: "https://www.wolterskluwer.com/en/solutions/lexicomp",
        descricao: "Referência completa de dosagem pediátrica e neonatal."
    },
    harriet: {
        titulo: "Harriet Lane Handbook",
        pediatrica: "22ª Edição (2020)",
        url: "https://www.elsevier.com/books/the-harriet-lane-handbook/browner/978-0-323-67407-2",
        descricao: "Manual de pediatria do Hospital Johns Hopkins."
    },
    nelson: {
        titulo: "Nelson Textbook of Pediatrics",
        pediatrica: "21ª Edição (2019)",
        url: "https://www.elsevier.com/books/nelson-textbook-of-pediatrics/kliegman/978-0-323-52950-1",
        descricao: "Referência abrangente em pediatria e terapêutica pediátrica."
    },
    redbook: {
        titulo: "Red Book: Report of the Committee on Infectious Diseases",
        pediatrica: "32ª Edição (2021)",
        url: "https://redbook.solutions.aap.org/redbook.aspx",
        descricao: "Guia da Academia Americana de Pediatria para doenças infecciosas."
    },
    
    // Bases de dados farmacêuticas
    uptodate: {
        titulo: "UpToDate",
        pediatrica: "Base de conhecimento clínico - Módulo Pediatria",
        url: "https://www.uptodate.com",
        descricao: "Base de evidências clínicas atualizada continuamente."
    },
    micromedex: {
        titulo: "IBM Micromedex",
        pediatrica: "NeoFax and Pediatrics",
        url: "https://www.micromedexsolutions.com",
        descricao: "Sistema de suporte à decisão clínica e informações de medicamentos."
    },
    ahfs: {
        titulo: "AHFS Drug Information",
        pediatrica: "American Hospital Formulary Service",
        url: "https://www.ashp.org/products-and-services/database-licensing/ahfs-drug-information",
        descricao: "Repositório abrangente de informações de medicamentos."
    }
};

// Mapeamento de medicamentos para suas fontes de referência
const MEDICAMENTO_REFERENCIAS = {
    // Antibióticos
    amoxicilina: ["oms", "misau", "bnfc", "redbook"],
    ampicilina: ["oms", "misau", "bnfc", "harriet"],
    ceftriaxona: ["oms", "misau", "bnfc", "redbook"],
    gentamicina: ["oms", "misau", "bnfc", "harriet", "lexi"],
    ciprofloxacina: ["oms", "bnfc", "redbook", "micromedex"],
    azitromicina: ["oms", "misau", "bnfc", "redbook"],
    eritromicina: ["oms", "misau", "bnfc", "nelson"],
    vancomicina: ["bnfc", "lexi", "harriet", "uptodate"],
    penicilinaVPotassio: ["oms", "bnfc", "redbook"],

    // Antimaláricos
    artemeterLumefantrina: ["oms", "misau", "bnfc"],
    artesunato: ["oms", "misau", "bnfc", "uptodate"],
    cloroquina: ["oms", "misau", "bnfc"],

    // Anti-helmínticos
    albendazol: ["oms", "misau", "bnfc"],
    metronidazol: ["oms", "misau", "bnfc", "redbook"],
    permetrina: ["bnfc", "lexi", "uptodate"],

    // Antivirais
    aciclovir: ["oms", "bnfc", "redbook"],

    // Anti-inflamatórios e Analgésicos
    aspirina: ["bnfc", "harriet", "redbook"],
    ibuprofeno: ["oms", "misau", "bnfc", "nelson"],
    paracetamol: ["oms", "misau", "bnfc", "nelson"],
    dipirona: ["misau", "micromedex"],
    
    // Outros
    adrenalina: ["oms", "misau", "bnfc", "harriet", "lexi"],
    salbutamol: ["oms", "misau", "bnfc", "nelson"],
    dexametasona: ["oms", "misau", "bnfc", "uptodate"],
    prednisolona: ["oms", "misau", "bnfc", "nelson"],
    budesonida: ["oms", "bnfc", "nelson"],
    furosemida: ["oms", "misau", "bnfc", "harriet"],
    omeprazol: ["oms", "bnfc", "lexi"],
    ranitidina: ["oms", "bnfc", "lexi"],
    midazolam: ["oms", "bnfc", "lexi", "harriet"],
    loratadina: ["bnfc", "lexi", "nelson"],
    cetirizina: ["bnfc", "lexi", "nelson"],
    nistatina: ["oms", "misau", "bnfc"],
    hidrocortisona: ["oms", "misau", "bnfc", "harriet"],
    vitaminaA: ["oms", "misau", "bnfc"]
};

// Informações sobre protocolos
const PROTOCOLO_REFERENCIAS = {
    pneumonia: ["oms", "misau", "nelson", "redbook"],
    meningite: ["oms", "misau", "harriet", "redbook"],
    malaria: ["oms", "misau"],
    desidratacao: ["oms", "misau", "harriet"],
    asma: ["oms", "nelson"],
    hiv: ["oms", "misau", "redbook"],
    tuberculose: ["oms", "misau", "redbook"],
    poliomielite: ["oms", "misau", "redbook"],
    asfixiaNeonatal: ["oms", "harriet", "nelson"]
};

// Função para obter referências de um medicamento
function obterReferenciasMedicamento(medicamento) {
    const referencias = MEDICAMENTO_REFERENCIAS[medicamento] || [];
    
    return referencias.map(ref => {
        const refCompleta = REFERENCIAS_MEDICAS[ref];
        return {
            titulo: refCompleta.titulo,
            pediatrica: refCompleta.pediatrica,
            url: refCompleta.url,
            descricao: refCompleta.descricao
        };
    });
}

// Função para obter referências de um protocolo
function obterReferenciasProtocolo(protocolo) {
    const referencias = PROTOCOLO_REFERENCIAS[protocolo] || [];
    
    return referencias.map(ref => {
        const refCompleta = REFERENCIAS_MEDICAS[ref];
        return {
            titulo: refCompleta.titulo,
            pediatrica: refCompleta.pediatrica,
            url: refCompleta.url,
            descricao: refCompleta.descricao
        };
    });
}

// Função para exibir as referências na interface
function exibirReferencias(referencias) {
    if (!referencias || referencias.length === 0) {
        return '<p>Não há referências disponíveis para este item.</p>';
    }
    
    let html = '<div class="referencias-grid">';
    
    referencias.forEach(ref => {
        html += `
            <div class="referencia-item">
                <h4>${ref.titulo}</h4>
                <p class="ref-pediatrica">${ref.pediatrica}</p>
                <p class="ref-desc">${ref.descricao}</p>
                <a href="${ref.url}" target="_blank" class="ref-link">Consultar Fonte</a>
            </div>
        `;
    });
    
    html += '</div>';
    return html;
}

// Exporta as funções para uso global
window.obterReferenciasMedicamento = obterReferenciasMedicamento;
window.obterReferenciasProtocolo = obterReferenciasProtocolo;
window.exibirReferencias = exibirReferencias;
