# Etapa 5 — Integração com n8n

## Objetivo

O objetivo desta etapa foi aprender como utilizar o **n8n** para automatizar processos utilizando uma API desenvolvida por mim.

Mais do que aprender a ferramenta, o foco foi compreender como uma plataforma de automação se encaixa na arquitetura do projeto sem assumir responsabilidades que pertencem ao backend.

Ao final da etapa, o n8n passou a ser a camada responsável por **orquestrar integrações**, enquanto o backend continua sendo responsável pelas regras de negócio e pelo acesso ao banco de dados.

---

# Arquitetura

Ao final desta etapa, a arquitetura ficou organizada da seguinte forma:

```text
Cliente
    │
    ▼
n8n
(Webhooks / Workflows / Automações)
    │
    ▼
API Backend
    │
    ▼
PostgreSQL
```

O n8n atua como intermediário entre sistemas, enquanto a API permanece como a única responsável por executar as regras da aplicação.

---

# Conceitos aprendidos

## Webhook

Aprendi que um Webhook funciona como um ponto de entrada para um workflow.

Enquanto uma API aguarda requisições para executar código, o n8n aguarda eventos para iniciar fluxos automatizados.

Durante os testes compreendi a diferença entre:

- Test URL
- Production URL

A URL de teste é utilizada durante o desenvolvimento, enquanto a URL de produção é utilizada quando o workflow está ativo.

Também compreendi que o Webhook pode receber:

- método HTTP;
- headers;
- parâmetros;
- corpo da requisição (Body).

---

## HTTP Request

Aprendi que o node HTTP Request permite ao n8n consumir qualquer API HTTP.

No projeto ele foi utilizado para chamar minha própria API, demonstrando que o n8n funciona como qualquer outro cliente HTTP.

O fluxo ficou:

```text
Webhook

↓

HTTP Request

↓

API
```

---

## Respond to Webhook

Aprendi que um Webhook precisa enviar uma resposta para quem iniciou a requisição.

O node Respond to Webhook encerra a execução e devolve o resultado para o cliente.

Esse comportamento é equivalente ao uso de `res.json()` no Express.

---

## IF

Aprendi a utilizar o node IF para controlar o fluxo de execução.

Foi criada uma validação simples para impedir que a API fosse chamada quando o campo `title` não estivesse presente.

Fluxo criado:

```text
Webhook

↓

IF

├── válido → HTTP Request

└── inválido → Respond to Webhook
```

Esse conceito será reutilizado futuramente para validar respostas da IA e mensagens recebidas pelo WhatsApp.

---

## Edit Fields (Set)

Este foi um dos conceitos mais importantes aprendidos.

O node Edit Fields permite transformar os dados recebidos antes de enviá-los para outro sistema.

Exemplo:

Entrada:

```json
{
    "task": "Estudar IA"
}
```

Saída:

```json
{
    "title": "Estudar IA"
}
```

Isso permite padronizar o formato dos dados sem alterar nem quem envia nem quem recebe.

Na prática, o n8n atua como uma camada de adaptação entre sistemas.

Esse conceito será essencial durante a integração com IA e WhatsApp.

---

## Schedule Trigger

Aprendi que um workflow também pode ser iniciado automaticamente.

Enquanto o Webhook depende de alguém enviar uma requisição, o Schedule Trigger permite que o próprio n8n execute um fluxo em horários programados.

Exemplo:

```text
Todo dia às 08:00

↓

Buscar tarefas

↓

Executar ação
```

Embora essa funcionalidade não faça parte do fluxo principal do projeto, ela poderá ser utilizada futuramente para:

- lembretes automáticos;
- envio de notificações;
- limpeza de dados;
- backups;
- geração de relatórios.

---

# Principais aprendizados

Durante esta etapa compreendi que o n8n não substitui o backend.

Cada camada possui responsabilidades diferentes.

Backend:

- regras de negócio;
- validações principais;
- acesso ao banco;
- persistência dos dados.

n8n:

- integração entre sistemas;
- automações;
- transformação de dados;
- orquestração de fluxos.

Essa separação mantém a arquitetura organizada e facilita futuras integrações.

---

# Evolução do workflow

Inicialmente o workflow apenas respondia uma requisição.

```text
Webhook

↓

Respond to Webhook
```

Depois passou a integrar o backend.

```text
Webhook

↓

HTTP Request

↓

Respond to Webhook
```

Em seguida recebeu validação.

```text
Webhook

↓

IF

↓

HTTP Request

↓

Respond to Webhook
```

Depois passou a transformar os dados antes de enviá-los.

```text
Webhook

↓

IF

↓

Edit Fields

↓

HTTP Request

↓

Respond to Webhook
```

Por fim foi criado um segundo workflow utilizando Schedule Trigger para compreender automações executadas por tempo.

---

# Resultado da etapa

Ao finalizar esta etapa fui capaz de:

- criar Webhooks;
- consumir APIs utilizando HTTP Request;
- responder requisições corretamente;
- controlar fluxos utilizando IF;
- transformar dados utilizando Edit Fields;
- criar workflows executados automaticamente;
- organizar workflows para versionamento dentro do projeto.

Além disso, compreendi como o n8n será utilizado nas próximas etapas do projeto sem comprometer a arquitetura construída no backend.

---

# Próxima etapa

Com a camada de automação pronta, o próximo passo será integrar Inteligência Artificial.

O objetivo será utilizar o n8n para receber mensagens, enviar essas mensagens para um modelo de IA, transformar a resposta em um formato adequado e encaminhá-la para a API.

Dessa forma, o n8n passará a atuar como o orquestrador entre o usuário, a IA e o backend, mantendo cada componente responsável apenas pela sua própria função.