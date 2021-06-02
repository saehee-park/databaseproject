ALTER TABLE participation ADD (participate varchar(45) not null);

CREATE TABLE `dbp`.`evaluation_contents` (
  `evaluation_content_id` VARCHAR(45) NOT NULL,
  `evaluation_type` VARCHAR(45) NOT NULL,
  `contents` VARCHAR(45) NOT NULL,
  `example` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`evaluation_content_id`));

ALTER TABLE `dbp`.`evaluation_contents` 
CHANGE COLUMN `evaluation_content_id` `evaluation_item_id` INT NOT NULL ,
CHANGE COLUMN `contents` `item_title` VARCHAR(255) NOT NULL ,
CHANGE COLUMN `example` `item_example` VARCHAR(255) NOT NULL , RENAME TO  `dbp`.`evaluation_items` ;

ALTER TABLE `dbp`.`evaluation_items` 
CHANGE COLUMN `evaluation_item_id` `evaluation_item_no` INT NOT NULL AUTO_INCREMENT ;

CREATE TABLE `dbp`.`evaluation_result` (
  `evaluation_result_no` INT NOT NULL,
  `evaluator_emp_no` VARCHAR(45) NOT NULL,
  `non_evaluator_emp_no` VARCHAR(45) NOT NULL,
  `score` VARCHAR(45) NOT NULL,
  `content` VARCHAR(45) NOT NULL,
  `evaluation_item_no` INT NOT NULL,
  `project_no` INT NOT NULL,
  PRIMARY KEY (`evaluation_result_no`));

ALTER TABLE `dbp`.`evaluation_result` 
CHANGE COLUMN `evaluator_emp_no` `evaluator_emp_no` INT NOT NULL ,
CHANGE COLUMN `non_evaluator_emp_no` `non_evaluator_emp_no` INT NOT NULL ;

ALTER TABLE `dbp`.`evaluation_result` 
CHANGE COLUMN `score` `score` INT NOT NULL ,
CHANGE COLUMN `content` `content` VARCHAR(255) NOT NULL ;

alter table evaluation_result add constraint foreign key (project_no) references project(project_no);
alter table evaluation_result add constraint foreign key (evaluator_emp_no) references employee(emp_no);
alter table evaluation_result add constraint foreign key (non_evaluator_emp_no) references employee(emp_no);
alter table evaluation_result add constraint foreign key (evaluation_item_no) references evaluation_items(evaluation_item_no);