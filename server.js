import express from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';
import path from 'path';  // Módulo path para manipulação de caminhos de diretórios
import { fileURLToPath } from 'url'; // Módulo para trabalhar com URL no contexto de módulos ES


// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

// Conexão com o banco de dados
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234', // Substitua pela sua senha real
  database: 'postagem',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const JWT_SECRET = process.env.JWT_SECRET || 'ipabinha';

const app = express();
const PORT = process.env.PORT || 3000;

// Obtém o diretório atual do arquivo com import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir arquivos estáticos da pasta 'front'
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota de Login (autenticação)
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Verificar se o email existe no banco de dados
    const [rows] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const user = rows[0];

    // Verificar se a senha é válida
    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) {
      return res.status(400).json({ message: 'Senha incorreta' });
    }

    // Gerar o token JWT
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

    // Retornar a resposta com o token
    res.status(200).json({ message: 'Login realizado com sucesso', token });
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ error: 'Erro no servidor, tente novamente' });
  }
});

// Middleware para verificar o token JWT nas rotas privadas
function verificarToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id; // Pode adicionar o ID do usuário ao request
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
}

// Rota protegida (private)
app.get('/private', verificarToken, (req, res) => {
  res.status(200).json({ message: 'Você tem acesso à rota privada', userId: req.userId });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
