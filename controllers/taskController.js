import { Task } from "../models/Task.js";

// Obtener Tareas
export const getTasks = async (req, res) => {
    try {
        // req.user viene del middleware 'verifyToken' (que descifra el token)
        const userId = req.user.id; 
        
        const tasks = await Task.getAll(userId);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear Tarea
export const createTask = async (req, res) => {
    try {
        const userId = req.user.id; // ¡Importante! El ID viene del token, no del body
        const { name, descripcion, deadline } = req.body;

        // Validación básica
        if (!name) return res.status(400).json({ message: "El nombre es obligatorio" });

        const newTask = await Task.create({ 
            name, 
            descripcion, 
            deadline, 
            id_user: userId 
        });

        res.json(newTask);
    } catch (error) {
        console.error(error); // Para ver el error en Vercel si falla
        res.status(500).json({ message: error.message });
    }
};

// Actualizar Tarea
export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Task.update(id, req.body);

        if (result) {
            res.json({ message: "Tarea actualizada" });
        } else {
            res.status(404).json({ message: "Tarea no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Borrar Tarea
export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Task.delete(id);

        if (result) {
            res.json({ message: "Tarea eliminada" });
        } else {
            res.status(404).json({ message: "Tarea no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};