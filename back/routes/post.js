import express from 'express';
import mysql from 'mysql2/promise';

const router = express.Router();

// Conexão com o banco de dados
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'postagem',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Rota GET /posts
router.get('/posts', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM posts');
    res.status(200).json(rows);
  } catch (err) {
    console.error('Erro ao buscar posts:', err);
    res.status(500).json({ message: 'Erro ao buscar posts no banco de dados' });
  }
});

export default router;
