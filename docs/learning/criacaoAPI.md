# Aprendizado — Criação de uma API REST com Express

## Objetivo

Aprender como construir uma API REST utilizando Node.js, TypeScript e Express, entendendo o papel de cada tecnologia e o funcionamento do ciclo completo de uma requisição HTTP.

---

# O que é uma API REST

Uma API REST é uma interface que permite que aplicações se comuniquem utilizando requisições HTTP.

Cada endpoint representa uma ação sobre um recurso.

Exemplo:

GET /tarefas

↓

Retorna todas as tarefas.

---

# O papel do Express

O Express é um framework para Node.js responsável por facilitar a criação de servidores HTTP e o gerenciamento das rotas da aplicação.

Ele conecta:

Cliente
↓

Requisição HTTP
↓

Nossa lógica
↓

Resposta HTTP

---

# Estrutura básica

```ts
const app = express();

app.listen(port, callback);
```

- `express()` cria a aplicação.
- `app` representa o servidor.
- `listen()` inicia o servidor.
- O callback é executado quando o servidor inicia.

---

# Rotas

Cada rota representa uma operação da API.

```ts
app.get(...)
app.post(...)
app.patch(...)
app.delete(...)
```

Cada rota recebe dois objetos importantes:

```ts
(req, resp)
```

- `req` → informações enviadas pelo cliente.
- `resp` → resposta enviada pela API.

---

# req e resp

## req

Contém tudo que o cliente envia.

Principais propriedades aprendidas:

```ts
req.body
req.params
```

### req.body

Utilizado quando o cliente envia dados no corpo da requisição.

Exemplo:

```json
{
    "titulo": "Estudar Express"
}
```

Acesso:

```ts
req.body.titulo
```

---

### req.params

Utilizado para capturar parâmetros presentes na URL.

Exemplo:

```
GET /tarefas/2
```

Acesso:

```ts
req.params.id
```

---

## resp

Responsável por responder ao cliente.

Exemplo:

```ts
resp.send(...)
```

O Express converte automaticamente objetos e arrays para JSON.

Também é possível alterar o código HTTP:

```ts
resp.status(404).send(...)
```

---

# Middleware

Foi utilizado:

```ts
app.use(express.json());
```

Função:

Converter automaticamente o JSON enviado pelo cliente em um objeto JavaScript.

Sem esse middleware:

```ts
req.body
```

fica:

```text
undefined
```

---

# Métodos HTTP

## GET

Objetivo:

Buscar informações.

Exemplo:

```
GET /tarefas
```

Retorna todas as tarefas.

---

## POST

Objetivo:

Criar um novo recurso.

Recebe informações através de:

```ts
req.body
```

---

## PATCH

Objetivo:

Atualizar apenas parte de um recurso existente.

No projeto:

Atualização do campo:

```ts
concluida
```

---

## DELETE

Objetivo:

Remover um recurso.

---

# Parâmetros de rota

Quando uma rota possui:

```
/tarefas/:id
```

o Express entende que:

```
:id
```

é um valor variável.

Esse valor pode ser acessado por:

```ts
req.params.id
```

---

# Conversão de tipos

Os parâmetros da URL chegam como texto.

Exemplo:

```
"2"
```

Para comparar com um número é necessário converter:

```ts
Number(req.params.id)
```

---

# Métodos de Array utilizados

## push()

Adiciona um elemento ao final do array.

```ts
tarefas.push(novaTarefa);
```

---

## find()

Procura um elemento.

Retorna:

- objeto encontrado
- ou `undefined`

Exemplo:

```ts
tarefas.find(...)
```

---

## findIndex()

Procura a posição do elemento dentro do array.

Retorna:

- índice encontrado
- ou `-1`

Exemplo:

```ts
tarefas.findIndex(...)
```

---

## splice()

Remove elementos do array.

Exemplo:

```ts
tarefas.splice(indice, 1);
```

Significa:

Remova um elemento a partir da posição informada.

---

# Objetos

Foi criado um objeto do tipo:

```ts
Tarefa
```

Exemplo:

```ts
const novaTarefa: Tarefa = {
    id: 1,
    titulo: "...",
    concluida: false,
    dataCriacao: new Date()
};
```

Também foi aprendido como alterar propriedades:

```ts
tarefa.concluida = true;
```

---

# Códigos HTTP

## 200

Operação realizada com sucesso.

---

## 404

Recurso não encontrado.

Exemplo:

```ts
resp.status(404).send("Tarefa não encontrada");
```

---

# Endpoints implementados

```http
GET     /tarefas
```

Lista todas as tarefas.

---

```http
GET     /tarefas/:id
```

Busca uma tarefa específica.

---

```http
POST    /tarefas
```

Cria uma nova tarefa.

---

```http
PATCH   /tarefas/:id
```

Atualiza parcialmente uma tarefa.

---

```http
DELETE  /tarefas/:id
```

Remove uma tarefa.

---

# Fluxo de uma requisição

Cliente

↓

Endpoint

↓

Express

↓

req

↓

Lógica da aplicação

↓

resp

↓

Cliente

---

# Ferramentas utilizadas

- Node.js
- TypeScript
- Express
- tsx
- Postman

---

# Commits realizados

```
feat: inicializa API TODO e implementa listagem de tarefas

feat: implementa criação de tarefas

feat: implementa busca de tarefa por id

feat: implementa atualização parcial de tarefas

feat: implementa exclusão de tarefas
```

---

# Principais aprendizados

- O Express simplifica a criação de servidores HTTP.
- Toda rota recebe uma requisição (`req`) e produz uma resposta (`resp`).
- O cliente envia dados pelo `body` ou pela URL (`params`).
- O Express converte objetos automaticamente para JSON.
- APIs REST utilizam diferentes métodos HTTP conforme a intenção da operação.
- Métodos de array são fundamentais para manipular dados em memória.
- Códigos HTTP comunicam claramente o resultado da operação.
- Uma API bem estruturada possui endpoints com responsabilidades específicas.
- Cada commit deve representar uma funcionalidade completa e testada.

---

# Próximo passo

Organizar a estrutura da API em múltiplos arquivos antes de integrar um banco de dados PostgreSQL.