# Nutri Firulais

## Overview

## database

Usamos MySQL en docker

docker pull mysql

docker network create firulaisnt

docker run -p 3306:3306 --name firulais --network firulaisnt -e MYSQL_ROOT_PASSWORD=rayita -d mysql:latest

docker run -it --network firulaisnt --rm mysql mysql -hfirulais -uroot -p

create database firulais;

use firulais;

CREATE TABLE IF NOT EXISTS `categorias` (
id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
nombre varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `productos` (
id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
nombre varchar(255) NOT NULL,
descripcion varchar(255) not null,
imagen varchar(255) not null,
categoria_id int(11),
precio decimal(11,2) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into productos(nombre, descripcion, imagen, categoria_id, precio)
values
('Gato Adulto Pollo Arroz 1kg','Gato Adulto Pollo Arroz 1kg','img_Purina/PEX_G_adult_polloarroz_1k.jpg',1,1800),
('Gato Adulto Pollo Arroz 3kg','Gato Adulto Pollo Arroz 3kg','img_Purina/PEX_G_adult_polloarroz_3k.jpg',1,4000),
('Gato Adulto Pollo Arroz 7kg','Gato Adulto Pollo Arroz 7kg','img_Purina/PEX_G_adult_polloarroz_7k.jpg',1,7800),
('Gato Adulto Pollo Arroz 15kg','Gato Adulto Pollo Arroz 15kg','img_Purina/PEX_G_adult_polloarroz_15k.jpg',1,14000),
('Gato Urinary Pollo Arroz 1kg','Gato Urinary Pollo Arroz 1kg','img_Purina/PEX_G_urinary_polloarroz_1k.jpg',1,2000),
('Gato Urinary Pollo Arroz 3kg','Gato Urinary Pollo Arroz 3kg','img_Purina/PEX_G_urinary_polloarroz_3k.jpg',1,4500),
('Gato Urinary Pollo Arroz 7kg','Gato Urinary Pollo Arroz 7kg','img_Purina/PEX_G_urinary_polloarroz_7k.jpg',1,8500),
('Gato Urinary Pollo Arroz 15kg','Gato Urinary Pollo Arroz 15kg','img_Purina/PEX_G_urinary_polloarroz_15k.jpg',1,15000)
;

insert into productos(nombre, descripcion, imagen, categoria_id, precio)
values
('Perro Adulto Pollo Arroz 1kg','Perro Adulto Pollo Arroz 1kg','img_Purina/PEX_P_adulto_polloarroz_1k.webp',2,1800),
('Perro Adulto Pollo Arroz 3kg','Perro Adulto Pollo Arroz 3kg','img_Purina/PEX_P_adulto_polloarroz_3k.webp',2,4000),
('Perro Adulto Pollo Arroz 15kg','Perro Adulto Pollo Arroz 15kg','img_Purina/PEX_P_adulto_polloarroz_15k.webp',2,14000),

('Perro Pequeño Pollo Arroz 1kg','Perro Pequeño Pollo Arroz 1kg','img_Purina/PEX_P_adultoPeq_polloarroz_1k.jpg',2,1800),
('Perro Pequeño Pollo Arroz 3kg','Perro Pequeño Pollo Arroz 3kg','img_Purina/PEX_P_adultoPeq_polloarroz_3k.jpg',2,4000),
('Perro Pequeño Pollo Arroz 15kg','Perro Pequeño Pollo Arroz 15kg','img_Purina/PEX_P_adultoPeq_polloarroz_20k.jpg',2,14000),

('Perro Mix 20kg','Perro Mix 20kg','img_Purina/PEX_P_formula_mix_20k.jpg',2,19950),
('Perro Mantenance 20kg','Perro Mantenance 20kg','img_Purina/PEX_P_mantenance_mix_20k.jpg',2,20950)
;

insert into categorias(id, nombre) values(1,'Gato'), (2,'Perro');


CREATE TABLE IF NOT EXISTS `pedidos` (
id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
numero_pedido varchar(255) NOT NULL,
observaciones varchar(5000),
email varchar(255) NOT NULL,
celular varchar(255) NOT NULL,
cliente_nombre varchar(255) NOT NULL,
enviado BOOLEAN DEFAULT false
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `pedido_items` (
id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
pedido_id int(11) NOT NULL,
producto_id int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into pedidos(id, numero_pedido, observaciones, email, celular, cliente_nombre, enviado)
values (1, '202210300001','','','','',0);

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'rayita';

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'rayita';
