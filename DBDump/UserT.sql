-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: one_click_to_get
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_Id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(70) NOT NULL,
  `roll_Id` int NOT NULL,
  `email_Id` varchar(70) DEFAULT NULL,
  `password` longtext,
  `photo` longblob,
  `state` varchar(70) NOT NULL,
  `district` varchar(100) NOT NULL,
  `city` varchar(70) NOT NULL,
  `dateofbirth` varchar(50) DEFAULT NULL,
  `phonenumber` varchar(100) DEFAULT NULL,
  `twitter` varchar(200) DEFAULT NULL,
  `facebook` varchar(200) DEFAULT NULL,
  `linkedIn` varchar(200) DEFAULT NULL,
  `instagram` varchar(200) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `biodata` varchar(1000) DEFAULT NULL,
  `Country` varchar(60) DEFAULT NULL,
  `streetName` varchar(200) DEFAULT NULL,
  `doorNo` varchar(20) DEFAULT NULL,
  `gender` varchar(16) DEFAULT NULL,
  PRIMARY KEY (`user_Id`),
  KEY `roll_Id` (`roll_Id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roll_Id`) REFERENCES `userroll` (`roll_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'S.Palaniselvam',1,'palani@gmail.com','Selvam55@','','tamilnadu','virudhunagar','srivilliputtur','25-12-2022','8667660979','','','','',NULL,NULL,NULL,NULL,NULL,NULL),(3,'S.Padmadevi',1,'Padmadevi@gmail.com','Padmadevi55@','','tamilnadu','virudhunagar','srivilliputtur','25-12-2022','8667660979','','','','',NULL,NULL,NULL,NULL,NULL,NULL),(4,'K.Sangili',1,'Sangili@gmail.com','Sangili55@',_binary '[object Object]','tamilnadu','virudhunagar','srivilliputtur','25-12-2022','8667660979','','','','',NULL,NULL,NULL,NULL,NULL,NULL),(5,'S.Muthumari',1,'muthumari@gmail.com','b7debbe8573c6f4ad9c10018ffc34d3457b8700d8f99738f8e6dcdf8f085837804ec9b184b0e3017ce1e79a8ee28b95cc62dde8bec1bb7fff38e68f44cc24c56ad50e8f14c358fb3f094cdfc85fbd766e5a019fbf9244138e2286ff84ff9b073ed1fdf334b23786fb8cdcd6a',_binary '[object Object]','tamilnadu','virudhunagar','srivilliputtur','25-12-2022','8667660979','','','','',NULL,NULL,NULL,NULL,NULL,NULL),(6,'K.Sangili',1,'Sangili@gmail.com','f814dc2b6992e6bd6602723c741d42ed8845aca59ea156a6b935d11a056dec9bf9fb4d5e6f12ad479d8881eb23f4c2e797d6e241ce6e46cda549211a2340054c14ca0ea701544bc7f1779b457040b6bbcfc808e4ca27b9017be95d2486282fb4cbd333bc4c25b21dfd77',_binary '[object Object]','tamilnadu','virudhunagar','srivilliputtur','25-12-2022','8667660979','','','','',NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-23  8:18:12
