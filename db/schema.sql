IF DATABASE EXISTS DROP employee_db;
CREATE DATABASE employee_db;


CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    deparment_name VARCHAR(30) NOT NULL
);

CREATE TABLE role(
    id: INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title: VARCHAR(30) NOT NULL,
    salary: DECIMAL NOT NULL, 
    FOREIGN KEY (department_id)
    REFERENCES departmen(id)
    ON DELETE SET NULL 
);

CREATE TABLE employee(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL,
    FOREIGN KEY(manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
);

