USE employee_db;

INSERT INTO department (name)
VALUE ("Sales");
INSERT INTO department (name)
VALUE ("Engineering");
INSERT INTO department (name)
VALUE ("Finance");
INSERT INTO department (name)
VALUE ("Legal");

INSERT INTO role (title, salary, department_id)
VALUE ("Lead Engineer", 200000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Legal Team Lead", 250000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 125000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Sales Lead", 150000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Salesperson", 110000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Software Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Lawyer", 225000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Stphen", "Obie", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Kyle", "Brewin", 4, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Jenna","Obie", 2,3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("George", "Clement", 1, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Justin", "Little", 4, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Bob", "Saget", 1, 6);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Brian", "Chang", 2, 7);


SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;