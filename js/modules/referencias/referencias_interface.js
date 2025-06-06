// ==================== INTERFACE PARA REFERÊNCIAS MÉDICAS ====================

// Função para obter referências de um medicamento e indicação específicos
function obterReferencias(medicamento, indicacao) {
    // Obtém referências do medicamento
    const refsMedicamento = obterReferenciasMedicamento(medicamento);
    
    // Mapeia a indicação para o protocolo correspondente
    let protocolo = null;
    
    // Mapeamento de indicações para protocolos
    const indicacaoParaProtocolo = {
        // Infecções respiratórias
        'pneumonia': 'pneumonia',
        'bronquiolite': 'pneumonia',
        'faringite': 'pneumonia',
        'amigdalite': 'pneumonia',
        'otite': 'pneumonia',
        'sinusite': 'pneumonia',
        
        // Infecções SNC
        'meningite': 'meningite',
        'encefalite': 'meningite',
        
        // Malária
        'malaria': 'malaria',
        'paludismo': 'malaria',
        
        // Desidratação
        'desidratacao': 'desidratacao',
        'diarreia': 'desidratacao',
        'gastroenterite': 'desidratacao',
        
        // Asma
        'asma': 'asma',
        'broncoespasmo': 'asma',
        
        // HIV
        'hiv': 'hiv',
        'aids': 'hiv',
        
        // TB
        'tuberculose': 'tuberculose',
        'tb': 'tuberculose',
        
        // Outras doenças
        'poliomielite': 'poliomielite',
        'asfixia': 'asfixiaNeonatal',
        
        // Default
        'profilaxia': null,
        'tratamento': null,
        'outro': null
    };
    
    // Busca protocolo correspondente
    protocolo = indicacaoParaProtocolo[indicacao] || null;
    
    // Obtém referências do protocolo, se existir
    const refsProtocolo = protocolo ? obterReferenciasProtocolo(protocolo) : [];
    
    // Combina as referências, eliminando duplicatas
    const todasRefs = [...refsMedicamento];
    
    // Adiciona referências do protocolo, evitando duplicatas
    refsProtocolo.forEach(refProtocolo => {
        const jaTem = todasRefs.some(ref => ref.titulo === refProtocolo.titulo);
        if (!jaTem) {
            todasRefs.push(refProtocolo);
        }
    });
    
    // Retorna as referências combinadas
    return todasRefs;
}

// Função para gerar HTML com as referências
function gerarHTMLReferencias(referencias) {
    if (!referencias || referencias.length === 0) {
        return '';
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

// Disponibiliza as funções para o escopo global
window.obterReferencias = obterReferencias;
window.gerarHTMLReferencias = gerarHTMLReferencias;
