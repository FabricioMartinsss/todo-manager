# PostgreSQL com Node.js (pg)

## Objetivo

Nesta etapa substituí o armazenamento em memória da API TODO por um banco de dados PostgreSQL.

O objetivo foi compreender como uma aplicação Node.js executa comandos SQL diretamente no banco de dados utilizando o driver `pg`.

---

# Fluxo da aplicação

Antes:

Cliente

↓

Express

↓

Array em memória

↓

Resposta

Depois:

Cliente

↓

Express

↓

pg (driver)

↓

PostgreSQL

↓

Resposta

---

# O que é o pg?

O `pg` é o driver oficial utilizado pelo Node.js para se comunicar com o PostgreSQL.

Ele implementa o protocolo de comunicação do banco e permite executar comandos SQL através do JavaScript.

Instalação:

```bash
npm install pg
npm install -D @types/pg
```

---

# Pool

Foi utilizado:

```ts
const pool = new Pool({...});
```

O Pool mantém conexões reutilizáveis com o banco.

Em uma API várias requisições podem chegar ao mesmo tempo.

Ao invés de abrir uma conexão nova para cada requisição, o Pool gerencia várias conexões prontas para uso.

---

# Executando SQL pelo código

A comunicação com o banco acontece através do método:

```ts
await pool.query(sql)
```

Exemplo:

```ts
const resultado = await pool.query(
    "SELECT * FROM tarefas"
);
```

Fluxo:

Node.js

↓

pool.query()

↓

PostgreSQL

↓

Resultado

↓

JavaScript

---

# O objeto retornado

O método `pool.query()` não retorna diretamente um array.

Ele retorna um objeto contendo diversas informações sobre a consulta.

Exemplo simplificado:

```ts
{
    command: "SELECT",
    rowCount: 2,
    rows: [
        ...
    ]
}
```

As linhas retornadas ficam na propriedade:

```ts
resultado.rows
```

Essa propriedade é um array contendo os registros encontrados.

---

# SELECT

Buscar todas as tarefas:

```sql
SELECT *
FROM tarefas;
```

No código:

```ts
const resultado = await pool.query(
    "SELECT * FROM tarefas"
);

resp.send(resultado.rows);
```

---

# WHERE

Para buscar apenas um registro:

```sql
SELECT *
FROM tarefas
WHERE id = $1;
```

O PostgreSQL retornará apenas as linhas que satisfizerem a condição.

Caso nenhuma linha exista:

```ts
resultado.rows
```

será:

```ts
[]
```

---

# INSERT

Inserção de uma tarefa:

```sql
INSERT INTO tarefas (titulo)
VALUES ($1)
RETURNING *;
```

Como a tabela possui:

- SERIAL
- DEFAULT FALSE
- DEFAULT CURRENT_TIMESTAMP

apenas o título precisa ser enviado.

---

# UPDATE

Atualização:

```sql
UPDATE tarefas
SET concluida = $1
WHERE id = $2
RETURNING *;
```

O UPDATE altera apenas os registros que satisfazem o WHERE.

---

# DELETE

Remoção:

```sql
DELETE FROM tarefas
WHERE id = $1
RETURNING *;
```

---

# Parâmetros ($1, $2...)

Ao invés de montar SQL concatenando strings:

Errado:

```ts
"SELECT * FROM tarefas WHERE id = " + id
```

utilizamos parâmetros.

Exemplo:

```sql
SELECT *
FROM tarefas
WHERE id = $1;
```

E os valores são enviados separadamente:

```ts
await pool.query(
    "... WHERE id = $1",
    [id]
);
```

O primeiro elemento do array corresponde ao `$1`.

Se existirem vários parâmetros:

```sql
UPDATE tarefas
SET titulo = $1
WHERE id = $2;
```

```ts
[
    titulo,
    id
]
```

Mapeamento:

```
$1 → titulo

$2 → id
```

Isso torna o código mais organizado e evita SQL Injection.

---

# RETURNING *

Após INSERT, UPDATE e DELETE foi utilizado:

```sql
RETURNING *
```

Esse comando faz o PostgreSQL devolver a linha modificada.

Sem ele seria necessário executar outro SELECT.

Exemplo:

```ts
const resultado = await pool.query(...);

resultado.rows[0]
```

retorna o registro criado ou atualizado.

---

# Tratando registros inexistentes

Quando nenhuma linha é encontrada:

```ts
resultado.rows.length === 0
```

Foi utilizado:

```ts
if (resultado.rows.length === 0) {
    return resp.status(404).send("Tarefa não encontrada");
}
```

---

# Variáveis de ambiente

As configurações do banco não devem ficar escritas diretamente no código.

Foi utilizado um arquivo:

```
.env
```

Conteúdo:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=todo_teste

PORT=3412
```

No código:

```ts
import "dotenv/config";
```

Depois:

```ts
const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
```

---

# Resumo

Nesta etapa aprendi:

- conectar Node.js ao PostgreSQL;
- utilizar o driver `pg`;
- criar um Pool de conexões;
- executar SQL pelo código;
- utilizar SELECT, INSERT, UPDATE e DELETE;
- utilizar parâmetros ($1, $2...);
- compreender o retorno de `pool.query()`;
- utilizar `RETURNING *`;
- tratar registros inexistentes;
- configurar a aplicação utilizando `.env`.