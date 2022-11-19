DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;


CREATE TABLE department(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL UNSIGNED NOT NULL, 
    department_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (department_id) 
    REFERENCES department(id)  
);

CREATE TABLE employee(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT ,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (role_id) 
    REFERENCES role(id),
    manager_id INT UNSIGNED,
    FOREIGN KEY(manager_id) 
    REFERENCES employee(id) 
    
);

