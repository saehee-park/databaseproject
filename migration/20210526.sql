ALTER TABLE participation ADD (participate varchar(45) not null);

CREATE TABLE `dbp`.`evaluation_contents` (
  `evaluation_content_id` VARCHAR(45) NOT NULL,
  `evaluation_type` VARCHAR(45) NOT NULL,
  `contents` VARCHAR(45) NOT NULL,
  `example` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`evaluation_content_id`));

