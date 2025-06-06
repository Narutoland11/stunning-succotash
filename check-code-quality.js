/**
 * Script para verificar a qualidade do código em múltiplos arquivos JavaScript
 * Para ser executado com Node.js
 */

const fs = require('fs');
const path = require('path');
const { checkCodeQuality } = require('./js/utils/code-quality-checker.js');

// Diretórios a serem analisados
const directories = [
  './js',
  './js/core',
  './js/modules',
  './js/utils',
  './js/modules/laboratorio',
  './js/modules/medicamentos',
  './js/modules/validacao'
];

// Extensões de arquivo para verificar
const fileExtensions = ['.js'];

// Arquivos a serem ignorados
const ignoredFiles = [
  'check-code-quality.js',
  'code-quality-checker.js',
  'fix-duplicate-medications.js'
];

// Função para verificar arquivos em um diretório
function checkFilesInDirectory(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`Diretório não encontrado: ${dir}`);
    return;
  }

  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Verifica recursivamente se o diretório não estiver na lista principal
      if (!directories.includes(filePath)) {
        checkFilesInDirectory(filePath);
      }
    } else if (
      fileExtensions.includes(path.extname(file)) && 
      !ignoredFiles.includes(file)
    ) {
      console.log(`\n======== Verificando ${filePath} ========`);
      const code = fs.readFileSync(filePath, 'utf8');
      const issues = checkCodeQuality(code);
      
      if (issues.length === 0) {
        console.log("✓ Nenhum problema detectado!");
      } else {
        console.log(`⚠️ ${issues.length} problemas encontrados:`);
        issues.forEach((issue, index) => {
          console.log(`  ${index + 1}. ${issue.type}: ${issue.message}`);
        });
      }
    }
  });
}

// Executar verificação para cada diretório
console.log("Iniciando verificação de qualidade de código...");
directories.forEach(dir => {
  checkFilesInDirectory(dir);
});
console.log("\nVerificação concluída!");
