import pool from "../config/db.js";
import bcrypt from "bcryptjs";

export class User {
    
    // Función login adaptada a tu Base de Datos REAL
    static async login(email, password) {
        // 1. Buscar al usuario por EMAIL (Porque Android manda email)
        // Nota: Cambié 'FROM user' a 'FROM users' (plural)
        const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

        if (rows.length === 0) throw new Error("Usuario no encontrado");

        const user = rows[0]; 

        // 2. Comparar contraseñas
        // Nota: En tu BD la columna se llama 'password', no 'passw'
        const isValid = await bcrypt.compare(password, user.password); 

        if (!isValid) {
            throw new Error("Contraseña incorrecta");
        }

        // 3. Login exitoso! Devolvemos los datos para el Token
        // Nota: Devolvemos 'id', 'username', 'email' para que coincida con Android
        return { 
            id: user.id, 
            username: user.username,
            email: user.email
        };
    }

    // Función create (Opcional por ahora, pero corregida para tu tabla)
    static async create(user) {
        const { username, email, password } = user;
        
        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insertamos en la tabla 'users' con las columnas correctas
        const [result] = await pool.query(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            [username, email, hashedPassword]
        );
        
        return { id: result.insertId, username, email };
    }
}