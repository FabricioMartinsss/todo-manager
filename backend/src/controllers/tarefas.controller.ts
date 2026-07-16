import { Request, Response } from "express";

import { TarefasService } from "../services/tarefas.service";
const tarefasService = new TarefasService();
export class TarefasController {

    async listar(req: Request, res: Response) {
        const tarefas = await tarefasService.listar();

        res.send(tarefas);
    }

}