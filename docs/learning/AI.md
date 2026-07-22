# Etapa 6 — Integração com Inteligência Artificial

## Objetivo da etapa

Nesta etapa o objetivo não foi aprender Inteligência Artificial de forma isolada.

A proposta foi integrar um modelo de IA à arquitetura já existente do projeto, compreendendo como um sistema profissional utiliza um LLM para interpretar linguagem natural sem transferir para ele as regras de negócio.

Ao final da etapa a arquitetura passou a ser:

Usuário

↓

n8n

↓

IA (Gemini)

↓

Switch

↓

Backend

↓

PostgreSQL

A IA passou a ser apenas mais uma camada da arquitetura.

---

# Objetivos definidos

- Integrar um modelo de IA ao n8n.
- Aprender como enviar prompts.
- Estruturar respostas da IA.
- Transformar respostas em dados úteis.
- Manter o backend desacoplado da IA.
- Permitir que a IA decidisse qual operação do CRUD deveria ser executada.

Todos esses objetivos foram concluídos.

---

# Escolha do modelo

Foi escolhido o Google Gemini.

Motivos:

- possui plano gratuito;
- integração simples com o n8n;
- suficiente para as necessidades do projeto;
- baixo custo para estudos futuros.

---

# Primeiro aprendizado

O primeiro teste consistiu apenas em enviar uma mensagem para o modelo.

Exemplo:

Entrada

"Qual a capital do Brasil?"

Saída

"A capital do Brasil é Brasília."

O objetivo não era o conteúdo da resposta, mas compreender como o AI Agent funciona dentro do n8n.

---

# Problema encontrado

Inicialmente a IA retornava texto puro.

Exemplo:

{
  "output": "A capital do Brasil é Brasília."
}

Esse formato não poderia ser utilizado pelo restante do workflow.

Foi então utilizado o recurso:

Require Specific Output Format

em conjunto com:

Structured Output Parser

utilizando JSON Schema.

Esse foi um dos aprendizados mais importantes da etapa.

---

# Structured Output

Após configurar o Output Parser, a IA passou a responder objetos estruturados.

Exemplo:

{
    "titulo": "Estudar TypeScript",
    "descricao": ""
}

Isso eliminou a necessidade de interpretar textos utilizando regras ou expressões regulares.

O backend passou a receber dados estruturados.

---

# Prompt Engineering

O prompt do sistema foi desenvolvido para restringir completamente a resposta da IA.

Principais regras:

- responder apenas JSON;
- não utilizar Markdown;
- não utilizar ```json;
- não explicar nada;
- preencher apenas os campos necessários.

Isso tornou as respostas previsíveis.

---

# Evolução da arquitetura

Inicialmente imaginei que a IA criaria diretamente uma tarefa.

Durante a implementação percebi que isso limitaria bastante o sistema.

A arquitetura evoluiu para que a IA identificasse primeiro a intenção do usuário.

Exemplo:

Mensagem:

"Crie uma tarefa para estudar IA"

↓

IA

↓

acao = criar

↓

Workflow de criação

Outro exemplo:

"Liste minhas tarefas"

↓

acao = listar

↓

Workflow de listagem

Ou seja, a IA passou a identificar intenções, não executar regras.

---

# Uso do Switch

Foi criado um Switch responsável por encaminhar cada intenção para um fluxo específico.

As ações implementadas foram:

- criar_tarefa
- listar_tarefas
- concluir_tarefa
- excluir_tarefa

Essa decisão tornou o workflow muito mais organizado do que utilizar vários IFs.

---

# Fluxos implementados

## Criar tarefa

IA

↓

Edit Fields

↓

POST /tarefas

↓

Backend

---

## Listar tarefas

IA

↓

GET /tarefas

↓

Backend

---

## Concluir tarefa

IA

↓

GET /tarefas

↓

Code

↓

PATCH /tarefas/:id/concluir

↓

Backend

---

## Excluir tarefa

IA

↓

GET /tarefas

↓

Code

↓

DELETE /tarefas/:id

↓

Backend

---

# Aprendizado sobre o Code Node

Foi o primeiro contato com JavaScript dentro do n8n.

Aprendi que o Code consegue acessar:

dados do node anterior:

$input.all()

e também qualquer outro node do workflow:

$('AI Agent')

Isso permitiu localizar automaticamente o ID da tarefa utilizando apenas o título informado pela IA.

---

# Descoberta importante durante o desenvolvimento

Ao implementar o fluxo de concluir percebi que meu backend ainda não possuía uma regra específica para concluir tarefas.

Existia apenas:

PATCH /tarefas/:id

que atualizava o título.

Foi criada uma nova funcionalidade no backend:

PATCH /tarefas/:id/concluir

Essa mudança deixou a API mais alinhada ao domínio do projeto.

Foi uma evolução descoberta durante a implementação da IA.

---

# Validação de títulos duplicados

Durante os testes percebi outro problema.

Era possível criar várias tarefas com exatamente o mesmo título.

Isso dificultaria muito a identificação automática realizada pela IA.

Foi adicionada uma validação no Service impedindo títulos duplicados.

Essa decisão tornou a integração muito mais confiável.

---

# Papel de cada camada

IA

Responsável apenas por interpretar linguagem natural.

n8n

Responsável por integrar sistemas e orquestrar o fluxo.

Backend

Responsável pelas regras de negócio.

PostgreSQL

Responsável pela persistência.

Essa separação foi mantida durante toda a etapa.

---

# O que NÃO fiz

Não utilizei memória da IA.

Não utilizei agentes complexos.

Não utilizei ferramentas (Tools).

Não utilizei RAG.

Não utilizei múltiplos modelos.

Não utilizei embeddings.

Esses conceitos não eram necessários para o produto atual.

---

# Melhorias identificadas

Durante a implementação surgiram algumas melhorias que não foram implementadas por não fazerem parte do escopo atual.

## Buscar apenas tarefas pendentes

Hoje:

GET /tarefas

retorna todas.

No futuro seria interessante:

GET /tarefas

↓

apenas tarefas pendentes

e

GET /tarefas/concluidas

↓

apenas tarefas concluídas.

---

## Workflow modular

Atualmente existe um único workflow contendo todos os fluxos.

No futuro cada operação poderá ser separada utilizando Execute Workflow.

Isso reduzirá a complexidade visual.

---

## Busca por título

Atualmente o fluxo procura tarefas pelo título.

Funciona porque foi adicionada a validação impedindo títulos duplicados.

Caso o projeto evolua para múltiplos usuários, provavelmente será necessário utilizar outro identificador ou contexto.

---

# Principal aprendizado da etapa

O maior aprendizado não foi utilizar uma IA.

Foi compreender que um LLM não deve substituir a lógica da aplicação.

A IA interpreta intenções.

O backend continua responsável pelas regras de negócio.

O n8n conecta os sistemas.

Essa arquitetura mantém o sistema desacoplado, organizado e fácil de evoluir.

---

# Conclusão

Ao finalizar esta etapa a aplicação passou a compreender comandos em linguagem natural e convertê-los em operações reais do sistema.

A arquitetura final ficou:

Usuário

↓

Mensagem

↓

Webhook (n8n)

↓

Google Gemini

↓

Structured Output

↓

Switch

↓

Fluxo específico

↓

Backend

↓

PostgreSQL

A integração foi realizada preservando a separação de responsabilidades e mantendo o backend independente da IA.

Essa etapa representou a transformação do projeto em um assistente inteligente capaz de executar operações reais através de linguagem natural.