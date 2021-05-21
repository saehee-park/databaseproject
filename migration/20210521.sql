ALTER TABLE employee DROP resident_registeration_number;

INSERT INTO `skills` (`skill_name`) VALUES ('JAVA');
INSERT INTO `skills` (`skill_name`) VALUES ('C');
INSERT INTO `skills` (`skill_name`) VALUES ('C++');
INSERT INTO `skills` (`skill_name`) VALUES ('C#');
INSERT INTO `skills` (`skill_name`) VALUES ('Python');
INSERT INTO `skills` (`skill_name`) VALUES ('JavaScript');
INSERT INTO `skills` (`skill_name`) VALUES ('Go');
INSERT INTO `skills` (`skill_name`) VALUES ('Mysql');
INSERT INTO `skills` (`skill_name`) VALUES ('MariaDB');

ALTER TABLE `project` ADD `description` VARCHAR(255) NOT NULL;

ALTER TABLE `participation` CHANGE COLUMN `duty` `duty` VARCHAR(255) NULL ;