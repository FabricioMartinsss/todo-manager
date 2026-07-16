import { TarefasRepository } from "../repositories/tarefas.repository";
const tarefasRepository = new TarefasRepository();
export class TarefasService {

    async listar() {

        return await tarefasRepository.listar();

    }

}