import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyToken = (req, res, next) => {
    try {
        // Android envía: "Bearer eyJhbGci..."
        const bearerHeader = req.headers['authorization'];

        if (!bearerHeader) {
            return res.status(403).json({ message: "No se proporcionó token" });
        }

        const token = bearerHeader.split(' ')[1]; // Quitamos la palabra "Bearer"

        if (!token) {
            return res.status(403).json({ message: "Formato de token inválido" });
        }

        // Verificamos el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secreto_super_seguro");
        
        // Guardamos el ID del usuario en la petición para usarlo luego
        req.userId = decoded.id; 
        
        next();

    } catch (error) {
        console.error("❌ Error verificando token:", error.message);
        return res.status(401).json({ message: "Token inválido o expirado" });
    }
};