CREATE DATABASE postagem;
USE postagem;

-- Tabela de Usuários
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

-- Tabela de Posts
CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    imagem VARCHAR(255) NOT NULL,
    localizacao VARCHAR(255) NOT NULL
);

-- Tabela de Comentários
CREATE TABLE comentarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    usuario_id INT NOT NULL,
    texto TEXT NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabela de Votos
CREATE TABLE votos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    usuario_id INT NOT NULL,
    tipo ENUM('like', 'dislike') NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

INSERT INTO usuarios (nome, senha) VALUES
('admin@admin', '1234');
INSERT INTO posts (titulo, imagem, localizacao) VALUES
('Prato Típico Mineiro', 'prato_mineiro.jpg', 'Belo Horizonte - MG'),
 ('Feijoada Completa', 'feijoada.jpg', 'Rio de Janeiro - RJ');


