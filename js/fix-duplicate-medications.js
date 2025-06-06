/**
 * Script para corrigir propriedades duplicadas no arquivo medicamentos.js
 * Este script busca no arquivo as propriedades duplicadas reportadas pelo DeepScan
 * e as renomeia adicionando sufixos para diferenciar as diferentes formas de apresentação
 */

const fs = require('fs');
const path = require('path');

// Caminho para o arquivo medicamentos.js
const medicamentosPath = path.join(__dirname, 'modules', 'medicamentos', 'medicamentos.js');

// Ler o conteúdo do arquivo
let content = fs.readFileSync(medicamentosPath, 'utf8');

// Lista de propriedades duplicadas e seus novos nomes
const replacements = [
  { 
    pattern: /salbutamol:\s*{[\s\S]*?nome:\s*"Salbutamol",[\s\S]*?nebulizacao:\s*{/g,
    replacement: (match, offset, string) => {
      // Se for a segunda ocorrência (verificando pela posição no arquivo)
      if (offset > string.indexOf("salbutamol:") + 100) {
        return match.replace('salbutamol:', 'salbutamolNebulizacao:').replace('"Salbutamol"', '"Salbutamol (Nebulização)"');
      }
      return match;
    }
  },
  { 
    pattern: /dexametasona:\s*{[\s\S]*?nome:\s*"Dexametasona",/g,
    replacement: (match, offset, string) => {
      if (offset > string.indexOf("dexametasona:") + 100) {
        return match.replace('dexametasona:', 'dexametasonaTopico:').replace('"Dexametasona"', '"Dexametasona (Tópico)"');
      }
      return match;
    }
  },
  { 
    pattern: /loratadina:\s*{[\s\S]*?nome:\s*"Loratadina",/g,
    replacement: (match, offset, string) => {
      if (offset > string.indexOf("loratadina:") + 100) {
        return match.replace('loratadina:', 'loratadinaXarope:').replace('"Loratadina"', '"Loratadina (Xarope)"');
      }
      return match;
    }
  },
  { 
    pattern: /azitromicina:\s*{[\s\S]*?nome:\s*"Azitromicina",/g,
    replacement: (match, offset, string) => {
      if (offset > string.indexOf("azitromicina:") + 100) {
        return match.replace('azitromicina:', 'azitromicinaInfantil:').replace('"Azitromicina"', '"Azitromicina (Infantil)"');
      }
      return match;
    }
  },
  { 
    pattern: /metronidazol:\s*{[\s\S]*?nome:\s*"Metronidazol",/g,
    replacement: (match, offset, string) => {
      if (offset > string.indexOf("metronidazol:") + 100) {
        return match.replace('metronidazol:', 'metronidazolTopico:').replace('"Metronidazol"', '"Metronidazol (Tópico)"');
      }
      return match;
    }
  },
  { 
    pattern: /paracetamol:\s*{[\s*\S]*?nome:\s*"Paracetamol",/g,
    replacement: (match, offset, string) => {
      // Primeira ocorrência permanece inalterada
      const firstPos = string.indexOf("paracetamol:");
      const secondPos = string.indexOf("paracetamol:", firstPos + 10);
      
      if (offset === secondPos) {
        return match.replace('paracetamol:', 'paracetamolGotas:').replace('"Paracetamol"', '"Paracetamol (Gotas)"');
      } else if (offset > secondPos) {
        return match.replace('paracetamol:', 'paracetamolInfantil:').replace('"Paracetamol"', '"Paracetamol (Infantil)"');
      }
      return match;
    }
  },
  { 
    pattern: /nistatina:\s*{[\s\S]*?nome:\s*"Nistatina",/g,
    replacement: (match, offset, string) => {
      if (offset > string.indexOf("nistatina:") + 100) {
        return match.replace('nistatina:', 'nistatinaPomada:').replace('"Nistatina"', '"Nistatina (Pomada)"');
      }
      return match;
    }
  },
  { 
    pattern: /furosemida:\s*{[\s\S]*?nome:\s*"Furosemida",/g,
    replacement: (match, offset, string) => {
      if (offset > string.indexOf("furosemida:") + 100) {
        return match.replace('furosemida:', 'furosemidaInjetavel:').replace('"Furosemida"', '"Furosemida (Injetável)"');
      }
      return match;
    }
  },
  { 
    pattern: /amoxicilina:\s*{[\s\S]*?nome:\s*"Amoxicilina",/g,
    replacement: (match, offset, string) => {
      if (offset > string.indexOf("amoxicilina:") + 100) {
        return match.replace('amoxicilina:', 'amoxicilinaSuspensao:').replace('"Amoxicilina"', '"Amoxicilina (Suspensão)"');
      }
      return match;
    }
  },
  { 
    pattern: /praziquantel:\s*{[\s\S]*?nome:\s*"Praziquantel",/g,
    replacement: (match, offset, string) => {
      if (offset > string.indexOf("praziquantel:") + 100) {
        return match.replace('praziquantel:', 'praziquantelPediatrico:').replace('"Praziquantel"', '"Praziquantel (Pediátrico)"');
      }
      return match;
    }
  },
  { 
    pattern: /dipirona:\s*{[\s\S]*?nome:\s*"Dipirona",/g,
    replacement: (match, offset, string) => {
      if (offset > string.indexOf("dipirona:") + 100) {
        return match.replace('dipirona:', 'dipironaGotas:').replace('"Dipirona"', '"Dipirona (Gotas)"');
      }
      return match;
    }
  },
  { 
    pattern: /adrenalina:\s*{[\s\S]*?nome:\s*"Adrenalina \(Epinefrina\)",/g,
    replacement: (match, offset, string) => {
      if (offset > string.indexOf("adrenalina:") + 100) {
        return match.replace('adrenalina:', 'adrenalinaInjetavel:');
      }
      return match;
    }
  },
  { 
    pattern: /cefalexina:\s*{[\s\S]*?nome:\s*"Cefalexina",/g,
    replacement: (match, offset, string) => {
      if (offset > string.indexOf("cefalexina:") + 100) {
        return match.replace('cefalexina:', 'cefalexinaSuspensao:').replace('"Cefalexina"', '"Cefalexina (Suspensão)"');
      }
      return match;
    }
  },
  { 
    pattern: /omeprazol:\s*{[\s\S]*?nome:\s*"Omeprazol",/g,
    replacement: (match, offset, string) => {
      if (offset > string.indexOf("omeprazol:") + 100) {
        return match.replace('omeprazol:', 'omeprazolCapsulas:').replace('"Omeprazol"', '"Omeprazol (Cápsulas)"');
      }
      return match;
    }
  },
  { 
    pattern: /ceftriaxona:\s*{[\s\S]*?nome:\s*"Ceftriaxona",/g,
    replacement: (match, offset, string) => {
      if (offset > string.indexOf("ceftriaxona:") + 100) {
        return match.replace('ceftriaxona:', 'ceftriaxonaInjetavel:').replace('"Ceftriaxona"', '"Ceftriaxona (Injetável)"');
      }
      return match;
    }
  }
];

// Aplicar as substituições
for (const rep of replacements) {
  content = content.replace(rep.pattern, rep.replacement);
}

// Escrever o conteúdo modificado de volta ao arquivo
fs.writeFileSync(medicamentosPath, content, 'utf8');

console.log('Correções de propriedades duplicadas aplicadas com sucesso!');
