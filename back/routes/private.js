import express from 'express';
import mysql from 'mysql2/promise';  
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
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

router.post('/posts', async (req, res) => {
    const { titulo, imagem, localizacao, usuario_id } = req.body;

    if (!titulo || !imagem || !localizacao || !usuario_id) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    try {
        const query = 'INSERT INTO posts (titulo, imagem, localizacao) VALUES (?, ?, ?)';
        const [result] = await db.execute(query, [titulo, imagem, localizacao]);

        res.status(201).json({ message: 'Post criado com sucesso', postId: result.insertId });
    } catch (err) {
        console.error('Erro ao criar post:', err);
        res.status(500).json({ message: 'Erro ao criar post' });
    }
});

router.post('/comentarios', async (req, res) => {
    const { post_id, usuario_id, texto } = req.body;

    if (!post_id || !usuario_id || !texto) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    try {
        const query = 'INSERT INTO comentarios (post_id, usuario_id, texto) VALUES (?, ?, ?)';
        await db.execute(query, [post_id, usuario_id, texto]);

        res.status(201).json({ message: 'Comentário adicionado com sucesso' });
    } catch (err) {
        console.error('Erro ao adicionar comentário:', err);
        res.status(500).json({ message: 'Erro ao comentar' });
    }
});


router.post('/votos', async (req, res) => {
    const { post_id, usuario_id, tipo } = req.body;

    if (!post_id || !usuario_id || !['like', 'dislike'].includes(tipo)) {
        return res.status(400).json({ message: 'Dados inválidos para votação' });
    }

    try {
        // Checa se já votou
        const [votosExistentes] = await db.execute(
            'SELECT id FROM votos WHERE post_id = ? AND usuario_id = ?',
            [post_id, usuario_id]
        );

        if (votosExistentes.length > 0) {
            return res.status(400).json({ message: 'Você já votou neste post' });
        }

        const query = 'INSERT INTO votos (post_id, usuario_id, tipo) VALUES (?, ?, ?)';
        await db.execute(query, [post_id, usuario_id, tipo]);

        res.status(201).json({ message: 'Voto registrado com sucesso' });
    } catch (err) {
        console.error('Erro ao registrar voto:', err);
        res.status(500).json({ message: 'Erro ao votar' });
    }
});


export default router;