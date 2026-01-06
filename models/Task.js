import pool from "../config/db.js";

export class Task {
    
    // Obtener tareas de un usuario
    static async getByUserId(userId) {
        // Seleccionamos solo las que NO están borradas (deleted = 0)
        const [rows] = await pool.query(
            "SELECT * FROM tasks WHERE id_user = ? AND deleted = 0", 
            [userId]
        );
        return rows;
    }

    // Crear nueva tarea
    static async create(task) {
        const { name, descripcion, deadline, id_user, updatedAt } = task;
        
        // ⚠️ CORRECCIÓN AQUÍ: Cambiamos 'updated_at' por 'updatedAt'
        // Asegúrate de que coincida con tu tabla en MySQL
        const [result] = await pool.query(
            "INSERT INTO tasks (name, descripcion, deadline, id_user, updatedAt) VALUES (?, ?, ?, ?, ?)",
            [name, descripcion, deadline, id_user, updatedAt]
        );
        
        return { id: result.insertId, ...task };
    }

    // Actualizar tarea
    static async update(id, task) {
        const { name, descripcion, deadline, status, updatedAt } = task;
        
        // ⚠️ CORRECCIÓN AQUÍ TAMBIÉN: 'updatedAt'
        await pool.query(
            "UPDATE tasks SET name = ?, descripcion = ?, deadline = ?, status = ?, updatedAt = ? WHERE id = ?",
            [name, descripcion, deadline, status, updatedAt, id]
        );
        
        return { id, ...task };
    }
    
    // Eliminar tarea
    static async delete(id) {
        const [result] = await pool.query("DELETE FROM tasks WHERE id = ?", [id]);
        return result.affectedRows > 0;
    }
}