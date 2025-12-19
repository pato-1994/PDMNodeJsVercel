import pool from "../config/db.js";

export class Task {
    
    /*static async getAll() {
        const [rows] = await pool.query("SELECT * FROM task;");
        return rows;
    }*/
    
    static async getById(id, userId) {
        const [rows] = await pool.query("SELECT * FROM task WHERE id = ? AND user_id = ?", [id, userId]);
        return rows[0];
    }

    static async create(task) {
        const { name, descripcion, deadline, userId } = task;
        const [result] = await pool.query(
            "INSERT INTO task (name, descripcion, deadline, user_id) VALUES (?, ?, ?, ?)",
            [name, descripcion, deadline, userId]
        );
        return { id: result.insertId, ...task };
    }

    static async update(id, task) {
    // 1. Extraemos el ID del usuario del objeto 'task'
    const { name, descripcion, status, deadline, userId } = task; 
    await pool.query(
        // 2. Usamos id_user, y agregamos la columna al final de los parámetros
        "UPDATE task SET name = ?, descripcion = ?, status = ?, deadline = ? WHERE id = ? AND id_user = ?",
        [name, descripcion, status, deadline, id, userId]
    );
    // Nota: El retorno será igual, sin el hash ni el userId, solo la tarea actualizada
    return { id, ...task };
    }
    static async delete(id, userId) {
        await pool.query("DELETE FROM task WHERE id = ? AND id_user = ?", [id, userId]);
    }
}
