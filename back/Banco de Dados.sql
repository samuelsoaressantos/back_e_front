CREATE DATABASE postagem;
USE postagem;


CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    email VARCHAR (255) NOT NULL
);


CREATE TABLE post (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    imagem VARCHAR(255) NOT NULL,
    localizacao VARCHAR(255) NOT NULL
);




CREATE TABLE comentarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    usuario_id INT NOT NULL,
    texto TEXT NOT NULL,
    FOREIGN KEY (post_id) REFERENCES post(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);


CREATE TABLE votos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    usuario_id INT NOT NULL,
    tipo ENUM('like', 'dislike') NOT NULL,
    FOREIGN KEY (post_id) REFERENCES post(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

INSERT INTO usuarios (nome, senha, email) VALUES
('admin', '1234', 'admin@admin');

INSERT INTO usuarios (nome, senha, email) VALUES
('samuel', '4321', 'samuel@sasa'); 
 
 UPDATE usuarios SET senha =  '$2b$10$6b/3ytLKWoUXs96Os9VlF.YCD5oYv7YECR3kT9W5s9Vug6ViLNO8.' WHERE nome = 'admin'; 
 UPDATE usuarios SET senha = '$2b$10$YRGegw6tzQ5AQN1WXNJ7W.tRJYPrtFFNas4mfjxdEkKDaNBb6MxH2' WHERE nome = 'teste';

INSERT INTO post (titulo, imagem, localizacao) VALUES
('Post 1', 'https://www.minhareceita.com.br/app/uploads/2022/03/estrogonofe-de-frango-seara-1.jpg', 'São Paulo'),
('Post 2', 'https://via.placeholder.com/150', 'Rio de Janeiro');





