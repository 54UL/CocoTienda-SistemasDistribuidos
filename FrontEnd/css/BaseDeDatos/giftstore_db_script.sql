# SCRIPT BASE DE DATOS DE GIFTSTORE

# Ultima actualizacion: 19/10/19

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

CREATE TABLE Sesion
(
	ID_Sesion int PRIMARY KEY NOT NULL AUTO_INCREMENT,
	ID_Usuario int
);


ALTER TABLE usuario ADD FOREIGN KEY (id_tipousuario) REFERENCES tipo_usuario(id_tipousuario);
ALTER TABLE compra ADD FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario);
ALTER TABLE compra ADD FOREIGN KEY (id_producto) REFERENCES Producto(id_producto);
ALTER TABLE producto ADD FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria);
ALTER TABLE Cuentas ADD FOREIGN KEY(ID_UsuarioGift) REFERENCES Usuario(ID_usuario);
ALTER TABLE Sesion ADD FOREIGN KEY(ID_Usuario) REFERENCES Usuario(ID_usuario);

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

insert into producto values(0,"Cachucha Azul Dibujo fresa",1, 30, 100, "img/Cachuchas/Gfresa.jpg");
insert into producto values(0,"Cachucha Dibujo firma",1, 30, 150, "img/Cachuchas/Gfrirma.jpg");
insert into producto values(0,"Cachucha Negra Mensaje tachado",1, 25, 200, "img/Cachuchas/Gletras.jpg");
insert into producto values(0,"Cachucha Negra Mensaje Obey",1, 35, 150, "img/Cachuchas/Gobey.jpg");
insert into producto values(0,"Cachucha Blanca Dibujo Ojo",1, 30, 150, "img/Cachuchas/Gojo.jpg");
insert into producto values(0,"Cachucha Blanca Dibujo Rana",1, 20, 100, "img/Cachuchas/Grana.jpg");
insert into producto values(0,"Gorro Negro Dibujo Cara Triste",1, 20, 250, "img/Cachuchas/Gsad.jpg");
insert into producto values(0,"Cachucha Negra Mensaje Satan",1, 35, 150, "img/Cachuchas/Gsatan.jpg");
insert into producto values(0,"Cachucha Dibujo Super",1, 35, 150, "img/Cachuchas/Gsupe.jpg");

insert into producto values(0,"Camisa Blanca Alien",2, 20, 150, "img/Camisas/Calien.jpg");
insert into producto values(0,"Camisa Negra Moderna",2, 15, 100, "img/Camisas/Cchama.jpg");
insert into producto values(0,"Camisa Blanca Friends",2, 35, 200, "img/Camisas/Cfriends.jpg");
insert into producto values(0,"Camisa Negra Gato",2, 25, 150, "img/Camisas/Cgato.jpg");
insert into producto values(0,"Camisa Gris Good Vibes",2, 25, 100, "img/Camisas/Cgoodvibes.jpg");
insert into producto values(0,"Camisa Blanca NASA",2, 30, 150, "img/Camisas/Cnasa.jpg");
insert into producto values(0,"Camisa Blanca I Want Pizza",2, 35, 150, "img/Camisas/Cpizza.jpg");
insert into producto values(0,"Camisa Negra Planeta",2, 15, 150, "img/Camisas/Cplaneta.jpg");

insert into producto values(0,"Llavero Bolsa",3, 55, 50, "img/Llaveros/Lbolsa.jpg");
insert into producto values(0,"Llavero Camara",3, 45, 80, "img/Llaveros/Lcamara.jpg");
insert into producto values(0,"Llavero Programas",3, 55, 80, "img/Llaveros/Ldiseno.jpg");
insert into producto values(0,"Llavero Durazno",3, 35, 100, "img/Llaveros/Ldurazno.jpg");
insert into producto values(0,"Llavero Guitarra",3, 50, 70, "img/Llaveros/Lguitarra.jpg");
insert into producto values(0,"Llavero Harry Potter",3, 60, 100, "img/Llaveros/Lharry.jpg");
insert into producto values(0,"Llavero Pokemon",3, 30, 50, "img/Llaveros/Lpokemon.jpg");
insert into producto values(0,"Llavero Multiusos",3, 45, 100, "img/Llaveros/Lutil.jpg");

insert into producto values(0,"Taza Verde de Alien",4, 35, 100, "img/Tazas/1.jpg");
insert into producto values(0,"Taza de Dona",4, 50, 150, "img/Tazas/Tdona.jpg");
insert into producto values(0,"Taza funny faces",4, 50, 50, "img/Tazas/Tface.jpg");
insert into producto values(0,"Taza Letra H",4, 20, 80, "img/Tazas/Tletra.jpg");
insert into producto values(0,"Taza Blanca Oso",4, 30, 100, "img/Tazas/Tosos.jpg");
insert into producto values(0,"Taza Blanca Abecedario",4, 25, 80, "img/Tazas/Tserie.jpg");
insert into producto values(0,"Taza Shit Flower",4, 25, 60, "img/Tazas/Tshit.jpg");
insert into producto values(0,"Taza Toilette",4, 35, 150, "img/Tazas/Ttoilette.jpg");


# -----------
#SELECTS

SELECT * FROM tipo_usuario;
SELECT * FROM usuario;
SELECT * FROM categoria;
SELECT * FROM producto;
SELECT * FROM compra;
