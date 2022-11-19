USE employee_db;

INSERT INTO department (name)
VALUES 
    ('Host'), 
    ('Busser'), 
    ('Server'), 
    ('Bar'), 
    ('Restaurant');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Host Manager', 80000, 1),
    ('Host', 30000, 1),
    ('Busser Manager', 100000, 2),
    ('Busser', 45000, 2),
    ('Server Manager', 120000, 3),
    ('Server', 70000, 3),
    ('Bar Manager', 125000, 4),
    ('Bartender', 75000, 4),
    ('General Manager', 175000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('Ben', 'Hobson', 9, NULL),
    ('Bryan', 'Taylor', 1, 1),
    ('Mariana', 'Bandhold', 2, 2),
    ('Paloma', 'Williams', 2, 2),
    ('Tyler', 'Cornell', 3, 1),
    ('Brecon', 'Richards', 4, 5),
    ('Jake', 'Kodish', 4, 5),
    ('Clara', 'Macinlay', 5, 1),
    ('Connor', 'Bond', 6, 8),
    ('Sean', 'Downey', 6, 8),
    ('Tristan', 'Legano', 7, 1),
    ('Ian', 'Strutt', 8, 11),
    ('Matt', 'Puggs', 8, 11);