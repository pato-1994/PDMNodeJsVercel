import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; // (Opcional si usas User.login, pero bueno tenerlo)
import dotenv from 'dotenv';
// IMPORTANTE: Importamos tu nuevo Modelo
import { User } from '../model/User.js'; 

dotenv.config();

// En controllers/authControllers.js
export const login = async (req, res) => {
    // 1. Android envía 'email' y 'password'
    const { email, password } = req.body;

    try {
        // 2. Llamamos al Modelo corregido
        const user = await User.login(email, password);

        // 3. Generamos Token
        const token = jwt.sign(
            { id: user.id, username: user.username }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1h" }
        );

        // 4. Respondemos con TODO lo que Android UserDto necesita
        res.json({
            id: user.id,
            username: user.username,
            email: user.email,
            token: token
        });

    } catch (error) {
        res.status(401).json({ message: "Credenciales inválidas" });
    }
};
// Necesitas agregar este endpoint nuevo para poder crear usuarios reales
export const register = async (req, res) => {
    try {
        // Usa el método create que hicimos en User.js
        const { username, password, phone } = req.body;
        
        // Mapeamos los nombres si es necesario (frontend manda 'username', DB usa 'name_user')
        const newUser = await User.create({ 
            name_user: username, 
            passw: password, 
            phone: phone 
        });

        res.status(201).json({ message: "Usuario registrado", userId: newUser.id_user });
    } catch (error) {
        res.status(500).json({ message: "Error al registrar: " + error.message });
    }
};