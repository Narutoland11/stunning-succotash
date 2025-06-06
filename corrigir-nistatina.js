/**
 * Script para corrigir a propriedade duplicada nistatinaPomada no arquivo medicamentos.js
 * Este script localiza a segunda ocorrência e a substitui por nistatinaPomadaDermatologica
 */

const fs = require('fs');
const path = require('path');

// Caminho para o arquivo medicamentos.js
const medicamentosPath = path.join(__dirname, 'js', 'modules', 'medicamentos', 'medicamentos.js');

// Função principal
async function corrigirNistatinaDuplicada() {
  console.log('Iniciando correção da propriedade duplicada nistatinaPomada...');
  
  try {
    // Ler o conteúdo do arquivo
    const content = await fs.promises.readFile(medicamentosPath, 'utf8');
    
    // Verificar ocorrências de nistatinaPomada:
    const matches = content.match(/nistatinaPomada\s*:/g) || [];
    console.log(`Encontradas ${matches.length} ocorrências de nistatinaPomada:`);
    
    if (matches.length < 2) {
      console.log('Não há duplicação para corrigir. O problema já pode ter sido resolvido.');
      return false;
    }
    
    // Encontrar a posição da primeira ocorrência
    const firstPos = content.indexOf('nistatinaPomada:');
    console.log(`Primeira ocorrência encontrada na posição: ${firstPos}`);
    
    // Encontrar a posição da segunda ocorrência
    const secondPos = content.indexOf('nistatinaPomada:', firstPos + 15);
    console.log(`Segunda ocorrência encontrada na posição: ${secondPos}`);
    
    if (secondPos === -1) {
      console.log('Não foi possível localizar a segunda ocorrência.');
      return false;
    }
    
    // Extrair o contexto da segunda ocorrência para verificação
    const contexto = content.substring(secondPos - 10, secondPos + 300);
    console.log('\nContexto da segunda ocorrência:');
    console.log(contexto.substring(0, 100) + '...');
    
    // Dividir o conteúdo
    const parteBefore = content.substring(0, secondPos);
    const parteAfter = content.substring(secondPos);
    
    // Substituir nistatinaPomada: por nistatinaPomadaDermatologica:
    let novoConteudo = parteAfter.replace('nistatinaPomada:', 'nistatinaPomadaDermatologica:');
    
    // Substituir "Nistatina (Pomada)" por "Nistatina (Pomada Dermatológica)"
    novoConteudo = novoConteudo.replace(
      'nome: "Nistatina (Pomada)"',
      'nome: "Nistatina (Pomada Dermatológica)"'
    );
    
    // Substituir oral: por topica:
    novoConteudo = novoConteudo.replace(
      /formas:\s*{\s*oral:/,
      'formas: {\n            topica:'
    );
    
    // Substituir a descrição e o tipo
    novoConteudo = novoConteudo.replace(
      'descricao: "Suspensão oral 100.000 UI/mL",\n                tipo: "suspensao",',
      'descricao: "Pomada tópica 100.000 UI/g",\n                tipo: "pomada",'
    );
    
    // Juntar as partes
    const conteudoFinal = parteBefore + novoConteudo;
    
    // Salvar o arquivo corrigido
    await fs.promises.writeFile(medicamentosPath, conteudoFinal, 'utf8');
    
    console.log('\nCorreção concluída com sucesso!');
    console.log('A segunda ocorrência de nistatinaPomada foi renomeada para nistatinaPomadaDermatologica.');
    console.log('As propriedades foram atualizadas para refletir um produto dermatológico.');
    
    return true;
  } catch (error) {
    console.error('Erro ao processar o arquivo:', error);
    return false;
  }
}

// Executar a função principal
corrigirNistatinaDuplicada().then((sucesso) => {
  if (sucesso) {
    console.log('\nPor favor, verifique o arquivo para garantir que a correção foi aplicada corretamente.');
  } else {
    console.log('\nNão foi possível aplicar a correção automaticamente.');
  }
});
