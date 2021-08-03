/* CRIAÇÃO DO DB */
CREATE DATABASE desafio_final;

/* CRIAÇÃO DAS TABELAS */
DROP TABLE IF EXISTS categorias;

CREATE TABLE categorias(
  id serial NOT NULL PRIMARY KEY,
  nome varchar(30) NOT NULL
);

DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
  id serial NOT NULL PRIMARY KEY,
  nome varchar(100) NOT NULL,
  email varchar(100) NOT NULl UNIQUE,
  senha text NOT NULL
);

DROP TABLE IF EXISTS restaurantes;

CREATE TABLE restaurantes (
  id serial NOT NULL PRIMARY KEY,
  usuario_id integer NOT NULL,
  nome varchar(50) NOT NULL,
  descricao varchar(100),
  categoria_id integer NOT NULL,
  taxa_entrega integer NOT NULL DEFAULT 0,
  tempo_entrega_minutos integer NOT NULL DEFAULT 30,
  valor_minimo_pedido integer NOT NULL DEFAULT 0,
  FOREIGN KEY (usuario_id) REFERENCES usuarios (id),
  FOREIGN KEY (categoria_id) REFERENCES categorias (id)
);

DROP TABLE IF EXISTS produtos;

CREATE TABLE produtos (
  id serial NOT NULL PRIMARY KEY,
  restaurante_id integer NOT NULL,
  nome varchar(50) NOT NULL UNIQUE,
  descricao varchar(100),
  preco integer NOT NULL,
  ativo boolean NOT NULL DEFAULT TRUE,
  permite_observacoes boolean NOT NULL DEFAULT FALSE,
  FOREIGN KEY (restaurante_id) REFERENCES restaurantes (id)
);

/* INSERÇÃO MANUAL DE VALORES NAS TABELAS */
INSERT INTO categorias
(nome)
VALUES
('Diversos'),
('Lanches'),
('Carnes'),
('Massas'),
('Pizzas'),
('Japonesa'),
('Chinesa'),
('Mexicano'),
('Brasileira'),
('Italiana'),
('Árabe');