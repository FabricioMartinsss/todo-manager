import { Router } from "express";
const router = Router();

import { TarefasController } from "../controllers/tarefas.controller";
const tarefasController = new TarefasController();


router.get("/", tarefasController.listar);


export default router;