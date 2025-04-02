import express from 'express';
import mysql from 'mysql2/promise';  
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import loginRoutes from './routes/login.js'; // Importando as rotas de login
import privateRoutes from './routes/private.js'; // Importando as rotas privadas

const router = express.Router();

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Z5R2M9IQ',
    database: 'postagem',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const JWT_SECRET = process.env.JWT_SECRET || "ipabinha";  // Defina seu segredo JWT
console.log("JWT_SECRET:", JWT_SECRET); // Verifique se o valor está sendo exibido corretamente
// Rota para listar usuários
router.get('/list-usuarios', async (req, res) => {
    try {
        // Consultar todos os usuários no MySQL, sem a senha
        const [users] = await db.execute('SELECT id, nome, email FROM usuarios');

        // Retorna apenas os dados necessários dos usuários
        res.status(200).json({ message: 'Usuários listados com sucesso', users });
    } catch (err) {
        console.error('Erro ao buscar usuários:', err);
        res.status(500).json({ message: 'Falha no servidor' });
    }
});

export default router;
