import { TarefasRepository } from "../repositories/tarefas.repository";
const tarefasRepository = new TarefasRepository();
export class TarefasService {

    async listar() {

        return await tarefasRepository.listar();

    }

    async criar(titulo: string) {

        if (!titulo.trim()) {
            throw new Error("Título é obrigatório.");
        }

        return await tarefasRepository.criar(titulo);

    }

    async buscarPorId(id: number) {

        const tarefa = await tarefasRepository.buscarPorId(id);

        if (!tarefa) {
            throw new Error("Tarefa não encontrada.");
        }

        return tarefa;

    }

}