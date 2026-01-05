import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs'; // Usamos la misma librería que tu login

dotenv.config();

const crearUsuario = async () => {
    console.log("---------------------------------------------------");
    console.log("👤 CREANDO USUARIO ANDROID...");
    
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT || 3306
        });

        // 1. Datos del usuario nuevo
        const email = "android@test.com";
        const passwordPlana = "12345";
        const username = "Usuario Android";

        // 2. Encriptamos la contraseña REALMENTE como lo hace tu servidor
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(passwordPlana, salt);

        console.log(`🔑 Contraseña plana: ${passwordPlana}`);
        console.log(`🔒 Hash generado:    ${passwordHash}`);

        // 3. Borramos si ya existe para evitar errores
        await connection.execute('DELETE FROM users WHERE email = ?', [email]);

        // 4. Insertamos el usuario nuevo
        await connection.execute(
            'INSERT INTO users (username, email, password, isActive) VALUES (?, ?, ?, ?)',
            [username, email, passwordHash, true]
        );

        console.log("---------------------------------------------------");
        console.log("✅ ¡USUARIO CREADO CON ÉXITO! 🚀");
        console.log(`📧 Email:    ${email}`);
        console.log(`🔑 Password: ${passwordPlana}`);
        console.log("---------------------------------------------------");
        console.log("👉 PRUEBA USAR ESTAS CREDENCIALES EN TU APP AHORA.");

        await connection.end();

    } catch (error) {
        console.error("❌ ERROR AL CREAR USUARIO:", error);
    }
};

crearUsuario();