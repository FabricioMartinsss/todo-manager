import express from "express";

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

app.listen(port, callback);

app.get("/", function(req, resp){
    resp.send("TODO funcionando");
}
);

app.get("/tarefas", function(req, resp){
    resp.send(tarefas);
}
);

app.post("/tarefas", function(req, resp){
    
        const novaTarefa: Tarefa = {
        id: tarefas.length + 1,
        titulo: req.body.titulo,
        concluida: false,
        dataCriacao: new Date()
        };

        tarefas.push(novaTarefa);
        resp.send(novaTarefa);
}
);
