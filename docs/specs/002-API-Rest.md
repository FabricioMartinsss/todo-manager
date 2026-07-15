# API REST TODO - Especificação (V1)

## Objetivo

Desenvolver uma API REST para gerenciamento de tarefas (TODO), permitindo criar, listar, consultar, atualizar e excluir tarefas. A API deverá possibilitar que o usuário organize suas atividades utilizando-a como uma agenda simples.

---

# Recurso

A API será baseada no recurso:

```
/tasks
```

Cada tarefa possuirá os seguintes atributos:

| Campo | Descrição |
| ------ | --------- |
| id | Identificador único da tarefa. Gerado automaticamente pela API. |
| titulo | Título da tarefa. Informado pelo cliente. |
| concluida | Indica se a tarefa foi concluída. Valor padrão: `false`. |
| dataCriacao | Data e hora de criação da tarefa. Gerada automaticamente pela API. |

---

# Endpoints

| Método HTTP | Endpoint | Descrição |
| ------------ | -------- | --------- |
| POST | `/tasks` | Criar uma nova tarefa. |
| GET | `/tasks` | Listar todas as tarefas. |
| GET | `/tasks/:id` | Buscar uma tarefa pelo ID. |
| PATCH | `/tasks/:id` | Atualizar parcialmente uma tarefa. |
| DELETE | `/tasks/:id` | Excluir uma tarefa. |

---

# Entradas

## Criar tarefa

O cliente deverá enviar:

```json
{
  "titulo": "Estudar REST"
}
```

A API será responsável por gerar automaticamente:

- `id`
- `concluida` (valor inicial `false`)
- `dataCriacao`

---

## Atualizar tarefa

O cliente poderá enviar apenas os campos que deseja modificar.

Exemplo:

```json
{
  "concluida": true
}
```

ou

```json
{
  "titulo": "Novo título"
}
```

---

# Saídas

A API deverá retornar os dados da tarefa em formato JSON.

Exemplo:

```json
{
  "id": 1,
  "titulo": "Estudar REST",
  "concluida": false,
  "dataCriacao": "2026-07-14T18:30:00Z"
}
```

---

# Regras de negócio

- Cada tarefa possui um identificador único.
- O identificador é gerado pela API.
- A data de criação é gerada automaticamente pela API.
- O atributo `concluida` inicia como `false`.
- Atualizações serão realizadas utilizando o método `PATCH`.
- O cliente poderá atualizar apenas os campos desejados.

---

# Possíveis erros

| Situação | Comportamento esperado |
| --------- | ---------------------- |
| Buscar uma tarefa inexistente | Retornar que a tarefa não foi encontrada. |
| Atualizar uma tarefa inexistente | Retornar que a tarefa não foi encontrada. |
| Excluir uma tarefa inexistente | Retornar que a tarefa não foi encontrada. |
| Criar uma tarefa sem título | Informar que o título é obrigatório. |

---

# Códigos HTTP esperados

| Código | Significado |
| ------- | ----------- |
| 200 | Operação realizada com sucesso. |
| 201 | Recurso criado com sucesso. |
| 400 | Requisição inválida. |
| 404 | Recurso não encontrado. |

---

# Critérios de aceitação

- Deve ser possível criar uma tarefa.
- Deve ser possível listar todas as tarefas.
- Deve ser possível buscar uma tarefa pelo ID.
- Deve ser possível atualizar parcialmente uma tarefa.
- Deve ser possível excluir uma tarefa.
- A API deve retornar respostas em formato JSON.
- A API deve utilizar os códigos HTTP apropriados para sucesso e erro.