# SPEC — Etapa 6 — Integração com Inteligência Artificial

## Objetivo

Adicionar uma camada de Inteligência Artificial ao fluxo da aplicação.

A IA será responsável por interpretar mensagens em linguagem natural enviadas pelo usuário e transformá-las em dados estruturados que possam ser utilizados pelo backend.

Esta etapa tem como objetivo aprender como integrar um modelo de IA em uma arquitetura real, mantendo o sistema desacoplado.

---

## Fluxo esperado

Usuário

↓

Webhook (n8n)

↓

IA

↓

Edit Fields

↓

HTTP Request

↓

Backend

↓

PostgreSQL

↓

Resposta

---

## Responsabilidades

### IA

- interpretar linguagem natural;
- extrair informações relevantes;
- responder em formato estruturado.

Exemplo:

Entrada:

"Adicionar tarefa estudar Node amanhã"

Saída:

{
  "acao": "criar_tarefa",
  "titulo": "Estudar Node",
  "data": "amanhã"
}

---

### n8n

Responsável por:

- enviar prompts;
- receber resposta da IA;
- adaptar os dados;
- encaminhar ao backend.

Não deve conter regras de negócio.

---

### Backend

Continua responsável por:

- validações;
- regras de negócio;
- persistência;
- acesso ao banco.

---

## Requisitos Funcionais

RF01

O workflow deve conseguir enviar mensagens para um modelo de IA.

RF02

A resposta da IA deve ser recebida pelo n8n.

RF03

Os dados devem ser convertidos para o formato esperado pela API.

RF04

A API deve criar a tarefa normalmente.

---

## Requisitos Não Funcionais

- manter baixo acoplamento;
- facilitar troca futura do modelo de IA;
- evitar lógica de negócio dentro do n8n;
- manter arquitetura existente.

---

## Critérios de Aceitação

- IA responde corretamente;
- n8n interpreta a resposta;
- backend recebe JSON válido;
- tarefa é salva no PostgreSQL.