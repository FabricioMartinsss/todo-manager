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

    async buscarPorTitulo(titulo: string) {

        const resultado = await pool.query(
            `
            SELECT *
            FROM tarefas
            WHERE LOWER(titulo) = LOWER($1)
            `,
            [titulo]
        );

        return resultado.rows[0];

    }

    async atualizar(id: number, titulo: string) {

        const resultado = await pool.query(
            `
            UPDATE tarefas
            SET titulo = $1
            WHERE id = $2
            RETURNING *
            `,
            [titulo, id]
        );

        return resultado.rows[0];

    }

    async remover(id: number) {

        const resultado = await pool.query(
            `
            DELETE FROM tarefas
            WHERE id = $1
            RETURNING *
            `,
            [id]
        );

        return resultado.rows[0];

    }
}

