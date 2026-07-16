# Backend Architecture — Aprendizado da Etapa 4

# Objetivo

Nesta etapa deixei de apenas construir uma API REST e passei a organizar um backend utilizando uma arquitetura em camadas.

O objetivo não era adicionar novas funcionalidades, mas estruturar o projeto para que ele pudesse crescer de forma organizada, servindo como base para futuras integrações (Frontend, IA, n8n, MCP e WhatsApp).

Todo o CRUD continua existindo, porém agora cada responsabilidade possui seu próprio lugar.

---

# Arquitetura Final

```
Cliente
    │
    ▼
Express
    │
    ▼
Routes
    │
    ▼
Controllers
    │
    ▼
Services
    │
    ▼
Repositories
    │
    ▼
Database
    │
    ▼
PostgreSQL
```

Cada camada possui apenas uma responsabilidade.

Isso reduz o acoplamento e facilita manutenção, testes e evolução da aplicação.

---

# Estrutura de Pastas

```
src/

├── config/
├── controllers/
├── database/
├── middlewares/
├── repositories/
├── routes/
├── services/
├── types/
└── index.ts
```

---

# Config

Responsável pelas configurações da aplicação.

Exemplos:

- variáveis de ambiente;
- porta do servidor;
- dados do banco.

Arquivo principal:

```
config/env.ts
```

O restante da aplicação não precisa acessar diretamente o `process.env`.

Tudo passa pelo objeto `env`.

Isso centraliza as configurações em um único lugar.

---

# Database

Responsável pela conexão com o PostgreSQL.

Arquivo principal:

```
database/connection.ts
```

Foi criada apenas uma conexão utilizando o Pool.

Todos os Repositories reutilizam essa conexão.

Dessa forma não criamos uma conexão nova a cada requisição.

---

# Routes

As rotas representam os endpoints da API.

Exemplo:

```
GET /tarefas

POST /tarefas

PATCH /tarefas/:id
```

Sua única responsabilidade é encaminhar a requisição para o Controller correto.

Ela não possui regra de negócio.

Ela não faz SQL.

Ela apenas conecta URL → Controller.

---

# Controllers

O Controller é a camada que conversa com HTTP.

Ele conhece:

- Request
- Response
- Params
- Body
- Status HTTP

Seu papel é:

- receber a requisição;
- extrair dados do Request;
- chamar o Service;
- devolver uma resposta HTTP.

Exemplo:

```
Request

↓

Controller

↓

Service

↓

Response
```

O Controller não conhece SQL.

Também não decide regras de negócio.

---

# Services

O Service representa as regras da aplicação.

Ele conhece:

- regras;
- validações;
- fluxo da aplicação.

Exemplos:

- título obrigatório;
- tarefa inexistente;
- validações futuras.

O Service não conhece:

- Express;
- Request;
- Response;
- SQL.

Seu trabalho é decidir "o que deve acontecer".

---

# Repositories

O Repository é responsável pelo acesso aos dados.

É a única camada que conversa diretamente com o PostgreSQL.

Todo SQL fica concentrado aqui.

Exemplos:

- SELECT
- INSERT
- UPDATE
- DELETE

Ele não conhece HTTP.

Ele não conhece regras de negócio.

Ele apenas busca ou salva dados.

---

# Database + Repository

A comunicação ocorre assim:

```
Repository

↓

Pool

↓

PostgreSQL
```

O Repository utiliza a conexão criada em `database/connection.ts`.

Não cria novas conexões.

---

# Fluxo de uma requisição

Quando um cliente faz:

```
POST /tarefas
```

A requisição percorre:

```
Cliente

↓

Route

↓

Controller

↓

Service

↓

Repository

↓

Database

↓

PostgreSQL
```

Depois o caminho é percorrido ao contrário até a resposta chegar ao cliente.

---

# Async/Await entre as camadas

Como o banco demora um tempo para responder, o Repository utiliza funções assíncronas.

Exemplo:

```
await pool.query(...)
```

Como o Service chama o Repository, ele também precisa utilizar `async/await`.

Depois o Controller também precisa aguardar o Service.

Isso cria um efeito em cadeia.

```
Controller

↓

await

↓

Service

↓

await

↓

Repository

↓

await

↓

Banco
```

Todas as camadas esperam a resposta antes de continuar.

---

# Responsabilidade de cada camada

## Routes

Responsável por:

- mapear endpoints;
- encaminhar requisições.

Não faz:

- SQL;
- validações;
- regras.

---

## Controller

Responsável por:

- Request;
- Response;
- Body;
- Params;
- Status HTTP.

Não faz:

- SQL;
- regra de negócio.

---

## Service

Responsável por:

- regras;
- validações;
- decisões.

Não faz:

- SQL;
- comunicação HTTP.

---

## Repository

Responsável por:

- SELECT;
- INSERT;
- UPDATE;
- DELETE.

Não faz:

- HTTP;
- regras.

---

# Middleware

Middleware é um código executado durante o ciclo da requisição.

Nesta etapa foi criado um middleware global de tratamento de erros.

Arquivo:

```
middlewares/error.middleware.ts
```

Seu papel é capturar erros lançados pela aplicação e transformá-los em respostas HTTP.

Fluxo:

```
Service

↓

throw Error()

↓

Error Middleware

↓

Resposta HTTP
```

Isso evita que erros fiquem espalhados pelos Controllers.

---

# Error Middleware

Foi aprendido que um middleware de erro possui quatro parâmetros.

```
(error, req, res, next)
```

A presença do parâmetro `error` faz o Express reconhecer que aquele middleware trata erros.

Ele deve ser registrado após as rotas.

Exemplo:

```
app.use(routes);

app.use(errorMiddleware);
```

A ordem importa.

---

# Organização alcançada

Ao final da etapa, todo o CRUD passou a utilizar a arquitetura em camadas.

Cada endpoint segue exatamente o mesmo fluxo.

```
GET

↓

Controller

↓

Service

↓

Repository

↓

Banco
```

O mesmo vale para:

- POST
- PATCH
- DELETE

Isso torna o projeto previsível e fácil de evoluir.

---

# Principais aprendizados

Aprendi que arquitetura não adiciona funcionalidades.

Ela organiza responsabilidades.

Também compreendi que:

- Controller conversa com HTTP.
- Service conversa com a regra de negócio.
- Repository conversa com SQL.
- Database fornece conexão.
- Routes apenas direcionam requisições.
- Middleware trata comportamentos globais.

Cada camada possui uma única responsabilidade.

---

# Frases que resumem a arquitetura

> Routes sabem para onde a requisição deve ir.

> Controllers sabem conversar com HTTP.

> Services sabem como a aplicação funciona.

> Repositories sabem conversar com o banco.

> Database sabe criar conexões.

> Middlewares executam comportamentos compartilhados.

---

# Resultado Final

Ao concluir esta etapa, o backend deixou de ser apenas um CRUD funcional.

Ele passou a possuir uma arquitetura preparada para crescimento, reutilização de código e futuras integrações.

Essa estrutura servirá como base para as próximas etapas do projeto:

- Front-end
- IA
- n8n
- MCP
- WhatsApp
- Autenticação
- Funcionalidades futuras

Sem necessidade de reorganizar novamente a aplicação.