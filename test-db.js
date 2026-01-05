import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

console.log("---------------------------------------------------");
console.log("🔍 PROBANDO CONEXIÓN A BASE DE DATOS...");
console.log(`📡 Host: ${process.env.DB_HOST}`);
console.log(`👤 User: ${process.env.DB_USER}`);
console.log(`📂 DB:   ${process.env.DB_NAME}`);
console.log("---------------------------------------------------");

const testConnection = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT || 3306
        });

        console.log("✅ ¡CONEXIÓN EXITOSA! 🚀");
        console.log("La base de datos está respondiendo correctamente.");
        
        // Prueba extra: Ver si la tabla users existe
        const [rows] = await connection.execute('SHOW TABLES');
        console.log("📋 Tablas encontradas:", rows.map(row => Object.values(row)[0]));

        await connection.end();
    } catch (error) {
        console.error("❌ ERROR DE CONEXIÓN:");
        console.error(`Codigo: ${error.code}`);
        console.error(`Mensaje: ${error.message}`);
        
        if (error.code === 'ECONNREFUSED') console.log("👉 Pista: El Host o el Puerto están mal.");
        if (error.code === 'ER_ACCESS_DENIED_ERROR') console.log("👉 Pista: El Usuario o la Contraseña están mal.");
        if (error.code === 'ER_BAD_DB_ERROR') console.log("👉 Pista: El nombre de la Base de Datos está mal.");
    }
};

testConnection();