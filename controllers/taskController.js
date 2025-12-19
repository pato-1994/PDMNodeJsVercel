import { Task } from "../model/Task.js";

export const getTasks = async (req, res) => {
    const userId = req.user.id;
    const tasks = await Task.getAll(userId);
    res.json(tasks);
};

export const getTask = async (req,res) => {
    const userId = req.user.id;
    const task = await Task.getById(req.params.id, userId);
    if(!task) return res.status(404).json({ message: "Tarea no encontrada"});
    res.json(task);
};

export const createTask = async (req, res) => {
    const userId = req.user.id;
    const bodyWithUser = { ...req.body, userId: userId };
    const newTask = await Task.create(bodyWithUser);
    res.status(201).json(newTask);
};

export const updateTask = async (req,res) => {
    // 1. Extraemos el ID del token
    const userId = req.user.id; 
    // 2. Combinamos el cuerpo del request con el ID del usuario
    const bodyWithUser = { ...req.body, userId: userId };
    // 3. Pasamos el ID de la TAREA (params.id) y el cuerpo actualizado
    await Task.update(req.params.id, bodyWithUser);
    res.json({ message: "Tarea actualizada"});
};

export const deleteTask = async (req,res) => {
    await Task.delete(req.params.id);
    res.json({ message: "Tarea eliminada" });
};