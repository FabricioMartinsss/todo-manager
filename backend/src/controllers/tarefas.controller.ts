import { Request, Response } from "express";

import { TarefasService } from "../services/tarefas.service";
const tarefasService = new TarefasService();
export class TarefasController {

    listar(req: Request, res: Response) {

        const resposta = tarefasService.listar();

        res.send(resposta);

    }

}