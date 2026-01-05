import jwt from 'jsonwebtoken';
import { User } from '../models/User.js'; 
import dotenv from 'dotenv';

dotenv.config();

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);

        const token = jwt.sign(
            { id: user.id, username: user.username }, 
            process.env.JWT_SECRET || "secret", // Fallback por seguridad
            { expiresIn: "1h" }
        );

        res.json({
            id: user.id,
            username: user.username,
            email: user.email,
            token: token
        });

    } catch (error) {
        // ⚠️ CAMBIO CLAVE: Imprimir el error real en los logs de Vercel
        console.error("❌ Error en Login:", error);

        // Si es un error de conexión, devolvemos 500, si es credenciales 401
        if (error.message === "Usuario no encontrado" || error.message === "Contraseña incorrecta") {
            res.status(401).json({ message: "Credenciales inválidas" });
        } else {
            res.status(500).json({ message: "Error del servidor: " + error.message });
        }
    }
};

// Función corregida para tu nueva Base de Datos
export const register = async (req, res) => {
    try {
        // Ahora recibimos lo que tu BD realmente tiene: username, email, password
        const { username, email, password } = req.body;
        
        const newUser = await User.create({ 
            username, 
            email, 
            password 
        });

        res.status(201).json({ message: "Usuario registrado", userId: newUser.id });
    } catch (error) {
        console.error("❌ Error en Register:", error);
        res.status(500).json({ message: "Error al registrar: " + error.message });
    }
};