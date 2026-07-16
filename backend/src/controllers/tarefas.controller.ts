import { Request, Response } from "express";

import { TarefasService } from "../services/tarefas.service";
const tarefasService = new TarefasService();
export class TarefasController {

    async listar(req: Request, res: Response) {
        const tarefas = await tarefasService.listar();

        res.send(tarefas);
    }

    async criar(req: Request, res: Response) {

        const { titulo } = req.body;

        const tarefa = await tarefasService.criar(titulo);

        res.status(201).send(tarefa);

    }

    async buscarPorId(req: Request, res: Response) {

        const id = Number(req.params.id);

        const tarefa = await tarefasService.buscarPorId(id);

        res.send(tarefa);

    }

}