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

app.get("/tarefas/:id", function (req, resp) {

    const tarefa = tarefas.find(function (tarefa) {
        return tarefa.id === Number(req.params.id);
    });

    if (!tarefa) {
        return resp.status(404).send("Tarefa não encontrada");
    }

    resp.send(tarefa);
});

app.patch("/tarefas/:id", function (req, resp){

    const tarefa = tarefas.find(function (tarefa) {
        return tarefa.id === Number(req.params.id);
    });
    if (!tarefa) {
        return resp.status(404).send("Tarefa não encontrada");
    }

    tarefa.concluida = req.body.concluida;
    resp.send(tarefa);
})

app.delete("/tarefas/:id", function (req, resp) {

    const indice = tarefas.findIndex(function (tarefa) {
        return tarefa.id === Number(req.params.id);
    });

    if (indice === -1) {
        return resp.status(404).send("Tarefa não encontrada");
    }

    tarefas.splice(indice, 1);

    resp.send("Tarefa removida com sucesso");

});