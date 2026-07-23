# SPEC — Etapa 8: Integração com WhatsApp

## Objetivo

Integrar o sistema de gerenciamento de tarefas ao WhatsApp utilizando a **WhatsApp Cloud API**, permitindo que mensagens enviadas pelo usuário sejam processadas pelo workflow já existente no n8n.

Esta etapa **não altera a arquitetura existente**, apenas adiciona uma nova porta de entrada para o sistema.

---

# Escopo

Esta etapa contempla:

- Conectar a WhatsApp Cloud API ao n8n;
- Receber mensagens enviadas pelo WhatsApp;
- Encaminhar essas mensagens ao workflow existente;
- Utilizar a IA para interpretar a intenção do usuário;
- Executar as operações no backend;
- Devolver a resposta ao usuário pelo WhatsApp.

Não faz parte desta etapa:

- Autenticação de usuários;
- Múltiplos usuários;
- Envio de imagens;
- Envio de áudios;
- Envio de documentos;
- Grupos do WhatsApp;
- Mensagens de mídia.

Esses itens poderão ser implementados futuramente.

---

# Arquitetura

A arquitetura do sistema permanece exatamente a mesma.

```text
Usuário
    │
    ▼
WhatsApp Cloud API
    │
    ▼
n8n
    │
    ▼
AI Agent
    │
    ▼
Structured Output
    │
    ▼
Switch
    │
    ▼
Backend
    │
    ▼
PostgreSQL
    │
    ▼
Resposta
    │
    ▼
WhatsApp
```

---

# Regras de Negócio

## RN01

O WhatsApp será apenas um canal de comunicação.

Ele não conterá regras de negócio.

---

## RN02

Toda interpretação de linguagem natural continuará sendo responsabilidade da IA.

---

## RN03

Toda regra de negócio continuará sendo responsabilidade do Backend.

---

## RN04

O n8n continuará responsável apenas por:

- Integrar sistemas;
- Adaptar dados;
- Orquestrar o fluxo.

---

## RN05

O WhatsApp deverá apenas enviar e receber mensagens.

---

# Fluxo Esperado

Exemplo:

Usuário envia:

> criar tarefa estudar TypeScript

↓

WhatsApp recebe a mensagem

↓

n8n recebe o webhook

↓

IA interpreta a intenção

↓

Structured Output

↓

Switch

↓

Fluxo Criar

↓

POST /tarefas

↓

Backend

↓

PostgreSQL

↓

Resposta

↓

WhatsApp envia:

> ✅ Tarefa criada com sucesso.

---

# Critérios de Aceite

A etapa será considerada concluída quando for possível:

- Receber mensagens pelo WhatsApp;
- Acionar automaticamente o workflow do n8n;
- Executar os quatro fluxos já existentes:
  - Criar;
  - Listar;
  - Concluir;
  - Excluir;
- Receber a resposta diretamente no WhatsApp;
- Manter o backend sem alterações arquiteturais.

---

# Fora do Escopo

Não fazem parte desta etapa:

- Múltiplos usuários;
- Autenticação;
- Histórico de conversas;
- Memória da IA;
- Envio de anexos;
- Mensagens de voz;
- Grupos;
- Painel administrativo.

---

# Riscos Conhecidos

- Limitações do ambiente gratuito da WhatsApp Cloud API;
- Expiração do Access Token;
- Mudanças futuras na API oficial da Meta.

---

# Melhorias Futuras

- Suporte a mensagens de áudio utilizando transcrição;
- Suporte a imagens;
- Identificação de usuários por número de telefone;
- Memória de contexto entre mensagens;
- Respostas mais naturais utilizando IA;
- Notificações automáticas de tarefas agendadas.

---

# Decisões Arquiteturais

## DA01 — O WhatsApp será apenas uma porta de entrada

A integração com o WhatsApp não altera a arquitetura construída durante o projeto.

Sua única responsabilidade é transportar mensagens entre o usuário e o workflow do n8n.

---

## DA02 — O n8n continua sendo o orquestrador

O n8n permanece responsável por:

- Receber mensagens;
- Acionar a IA;
- Direcionar os fluxos;
- Chamar o Backend;
- Enviar a resposta ao WhatsApp.

Nenhuma regra de negócio será implementada no n8n.

---

## DA03 — O Backend continua sendo o núcleo do sistema

Toda validação, regra de negócio e persistência continuam sendo responsabilidade exclusiva do Backend.

Isso garante que futuras interfaces (como um painel web ou aplicativo mobile) possam reutilizar exatamente a mesma API.

---

# Objetivos de Aprendizado

Ao concluir esta etapa, espera-se compreender:

- Como funciona a arquitetura da WhatsApp Cloud API;
- Como o WhatsApp se comunica com aplicações externas;
- Como configurar Webhooks na Meta;
- Como integrar a Cloud API ao n8n;
- Como enviar mensagens pelo WhatsApp via API;
- Como receber mensagens automaticamente;
- Como reutilizar um workflow existente sem alterar sua arquitetura;
- Como conectar um serviço externo a um sistema já construído.

---

# Resultado Esperado

Ao final desta etapa, o usuário poderá enviar mensagens diretamente pelo WhatsApp, e todo o fluxo do sistema acontecerá automaticamente:

```text
Usuário
    │
    ▼
WhatsApp
    │
    ▼
n8n
    │
    ▼
IA
    │
    ▼
Backend
    │
    ▼
PostgreSQL
    │
    ▼
Resposta
    │
    ▼
WhatsApp
```

Sem modificar a arquitetura construída nas etapas anteriores, apenas adicionando uma nova interface de comunicação.