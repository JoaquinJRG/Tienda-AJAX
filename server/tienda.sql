CREATE DATABASE IF NOT EXISTS tienda;   
USE tienda; 

CREATE TABLE usuario(
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE, 
    clave VARCHAR(100) NOT NULL, 
    correo VARCHAR(200) NOT NULL UNIQUE, 
    esAdmin BOOLEAN DEFAULT 0
);

CREATE TABLE pedido(
    idPedido INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATETIME DEFAULT NOW(),
    idCliente INT,
    FOREIGN KEY (idCliente) REFERENCES usuario(idUsuario)
);

CREATE TABLE categoria(
    idCategoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE, 
    imagen VARCHAR(255) NOT NULL,
    idAdmin INT,
    FOREIGN KEY (idAdmin) REFERENCES usuario(idUsuario)
);  

CREATE TABLE producto(
    idProducto INT AUTO_INCREMENT PRIMARY KEY ,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    precio NUMERIC(10,2) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    imagen VARCHAR(255) NOT NULL,
    stock INT NOT NULL,
    idCategoria INT, 
    idAdmin INT, 
    FOREIGN KEY (idCategoria) REFERENCES categoria(idCategoria),
    FOREIGN KEY (idAdmin) REFERENCES usuario(idUsuario)
);

CREATE TABLE pedidosProducto(
    idPedido INT,
    idProducto INT,
    unidades INT NOT NULL,
    PRIMARY KEY (idPedido, idProducto),
    FOREIGN KEY (idPedido) REFERENCES pedido(idPedido),
    FOREIGN KEY (idProducto) REFERENCES producto(idProducto) ON DELETE CASCADE 
);

/*Crear usuario admin*/
INSERT INTO `usuario` (`idUsuario`, `nombre`, `clave`, `correo`, `esAdmin`) VALUES (NULL, 'admin', 'aaLR8vE.jjhss', 'admin@mail.com', '1');

/*Insert categorias*/
INSERT INTO `categoria` (`idCategoria`, `nombre`, `imagen`, `idAdmin`) VALUES (NULL, 'Portátiles', '/img/LenovoLegion5.jpg', '1');
INSERT INTO `categoria` (`idCategoria`, `nombre`, `imagen`, `idAdmin`) VALUES (NULL, 'Videojuegos', '/img/marioWonder.png', '1');
INSERT INTO `categoria` (`idCategoria`, `nombre`, `imagen`, `idAdmin`) VALUES (NULL, 'Ordenadores', '/img/ordenador.png', '1');
INSERT INTO `categoria` (`idCategoria`, `nombre`, `imagen`, `idAdmin`) VALUES (NULL, 'Videoconsolas', '/img/ps5.png', '1');

/*Insert productos*/
/*Portátiles*/
INSERT INTO `producto` (`idProducto`, `nombre`, `precio`, `descripcion`, `imagen`, `stock`, `idCategoria`, `idAdmin`) VALUES (NULL, 'ASUS VivoBook Pro 15', '1224', 'L1224 Intel Core i5-12500H/16GB/512GB SSD/RTX 3050/15.6\"', '/img/ASUSVivoBookPro15.jpg', '100', '1', '1');
INSERT INTO `producto` (`idProducto`, `nombre`, `precio`, `descripcion`, `imagen`, `stock`, `idCategoria`, `idAdmin`) VALUES (NULL, 'Huawei MateBook 14s', '1598', 'Intel Core i7-11370H/16GB/512GB SSD/14.2\" Táctil', '/img/Huawei MateBook 14s.jpg', '30', '1', '1');
INSERT INTO `producto` (`idProducto`, `nombre`, `precio`, `descripcion`, `imagen`, `stock`, `idCategoria`, `idAdmin`) VALUES (NULL, 'Lenovo Legion 5 ', '1469', 'Intel Core i7-12700H/16GB/512GB SSD/RTX 3060/15.6\"', '/img/LenovoLegion5.jpg', '200', '1', '1');

/*Videoconsolas*/
INSERT INTO `producto` (`idProducto`, `nombre`, `precio`, `descripcion`, `imagen`, `stock`, `idCategoria`, `idAdmin`) VALUES (NULL, 'PS5', '450', 'Videoconsola PS5', '/img/ps5.png', '20', '4', '1');
INSERT INTO `producto` (`idProducto`, `nombre`, `precio`, `descripcion`, `imagen`, `stock`, `idCategoria`, `idAdmin`) VALUES (NULL, 'Nintendo Switch', '300', 'Videoconsola Nintendo Switch', '/img/switch.jpg', '1000', '4', '1');
INSERT INTO `producto` (`idProducto`, `nombre`, `precio`, `descripcion`, `imagen`, `stock`, `idCategoria`, `idAdmin`) VALUES (NULL, 'Xbox Series X ', '420', 'Videoconsola Xbox Series X ', '/img/xbox Series X.png', '200', '4', '1');

/*Videojuegos*/
INSERT INTO `producto` (`idProducto`, `nombre`, `precio`, `descripcion`, `imagen`, `stock`, `idCategoria`, `idAdmin`) VALUES (NULL, 'Mario Wonder', '50', 'Videojuego Mario Wonder', '/img/marioWonder.png', '200', '2', '1');
INSERT INTO `producto` (`idProducto`, `nombre`, `precio`, `descripcion`, `imagen`, `stock`, `idCategoria`, `idAdmin`) VALUES (NULL, 'Elden Ring ', '60', 'Videojuego Elden Ring PS5', '/img/elden-ring-ps5.jpg', '14', '2', '1');

/*Ordenadores*/
INSERT INTO `producto` (`idProducto`, `nombre`, `precio`, `descripcion`, `imagen`, `stock`, `idCategoria`, `idAdmin`) VALUES (NULL, 'Epical-Q Mercury ', '989', 'Epical-Q Mercury AMD Ryzen 7 5700X/32GB/1TB SSD/RTX 4060', '/img/Epical-Q Mercury.jpg', '100', '3', '1');
INSERT INTO `producto` (`idProducto`, `nombre`, `precio`, `descripcion`, `imagen`, `stock`, `idCategoria`, `idAdmin`) VALUES (NULL, 'Lenovo IdeaCentre 5', '569', 'Lenovo IdeaCentre 5 14IAB7 Intel Core i5-12400/16GB/512GB SSD', '/img/167-lenovo-ideacentre-5.jpg', '200', '3', '1');