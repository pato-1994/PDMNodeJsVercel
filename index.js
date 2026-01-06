import dotenv from "dotenv";
import express from "express";
// Asegúrate de que las rutas a estos archivos sean correctas en tu carpeta
import taskRoutes from "./routes/task.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

// --- MIDDLEWARES ---
app.use(express.json()); // Vital para que Android funcione
app.use(express.urlencoded({ extended: true }));

// --- RUTAS ---
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

// Ruta de prueba para ver si el servidor vive en el navegador
app.get("/", (req, res) => {
    res.send("<h1>¡Servidor Corriendo! 🚀</h1><p>La API está lista para Android.</p>");
});

// Exportamos para Vercel
export default app;