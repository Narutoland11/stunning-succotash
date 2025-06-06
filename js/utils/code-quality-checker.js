/**
 * Utilitário de verificação de qualidade de código
 * Este script ajuda a identificar problemas comuns no código JavaScript
 * Como alternativa ao DeepScan para verificações locais
 */

// Função para verificar problemas comuns no código
function checkCodeQuality(codeString) {
    const issues = [];
    
    // Verificar variáveis declaradas mas não utilizadas
    checkUnusedVariables(codeString, issues);
    
    // Verificar propriedades duplicadas em objetos literais
    checkDuplicateProperties(codeString, issues);
    
    // Verificar atribuições redundantes
    checkRedundantAssignments(codeString, issues);
    
    // Verificar condições constantes
    checkConstantConditions(codeString, issues);
    
    return issues;
}

// Verificar variáveis declaradas mas não utilizadas (análise simples)
function checkUnusedVariables(code, issues) {
    // Padrão para encontrar declarações de variáveis
    const varDeclarationRegex = /(?:var|let|const)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=?/g;
    let match;
    
    while ((match = varDeclarationRegex.exec(code)) !== null) {
        const varName = match[1];
        
        // Verifica se a variável aparece apenas uma vez no código (na declaração)
        // Esta é uma aproximação simplificada; um parser real seria mais preciso
        const regex = new RegExp(`\\b${varName}\\b`, 'g');
        const occurrences = (code.match(regex) || []).length;
        
        if (occurrences === 1) {
            issues.push({
                type: 'UNUSED_VARIABLE',
                message: `Variável '${varName}' declarada mas não utilizada`,
                position: match.index
            });
        }
    }
}

// Verificar propriedades duplicadas em objetos literais
function checkDuplicateProperties(code, issues) {
    // Padrão para encontrar objetos literais
    const objectRegex = /{[^{}]*}/g;
    let objectMatch;
    
    while ((objectMatch = objectRegex.exec(code)) !== null) {
        const objectContent = objectMatch[0];
        const properties = {};
        
        // Padrão para encontrar propriedades de objetos
        const propRegex = /([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g;
        let propMatch;
        
        while ((propMatch = propRegex.exec(objectContent)) !== null) {
            const propName = propMatch[1];
            
            if (properties[propName]) {
                issues.push({
                    type: 'DUPLICATE_PROPERTY',
                    message: `Propriedade '${propName}' duplicada no objeto literal`,
                    position: objectMatch.index + propMatch.index
                });
            }
            
            properties[propName] = true;
        }
    }
}

// Verificar atribuições redundantes (x = x)
function checkRedundantAssignments(code, issues) {
    const assignmentRegex = /([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*\1\b/g;
    let match;
    
    while ((match = assignmentRegex.exec(code)) !== null) {
        issues.push({
            type: 'REDUNDANT_ASSIGNMENT',
            message: `Atribuição redundante de '${match[1]}' a si mesmo`,
            position: match.index
        });
    }
}

// Verificar condições constantes simples
function checkConstantConditions(code, issues) {
    // Alguns casos simples de condições constantes
    const patterns = [
        { regex: /if\s*\(\s*true\s*\)/g, value: 'true' },
        { regex: /if\s*\(\s*false\s*\)/g, value: 'false' },
        { regex: /if\s*\(\s*1\s*\)/g, value: '1' },
        { regex: /if\s*\(\s*0\s*\)/g, value: '0' },
        { regex: /&&\s*true\s*(?=[),])/g, value: 'true' },
        { regex: /\|\|\s*false\s*(?=[),])/g, value: 'false' }
    ];
    
    for (const pattern of patterns) {
        let match;
        while ((match = pattern.regex.exec(code)) !== null) {
            issues.push({
                type: 'CONSTANT_CONDITION',
                message: `Condição constante encontrada: ${pattern.value}`,
                position: match.index
            });
        }
    }
}

// Executar verificação em um arquivo
function checkFile(filePath) {
    try {
        // Em um navegador real, usaríamos APIs como fetch
        // Em Node.js, usaríamos fs.readFileSync
        const code = typeof fs !== 'undefined' ? 
            fs.readFileSync(filePath, 'utf8') : 
            'console.log("fs não disponível no navegador")';
        
        const issues = checkCodeQuality(code);
        
        console.log(`Problemas encontrados em ${filePath}:`);
        if (issues.length === 0) {
            console.log("Nenhum problema detectado!");
        } else {
            issues.forEach(issue => {
                console.log(`- ${issue.type}: ${issue.message} (posição ${issue.position})`);
            });
        }
        
        return issues;
    } catch (error) {
        console.error(`Erro ao verificar arquivo ${filePath}:`, error);
        return [];
    }
}

// Exportar funções para uso global e em Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        checkCodeQuality,
        checkFile
    };
} else if (typeof window !== 'undefined') {
    // Exportar para uso no navegador
    window.CodeQualityChecker = {
        checkCodeQuality,
        checkFile
    };
}
