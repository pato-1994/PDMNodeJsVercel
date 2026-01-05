import pool from "../config/db.js";
import bcrypt from "bcryptjs";

export class User {
    
    static async login(email, password) {
        // 1. Verificamos conexión y usuario
        const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

        if (rows.length === 0) throw new Error("Usuario no encontrado");

        const user = rows[0]; 

        // 2. Comparamos contraseña
        const isValid = await bcrypt.compare(password, user.password); 

        if (!isValid) {
            throw new Error("Contraseña incorrecta");
        }

        return { 
            id: user.id, 
            username: user.username,
            email: user.email
        };
    }

    // Corregida para coincidir con la tabla 'users' nueva
    static async create(user) {
        const { username, email, password } = user;
        
        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insertamos en la tabla 'users'
        const [result] = await pool.query(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            [username, email, hashedPassword]
        );
        
        return { id: result.insertId, username, email };
    }
}