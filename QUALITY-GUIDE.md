# Guia de Qualidade de Código - Moz Doctor Dose

## Introdução

Este documento serve como um guia para manter a qualidade do código no projeto Moz Doctor Dose. Ele documenta os problemas comuns que foram identificados e corrigidos, e fornece diretrizes para evitar esses problemas no futuro.

## Problemas Comuns Corrigidos

### 1. Propriedades Duplicadas

Um dos problemas mais frequentes encontrados foi a presença de propriedades duplicadas em objetos, especialmente no arquivo `medicamentos.js`. As propriedades duplicadas podem causar comportamento inesperado, pois apenas a última definição será mantida.

**Exemplo de problema:**
```javascript
const objeto = {
    propriedade: "valor1",
    // ... muitas linhas depois
    propriedade: "valor2" // Sobrescreve o primeiro valor sem aviso
};
```

**Como foi corrigido:**
As propriedades duplicadas foram renomeadas para refletir suas diferentes funcionalidades ou formas farmacêuticas:

```javascript
// Antes
salbutamol: { ... }
salbutamol: { ... }

// Depois
salbutamol: { ... }
salbutamolNebulizacao: { ... }
```

### 2. Variáveis Não Utilizadas

Foram identificadas várias variáveis declaradas e não utilizadas no código, o que aumenta o consumo de memória desnecessariamente e dificulta a manutenção.

**Como foi corrigido:**
- Remoção de variáveis completamente não utilizadas
- Transformação de variáveis globais em constantes locais quando apropriado
- Remoção de parâmetros não utilizados em funções

### 3. Condições Constantes

Condições que sempre avaliam para o mesmo resultado (verdadeiro ou falso) foram identificadas e corrigidas. Essas condições geralmente são resultado de verificações redundantes ou lógica mal implementada.

**Exemplo:**
```javascript
// Problema: isNaN(peso) será sempre falso após parseFloat e verificação de !peso
if (!peso || isNaN(peso) || peso <= 0) { ... }

// Corrigido:
if (!peso || peso <= 0) { ... }
```

### 4. Ramos Idênticos em Condicionais

Blocos condicionais com implementações idênticas para os casos verdadeiro e falso foram identificados e simplificados.

**Exemplo:**
```javascript
// Problema:
if (condition) {
    doSomething();
} else {
    doSomething(); // Mesmo código em ambos os casos
}

// Corrigido:
doSomething(); // Remover condicional desnecessária
```

## Diretrizes para Desenvolvimento Futuro

### Estrutura de Objetos Grandes

Para objetos grandes como `MEDICAMENTOS`, siga estas diretrizes:

1. Use nomes de propriedades exclusivos e descritivos
2. Se precisar de variações do mesmo medicamento, adicione um sufixo ao nome (ex: `paracetamolGotas`, `paracetamolComprimido`)
3. Mantenha a consistência na estrutura de dados
4. Considere dividir objetos muito grandes em módulos menores

### Verificação de Qualidade

Um novo utilitário `code-quality-checker.js` foi adicionado para auxiliar na detecção de problemas comuns. Use-o como parte do seu fluxo de desenvolvimento:

```javascript
// No navegador
const issues = CodeQualityChecker.checkCodeQuality(meuCodigo);
console.log(issues);

// Com Node.js (para scripts)
const checker = require('./js/utils/code-quality-checker.js');
checker.checkFile('./caminho/para/arquivo.js');
```

### Boas Práticas Gerais

1. **Sempre declare variáveis** com `const` ou `let` (evite `var`)
2. **Verifique valores nulos ou indefinidos** antes de acessar suas propriedades
3. **Evite verificações redundantes** como `isNaN()` após já ter verificado se o valor é falsy
4. **Use nomes descritivos** para variáveis e funções
5. **Remova código comentado** ou não utilizado
6. **Documente funções complexas** ou não óbvias

## Manutenção Contínua

Recomenda-se manter as seguintes práticas:

1. Executar o verificador de qualidade de código regularmente
2. Revisar o código antes de cada commit
3. Considerar a adoção de ESLint ou outras ferramentas de lint para verificação automática
4. Realizar revisões periódicas do código mais antigo

---

Este documento deve ser atualizado conforme novas diretrizes ou problemas comuns são identificados.
