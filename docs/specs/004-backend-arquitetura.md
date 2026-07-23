# Spec 004 Etapa 4— Arquitetura Inicial do Backend

## Objetivo

Definir a arquitetura inicial do backend do projeto principal, estabelecendo uma organização clara das responsabilidades da aplicação para facilitar sua evolução durante o desenvolvimento.

Esta arquitetura servirá como base para todas as próximas funcionalidades do sistema.

---

## Escopo

Esta etapa contempla:

- criação da estrutura inicial do backend;
- organização das pastas da aplicação;
- separação das responsabilidades em camadas;
- implementação do CRUD de tarefas;
- integração com PostgreSQL;
- documentação das decisões arquiteturais.

Esta etapa **não contempla**:

- autenticação e autorização;
- integração com IA;
- integração com WhatsApp;
- integração com n8n;
- integração com MCP;
- testes automatizados;
- cache;
- filas;
- deploy.

---

## Tecnologias

O backend será desenvolvido utilizando:

- Node.js
- TypeScript
- Express
- PostgreSQL
- Driver `pg`
- dotenv

Nesta etapa não será utilizado ORM.

---

## Estrutura Inicial

A estrutura inicial do projeto deverá seguir o seguinte padrão:

```text
backend/
└── src/
    ├── config/
    ├── controllers/
    ├── database/
    ├── middlewares/
    ├── repositories/
    ├── routes/
    ├── services/
    ├── types/
    └── index.ts
```

Novas pastas poderão ser adicionadas futuramente conforme a necessidade do projeto.

---

## Responsabilidade das Camadas

### Routes

Responsáveis por definir as rotas da API e encaminhar as requisições para os controllers.

### Controllers

Responsáveis por receber as requisições HTTP, extrair os dados necessários e retornar as respostas ao cliente.

Não devem conter regras de negócio nem acesso direto ao banco de dados.

### Services

Responsáveis pelas regras de negócio da aplicação.

Devem coordenar o fluxo da operação antes de acessar os dados.

### Repositories

Responsáveis pelo acesso ao banco de dados.

Todo código SQL deve permanecer nesta camada.

### Database

Responsável pela configuração e gerenciamento da conexão com o PostgreSQL.

### Config

Responsável pelas configurações da aplicação, como leitura de variáveis de ambiente.

### Middlewares

Responsáveis por interceptar requisições para executar funcionalidades compartilhadas, como autenticação, validações ou logs.

### Types

Responsável pelos tipos e interfaces compartilhados entre os módulos da aplicação.

---

## Fluxo da Requisição

Toda requisição deverá seguir o seguinte fluxo:

```text
Cliente
    ↓
Routes
    ↓
Controller
    ↓
Service
    ↓
Repository
    ↓
PostgreSQL
```

A resposta deverá retornar seguindo o caminho inverso até o cliente.

---

## Regras Arquiteturais

- Cada camada deve possuir apenas uma responsabilidade.
- Controllers não devem acessar o banco diretamente.
- Controllers não devem conter regras de negócio.
- Services não devem conhecer detalhes do protocolo HTTP.
- Repositories devem concentrar todo acesso ao banco de dados.
- Configurações devem permanecer centralizadas.
- O projeto deverá crescer mantendo a separação de responsabilidades.

---

## Critérios de Aceite

Esta etapa será considerada concluída quando:

- a estrutura inicial do backend estiver organizada;
- o CRUD de tarefas estiver funcionando;
- as responsabilidades estiverem separadas por camada;
- a aplicação utilizar PostgreSQL;
- a arquitetura estiver documentada.

---

## Próximas Etapas

Após a conclusão desta etapa, esta arquitetura servirá como base para:

- desenvolvimento do frontend;
- autenticação de usuários;
- integração com IA;
- integração com n8n;
- integração com MCP;
- integração com WhatsApp.