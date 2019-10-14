# SCRIPT BASE DE DATOS DE GIFTSTORE

# Ultima actualizacion: 4/10/19

DROP DATABASE giftstoreDB;

CREATE DATABASE giftstoreDB;

USE giftstoreDB;


CREATE TABLE usuario(
	id_usuario int auto_increment,
	id_tipousuario int,
	nombre varchar(30), correo varchar(30), 
	contrasenia varchar(30), 
	primary key(id_usuario));

CREATE TABLE compra(
	id_compra int auto_increment, 
	id_usuario int, 
	id_producto int, 
	primary key(id_compra));

CREATE TABLE producto(
	id_producto int auto_increment, 
	nombre varchar(50),  
	id_categoria int,
	cantidad int,
	precio_unitario int,
	imagen varchar(30),
	primary key(id_producto));

CREATE TABLE categoria(
	id_categoria int auto_increment, 
	nombre varchar(50), 
	primary key(id_categoria));

CREATE TABLE tipo_usuario(
	id_tipousuario int auto_increment,
	tipo varchar(15),
	primary key(id_tipousuario));

CREATE TABLE Cocobanco
(
	ID_Cuenta int PRIMARY KEY NOT NULL AUTO_INCREMENT,
	Saldo double,
	correo varchar(30),
	contrasenia varchar(30)
);

CREATE TABLE Cuentas
(
	ID_Cuentas int PRIMARY KEY NOT NULL AUTO_INCREMENT,
	ID_Cuenta int,
	ID_UsuarioGift int
);

ALTER TABLE usuario ADD FOREIGN KEY (id_tipousuario) REFERENCES tipo_usuario(id_tipousuario);
ALTER TABLE compra ADD FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario);
ALTER TABLE compra ADD FOREIGN KEY (id_producto) REFERENCES Producto(id_producto);
ALTER TABLE producto ADD FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria);
ALTER TABLE Cuentas ADD FOREIGN KEY(ID_UsuarioGift) REFERENCES Usuario(ID_usuario);

INSERT INTO categoria VALUES (0,"Cachucha");
INSERT INTO categoria VALUES (0,"Camisa");
INSERT INTO categoria VALUES (0,"Llavero");
INSERT INTO categoria VALUES (0,"Taza");

INSERT INTO producto VALUES(0,"Cachucha fresa", 1, 200, "");
INSERT INTO producto VALUES(0,"Camisa alien", 2, 500, "");
INSERT INTO producto VALUES(0,"Llavero bolsa", 3, 870, "");
INSERT INTO producto VALUES(0,"Taza alien", 4, 590, "");
INSERT INTO producto VALUES(0,"Cachucha frirma", 1, 230, "");
INSERT INTO producto VALUES(0,"Camisa chama", 2, 500, "");
INSERT INTO producto VALUES(0,"Llavero camara", 3, 850, "");
INSERT INTO producto VALUES(0,"Taza baño", 4, 1200, "");
INSERT INTO producto VALUES(0,"Cachucha letras", 1, 760, "");
INSERT INTO producto VALUES(0,"Camisa friends", 2, 400, "");

INSERT INTO tipo_usuario VALUES(0,"Libre");
INSERT INTO tipo_usuario VALUES(0,"Usuario");
INSERT INTO tipo_usuario VALUES(0,"Almacenista");
INSERT INTO tipo_usuario VALUES(0,"Administrador");

INSERT INTO usuario VALUES (0,2,"Ariel", "ariel@gmail.mx", "1234");
INSERT INTO usuario VALUES (0,2,"Alex", "alex@gmail.mx", "1234");
INSERT INTO usuario VALUES (0,2,"Joel", "joel@gmail.mx", "1234");
INSERT INTO usuario VALUES (0,2,"Jorge", "jorge@gmail.mx", "1234");
INSERT INTO usuario VALUES (0,3,"Tano", "tano@gmail.mx", "1234");
INSERT INTO usuario VALUES (0,3,"Carlos", "carlos@gmail.mx", "1234");
INSERT INTO usuario VALUES (0,3,"David", "david@gmail.mx", "1234");
INSERT INTO usuario VALUES (0,4,"Jose", "jose@gmail.mx", "1234");
INSERT INTO usuario VALUES (0,4,"Esteban", "esteban@gmail.mx", "1234");
INSERT INTO usuario VALUES (0,4,"Natalia", "natalia@gmail.mx", "1234");



# -----------
#SELECTS

SELECT * FROM tipo_usuario;
SELECT * FROM usuario;
SELECT * FROM categoria;
SELECT * FROM producto;
SELECT * FROM compra;
