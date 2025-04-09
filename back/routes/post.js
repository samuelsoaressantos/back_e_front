import express from 'express';
import mysql from 'mysql2/promise';

// Configuração do pool de conexão com o banco de dados
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234', // Substitua pela sua senha real
  database: 'postagem',
});

const router = express.Router();

// Rota GET /posts para buscar todos os posts
router.get('/post', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM post');
    res.json(rows);
  } catch (err) {
    console.error('Erro ao buscar post:', err);
    res.status(500).json({ error: 'Erro ao buscar post' });
  }
});

export default router;