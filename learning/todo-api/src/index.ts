import express from "express";
import pool from "./database";

const app = express();

app.use(express.json());  //middleware

const port = 3412;

type Tarefa = {
    id: number;
    titulo: string;
    concluida: boolean;
    dataCriacao: Date;
}

const tarefas: Tarefa[] = [
    {
        id: 1,
        titulo: "Estudar Express",
        concluida: false,
        dataCriacao: new Date()
    },
    {
        id: 2,
        titulo: "Criar API TODO",
        concluida: true,
        dataCriacao: new Date()
    }
];

function callback() {
    console.log("Servidor Iniciado");
}

async function conectarBanco() {
    try {
        await pool.query("SELECT NOW()");
        console.log("✅ Conectado ao PostgreSQL");
    } catch (erro) {
        console.error("❌ Erro ao conectar:", erro);
    }
}

conectarBanco();

app.listen(port, callback);

app.get("/", function(req, resp){
    resp.send("TODO funcionando");
}
);

app.get("/tarefas", async function (req, resp) {
    try {
        const resultado = await pool.query("SELECT * FROM tarefas");

        resp.send(resultado.rows);
    } catch (erro) {
        console.error(erro);
        resp.status(500).send("Erro ao buscar tarefas");
    }
});

app.post("/tarefas", async function (req, resp) {
    try {
        const resultado = await pool.query(
            `
            INSERT INTO tarefas (titulo)
            VALUES ($1)
            RETURNING *;
            `,
            [req.body.titulo]
        );

        resp.send(resultado.rows[0]);

    } catch (erro) {
        console.error(erro);
        resp.status(500).send("Erro ao criar tarefa");
    }
});

app.get("/tarefas/:id", async function (req, resp) {
    try {
        const resultado = await pool.query(
            `
            SELECT *
            FROM tarefas
            WHERE id = $1;
            `,
            [Number(req.params.id)]
        );

        if (resultado.rows.length === 0) {
            return resp.status(404).send("Tarefa não encontrada");
        }

        resp.send(resultado.rows[0]);

    } catch (erro) {
        console.error(erro);
        resp.status(500).send("Erro ao buscar tarefa");
    }
});

app.patch("/tarefas/:id", async function (req, resp) {
    try {
        const resultado = await pool.query(
            `
            UPDATE tarefas
            SET concluida = $1
            WHERE id = $2
            RETURNING *;
            `,
            [
                req.body.concluida,
                Number(req.params.id)
            ]
        );

        if (resultado.rows.length === 0) {
            return resp.status(404).send("Tarefa não encontrada");
        }

        resp.send(resultado.rows[0]);

    } catch (erro) {
        console.error(erro);
        resp.status(500).send("Erro ao atualizar tarefa");
    }
});

app.delete("/tarefas/:id", async function (req, resp) {
    try {
        const resultado = await pool.query(
            `
            DELETE FROM tarefas
            WHERE id = $1
            RETURNING *;
            `,
            [Number(req.params.id)]
        );

        if (resultado.rows.length === 0) {
            return resp.status(404).send("Tarefa não encontrada");
        }

        resp.send("Tarefa removida com sucesso");

    } catch (erro) {
        console.error(erro);
        resp.status(500).send("Erro ao remover tarefa");
    }
});