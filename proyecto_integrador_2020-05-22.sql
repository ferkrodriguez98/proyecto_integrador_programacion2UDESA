# ************************************************************
# Sequel Pro SQL dump
# Versión 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: localhost (MySQL 5.7.26)
# Base de datos: proyecto_integrador
# Tiempo de Generación: 2020-05-22 04:40:17 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Volcado de tabla REVIEWS
# ------------------------------------------------------------

DROP TABLE IF EXISTS `REVIEWS`;

CREATE TABLE `REVIEWS` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `series_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `series_review` varchar(500) NOT NULL DEFAULT '',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `rating` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `review_id` (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `USERS` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `REVIEWS` WRITE;
/*!40000 ALTER TABLE `REVIEWS` DISABLE KEYS */;

INSERT INTO `REVIEWS` (`id`, `series_id`, `user_id`, `series_review`, `createdAt`, `updatedAt`, `rating`)
VALUES
	(1,16576,1,'no me gusto','2020-05-21 19:09:52','2020-05-21 19:09:52',1),
	(2,15365,6,'medio mala','2020-05-21 19:09:52','2020-05-21 19:09:52',4),
	(3,5624,3,'ta re buenaaaa','2020-05-21 19:09:52','2020-05-21 19:09:52',7),
	(4,5242,7,'malarda BREO','2020-05-21 19:09:52','2020-05-21 19:09:52',3),
	(5,7488,2,'no se no la termine','2020-05-21 19:09:52','2020-05-21 19:09:52',7),
	(6,17643,9,'me re gusto','2020-05-21 19:09:52','2020-05-21 19:09:52',2),
	(7,3714,12,'si mas o menos','2020-05-21 19:09:52','2020-05-21 19:09:52',8),
	(8,1432,1,'mala','2020-05-21 19:09:52','2020-05-21 19:09:52',3),
	(9,1745,2,'buena','2020-05-21 19:09:52','2020-05-21 19:09:52',7),
	(10,19888,6,'si','2020-05-21 19:09:52','2020-05-21 19:09:52',3),
	(11,1745,8,'no','2020-05-21 19:09:52','2020-05-21 19:09:52',2),
	(12,17644,4,'el final es aburrido','2020-05-21 19:09:52','2020-05-20 21:00:00',1),
	(13,11444,3,'que se yo','2020-05-21 19:09:52','2020-05-21 19:09:52',7),
	(14,3736,8,'masomenos','2020-05-21 19:09:52','2020-05-21 19:09:52',9),
	(15,6346,5,'re buena','2020-05-21 19:09:52','2020-05-21 19:09:52',2),
	(16,14666,1,'no la recomiendo','2020-05-21 19:09:52','2020-05-21 19:09:52',8),
	(17,13413,6,'la recomiendo breo','2020-05-21 19:09:52','2020-05-21 19:09:52',4),
	(18,14567,3,'ponele','2020-05-21 19:09:52','2020-05-21 19:09:52',7),
	(19,16777,9,'me gusto pero hasta ahi','2020-05-21 19:09:52','2020-05-21 19:09:52',4),
	(20,16663,4,'solo la primer temporada es buena','2020-05-21 19:09:52','2020-05-21 19:09:52',2),
	(21,12456,2,'malisima','2020-05-21 19:09:52','2020-05-21 19:09:52',1),
	(22,12345,8,'que se yo','2020-05-21 19:09:52','2020-05-21 19:09:52',8),
	(23,11552,1,'mala','2020-05-21 19:09:52','2020-05-21 19:09:52',4),
	(24,17432,1,'buenarda','2020-05-21 19:09:52','2020-05-21 19:09:52',6),
	(25,15351,7,'malisima','2020-05-21 19:09:52','2020-05-21 19:09:52',7),
	(26,14235,4,'no mala mala mala','2020-05-21 19:09:52','2020-05-21 19:09:52',3),
	(27,17364,7,'buena','2020-05-21 19:09:52','2020-05-21 19:09:52',8),
	(28,7586,2,'malisima mal','2020-05-21 19:09:52','2020-05-21 19:09:52',2),
	(29,15278,10,'pesima','2020-05-21 19:09:52','2020-05-21 19:09:52',8),
	(30,13131,8,'ndeah','2020-05-21 19:09:52','2020-05-21 19:09:52',2),
	(31,3124,9,'kok','2020-05-20 21:00:00','2020-05-20 21:00:00',10),
	(32,3124,9,'dadsda','2020-05-20 21:00:00','2020-05-20 21:00:00',10),
	(33,31414,11,'malisima bro','2020-05-20 21:00:00','2020-05-20 21:00:00',0);

/*!40000 ALTER TABLE `REVIEWS` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla USERS
# ------------------------------------------------------------

DROP TABLE IF EXISTS `USERS`;

CREATE TABLE `USERS` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `birthdate` date DEFAULT NULL,
  `favorite_genre` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `USERS` WRITE;
/*!40000 ALTER TABLE `USERS` DISABLE KEYS */;

INSERT INTO `USERS` (`id`, `username`, `email`, `password`, `birthdate`, `favorite_genre`)
VALUES
	(1,'carlostebes','carlitosteves@yahoo.com.ar','boca123456','1983-10-04','comedia'),
	(2,'pablitolescano','elpablito@gmail.com','niideamono','1933-10-02',NULL),
	(3,'nose','notengoidea@hotmail.com','notengoidea','2019-10-10','nose'),
	(4,'yo mismo','yomismo@yomismo.com','yomismo123','2020-03-03','yomismo'),
	(5,'matskruger','matikruger@salame.com','matikruger','2013-02-10','elmatikruger'),
	(6,'fermin','fermin@chupa.la','boca123456','1998-08-15','boca de mi vida'),
	(7,'agnes','agnesdormal@gmail.com','agneeeeees','2001-09-11','leomessi123'),
	(8,'vikingo','vikingo123@viking.com','ragnar123','1992-12-13','ragnarlothbrok'),
	(9,'jonaskandvall','dalejonas@eljonas.de','sicmundus','2020-07-24','creatusest'),
	(10,'elmaguito','jaripoter@dumbledr.com','hermione123','1994-04-28','popoter'),
	(11,'elviejomago','gandalf@lotr.eu','bilbo123','1910-10-24',NULL),
	(12,'meolessi','leomessi@cr7.ca','cr7pasion','1984-10-27','wayne rooney'),
	(13,'fermin','ferkrodriguez98@gmail.com','123456','2016-09-30','horror');

/*!40000 ALTER TABLE `USERS` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
