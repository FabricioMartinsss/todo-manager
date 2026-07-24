# SPEC — Etapa 8: Integração com WhatsApp

## Objetivo

Integrar o sistema de gerenciamento de tarefas ao WhatsApp utilizando a **Evolution API**, permitindo que mensagens enviadas pelo usuário sejam processadas pelo workflow já existente no n8n.

Esta etapa **não altera a arquitetura existente**, apenas adiciona uma nova porta de entrada para o sistema.

---

# Escopo

Esta etapa contempla:

- Instalar e configurar a Evolution API;
- Criar uma instância do WhatsApp;
- Conectar um número de WhatsApp através do QR Code;
- Receber mensagens enviadas pelo WhatsApp;
- Encaminhar essas mensagens ao workflow existente do n8n;
- Utilizar a IA para interpretar a intenção do usuário;
- Executar as operações no backend;
- Devolver a resposta ao usuário pelo WhatsApp.

Não faz parte desta etapa:

- Múltiplos usuários;
- Envio de imagens;
- Envio de áudios;
- Envio de documentos;
- Grupos do WhatsApp;
- Mensagens de mídia;
- Histórico de conversas.

Esses itens poderão ser implementados futuramente.

---

# Arquitetura

A arquitetura do sistema permanece exatamente a mesma.

```text
Usuário
    │
    ▼
WhatsApp
    │
    ▼
Evolution API
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
Evolution API
    │
    ▼
WhatsApp
```

---

# Regras de Negócio

## RN01

A Evolution API será apenas um canal de comunicação entre o WhatsApp e o n8n.

Ela não conterá regras de negócio.

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

A Evolution API será utilizada apenas para:

- Receber mensagens do WhatsApp;
- Enviar respostas ao usuário.

---

# Fluxo Esperado

Exemplo:

Usuário envia:

> criar tarefa estudar TypeScript

↓

WhatsApp

↓

Evolution API

↓

Webhook do n8n

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

Evolution API

↓

WhatsApp

↓

Usuário recebe:

> ✅ Tarefa criada com sucesso.

---

# Critérios de Aceite

A etapa será considerada concluída quando for possível:

- Conectar um número de WhatsApp à Evolution API;
- Receber mensagens automaticamente no n8n;
- Acionar o workflow existente;
- Executar os quatro fluxos já implementados:
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
- Mensagens de voz;
- Envio de imagens;
- Envio de documentos;
- Grupos;
- Painel administrativo.

---

# Riscos Conhecidos

- Necessidade de manter a instância da Evolution API ativa;
- Desconexão da sessão do WhatsApp;
- Alterações futuras na Evolution API;
- Dependência da infraestrutura onde a Evolution API estiver executando.

---

# Melhorias Futuras

- Suporte a múltiplos usuários;
- Suporte a mensagens de áudio utilizando transcrição;
- Suporte a imagens;
- Memória de contexto entre mensagens;
- Identificação automática de usuários pelo número de telefone;
- Notificações automáticas de tarefas agendadas;
- Modularização dos workflows do n8n.

---

# Decisões Arquiteturais

## DA01 — A Evolution API será apenas uma porta de entrada

A integração com o WhatsApp não altera a arquitetura construída durante o projeto.

Sua única responsabilidade é transportar mensagens entre o WhatsApp e o workflow do n8n.

---

## DA02 — O n8n continua sendo o orquestrador

O n8n permanece responsável por:

- Receber mensagens;
- Acionar a IA;
- Direcionar os fluxos;
- Chamar o Backend;
- Enviar a resposta para a Evolution API.

Nenhuma regra de negócio será implementada no n8n.

---

## DA03 — O Backend continua sendo o núcleo do sistema

Toda validação, regra de negócio e persistência continuam sendo responsabilidade exclusiva do Backend.

Isso garante que futuras interfaces (como um painel web ou aplicativo mobile) possam reutilizar exatamente a mesma API.

---

# Objetivos de Aprendizado

Ao concluir esta etapa, espera-se compreender:

- Como funciona a arquitetura da Evolution API;
- Como criar uma instância do WhatsApp;
- Como conectar um número através do QR Code;
- Como a Evolution API envia eventos para o n8n;
- Como responder mensagens utilizando a Evolution API;
- Como integrar um serviço externo sem alterar a arquitetura do sistema;
- Como reutilizar o workflow já construído.

---

# Resultado Esperado

Ao final desta etapa, o usuário poderá enviar mensagens diretamente pelo WhatsApp, e todo o fluxo do sistema acontecerá automaticamente.

```text
Usuário
    │
    ▼
WhatsApp
    │
    ▼
Evolution API
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
Evolution API
    │
    ▼
WhatsApp
```

Toda a inteligência do sistema continuará exatamente onde foi projetada:

- WhatsApp → Interface de comunicação.
- Evolution API → Ponte entre WhatsApp e n8n.
- n8n → Orquestração.
- IA → Interpretação da linguagem natural.
- Backend → Regras de negócio.
- PostgreSQL → Persistência dos dados.

Essa separação mantém a arquitetura desacoplada e facilita futuras substituições da camada de mensageria sem impactar o restante da aplicação.