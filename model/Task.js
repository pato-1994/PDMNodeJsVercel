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
        const { name, plannedDate, status } = task;
        const [result] = await pool.query(
            "INSERT INTO task (name, plannedDate, status) VALUES (?, ?, ?)",
            [name, plannedDate, status]
        );
        return { id: result.insertId, ...task };
    }

    static async update(id, task) {
        const { name, status, deadline } = task;
        await pool.query(
            "UPDATE task SET name = ?, status = ?, deadline = ? WHERE id = ?",
            [name, status, deadline, id]
        );
       // return { id, ...task };
    }
    static async delete(id) {
        await pool.query("DELETE FROM task WHERE id = ?", [id]);
    }
}
