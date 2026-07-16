import { pool } from "../database/connection";

export class TarefasRepository {

    async listar() {

        const resultado = await pool.query(
            "SELECT * FROM tarefas ORDER BY id"
        );

        return resultado.rows;

    }

}