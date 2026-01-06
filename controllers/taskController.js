import { Task } from '../models/Task.js';

// --- OBTENER TAREAS (GET) ---
export const getTasks = async (req, res) => {
    try {
        const userId = req.userId; // Viene del middleware auth
        console.log(`📥 Solicitando tareas para Usuario ID: ${userId}`);

        if (!userId) {
            return res.status(400).json({ message: "ID de usuario no identificado" });
        }

        // Llamamos al modelo
        const tasks = await Task.getByUserId(userId);
        
        console.log(`✅ Encontradas ${tasks.length} tareas.`);
        res.json(tasks);

    } catch (error) {
        console.error("❌ Error en getTasks:", error);
        res.status(500).json({ message: "Error al obtener tareas: " + error.message });
    }
};

// --- CREAR TAREA (POST) ---
export const createTask = async (req, res) => {
    try {
        const { name, descripcion, deadline, updatedAt } = req.body;
        const userId = req.userId;

        console.log("📥 Creando tarea:", name);

        const newTask = await Task.create({
            name,
            descripcion,
            deadline,
            id_user: userId,
            updatedAt: updatedAt || Date.now() // Si Android no manda fecha, ponemos la de hoy
        });

        res.status(201).json(newTask);

    } catch (error) {
        console.error("❌ Error en createTask:", error);
        res.status(500).json({ message: "Error creando tarea" });
    }
};

// --- ACTUALIZAR TAREA (PUT) ---
export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, descripcion, deadline, status, updatedAt } = req.body;

        console.log(`📥 Actualizando tarea ${id}`);

        const updatedTask = await Task.update(id, {
            name,
            descripcion,
            deadline,
            status,
            updatedAt
        });

        res.json(updatedTask);
    } catch (error) {
        console.error("❌ Error en updateTask:", error);
        res.status(500).json({ message: "Error actualizando" });
    }
};

// --- BORRAR TAREA (DELETE) ---
export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`📥 Eliminando tarea ${id}`);
        
        await Task.delete(id);
        
        res.status(200).send(); // 200 OK vacío
    } catch (error) {
        console.error("❌ Error en deleteTask:", error);
        res.status(500).json({ message: "Error eliminando" });
    }
};