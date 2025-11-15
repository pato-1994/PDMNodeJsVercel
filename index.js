// en: index.js

import dotenv from "dotenv";
import express from "express";
import taskRoutes from "./routes/task.js";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();

// --- 1. MIDDLEWARE ---
// Primero, le decimos a la app cómo leer JSON
app.use(express.json());

// --- 2. RUTAS ---
// Ahora, le decimos qué rutas usar
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.send("API Task funcionando Donaldo"));

// --- 3. (REMOVIDO) ---
// Quitamos app.listen(). Vercel se encarga de esto.
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

// --- 4. EXPORT (AL FINAL) ---
// Exportamos la app YA CONFIGURADA
export default app;