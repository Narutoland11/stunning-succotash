# Moz Doctor Dose

## Novas Funcionalidades

### Modo Escuro
O site agora conta com um modo escuro para reduzir o cansaço visual e melhorar a experiência do usuário. O botão de alternar está no canto inferior direito da tela e as preferências do usuário são salvas entre sessões.

### Estatísticas em Tempo Real
Um painel de estatísticas foi adicionado à seção de Informações, mostrando dados como usuários online, visitas e distribuição de dispositivos. O sistema usa Firebase Realtime Database para armazenar e sincronizar dados em tempo real.

## Configurando o Firebase

Para que as estatísticas em tempo real funcionem corretamente, siga estes passos:

1. Acesse [firebase.google.com](https://firebase.google.com/) e crie uma conta ou faça login
2. No console do Firebase, crie um novo projeto
3. Adicione um aplicativo web ao seu projeto
4. Copie o objeto `firebaseConfig` gerado
5. Abra o arquivo `js/estatisticas-tempo-real.js` e substitua o objeto `firebaseConfig` pelo seu
6. No console do Firebase, ative o Realtime Database (comece no modo teste)

## Estrutura do Projeto

Este projeto foi reorganizado com a seguinte estrutura de diretórios:

```
/
├── css/               # Arquivos de estilo CSS
│   └── style.css
├── images/            # Imagens e recursos gráficos
│   └── Flag_of_Mozambique.svg.png
├── js/                # Arquivos JavaScript organizados por função
│   ├── core/          # Scripts principais/núcleo
│   │   └── mainn.js
│   └── modules/       # Módulos específicos de funcionalidade
│       ├── alertas/
│       │   └── alertas.js
│       ├── medicamentos/
│       │   ├── medicamentos.js
│       │   ├── medicamentos_init.js
│       │   ├── novos_medicamentos.js
│       │   ├── novos_medicamentos2.js
│       │   ├── novos_medicamentos3.js
│       │   └── contarMedicamentos.js
│       ├── referencias/
│       │   ├── referencias.js
│       │   └── referencias_interface.js
│       └── validacao/
│           ├── validacao.js
│           └── validacao_interface.js
├── index.html         # Página HTML principal
├── contarMedicamentos.html
└── README.md          # Este arquivo
```

## Funcionamento da Aplicação

A aplicação mantém a mesma funcionalidade anterior, mas agora com uma estrutura de arquivos mais organizada e modular.

Para iniciar a aplicação, basta abrir o arquivo `index.html` no navegador.

## Manutenção

Quando for adicionar novos arquivos ao projeto, siga a estrutura de diretórios:

1. Coloque arquivos CSS na pasta `css/`
2. Coloque imagens na pasta `images/`
3. Para novos scripts JavaScript:
   - Scripts principais devem ir em `js/core/`
   - Módulos específicos devem ir em suas respectivas pastas em `js/modules/`
   - Caso precise criar um novo módulo, crie uma nova pasta em `js/modules/`

## Referências aos Arquivos

Todos os caminhos nos arquivos HTML foram atualizados para refletir a nova estrutura de pastas.
