const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conexão com o MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234', // Substitua com sua senha MySQL
    database: 'sabor_do_brasil'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao MySQL!');
});

// Simulação de usuários (login)
const users = [
    { nome: 'admin', senha: '1234' },
    { nome: 'usuario', senha: 'abcd' }
];

// Rota de login
app.post('/login', (req, res) => {
    const { nome, senha } = req.body;
    
    db.query('SELECT * FROM usuarios WHERE nome = ? AND senha = ?', [nome, senha], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json({ success: true, message: 'Login bem-sucedido!' });
        } else {
            res.status(401).json({ success: false, message: 'Usuário ou senha incorretos!' });
        }
    });
});

// Rota para carregar posts
app.get('/posts', (req, res) => {
    db.query('SELECT * FROM postagens', (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Rota para votação
app.post('/vote', (req, res) => {
    const { post_id, action } = req.body;
    
    if (action === 'like') {
        db.query('UPDATE postagens SET likes = likes + 1 WHERE id = ?', [post_id], (err, result) => {
            if (err) throw err;
            res.send({ message: 'Like registrado!' });
        });
    } else if (action === 'dislike') {
        db.query('UPDATE postagens SET dislikes = dislikes + 1 WHERE id = ?', [post_id], (err, result) => {
            if (err) throw err;
            res.send({ message: 'Dislike registrado!' });
        });
    } else {
        res.status(400).send({ message: 'Ação inválida' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
