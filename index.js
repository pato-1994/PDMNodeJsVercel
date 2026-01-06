import dotenv from "dotenv";
import express from "express";
import cors from "cors"; // Si no usas cors, puedes borrar esta línea y la de app.use(cors())
import taskRoutes from "./routes/task.js";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();

// --- CONFIGURACIÓN CRÍTICA ---
app.use(cors()); // Permite conexiones externas
app.use(express.json()); // OBLIGATORIO: Entender JSON de Android
app.use(express.urlencoded({ extended: true }));

// --- RUTAS ---
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.send("API Funcionando OK"));

export default app;