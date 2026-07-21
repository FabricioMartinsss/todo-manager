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

        const tarefaExistente = await tarefasRepository.buscarPorTitulo(titulo);

        if (tarefaExistente) {
            throw new Error("Já existe uma tarefa com esse título.");
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

    async atualizar(id: number, titulo: string) {

        if (!titulo.trim()) {
            throw new Error("Título é obrigatório.");
        }

        const tarefa = await tarefasRepository.atualizar(id, titulo);

        if (!tarefa) {
            throw new Error("Tarefa não encontrada.");
        }

        return tarefa;

    }

    async remover(id: number) {

        const tarefa = await tarefasRepository.remover(id);

        if (!tarefa) {
            throw new Error("Tarefa não encontrada.");
        }

        return tarefa;

    }

}