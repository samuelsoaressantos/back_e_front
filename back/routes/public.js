import express from 'express';
import mysql from 'mysql2/promise';  
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import loginRoutes from './routes/cadastro.js'; // Importando as rotas de cadastro
import loginRoutes from './routes/login.js'; // Importando as rotas de login
import privateRoutes from './routes/private.js'; // Importando as rotas privadas

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "ipabinha"; // Usando o JWT_SECRET para ambas as operações
// Conexão com o banco MySQL usando Pool de Conexões
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Z5R2M9IQ',
    database: 'postagem',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Cadastro de usuário
router.post('/cadastro', async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        // Verificar se o email já está cadastrado
        const [rows] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (rows.length > 0) {
            return res.status(400).json({ message: 'Email já cadastrado' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashSenha = await bcrypt.hash(senha, salt);

        const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
        await db.execute(query, [nome, email, hashSenha]);

        // Gerar Token JWT após o cadastro
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'Usuário registrado com sucesso', token });
    } catch (err) {
        console.error('Erro ao cadastrar usuário:', err);
        res.status(500).json({ error: 'Erro ao salvar usuário no banco de dados' });
    }
});

// Login de usuário
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        // Buscar usuário pelo email
        const query = 'SELECT * FROM usuarios WHERE email = ?';
        const [rows] = await db.execute(query, [email]);

        // Verifica se o usuário existe
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const user = rows[0];

        // Comparar senha com hash armazenado
        const senhaValida = await bcrypt.compare(senha, user.senha);
        if (!senhaValida) {
            return res.status(400).json({ message: 'Senha incorreta' });
        }

        // Gerar token JWT
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login realizado com sucesso', token });
    } catch (err) {
        console.error('Erro no login:', err);
        res.status(500).json({ error: 'Erro no servidor, tente novamente' });
    }
});

export default router;
