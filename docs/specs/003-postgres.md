# 002 - Integração PostgreSQL

## Objetivo

Substituir o armazenamento em memória da API TODO por um banco de dados PostgreSQL local, mantendo a mesma API REST desenvolvida anteriormente.

O objetivo desta etapa é compreender como uma aplicação Node.js estabelece conexão com um banco de dados relacional, executa comandos SQL e utiliza os resultados para atender às requisições HTTP.

---

## Escopo

Nesta etapa será implementado:

- conexão da aplicação com PostgreSQL local;
- criação do banco de dados;
- criação da tabela de tarefas;
- execução de comandos SQL através do Node.js;
- substituição gradual do array em memória por consultas ao banco;
- manutenção dos mesmos endpoints REST existentes.

---

## Fora do escopo

Não faz parte desta etapa:

- ORMs (Prisma, TypeORM, Sequelize...)
- autenticação
- migrations automáticas
- Docker
- deploy
- otimizações de performance

---

## Requisitos Funcionais

### RF01

A aplicação deve conectar ao PostgreSQL durante sua inicialização.

### RF02

O endpoint GET /tarefas deve retornar os registros existentes na tabela.

### RF03

O endpoint GET /tarefas/:id deve consultar uma tarefa pelo identificador.

### RF04

O endpoint POST /tarefas deve inserir uma nova tarefa no banco.

### RF05

O endpoint PATCH /tarefas/:id deve atualizar uma tarefa existente.

### RF06

O endpoint DELETE /tarefas/:id deve remover uma tarefa.

---

## Regras de Negócio

- O id será controlado pelo banco de dados.
- Toda nova tarefa inicia com concluida = false.
- A data de criação será registrada automaticamente.
- Caso uma tarefa não exista, a API deverá retornar HTTP 404.

---

## Critérios de Aceitação

- A aplicação conecta ao PostgreSQL sem erros.
- Todas as operações CRUD utilizam SQL.
- O array em memória deixa de ser utilizado.
- Os endpoints permanecem com o mesmo comportamento para o cliente.
- Os dados permanecem armazenados após reiniciar o servidor.

---

## Tecnologias

- Node.js
- TypeScript
- Express
- PostgreSQL
- driver pg