
# Sistema de Gerenciamento de Times e Jogadores 🏆

## Sobre o Projeto

Este sistema é uma aplicação web desenvolvida com React e TypeScript para gerenciar times, jogadores e competições esportivas. Com funcionalidades como sorteio automático de times equilibrados, gestão de presença e avaliação de jogadores.

## Funcionalidades Principais

### 📝 Gerenciamento de Jogadores
- Cadastro completo de jogadores com informações detalhadas
- Sistema de avaliação flexível (estrelas, números ou escala de 1-5)
- Identificação de jogadores convidados
- Gestão de posições por esporte

### 🎲 Sorteio de Times
- Algoritmo de balanceamento automático
- Consideração de habilidades e posições
- Times equilibrados baseados nas avaliações

### ✓ Lista de Presença
- Controle de presença em tempo real
- Marcação de pagamento
- Filtros e estatísticas de participação

### 📊 Estatísticas
- Histórico de participação
- Desempenho dos jogadores
- Métricas de times

### 🏆 Campeonatos
- Criação de torneios personalizados
- Diferentes formatos (Liga, Copa, Mata-mata)
- Acompanhamento de resultados

## Tecnologias Utilizadas

- **React** - Framework JavaScript para construção de interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Framer Motion** - Biblioteca para animações
- **Shadcn UI** - Componentes de interface reutilizáveis
- **Zustand** - Gerenciamento de estado
- **React Router** - Navegação entre páginas

## Configurações do Sistema

### Sistema de Avaliação
O sistema oferece três opções de avaliação de jogadores:
- ⭐ Estrelas (1-5)
- 🔢 Numérico (1-100)
- 📊 Escala (1-5)

### Destaques
- Opção para destacar jogadores convidados
- Personalização de interface
- Animações suaves em transições

## Estrutura do Projeto

```
src/
├── components/
│   ├── menu/
│   │   ├── Menu.tsx
│   │   ├── MenuItem.tsx
│   │   └── MenuSettings.tsx
│   ├── player/
│   │   ├── PlayerForm.tsx
│   │   ├── PlayerList.tsx
│   │   └── PlayerCard.tsx
│   ├── tournament/
│   │   ├── TournamentForm.tsx
│   │   └── TournamentBracket.tsx
│   └── shared/
├── stores/
│   ├── usePlayerStore.ts
│   ├── useSettingsStore.ts
│   └── useTeamStore.ts
├── utils/
│   ├── types.ts
│   ├── enums.ts
│   └── animations.ts
└── App.tsx
```

## Iniciando o Projeto

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone <URL_DO_REPOSITORIO>

# Entre no diretório
cd nome-do-projeto

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

## Rotas da Aplicação

- `/menu` - Menu principal
- `/player/new` - Cadastro de jogadores
- `/players` - Lista de jogadores
- `/teams/draw` - Sorteio de times
- `/presence` - Lista de presença
- `/statistics` - Estatísticas
- `/championship` - Gestão de campeonatos

## Contribuindo

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Faça commit das suas alterações (`git commit -m 'Add some AmazingFeature'`)
4. Faça Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

Seu Nome - [@seutwitter](https://twitter.com/seutwitter) - email@exemplo.com

Link do Projeto: [https://github.com/seu-usuario/seu-repositorio](https://github.com/seu-usuario/seu-repositorio)
