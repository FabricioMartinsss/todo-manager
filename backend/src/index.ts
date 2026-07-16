import express from "express";

const app = express();

const port = 4567;

function callback() {
    console.log("Servidor Iniciado");
}

app.listen(port, callback);