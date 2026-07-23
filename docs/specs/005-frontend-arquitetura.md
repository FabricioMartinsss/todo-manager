# Etapa 5 Frontend Architecture Specification

## Objetivo

Definir a arquitetura do frontend do projeto **TODO Manager**, estabelecendo sua organização, responsabilidades, fluxo de comunicação e princípios arquiteturais.

Esta especificação servirá como referência durante todo o desenvolvimento da interface, garantindo que novas funcionalidades sejam implementadas de forma consistente, organizada e escalável.

---

# Contexto

Até esta etapa, o backend foi completamente estruturado utilizando uma arquitetura em camadas composta por:

* Routes
* Controllers
* Services
* Repositories
* Database
* Middlewares

O frontend será desenvolvido seguindo a mesma filosofia arquitetural:

* responsabilidades bem definidas;
* separação de responsabilidades;
* código reutilizável;
* facilidade de manutenção;
* facilidade de evolução.

O objetivo não é apenas construir telas, mas desenvolver uma arquitetura frontend preparada para acompanhar o crescimento do sistema.

---

# Objetivos da Etapa

Ao final desta etapa, o frontend deverá ser capaz de:

* exibir a interface do sistema;
* consumir a API REST desenvolvida no backend;
* permitir operações completas do CRUD de tarefas;
* possuir uma arquitetura organizada e escalável;
* servir como base para futuras integrações (n8n, IA e WhatsApp).

---

# Objetivos de Aprendizado

Durante esta etapa o foco será compreender:

* arquitetura de aplicações React;
* organização de projetos frontend;
* componentes;
* reutilização de componentes;
* props;
* gerenciamento de estado;
* renderização;
* comunicação entre componentes;
* comunicação com APIs REST;
* separação de responsabilidades;
* boas práticas de organização.

O objetivo continua sendo compreender profundamente cada conceito antes de avançar para o próximo.

---

# Escopo

Esta etapa contempla:

* configuração do projeto React;
* estrutura inicial do frontend;
* organização das pastas;
* criação de componentes;
* criação de páginas;
* consumo da API;
* gerenciamento de estado local;
* implementação da interface do sistema TODO.

Não fazem parte desta etapa:

* autenticação;
* autorização;
* WebSockets;
* integração com IA;
* integração com n8n;
* integração com WhatsApp;
* gerenciamento avançado de estado global (caso não seja necessário).

---

# Arquitetura

Toda interação do usuário seguirá o fluxo:

```text
Usuário

↓

Página

↓

Componentes

↓

Service

↓

API REST

↓

Backend

↓

PostgreSQL
```

Cada camada possui apenas uma responsabilidade.

---

# Estrutura Inicial

A estrutura inicial prevista para o projeto será:

```text
src/
│
├── assets/
├── components/
├── pages/
├── services/
├── hooks/
├── styles/
├── types/
│
├── App.tsx
└── main.tsx
```

A estrutura poderá evoluir conforme novas necessidades surgirem, mantendo sempre a organização arquitetural.

---

# Responsabilidades

## Pages

Representam telas completas da aplicação.

São responsáveis por organizar a interface utilizando componentes.

Não devem conter regras de comunicação com a API.

---

## Components

Representam partes reutilizáveis da interface.

Devem possuir uma responsabilidade bem definida.

Sempre que possível devem ser reutilizados por diferentes páginas.

---

## Services

Responsáveis pela comunicação com o backend.

Toda requisição HTTP deverá ser centralizada nesta camada.

Nenhum componente deverá conhecer URLs da API diretamente.

---

## Hooks

Responsáveis por encapsular lógica reutilizável da interface quando necessário.

Devem evitar duplicação de código entre componentes.

---

## Types

Responsáveis pelos tipos compartilhados da aplicação.

Devem representar estruturas de dados utilizadas pelo frontend.

---

## Assets

Armazenam imagens, ícones e demais arquivos estáticos.

---

## Styles

Centralizam estilos globais da aplicação.

---

# Princípios Arquiteturais

Durante todo o desenvolvimento serão seguidos os seguintes princípios:

* responsabilidade única para cada arquivo;
* separação clara entre interface e comunicação com a API;
* reutilização antes de duplicação;
* organização acima de velocidade de implementação;
* componentes pequenos e focados;
* código preparado para evolução;
* arquitetura consistente com o backend.

---

# Comunicação com o Backend

O frontend será responsável apenas por consumir a API.

Toda regra de negócio continuará pertencendo ao backend.

O frontend será responsável por:

* enviar requisições;
* receber respostas;
* exibir informações;
* capturar ações do usuário;
* apresentar mensagens de erro.

O backend continuará responsável por:

* validações;
* regras de negócio;
* acesso ao banco de dados;
* integridade das informações.

---

# Filosofia de Desenvolvimento

Antes de implementar qualquer funcionalidade deverá ser respondida a seguinte pergunta:

> Qual camada é responsável por isso?

Assim como ocorreu no backend, cada camada conhecerá apenas aquilo que realmente precisa conhecer.

---

# Critérios de Conclusão

Esta etapa será considerada concluída quando o frontend possuir:

* arquitetura definida;
* organização de pastas estabelecida;
* componentes reutilizáveis;
* comunicação com a API funcionando;
* interface completa do CRUD de tarefas;
* código organizado para suportar futuras integrações.

---

# Próximas Etapas

Após a conclusão desta etapa, o projeto evoluirá para:

1. Integração com n8n;
2. Integração com IA;
3. Integração com WhatsApp.

A arquitetura construída nesta etapa deverá servir como base para todas as próximas funcionalidades.
