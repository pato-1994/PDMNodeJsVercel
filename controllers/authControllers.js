import jwt from 'jsonwebtoken';
import { User } from '../models/User.js'; 
import dotenv from 'dotenv';

dotenv.config();

// --- LOGIN ---
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Verificar credenciales con el Modelo
        const user = await User.login(email, password);

        // 2. Generar Token
        const token = jwt.sign(
            { id: user.id, username: user.username }, 
            process.env.JWT_SECRET || "secreto_super_seguro", 
            { expiresIn: "1h" }
        );

        // 3. Responder a Android
        res.json({
            id: user.id,
            username: user.username,
            email: user.email,
            token: token
        });

    } catch (error) {
        console.error("❌ Error en Login:", error);
        if (error.message === "Usuario no encontrado" || error.message === "Contraseña incorrecta") {
            res.status(401).json({ message: "Credenciales inválidas" });
        } else {
            res.status(500).json({ message: "Error interno: " + error.message });
        }
    }
};

// --- REGISTER (Corregido) ---
export const register = async (req, res) => {
    try {
        console.log("------------------------------------------------");
        console.log("📥 Petición de REGISTRO recibida");
        console.log("📦 Body:", req.body);

        const { username, email, password } = req.body;

        // Validar que lleguen datos
        if (!username || !email || !password) {
            console.error("❌ Faltan datos obligatorios");
            return res.status(400).json({ message: "Faltan datos: username, email o password" });
        }

        // Crear usuario en BD
        const newUser = await User.create({ 
            username, 
            email, 
            password 
        });

        console.log("✅ Usuario creado con ID:", newUser.id);
        res.status(201).json({ message: "Usuario registrado", userId: newUser.id });

    } catch (error) {
        console.error("❌ Error CRÍTICO en Register:", error);
        
        // Manejo de email duplicado
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: "El correo ya está registrado" });
        }

        res.status(500).json({ message: "Error al registrar: " + error.message });
    }
};