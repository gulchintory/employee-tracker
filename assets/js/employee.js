const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const cTable = require('console.table');
const Department = require('./department');
const Role = require('./role');

// Connect to database
const db = mysql.createPool(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: '',
      database: 'employee_tracker_db'
    },
    console.log(`Connected to the employee_tracker_db database.`)
  );

class Employee {
    constructor(first_name, last_name, role_id, manager_id) {
        this.id = null;
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;
    }

    async viewAll() {
        const rows = await db.query('SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, " ", m.last_name) AS manager FROM employees e LEFT JOIN roles r ON r.id = e.role_id LEFT JOIN departments d ON d.id = r.department_id LEFT JOIN employees m ON m.id = e.manager_id');
        if (rows[0].length !== 0) {
            console.table(rows[0]);
            return rows[0];
        }
    };

    insertEmployee() {
        return inquirer.prompt([
            {
                type: 'input',
                name: 'employeeFirstName',
                message: "What is the employee's first name"
            },
            {
                type: 'input',
                name: 'employeeLastName',
                message: "What is the employee's last name"
            },
            {
                type: 'number',
                name: 'roleId',
                message: "What is role id of the employee?"
            },
        ])
        .then(async res1 => {

            const employee = new Employee();
            const viewEmployees = await employee.viewAll()

            return inquirer.prompt([
                {
                    type: 'number',
                    name: 'managerId',
                    message: 'What is the ID of the manager?'
                }
            ])
            .then(async res2 => {
                if(isNaN(res2.managerId)) {
                    res2.managerId = null;
                }
                const employee = new Employee(res1.employeeFirstName, res1.employeeLastName, res1.roleId, res2.managerId);
                
                try {
                    const newEmployee = await db.query('INSERT INTO employees SET ?', employee);
                    return employee;
                } catch (err) {
                    console.log(err);
                    return err;
                }
            })
        })
    };

    updateEmployeeRole() {
        return inquirer.prompt([
            {
                type: 'number',
                name: 'id',
                message: 'What is the id of the employee you would like to edit?'
            }
        ])
        .then(async res => {
            const role = new Role();
            const viewRoles = await role.viewAll()
            return inquirer.prompt([
                {
                    type: 'input',
                    name: 'roleId',
                    message: (res) => `What is the new role id?`
                },
            ]).then(async resRole => {
                try {
                    const updateRole = await db.query(`UPDATE employees SET role_id = ? WHERE id = ?`, [resRole.roleId, res.id]);
                    return res.roleField;
                } catch (err) {
                    console.log(err);
                    return err;
                }
            })
            
        })
    };

}

module.exports = Employee;