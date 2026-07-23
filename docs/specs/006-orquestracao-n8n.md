# SPEC — Etapa 6: Integração com n8n

## Objetivo

Integrar o backend desenvolvido com o n8n para compreender como ferramentas de automação consomem APIs REST, executam fluxos automatizados e orquestram diferentes serviços sem alterar a arquitetura da aplicação.

---

## Contexto

Até esta etapa foi construída a fundação do sistema:

- API REST em Node.js + TypeScript
- Arquitetura em camadas
- PostgreSQL
- CRUD completo
- Tratamento global de erros
- Organização profissional de projeto

O backend passa a ser considerado a fonte oficial das regras de negócio e persistência de dados.

A partir desta etapa novas integrações deverão respeitar essa arquitetura.

---

## Escopo

Durante esta etapa serão desenvolvidos workflows no n8n capazes de consumir a API do sistema de gerenciamento de tarefas.

O n8n atuará apenas como orquestrador dos fluxos.

Nenhuma regra de negócio deverá ser implementada dentro do n8n.

---

## Objetivos de Aprendizado

Ao final desta etapa devo compreender:

- O que é o n8n.
- O que é um workflow.
- O que é um node.
- O que é um trigger.
- Como consumir APIs REST utilizando n8n.
- Como manipular dados entre nodes.
- Como tratar falhas em automações.
- Como integrar múltiplos serviços.
- Como separar responsabilidades entre automação e backend.

---

## Arquitetura

### Fluxo Principal

```text
Trigger

↓

Workflow n8n

↓

HTTP Request

↓

API Backend

↓

Controller

↓

Service

↓

Repository

↓

PostgreSQL

↓

Resposta

↓

Workflow

↓

Resultado Final
```

### Responsabilidades

Backend:

- Regras de negócio
- Validações
- Persistência
- Tratamento de erros

n8n:

- Orquestração
- Automações
- Consumo da API
- Integração entre serviços

---

## Regras Arquiteturais

- O backend continua sendo o dono das regras de negócio.
- O banco de dados só pode ser acessado pelo backend.
- O n8n nunca acessará o PostgreSQL diretamente.
- Toda comunicação ocorrerá através da API REST.
- Nenhuma validação de negócio será criada dentro do n8n.
- A arquitetura atual do backend não deverá ser alterada.

---

## Funcionalidades Previstas

### Workflow 01

Listar tarefas utilizando a API.

---

### Workflow 02

Criar tarefas utilizando a API.

---

### Workflow 03

Atualizar tarefas utilizando a API.

---

### Workflow 04

Excluir tarefas utilizando a API.

---

### Workflow 05

Executar automação baseada em Trigger.

Exemplo:

- execução agendada
- execução por horário
- execução recorrente

---

### Workflow 06

Receber dados através de Webhook.

---

## Critérios de Aceitação

A etapa será considerada concluída quando:

- O n8n conseguir consumir todos os endpoints da API.
- Os workflows executarem corretamente.
- Os erros retornados pela API forem tratados adequadamente.
- Nenhuma regra de negócio estiver implementada fora do backend.
- A arquitetura permanecer desacoplada.
- O sistema estiver preparado para receber IA.
- O sistema estiver preparado para receber WhatsApp.

---

## Resultado Esperado

Ao final da etapa o sistema deverá possuir a seguinte estrutura lógica:

```text
n8n

↓

API Backend

↓

PostgreSQL
```

E deverá estar preparado para evoluir para:

```text
WhatsApp

↓

n8n

↓

IA

↓

API Backend

↓

PostgreSQL
```