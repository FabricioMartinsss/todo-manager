import express from "express";
import { pool } from "./database/connection";
import { env } from "./config/env";
import tarefasRoutes from "./routes/tarefas.routes";

const app = express();

const port = env.server.port;

app.use(express.json());

function callback() {
    console.log("Servidor Iniciado");
}

async function startServer() {
    const results = await pool.query("SELECT NOW()");
    console.log(results.rows);
    app.listen(port, callback);
}

startServer();

app.use("/tarefas", tarefasRoutes);


