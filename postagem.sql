CREATE DATABASE sabor_do_brasil;

USE sabor_do_brasil;

CREATE TABLE postagens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255),
    localizacao VARCHAR(255),
    imagem VARCHAR(255),
    likes INT DEFAULT 0,
    dislikes INT DEFAULT 0
);

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255),
    senha VARCHAR(255)
);
