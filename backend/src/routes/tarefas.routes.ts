import { Router } from "express";
const router = Router();

import { TarefasController } from "../controllers/tarefas.controller";
const tarefasController = new TarefasController();


router.get("/", tarefasController.listar);
router.post("/", tarefasController.criar);

export default router;