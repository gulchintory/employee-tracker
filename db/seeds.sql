
INSERT INTO departments (id, name) VALUES ('Sales');

INSERT INTO departments (id, name) VALUES ('Engineering');

INSERT INTO departments (id, name) VALUES ('Finance');

INSERT INTO departments (id, name) VALUES ('Legal');

INSERT INTO roles (title, salary, department_id) VALUES ('Sales Lead', 10000, 1);

INSERT INTO roles (title, salary, department_id) VALUES ('Salesperson', 8000, 1);

INSERT INTO roles (title, salary, department_id) VALUES ('Engineering Lead', 10000, 2);

INSERT INTO roles (title, salary, department_id) VALUES ('Engineer', 8000, 2);

INSERT INTO roles (title, salary, department_id) VALUES ('Finance Lead', 10000, 3);

INSERT INTO roles (title, salary, department_id) VALUES ('Finances', 8000, 3);

INSERT INTO roles (title, salary, department_id) VALUES ('Legal Lead', 10000, 4);

INSERT INTO roles (title, salary, department_id) VALUES ('Legalperson', 8000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Gulcin', 'Dedeoglu', 4, NULL);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('John', 'Smith', 1, NULL);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Jon', 'Doe', 5, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Sarah', 'Lein', 2, 2);
