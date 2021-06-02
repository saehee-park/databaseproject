-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: dbp
-- ------------------------------------------------------
-- Server version	8.0.23

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
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `emp_no` int NOT NULL AUTO_INCREMENT,
  `ID` varchar(100) NOT NULL,
  `PWD` varchar(100) NOT NULL, 
  `name` varchar(100) NOT NULL,
  `resident_registeration_number` varchar(100) NOT NULL,
  `education` ENUM('high-school', 'college', 'master', 'ph-d') NOT NULL,
  `dept_no` int NOT NULL,
  `work_experience` float NOT NULL,
  `authorization_no` int NOT NULL,
  PRIMARY KEY (`emp_no`),
  KEY `authorization_no` (`authorization_no`),
  KEY `dept_no` (`dept_no`),
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`authorization_no`) REFERENCES `authorization` (`authorization_no`),
  CONSTRAINT `employee_ibfk_2` FOREIGN KEY (`dept_no`) REFERENCES `department` (`dept_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-17 11:52:00



INSERT INTO employee (ID, PWD, name, resident_registeration_number, education, dept_no, authorization_no, work_experience) VALUES ('test', '1234', '홍길동', '123456-1234567', 'college', 3, 1, 3.5);
INSERT INTO employee (ID, PWD, name, resident_registeration_number, education, dept_no, authorization_no, work_experience) VALUES ('test2', '1234', '길동홍', '123456-1234567', 'college', 3, 1, 3.5);
INSERT INTO employee (ID, PWD, name, resident_registeration_number, education, dept_no, authorization_no, work_experience) VALUES ('test3', '1234', '동홍길', '123456-1234567', 'college', 3, 1, 3.5);