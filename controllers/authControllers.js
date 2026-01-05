import { User } from '../models/User.js'; 

// ... (tu función login sigue igual)

export const register = async (req, res) => {
    try {
        console.log("📥 Recibiendo petición de registro:", req.body);

        // ⚠️ CORRECCIÓN: Asegúrate de leer 'email', 'username' y 'password'
        // Antes probablemente tenías 'phone' aquí.
        const { username, email, password } = req.body;

        // Validaciones básicas
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Faltan datos obligatorios" });
        }

        // Llamamos al Modelo para crear el usuario
        const newUser = await User.create({ 
            username, 
            email, 
            password 
        });

        console.log("✅ Usuario registrado con ID:", newUser.id);
        res.status(201).json({ message: "Usuario registrado", userId: newUser.id });

    } catch (error) {
        console.error("❌ Error en Register:", error);
        
        // Si el error es por email duplicado (MySQL devuelve código ER_DUP_ENTRY)
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: "El correo ya está registrado" });
        }

        res.status(500).json({ message: "Error al registrar: " + error.message });
    }
};