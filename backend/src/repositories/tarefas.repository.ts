import { pool } from "../database/connection";

export class TarefasRepository {

    async listar() {

        const resultado = await pool.query(
            "SELECT * FROM tarefas ORDER BY id"
        );

        return resultado.rows;

    }

    async criar(titulo: string) {
        
        const resultado = await pool.query(
            `
            INSERT INTO tarefas (titulo)
            VALUES ($1)
            RETURNING *
            `,
            [titulo]
        );

        return resultado.rows[0];
    }

    async buscarPorId(id: number) {

        const resultado = await pool.query(
            `
            SELECT *
            FROM tarefas
            WHERE id = $1
            `,
            [id]
        );

        return resultado.rows[0];

    }

}

