import { Request, Response } from "express";

export class TarefasController {

    listar(req: Request, res: Response) {

        res.send("Lista de tarefas");

    }

}