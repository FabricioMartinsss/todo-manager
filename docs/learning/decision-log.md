# Evolução da Arquitetura

Este documento registra decisões tomadas durante o desenvolvimento do projeto.

O objetivo não é listar funcionalidades, mas mostrar como a arquitetura evoluiu conforme novos problemas apareceram.

---

# Decisão 1 — Não desenvolver Frontend

## Ideia inicial

Construir uma interface web.

## Motivo da mudança

O produto final será utilizado pelo WhatsApp.

Criar um frontend neste momento aumentaria o tempo de desenvolvimento sem agregar valor ao objetivo principal.

## Resultado

O frontend foi removido do escopo.

Toda comunicação ocorrerá através da API.

Caso seja necessário um painel administrativo no futuro, ele consumirá exatamente a mesma API.

---

# Decisão 2 — n8n não possui regras de negócio

## Ideia inicial

Algumas validações seriam feitas dentro do workflow.

## Problema

Isso espalharia regras entre backend e automação.

## Decisão

O n8n passou a ser responsável apenas por:

- integração
- transformação de dados
- orquestração

Toda regra de negócio permaneceu no backend.

---

# Decisão 3 — Structured Output

## Problema

A IA retornava texto.

Isso dificultava o processamento.

## Decisão

Foi adotado Structured Output utilizando JSON Schema.

Resultado:

A IA passou a responder objetos previsíveis.

---

# Decisão 4 — IA identifica intenções

## Ideia inicial

Criar tarefa diretamente.

## Problema

A IA ficaria limitada apenas à criação.

## Nova arquitetura

IA

↓

Switch

↓

Fluxos específicos

A IA passou a identificar intenções.

---

# Decisão 5 — Switch substitui IFs

Inicialmente vários IFs seriam utilizados.

Foi substituído por um único Switch.

Motivos:

- organização
- escalabilidade
- legibilidade

---

# Decisão 6 — Impedir títulos duplicados

## Problema

A IA localiza tarefas pelo título.

Títulos iguais tornariam a busca ambígua.

## Decisão

Adicionar validação no Service.

---

# Decisão 7 — Criar endpoint específico para concluir tarefas

## Problema

O backend possuía apenas:

PATCH /tarefas/:id

que atualizava o título.

A IA precisava concluir tarefas.

## Decisão

Criar:

PATCH /tarefas/:id/concluir

Isso tornou a API mais alinhada ao domínio da aplicação.

---

# Decisão 8 — Não alterar o GET de tarefas

Foi identificado que no futuro será interessante separar:

GET /tarefas

GET /tarefas/concluidas

Entretanto essa melhoria foi documentada e não implementada nesta etapa por não fazer parte do escopo atual.

---

# Decisão 9 — Não modularizar workflows neste momento

Foi identificado que cada fluxo poderá se tornar um workflow independente.

Como o projeto ainda possui poucos fluxos, decidiu-se manter um único workflow para facilitar o aprendizado.

Essa melhoria fica registrada para futuras versões.