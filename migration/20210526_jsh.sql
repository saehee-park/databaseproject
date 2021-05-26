-- 권한 테이블
INSERT INTO `authorization` VALUES (0,'일반'),(1,'경영진');

-- 부서 테이블
INSERT INTO `department` (dept_name) VALUES ('마케팅'), ('연구관리'), ('경영관리'), ('개발');

-- 스킬 테이블
INSERT INTO skills (skill_name) VALUES ('HTML'), ('Javascript'), ('C#'), ('C/C++'), ('Python'), ('Dart/Flutter'), ('Java');

-- 고객 테이블
INSERT INTO customer (customer_name) VALUES ("외주 1"), ("외주 2"), ("외주 3");

-- 직원 테이블
-- INSERT INTO employee (ID, PWD, name, resident_registeration_number, education, dept_no, authorization_no, work_experience) VALUES ('test', '1234', '홍길동', '123456-1234567', 'college', 3, 1, 1.5);
-- INSERT INTO employee (ID, PWD, name, resident_registeration_number, education, dept_no, authorization_no, work_experience) VALUES ('test2', '1234', '이순신', '123456-1234567', 'college', 2, 0, 2.5);
-- INSERT INTO employee (ID, PWD, name, resident_registeration_number, education, dept_no, authorization_no, work_experience) VALUES ('test3', '1234', '최치원', '123456-1234567', 'college', 3, 0, 3.5);
INSERT INTO employee (ID, PWD, name, education, dept_no, authorization_no, work_experience) VALUES ('test', '1234', '홍길동', 'college', 3, 1, 1.5);
INSERT INTO employee (ID, PWD, name, education, dept_no, authorization_no, work_experience) VALUES ('test2', '1234', '이순신', 'college', 2, 0, 2.5);
INSERT INTO employee (ID, PWD, name, education, dept_no, authorization_no, work_experience) VALUES ('test3', '1234', '최치원', 'college', 3, 0, 3.5);

-- 프로젝트 테이블
INSERT INTO project (project_name, start_date, end_date, state, customer_id, description) VALUES ("프로젝트 1: 쇼핑몰", "2021-01-01", "2022-01-01", "진행중", 1, "쇼핑몰 웹 페이지 개발");
INSERT INTO project (project_name, start_date, end_date, state, customer_id, description) VALUES ("프로젝트 2: 캘린더", "2021-03-01", "2022-09-01", "진행중", 2, "캘린더 어플 개발");
INSERT INTO project (project_name, start_date, end_date, state, customer_id, description) VALUES ("프로젝트 3: 게임", "2021-05-01", "2021-05-26", "진행중", 3, "게임 개발");

-- 참여 테이블
INSERT INTO participation (participation_date, duty, participate, emp_no, project_no) VALUES ('2021-02-01', '테스터', '참여중', 1, 1);
INSERT INTO participation (participation_date, duty, participate, emp_no, project_no) VALUES ('2021-04-01', '테스터', '참여중', 1, 2);
INSERT INTO participation (participation_date, duty, participate, emp_no, project_no) VALUES ('2021-06-01', '테스터', '참여중', 1, 3);
INSERT INTO participation (participation_date, duty, participate, emp_no, project_no) VALUES ('2021-01-01', '웹 개발자', '참여중', 2, 1);
INSERT INTO participation (participation_date, duty, participate, emp_no, project_no) VALUES ('2021-03-01', '앱 개발자', '참여중', 2, 2);
INSERT INTO participation (participation_date, duty, participate, emp_no, project_no) VALUES ('2021-05-01', '앱 개발자', '참여중', 2, 3);
INSERT INTO participation (participation_date, duty, participate, emp_no, project_no) VALUES ('2021-06-02', '게임 개발자', '참여중', 3, 3);


-- 고객 평가 테이블
INSERT INTO customer_evaluation (evaluation_content1, evaluation_score1, evaluation_content2, evaluation_score2, customer_id, non_evaluator_no, project_no) VALUES ("많이 좋음", 90, "보통임", 70, 1, 1, 1);
INSERT INTO customer_evaluation (evaluation_content1, evaluation_score1, evaluation_content2, evaluation_score2, customer_id, non_evaluator_no, project_no) VALUES ("좋음", 70, "그럭저럭", 50, 1, 2, 1);
INSERT INTO customer_evaluation (evaluation_content1, evaluation_score1, evaluation_content2, evaluation_score2, customer_id, non_evaluator_no, project_no) VALUES ("아주 좋음", 100, "별로", 30, 1, 3, 1);
INSERT INTO customer_evaluation (evaluation_content1, evaluation_score1, evaluation_content2, evaluation_score2, customer_id, non_evaluator_no, project_no) VALUES ("아주 좋음", 100, "별로", 30, 1, 2, 2);


-- 업무 테이블
INSERT INTO task (title, content, start_date, end_date, current_state, submit_file, emp_no, project_no) VALUES ("요구사항 정의서 작성", "고객이 요구하는 쇼핑몰 페이지에 대한 요구사항 정의서를 작성하시오", "2021-01-01", "2021-01-14", 'end','엑셀', 1, 1);
INSERT INTO task (title, content, start_date, end_date, current_state, submit_file, emp_no, project_no) VALUES ("기능 정의서 작성", "쇼핑몰 페이지에 대한 기능 정의서를 작성하시오", "2021-01-01", "2021-01-14", 'end','문서', 2, 1);
INSERT INTO task (title, content, start_date, end_date, current_state, submit_file, emp_no, project_no) VALUES ("ERD 설계서 작성", "고객이 요구하는 쇼핑몰 페이지에 대한 ERD 설계서를 작성하시오", "2021-01-01", "2021-01-21", 'end','문서', 1, 1);
INSERT INTO task (title, content, start_date, end_date, current_state, submit_file, emp_no, project_no) VALUES ("DB 정의서 작성", "쇼핑몰 페이지에 대한 DB 정의서를 작성하시오", "2021-01-01", "2021-01-21", 'verify', '엑셀', 2, 1);
INSERT INTO task (title, content, start_date, end_date, current_state, submit_file, emp_no, project_no) VALUES ("CRUD Matrix 작성", "고객이 요구하는 쇼핑몰 페이지에 대한 CRUD Matrix를 작성하시오", "2021-01-01", "2021-01-31", 'verify', '엑셀', 1, 1);
INSERT INTO task (title, content, start_date, end_date, current_state, submit_file, emp_no, project_no) VALUES ("표준 용어 도메인 작성", "쇼핑몰 페이지에 대한 표준 용어 도메인를 작성하시오", "2021-01-01", "2021-01-31", 'progress', '문서', 2, 1);
INSERT INTO task (title, content, start_date, end_date, current_state, submit_file, emp_no, project_no) VALUES ("테이블 정의서 작성", "고객이 요구하는 쇼핑몰 페이지에 대한 테이블 정의서를 작성하시오", "2021-01-01", "2021-02-07", 'progress', '문서', 1, 1);
INSERT INTO task (title, content, start_date, end_date, submit_file, emp_no, project_no) VALUES ("웹 페이지 개발 1", "쇼핑몰 웹 페이지의 Task1에 해당되는 기능을 구현하시오", "2021-01-01", "2021-02-07", 'html/javascript', 2, 1);
INSERT INTO task (title, content, start_date, end_date, submit_file, emp_no, project_no) VALUES ("웹 페이지 개발 2", "쇼핑몰 웹 페이지의 Task2에 해당되는 기능을 구현하시오", "2021-01-01", "2021-02-07", 'html/javascript', 1, 1);
INSERT INTO task (title, content, start_date, end_date, submit_file, emp_no, project_no) VALUES ("웹 페이지 개발 3", "쇼핑몰 웹 페이지의 Task3에 해당되는 기능을 구현하시오", "2021-01-01", "2021-02-14", 'html/javascript', 2, 1);

-- 직원 스킬셋 테이블
INSERT INTO emp_skill (emp_no, skill_no) VALUES (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7);
INSERT INTO emp_skill (emp_no, skill_no) VALUES (2, 1), (2, 2), (2, 6), (2, 7);
INSERT INTO emp_skill (emp_no, skill_no) VALUES (3, 3), (3, 4), (3, 6);
