SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Base de datos: `fundetec_db`
--


--
-- Estructura de tabla para la tabla `typedocuments`
--

CREATE TABLE `typedocuments` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `documentName` varchar(255) NOT NULL COMMENT 'Descripción Tipo Documento',
  `isActive` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Estado: 1 Activo - 0 Inactivo',
  `createAt` date NOT NULL DEFAULT curdate() COMMENT 'Fecha de Creación',
  `createTime` time NOT NULL DEFAULT curtime() COMMENT 'Hora de Creación',
  `updateAt` date NOT NULL DEFAULT curdate() COMMENT 'Fecha de Actualización',
  `updateTime` time NOT NULL DEFAULT curtime() COMMENT 'Hora de Actualización'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `typedocuments` (`id`, `documentName`, `isActive`, `createAt`, `createTime`, `updateAt`, `updateTime`) VALUES
  (1, 'CC - Cedula ciudadania', 1, '2025-02-16', '20:42:21', '2025-02-16', '20:42:21'),
  (2, 'Contraseña', 1, '2025-02-16', '20:42:21', '2025-02-16', '20:42:21'),
  (3, 'TI - Tarjeta de Identidad', 1, '2025-02-16', '20:42:21', '2025-02-16', '20:42:21'),
  (4, 'CE - Cedula de Extranjeria', 1, '2025-02-16', '20:42:21', '2025-02-16', '20:42:21'),
  (5, 'PEP - Permiso Especial de Permanencia', 1, '2025-02-16', '20:42:21', '2025-02-16', '20:42:21'),
  (6, 'PPT - Permiso de Protección Personal', 1, '2025-02-16', '20:42:21', '2025-02-16', '20:42:21');


--
-- Estructura de tabla para la tabla `typedocuments`
--


--
-- Estructura de tabla para la tabla `countries`
--

CREATE TABLE `countries` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `countryName` varchar(255) NOT NULL COMMENT 'Nombre del Pais',
  `isActive` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Estado: 1 Activo - 0 Inactivo',
  `createAt` date NOT NULL DEFAULT curdate() COMMENT 'Fecha de Creación',
  `createTime` time NOT NULL DEFAULT curtime() COMMENT 'Hora de Creación',
  `updateAt` date NOT NULL DEFAULT curdate() COMMENT 'Fecha de Actualización',
  `updateTime` time NOT NULL DEFAULT curtime() COMMENT 'Hora de Actualización'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `countries`(`countryName`) VALUES ('Colombia');

--
-- Estructura de tabla para la tabla `countries`
--


--
-- Estructura de tabla para la tabla `states`
--

CREATE TABLE `states` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `countriesId` int(11) NOT NULL COMMENT 'Identificador de Pais',
  `stateName` varchar(255) NOT NULL COMMENT 'Nombre del Estado',
  `isActive` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Estado: 1 Activo - 0 Inactivo',
  `createAt` date NOT NULL DEFAULT curdate() COMMENT 'Fecha de Creación',
  `createTime` time NOT NULL DEFAULT curtime() COMMENT 'Hora de Creación',
  `updateAt` date NOT NULL DEFAULT curdate() COMMENT 'Fecha de Actualización',
  `updateTime` time NOT NULL DEFAULT curtime() COMMENT 'Hora de Actualización'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `states`
  ADD KEY `fk_states_countriesId` (`countriesId`);

ALTER TABLE `states`
  ADD CONSTRAINT `countriesId` FOREIGN KEY (`countriesId`) REFERENCES `countries` (`id`);

INSERT INTO `states` (`id`, `stateName`, `isActive`, `createAt`, `createTime`, `updateAt`, `updateTime`, `countriesId`) VALUES
  (1, 'Amazonas', 1, '2025-02-17', '14:13:32', '2025-02-17', '14:13:32', 1),
  (2, 'Antioquia', 1, '2025-02-17', '14:13:32', '2025-02-17', '14:13:32', 1),
  (3, 'Arauca', 1, '2025-02-17', '14:13:32', '2025-02-17', '14:13:32', 1),
  (4, 'Atlántico', 1, '2025-02-17', '14:13:32', '2025-02-17', '14:13:32', 1),
  (5, 'Bolívar', 1, '2025-02-17', '14:13:32', '2025-02-17', '14:13:32', 1),
  (6, 'Boyacá', 1, '2025-02-17', '14:13:32', '2025-02-17', '14:13:32', 1),
  (7, 'Caldas', 1, '2025-02-17', '14:13:32', '2025-02-17', '14:13:32', 1),
  (8, 'Caquetá', 1, '2025-02-17', '14:13:32', '2025-02-17', '14:13:32', 1),
  (9, 'Casanare', 1, '2025-02-17', '14:13:32', '2025-02-17', '14:13:32', 1),
  (10, 'Cauca', 1, '2025-02-17', '14:13:32', '2025-02-17', '14:13:32', 1),
  (11, 'Cesar', 1, '2025-02-17', '14:13:32', '2025-02-17', '14:13:32', 1),
  (12, 'Chocó', 1, '2025-02-17', '14:13:32', '2025-02-17', '14:13:32', 1),
  (13, 'Córdoba', 1, '2025-02-17', '14:13:32', '2025-02-17', '14:13:32', 1),
  (14, 'Cundinamarca', 1, '2025-02-17', '14:13:32', '2025-02-17', '14:13:32', 1),
  (15, 'Guainía', 1, '2025-02-17', '14:13:32', '2025-02-17', '14:13:32', 1),
  (16, 'Guaviare', 1, '2025-02-17', '14:13:32', '2025-02-17', '14:13:32', 1),
  (17, 'Huila', 1, '2025-02-17', '14:13:32', '2025-02-17', '14:13:32', 1),
  (18, 'La Guajira', 1, '2025-02-17', '14:13:32', '2025-02-17', '14:13:32', 1),
  (19, 'Magdalena', 1, '2025-02-17', '14:13:32', '2025-02-17', '14:13:32', 1),
  (20, 'Meta', 1, '2025-02-17', '14:13:32', '2025-02-17', '14:13:32', 1),
  (21, 'Nariño', 1, '2025-02-17', '14:13:32', '2025-02-17', '14:13:32', 1),
  (22, 'Norte de Santander', 1, '2025-02-17', '14:13:32', '2025-02-17', '14:13:32', 1),
  (23, 'Putumayo', 1, '2025-02-17', '14:13:32', '2025-02-17', '14:13:32', 1),
  (24, 'Quindío', 1, '2025-02-17', '14:13:32', '2025-02-17', '14:13:32', 1),
  (25, 'Risaralda', 1, '2025-02-17', '14:13:32', '2025-02-17', '14:13:32', 1),
  (26, 'San Andrés y Providencia', 1, '2025-02-17', '14:13:32', '2025-02-17', '14:13:32', 1),
  (27, 'Santander', 1, '2025-02-17', '14:13:32', '2025-02-17', '14:13:32', 1),
  (28, 'Sucre', 1, '2025-02-17', '14:13:32', '2025-02-17', '14:13:32', 1),
  (29, 'Tolima', 1, '2025-02-17', '14:13:32', '2025-02-17', '14:13:32', 1),
  (30, 'Valle del Cauca', 1, '2025-02-17', '14:13:32', '2025-02-17', '14:13:32', 1),
  (31, 'Vaupés', 1, '2025-02-17', '14:13:32', '2025-02-17', '14:13:32', 1),
  (32, 'Vichada', 1, '2025-02-17', '14:13:32', '2025-02-17', '14:13:32', 1);

--
-- Estructura de tabla para la tabla `states`
--


--
-- Estructura de tabla para la tabla `cities`
--

CREATE TABLE `cities` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `statesId` int(11) NOT NULL COMMENT 'Identificador de Estado',
  `cityName` varchar(255) NOT NULL COMMENT 'Nombre de Ciudad',
  `isActive` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Estado: 1 Activo - 0 Inactivo',
  `createAt` date NOT NULL DEFAULT curdate() COMMENT 'Fecha de Creación',
  `createTime` time NOT NULL DEFAULT curtime() COMMENT 'Hora de Creación',
  `updateAt` date NOT NULL DEFAULT curdate() COMMENT 'Fecha de Actualización',
  `updateTime` time NOT NULL DEFAULT curtime() COMMENT 'Hora de Actualización'
  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `cities`
  ADD KEY `fk_cities_statesId` (`statesId`);

ALTER TABLE `cities`
  ADD CONSTRAINT `fk_cities_statesId` FOREIGN KEY (`statesId`) REFERENCES `states` (`id`);

INSERT INTO `cities` (`id`, `cityName`, `isActive`, `createAt`, `createTime`, `updateAt`, `updateTime`, `statesId`) VALUES
  (1, 'Leticia', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 1),
  (2, 'Puerto Nariño', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 1),
  (3, 'Medellín', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 2),
  (4, 'Bello', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 2),
  (5, 'Envigado', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 2),
  (6, 'Itagüí', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 2),
  (7, 'Rionegro', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 2),
  (8, 'Arauca', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 3),
  (9, 'Saravena', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 3),
  (10, 'Tame', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 3),
  (11, 'Barranquilla', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 4),
  (12, 'Soledad', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 4),
  (13, 'Malambo', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 4),
  (14, 'Sabanalarga', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 4),
  (15, 'Cartagena', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 5),
  (16, 'Magangué', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 5),
  (17, 'Turbaco', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 5),
  (18, 'Tunja', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 6),
  (19, 'Duitama', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 6),
  (20, 'Sogamoso', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 6),
  (21, 'Manizales', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 7),
  (22, 'La Dorada', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 7),
  (23, 'Chinchiná', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 7),
  (24, 'Florencia', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 8),
  (25, 'San Vicente del Caguán', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 8),
  (26, 'Puerto Rico', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 8),
  (27, 'Yopal', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 9),
  (28, 'Aguazul', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 9),
  (29, 'Villanueva', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 9),
  (30, 'Popayán', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 10),
  (31, 'Santander de Quilichao', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 10),
  (32, 'Puerto Tejada', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 10),
  (33, 'Valledupar', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 11),
  (34, 'Aguachica', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 11),
  (35, 'Codazzi', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 11),
  (36, 'Quibdó', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 12),
  (37, 'Istmina', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 12),
  (38, 'Condoto', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 12),
  (39, 'Montería', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 13),
  (40, 'Sahagún', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 13),
  (41, 'Lorica', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 13),
  (42, 'Bogotá', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 14),
  (43, 'Soacha', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 14),
  (44, 'Zipaquirá', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 14),
  (45, 'Inírida', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 15),
  (46, 'San José del Guaviare', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 16),
  (47, 'Neiva', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 17),
  (48, 'Pitalito', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 17),
  (49, 'Garzón', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 17),
  (50, 'Riohacha', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 18),
  (51, 'Maicao', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 18),
  (52, 'Uribia', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 18),
  (53, 'Santa Marta', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 19),
  (54, 'Ciénaga', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 19),
  (55, 'Fundación', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 19),
  (56, 'Villavicencio', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 20),
  (57, 'Acacías', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 20),
  (58, 'Granada', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 20),
  (59, 'Pasto', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 21),
  (60, 'Ipiales', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 21),
  (61, 'Túquerres', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 21),
  (62, 'Cúcuta', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 22),
  (63, 'Ocaña', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 22),
  (64, 'Pamplona', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 22),
  (65, 'Mocoa', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 23),
  (66, 'Puerto Asís', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 23),
  (67, 'Orito', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 23),
  (68, 'Armenia', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 24),
  (69, 'Calarcá', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 24),
  (70, 'Montenegro', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 24),
  (71, 'Pereira', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 25),
  (72, 'Dosquebradas', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 25),
  (73, 'Santa Rosa de Cabal', 1, '2025-02-17', '14:18:09', '2025-02-17', '14:18:09', 25);

--
-- Estructura de tabla para la tabla `cities`
--


--
-- Estructura de tabla para la tabla `typePrograms`
--

CREATE TABLE `typePrograms` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `type` varchar(255) NOT NULL COMMENT 'Tipo de Programa',
  `isActive` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Estado: 1 Activo - 0 Inactivo',
  `createAt` date NOT NULL DEFAULT curdate() COMMENT 'Fecha de Creación',
  `createTime` time NOT NULL DEFAULT curtime() COMMENT 'Hora de Creación',
  `updateAt` date NOT NULL DEFAULT curdate() COMMENT 'Fecha de Actualización',
  `updateTime` time NOT NULL DEFAULT curtime() COMMENT 'Hora de Actualización'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `typePrograms`
  ADD UNIQUE KEY `uk_type` (`type`);


INSERT INTO `typePrograms` (`id`, `type`, `isActive`, `createAt`, `createTime`, `updateAt`, `updateTime`) VALUES
  (1, 'Bachillerato', 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (2, 'Técnico Laboral', 1, CURDATE(), CURTIME(), CURDATE(), CURTIME());


--
-- Estructura de tabla para la tabla `typePrograms`
--


--
-- Estructura de tabla para la tabla `typeModalities`
--

CREATE TABLE `typeModalities` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `modalityName` varchar(255) NOT NULL COMMENT 'Tipo de Modalidad',
  `isActive` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Estado: 1 Activo - 0 Inactivo',
  `createAt` date NOT NULL DEFAULT curdate() COMMENT 'Fecha de Creación',
  `createTime` time NOT NULL DEFAULT curtime() COMMENT 'Hora de Creación',
  `updateAt` date NOT NULL DEFAULT curdate() COMMENT 'Fecha de Actualización',
  `updateTime` time NOT NULL DEFAULT curtime() COMMENT 'Hora de Actualización'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `typeModalities` (`id`, `modalityName`, `isActive`, `createAt`, `createTime`, `updateAt`, `updateTime`) VALUES
  (1, 'Virtual', 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (2, 'Módulos', 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (3, 'Mixta', 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (4, 'Presencial', 1, CURDATE(), CURTIME(), CURDATE(), CURTIME());

--
-- Estructura de tabla para la tabla `typeModalities`
--


--
-- Estructura de tabla para la tabla `programs`
--

CREATE TABLE `programs` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `typeModalitiesId` int(11) NOT NULL COMMENT 'Tipo de Modalidad',
  `typeProgramsId` int(11) NOT NULL COMMENT 'Tipo de Programa',
  `programName` varchar(255) NOT NULL COMMENT 'Nomnbre del Programa',
  `amountMonth` int(11) NOT NULL COMMENT 'Cantidad de Meses',
  `amountSubjects` int(11) NOT NULL COMMENT 'Cantidad de Materias',
  `price` int(11) NOT NULL COMMENT 'Precio del Programa',
  `isActive` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Estado: 1 Activo - 0 Inactivo',
  `createAt` date NOT NULL DEFAULT curdate() COMMENT 'Fecha de Creación',
  `createTime` time NOT NULL DEFAULT curtime() COMMENT 'Hora de Creación',
  `updateAt` date NOT NULL DEFAULT curdate() COMMENT 'Fecha de Actualización',
  `updateTime` time NOT NULL DEFAULT curtime() COMMENT 'Hora de Actualización'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `programs`
  ADD UNIQUE KEY `uk_typeModalitiesId_typeProgramsId_programName` (`typeModalitiesId`, `typeProgramsId`, `programName`);

INSERT INTO `programs` (`id`, `typeProgramsId`, `typeModalitiesId`, `programName`, `amountMonth`, `amountSubjects`, `price`, `isActive`, `createAt`, `createTime`, `updateAt`, `updateTime`) VALUES
  (1, 1, 1, 'Corto Tiempo', 6, 8, 710000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (2, 1, 1, 'Ciclos', 6, 8, 710000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (3, 1, 2, 'Corto Tiempo', 6, 8, 710000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (4, 1, 2, 'Ciclos', 6, 8, 710000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (5, 1, 3, 'Corto Tiempo', 24, 8, 710000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (6, 1, 3, 'Ciclos', 6, 8, 710000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (7, 1, 4, 'Corto Tiempo', 6, 8, 710000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (8, 1, 4, 'Ciclos', 24, 8, 710000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (9, 2, 1, 'Auxiliar Trabajo social y comunitario', 12, 8, 1380000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (10, 2, 2, 'Auxiliar Trabajo social y comunitario', 12, 8, 1380000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (11, 2, 3, 'Auxiliar Trabajo social y comunitario', 12, 8, 1380000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (12, 2, 4, 'Auxiliar Trabajo social y comunitario', 12, 8, 1380000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (13, 2, 1, 'Auxiliar administrativo', 12, 8, 1380000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (14, 2, 2, 'Auxiliar administrativo', 12, 8, 1380000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (15, 2, 3, 'Auxiliar administrativo', 12, 8, 1380000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (16, 2, 4, 'Auxiliar administrativo', 12, 8, 1380000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (17, 2, 1, 'Auxiliar Talento Humano', 12, 8, 1600000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (18, 2, 2, 'Auxiliar Talento Humano', 12, 8, 1600000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (19, 2, 3, 'Auxiliar Talento Humano', 12, 8, 1600000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (20, 2, 4, 'Auxiliar Talento Humano', 12, 8, 1600000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (21, 2, 1, 'Auxiliar Administración Documental y Archivo', 12, 8, 2200000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (22, 2, 2, 'Auxiliar Administración Documental y Archivo', 12, 8, 2200000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (23, 2, 3, 'Auxiliar Administración Documental y Archivo', 12, 8, 2200000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (24, 2, 4, 'Auxiliar Administración Documental y Archivo', 12, 8, 2200000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (25, 2, 1, 'Auxiliar Contable', 12, 8, 1380000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (26, 2, 2, 'Auxiliar Contable', 12, 8, 1380000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (27, 2, 3, 'Auxiliar Contable', 12, 8, 1380000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (28, 2, 4, 'Auxiliar Contable', 12, 8, 1380000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (29, 2, 1, 'Atención a la Primera Infancia', 12, 8, 1380000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (30, 2, 2, 'Atención a la Primera Infancia', 12, 8, 1380000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (31, 2, 3, 'Atención a la Primera Infancia', 12, 8, 1380000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (32, 2, 4, 'Atención a la Primera Infancia', 12, 8, 1380000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (33, 2, 1, 'Pedagogía', 12, 8, 1380000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (34, 2, 2, 'Pedagogía', 12, 8, 1380000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (35, 2, 3, 'Pedagogía', 12, 8, 1380000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (36, 2, 4, 'Pedagogía', 12, 8, 1380000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (37, 2, 1, 'Idiomas y Lenguas Extranjeras', 12, 8, 1600000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (38, 2, 2, 'Idiomas y Lenguas Extranjeras', 12, 8, 1600000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (39, 2, 3, 'Idiomas y Lenguas Extranjeras', 12, 8, 1600000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (40, 2, 4, 'Idiomas y Lenguas Extranjeras', 12, 8, 1600000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (41, 2, 1, 'Auxiliar Servicios Farmacéuticos', 12, 8, 1380000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (42, 2, 2, 'Auxiliar Servicios Farmacéuticos', 12, 8, 1380000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (43, 2, 3, 'Auxiliar Servicios Farmacéuticos', 12, 8, 1380000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (44, 2, 4, 'Auxiliar Servicios Farmacéuticos', 12, 8, 1380000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (45, 2, 1, 'Auxiliar Seguridad Integral y PR', 12, 8, 1480000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (46, 2, 2, 'Auxiliar Seguridad Integral y PR', 12, 8, 1480000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (47, 2, 3, 'Auxiliar Seguridad Integral y PR', 12, 8, 1480000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (48, 2, 4, 'Auxiliar Seguridad Integral y PR', 12, 8, 1480000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (49, 2, 1, 'Auxiliar Administrativo en Salud', 12, 8, 1380000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (50, 2, 2, 'Auxiliar Administrativo en Salud', 12, 8, 1380000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (51, 2, 3, 'Auxiliar Administrativo en Salud', 12, 8, 1380000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (52, 2, 4, 'Auxiliar Administrativo en Salud', 12, 8, 1380000, 1, CURDATE(), CURTIME(), CURDATE(), CURTIME());





  

--
-- Estructura de tabla para la tabla `programs`
--


--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `roleName` varchar(255) NOT NULL COMMENT 'Descripción del Rol',
  `isActive` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Estado: 1 Activo - 0 Inactivo',
  `createAt` date NOT NULL DEFAULT curdate() COMMENT 'Fecha de Creación',
  `createTime` time NOT NULL DEFAULT curtime() COMMENT 'Hora de Creación',
  `updateAt` date NOT NULL DEFAULT curdate() COMMENT 'Fecha de Actualización',
  `updateTime` time NOT NULL DEFAULT curtime() COMMENT 'Hora de Actualización'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `roles` (`id`, `roleName`, `isActive`, `createAt`, `createTime`, `updateAt`, `updateTime`) VALUES
  (1, 'Administrador del Sistema', 1, '2025-02-16', '16:59:43', '2025-02-16', '16:59:43');

--
-- Estructura de tabla para la tabla `roles`
--


--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `rolesId` int(11) NOT NULL COMMENT 'Identificador de Rol',
  `email` varchar(255) NOT NULL COMMENT 'Correo Electronico',
  `password` varchar(255) NOT NULL COMMENT 'Contraseña de Cuenta',
  `userName` varchar(255) NOT NULL COMMENT 'Nombre de Usuario',
  `isActive` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Estado: 1 Activo - 0 Inactivo',
  `createAt` date NOT NULL DEFAULT curdate() COMMENT 'Fecha de Creación',
  `createTime` time NOT NULL DEFAULT curtime() COMMENT 'Hora de Creación',
  `updateAt` date NOT NULL DEFAULT curdate() COMMENT 'Fecha de Actualización',
  `updateTime` time NOT NULL DEFAULT curtime() COMMENT 'Hora de Actualización'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `users`
  ADD UNIQUE KEY `uq_users_email` (`email`),
  ADD KEY `fk_users_rolesId` (`rolesId`);

ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_rolesId` FOREIGN KEY (`rolesId`) REFERENCES `roles` (`id`);

INSERT INTO `users` (`id`, `email`, `password`, `userName`, `isActive`, `createAt`, `createTime`, `updateAt`, `updateTime`, `rolesId`) VALUES
  (1, 'fundetecadmin@gmail.com', '$2b$10$AjGDV9rvKVt.81trSP5WIetYOS46X6uk6uJh0CfjXIj4ge4/qDbkq', 'fundeadmin', 1, '2025-02-16', '20:53:25', '2025-02-16', '20:53:25', 1);

--
-- Estructura de tabla para la tabla `users`
--


--
-- Estructura de tabla para la tabla `userdetails`
--

CREATE TABLE `userDetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `usersId` int(11) NOT NULL COMMENT 'Identificador de Usuario',
  `typeDocumentsId` int(11) NOT NULL COMMENT 'Identificador de Tipo de Documento',
  `documentNumber` int(11) NOT NULL COMMENT 'Número de Documento',
  `firstName` varchar(255) NOT NULL COMMENT 'Primer Nombre',
  `secondName` varchar(255) DEFAULT NULL COMMENT 'Segundo Nombre',
  `lastName` varchar(255) NOT NULL COMMENT 'Primer Apellido',
  `sureName` varchar(255) DEFAULT NULL COMMENT 'Segundo Apellido',
  `phoneNumber` varchar(255) DEFAULT NULL COMMENT 'Número de Celular',
  `email` varchar(255) NOT NULL COMMENT 'Correo Electrónico',
  `photo` varchar(255) DEFAULT NULL COMMENT 'Foto de Perfil Base64',
  `countriesId` int(11) NOT NULL COMMENT 'País de origen',
  `statesId` int(11) NOT NULL COMMENT 'Departamento',
  `citiesId` int(11) NOT NULL COMMENT 'Ciudad',
  `closePersonNames` VARCHAR(255) NOT NULL COMMENT 'Persona de Contacto',
  `closePersonPhone` VARCHAR(255) NOT NULL COMMENT 'Número Persona de Contacto',
  `isActive` tinyint(1) NOT NULL DEFAULT 1 COMMENT 'Estado: 1 Activo - 0 Inactivo',
  `createAt` date NOT NULL DEFAULT CURDATE() COMMENT 'Fecha de Creación',
  `createTime` time NOT NULL DEFAULT CURTIME() COMMENT 'Hora de Creación',
  `updateAt` date NOT NULL DEFAULT CURDATE() COMMENT 'Fecha de Actualización',
  `updateTime` time NOT NULL DEFAULT CURTIME() COMMENT 'Hora de Actualización'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `userDetails`
  ADD CONSTRAINT `fk_userDetails_usersId` FOREIGN KEY (`usersId`) REFERENCES `users`(`id`),
  ADD CONSTRAINT `fk_userDetails_typeDocumentsId` FOREIGN KEY (`typeDocumentsId`) REFERENCES `typeDocuments`(`id`),
  ADD CONSTRAINT `fk_userDetails_countriesId` FOREIGN KEY (`countriesId`) REFERENCES `countries`(`id`),
  ADD CONSTRAINT `fk_userDetails_statesId` FOREIGN KEY (`statesId`) REFERENCES `states`(`id`),
  ADD CONSTRAINT `fk_userDetails_citiesId` FOREIGN KEY (`citiesId`) REFERENCES `cities`(`id`);

INSERT INTO `userdetails` (`id`, `usersId`, `typeDocumentsId`, `documentNumber`, `firstName`, `secondName`, `lastName`, `sureName`, `phoneNumber`, `email`, `countriesId`, `statesId`, `citiesId`, `closePersonNames`, `closePersonPhone`) VALUES
  (1, 1, 1, 999999999, 'Fundetec', '', 'Admin', '', 9999999999, 'fundetecadmin@gmail.com', 1, 1, 1, '', '' );

--
-- Estructura de tabla para la tabla `userdetails`
--

--
-- Estructura de tabla para la tabla `groups`
-- 

CREATE TABLE `groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `groupName` VARCHAR(255) NOT NULL COMMENT 'Nombre del Grupo',
  `isActive` TINYINT(1) NOT NULL DEFAULT 1 COMMENT 'Estado: 1 Activo - 0 Inactivo',
  `createAt` DATE NOT NULL DEFAULT CURRENT_DATE COMMENT 'Fecha de Creación',
  `createTime` TIME NOT NULL DEFAULT CURRENT_TIME COMMENT 'Hora de Creación',
  `updateAt` DATE NOT NULL DEFAULT CURRENT_DATE COMMENT 'Fecha de Actualización',
  `updateTime` TIME NOT NULL DEFAULT CURRENT_TIME COMMENT 'Hora de Actualización'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `groups`
  ADD UNIQUE KEY `uk_group_groupName` (`groupName`);

INSERT INTO `groups` (`id`, `groupName`, `isActive`, `createAt`, `createTime`, `updateAt`, `updateTime`) VALUES
  (1, 'JA', 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (2, 'JB', 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (3, 'JC', 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (4, 'JD', 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (5, 'JE', 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (6, 'JF', 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (7, 'DA', 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (8, 'DB', 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (9, 'DC', 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (10, 'DD', 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (11, 'DE', 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (12, 'DF', 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (13, 'Diciembre', 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (14, 'Julio', 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (15, 'Ciclo 3', 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (16, 'Ciclo 4', 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (17, 'Ciclo 5', 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (18, 'Ciclo 6', 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (19, 'TJ', 1, CURDATE(), CURTIME(), CURDATE(), CURTIME()),
  (20, 'TD', 1, CURDATE(), CURTIME(), CURDATE(), CURTIME());



--
-- Estructura de tabla para la tabla `groups`
--


--
-- Estructura de tabla para la tabla `studentForms`
--

CREATE TABLE studentForms (
  id int(11) AUTO_INCREMENT PRIMARY KEY,
  names VARCHAR(255) NOT NULL COMMENT 'Nombres',
  sureNames VARCHAR(255) NOT NULL COMMENT 'Apellidos',
  typeDocumentsId int(11) NOT NULL COMMENT 'Tipo de Documento',
  documentNumber BIGINT NOT NULL COMMENT 'Número de Documento',
  expeditionPlace VARCHAR(255) NOT NULL COMMENT 'Lugar de Expedición',
  age int(11) NOT NULL COMMENT 'Edad',
  email VARCHAR(255) NOT NULL COMMENT 'Correo Electronico',
  bornDate DATE NOT NULL COMMENT 'Fecha de Nacimiento',
  state VARCHAR(255) NOT NULL COMMENT 'Departamento',
  city VARCHAR(255) NOT NULL COMMENT 'Ciudad',
  neighborhood VARCHAR(255) NOT NULL COMMENT 'Barrio',
  address VARCHAR(255) NOT NULL COMMENT 'Dirección',
  phoneNumber BIGINT NOT NULL COMMENT 'Número de Telefono',
  secondPhoneNumber BIGINT DEFAULT NULL COMMENT 'Segundo Número de Telefono',
  typeProgramsId int(11) NOT NULL COMMENT 'Identificador de tipo de programa',
  programsId int(11) DEFAULT NULL COMMENT 'Identificador de Programa',
  cyclesProgramsId int(11) DEFAULT NULL COMMENT 'Identificador de Programa para bachiller por ciclo',
  groupsId int(11) DEFAULT NULL COMMENT 'Identificador de Grupo',
  graduationYear INT DEFAULT NULL COMMENT 'Año de Graduación',
  agent VARCHAR(255) DEFAULT NULL COMMENT 'Asesor Comercial',
  documents TEXT DEFAULT NULL COMMENT 'Documentos Entregados',
  observation TEXT DEFAULT NULL COMMENT 'Observación',
  isActive TINYINT DEFAULT 1 COMMENT 'Estado: 1 Activo - 0 Inactivo',
  createAt DATE DEFAULT CURRENT_DATE COMMENT 'Fecha de Creación',
  createTime TIME DEFAULT CURRENT_TIME COMMENT 'Hora de Creación',
  updateAt DATE DEFAULT CURRENT_DATE COMMENT 'Fecha de Actualización',
  updateTime TIME DEFAULT CURRENT_TIME COMMENT 'Hora de Actualización'
);

ALTER TABLE `studentForms`
  ADD UNIQUE KEY `uk_documentNumber_typeProgramsId` (`documentNumber`, `typeProgramsId`);

--
-- Estructura de tabla para la tabla `studentForms`
--

--
-- Estructura de tabla para la tabla `cycles`
--

CREATE TABLE `cycles` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `cycleNumber` int(11) NOT NULL COMMENT 'Numero del ciclo',
  `description` varchar(255) NOT NULL COMMENT 'Descripción del ciclo',
  `isActive` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Estado: 1 Activo - 0 Inactivo',
  `createAt` date NOT NULL DEFAULT curdate() COMMENT 'Fecha de Creación',
  `createTime` time NOT NULL DEFAULT curtime() COMMENT 'Hora de Creación',
  `updateAt` date NOT NULL DEFAULT curdate() COMMENT 'Fecha de Actualización',
  `updateTime` time NOT NULL DEFAULT curtime() COMMENT 'Hora de Actualización'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `cycles` (`id`, `cycleNumber`, `description`) VALUES
  (1, 3, 'Ciclo 3'),
  (2, 4, 'Ciclo 4'),
  (3, 5, 'Ciclo 5'),
  (4, 6, 'Ciclo 6');


--
-- Estructura de tabla para la tabla `cycles`
--

--
-- Estructura de tabla para la tabla `contents`
--

CREATE TABLE `contents` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `contentDescription` varchar(255) NOT NULL COMMENT 'Descripción del contenido',
  `isActive` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Estado: 1 Activo - 0 Inactivo',
  `createAt` date NOT NULL DEFAULT curdate() COMMENT 'Fecha de Creación',
  `createTime` time NOT NULL DEFAULT curtime() COMMENT 'Hora de Creación',
  `updateAt` date NOT NULL DEFAULT curdate() COMMENT 'Fecha de Actualización',
  `updateTime` time NOT NULL DEFAULT curtime() COMMENT 'Hora de Actualización'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `contents` (`id`, `contentDescription`) VALUES
  (1, 'Módulos del Ciclo'),
  (2, '1º semestre técnica- virtual'),
  (3, '1º semestre técnica- módulos'),
  (4, '2º semestre técnica- virtual'),
  (5, '2º semestre técnica- módulos'),
  (6, 'Ciclo con clases virtuales');



--
-- Estructura de tabla para la tabla `contents`
--

--
-- Estructura de tabla para la tabla `studentFormsCycles`
--

CREATE TABLE studentFormsCycles (
  id int(11) AUTO_INCREMENT PRIMARY KEY,
  studentFormsId int(11) NOT NULL COMMENT 'Identificador de formulario principal',
  cyclesId int(11) NOT NULL COMMENT 'Identificador del ciclo',
  contentsId int(11) DEFAULT NULL COMMENT 'Identificador de contenido',
  isActive TINYINT DEFAULT 1 COMMENT 'Estado: 1 Activo - 0 Inactivo',
  createAt DATE DEFAULT CURRENT_DATE COMMENT 'Fecha de Creación',
  createTime TIME DEFAULT CURRENT_TIME COMMENT 'Hora de Creación',
  updateAt DATE DEFAULT CURRENT_DATE COMMENT 'Fecha de Actualización',
  updateTime TIME DEFAULT CURRENT_TIME COMMENT 'Hora de Actualización'
);

ALTER TABLE `studentFormsCycles`
  ADD UNIQUE KEY `uk_studentFormsId_cyclesId_contentsId` (`studentFormsId`, `cyclesId`, `contentsId`);

--
-- Estructura de tabla para la tabla `studentFormsCycles`
--