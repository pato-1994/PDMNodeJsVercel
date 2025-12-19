import pool from "../config/db.js";

export class Task {
    
    // Obtener tareas de un usuario específico 👤
    static async getAll(userId) {
        // OJO: Tabla 'tasks' (plural) y filtramos por 'id_user' y que no esté borrada
        const [rows] = await pool.query(
            "SELECT * FROM tasks WHERE id_user = ? AND deleted = 0", 
            [userId]
        );
        return rows;
    }

    // Crear una nueva tarea 📝
    static async create({ name, descripcion, deadline, id_user }) {
        // OJO: Insertamos en 'tasks'.
        // Usamos NOW() para updated_at inicial. Status por defecto es 'Pendiente' en BD.
        const [result] = await pool.query(
            "INSERT INTO tasks (name, descripcion, deadline, id_user, updated_at) VALUES (?, ?, ?, ?, ?)",
            [name, descripcion, deadline, id_user, Date.now()] 
        );
        
        // Devolvemos el objeto creado con su nuevo ID
        return {
            id: result.insertId,
            name,
            descripcion,
            deadline,
            status: 'Pendiente',
            id_user,
            updated_at: Date.now()
        };
    }

    // Actualizar tarea 🔄
    static async update(id, { name, descripcion, deadline, status }) {
        // Actualizamos timestamp y datos
        const [result] = await pool.query(
            "UPDATE tasks SET name = ?, descripcion = ?, deadline = ?, status = ?, updated_at = ? WHERE id = ?",
            [name, descripcion, deadline, status, Date.now(), id]
        );
        return result.affectedRows > 0;
    }

    // Borrado Lógico (Soft Delete) 👻
    static async delete(id) {
        const [result] = await pool.query(
            "UPDATE tasks SET deleted = 1, updated_at = ? WHERE id = ?",
            [Date.now(), id]
        );
        return result.affectedRows > 0;
    }
}