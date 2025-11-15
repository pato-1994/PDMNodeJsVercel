import pool from "../config/db.js";

export class Task {
    static async getAll() {
        const [rows] = await pool.query("SELECT * FROM task;");
        return rows;
    }
    
    static async getById(id) {
        const [rows] = await pool.query("SELECT * FROM task WHERE id = ?", [id]);
        return rows[0];
    }

    static async create(task) {
        const { name, descripcion, deadline } = task;
        const [result] = await pool.query(
            "INSERT INTO task (name, descripcion, deadline) VALUES (?, ?, ?)",
            [name, descripcion, deadline]
        );
        return { id: result.insertId, ...task };
    }

    static async update(id, task) {
        const { name, descripcion, deadline } = task;
        await pool.query(
            "UPDATE task SET name = ?, descripcion = ?, deadline = ? WHERE id = ?",
            [name, descripcion, deadline, id]
        );
       return { id, ...task };
    }
    static async delete(id) {
        await pool.query("DELETE FROM task WHERE id = ?", [id]);
    }
}
