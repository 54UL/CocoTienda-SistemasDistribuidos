create database giftstoreDB;

use giftstoreDB;

create table usuario(id_usuario int auto_increment,nombre varchar(30), correo varchar(30), contrasenia varchar(30), primary key(id_usuario));
create table compra(id_compra int auto_increment, id_usuario int, id_producto int, primary key(id_compra));
create table producto( id_producto int auto_increment, nombre varchar(50), id_categoria int, primary key(id_producto));
create table categoria(id_categoria int auto_increment, nombre varchar(50), primary key(id_categoria));

alter table compra add foreign key (id_usuario) references usuario(id_usuario);
alter table compra add foreign key (id_producto) references Producto(id_producto);
alter table producto add foreign key (id_categoria) references categoria(id_categoria);

INSERT INTO Categoria VALUES (0,"Cachucha");
INSERT INTO Categoria VALUES (0,"Camisa");
INSERT INTO Categoria VALUES (0,"Llavero");
INSERT INTO Categoria VALUES (0,"Taza");

INSERT INTO Producto VALUES(0,"Cachucha fresa", 1);
INSERT INTO Producto VALUES(0,"Camisa alien", 2);
INSERT INTO Producto VALUES(0,"Llavero bolsa", 3);
INSERT INTO Producto VALUES(0,"Taza alien", 4);
INSERT INTO Producto VALUES(0,"Cachucha frirma", 1);
INSERT INTO Producto VALUES(0,"Camisa chama", 2);
INSERT INTO Producto VALUES(0,"Llavero camara", 3);
INSERT INTO Producto VALUES(0,"Taza baño", 4);
INSERT INTO Producto VALUES(0,"Cachucha letras", 1);
INSERT INTO Producto VALUES(0,"Camisa friends", 2);

INSERT INTO Usuario VALUES (0,"Ariel", "ariel@gmail.mx", "1234");
INSERT INTO Usuario VALUES (0,"Alex", "alex@gmail.mx", "1234");
INSERT INTO Usuario VALUES (0,"Joel", "joel@gmail.mx", "1234");
INSERT INTO Usuario VALUES (0,"Jorge", "jorge@gmail.mx", "1234");
INSERT INTO Usuario VALUES (0,"Tano", "tano@gmail.mx", "1234");
INSERT INTO Usuario VALUES (0,"Carlos", "carlos@gmail.mx", "1234");
INSERT INTO Usuario VALUES (0,"David", "david@gmail.mx", "1234");
INSERT INTO Usuario VALUES (0,"Jose", "jose@gmail.mx", "1234");
INSERT INTO Usuario VALUES (0,"Esteban", "esteban@gmail.mx", "1234");
INSERT INTO Usuario VALUES (0,"Natalia", "natalia@gmail.mx", "1234");
