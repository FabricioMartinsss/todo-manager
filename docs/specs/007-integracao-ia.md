# SPEC — Etapa 6: Interpretador Inteligente de Comandos

## Objetivo

Implementar uma camada de Inteligência Artificial capaz de interpretar comandos em linguagem natural e convertê-los em ações estruturadas para o sistema de gerenciamento de tarefas.

O objetivo desta etapa não é criar um chatbot, mas sim um **interpretador de comandos**, permitindo que o usuário interaja naturalmente com o sistema enquanto o backend continua responsável pelas regras de negócio.

---

# Arquitetura

```text
Usuário

↓

Mensagem em linguagem natural

↓

Webhook (n8n)

↓

IA (Gemini)

↓

Structured Output Parser

↓

Switch (identifica a ação)

├── criar_tarefa
├── listar_tarefas
├── concluir_tarefa
└── excluir_tarefa

↓

Edit Fields

↓

HTTP Request

↓

Backend

↓

PostgreSQL
```

---

# Responsabilidades

## IA

Responsável por:

- interpretar a mensagem do usuário;
- identificar a intenção;
- extrair informações relevantes;
- responder utilizando JSON estruturado.

A IA **não**:

- acessa banco;
- executa regras de negócio;
- altera dados.

---

## n8n

Responsável por:

- receber mensagens;
- enviar mensagens para a IA;
- validar a resposta através do Structured Output Parser;
- decidir qual fluxo será executado;
- adaptar os dados para o formato esperado pela API.

O n8n não conterá regras de negócio.

---

## Backend

Continua responsável por:

- validações;
- regras de negócio;
- CRUD;
- acesso ao PostgreSQL;
- persistência dos dados.

O backend não conhece a IA.

Recebe apenas dados estruturados.

---

# Fluxo esperado

Exemplo de entrada:

```text
Adicionar tarefa estudar IA amanhã
```

Resposta esperada da IA:

```json
{
  "acao": "criar_tarefa",
  "titulo": "Estudar IA",
  "descricao": "",
  "data": "amanhã",
  "hora": ""
}
```

O n8n utilizará apenas os campos necessários para a versão atual da API.

---

# Ações suportadas

Inicialmente a IA deverá identificar quatro intenções:

- criar_tarefa
- listar_tarefas
- concluir_tarefa
- excluir_tarefa

Novas ações poderão ser adicionadas futuramente sem alterar a arquitetura.

---

# Blocos de Desenvolvimento

## Bloco 1 — Integração com IA ✅

Objetivo:

Conectar o Gemini ao workflow.

Aprendizados:

- AI Agent;
- Google Gemini;
- Prompt;
- Structured Output Parser;
- JSON estruturado.

Status:

Concluído.

---

## Bloco 2 — Interpretador de Intenções

Objetivo:

Ensinar a IA a identificar qual operação do sistema deve ser executada.

Exemplo:

```text
Adicionar tarefa estudar IA
```

↓

```json
{
    "acao":"criar_tarefa"
}
```

---

## Bloco 3 — Orquestração

Objetivo:

Utilizar um Switch para direcionar o fluxo de acordo com a ação identificada pela IA.

---

## Bloco 4 — Integração com a API

Objetivo:

Executar a rota correspondente do backend conforme a ação retornada pela IA.

---

# Critérios de Aceitação

- A IA interpreta comandos escritos em linguagem natural.
- A resposta da IA segue um schema estruturado.
- O n8n identifica corretamente a ação retornada.
- Cada ação é encaminhada para o fluxo correspondente.
- O backend permanece desacoplado da IA.
- O banco continua armazenando apenas os dados necessários.

---

# Aprendizados Esperados

Ao concluir esta etapa, deverá ser possível compreender:

- o papel da IA dentro da arquitetura;
- como estruturar prompts para aplicações;
- como utilizar Structured Output Parser;
- como transformar linguagem natural em comandos estruturados;
- como utilizar IA sem acoplar regras de negócio ao modelo;
- como construir uma arquitetura preparada para futuras integrações com WhatsApp.