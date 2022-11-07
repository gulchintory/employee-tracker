const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const cTable = require('console.table');
const Department = require('./department');

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

class Role {
    constructor(title, salary, department_id) {
        this.id = null;
        this.title = title;
        this.salary = salary;
        this.department_id = department_id;
    }


    async getRole(id) {
        try {
            const rows = await db.query('SELECT * FROM roles WHERE id = ?', id);
            return rows[0];
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    async viewAll() {
        const rows = await db.query('SELECT r.id, r.title, r.salary, d.name AS department FROM roles r JOIN departments d ON r.department_id = d.id');
        if (rows[0].length !== 0) {
            console.table(rows[0]);
            return rows[0];
        }

    };

    insertRole() {

        return inquirer.prompt([
            {
                type: 'input',
                name: 'roleTitle',
                message: 'What is the name of the role?'
            },
            {
                type: 'number',
                name: 'roleSalary',
                message: 'What is the salary of the role?'
            },
            {
                type: 'input',
                name: 'departmentName',
                message: 'Which department does the role belong to?'
            },
            
            
        ])
        .then(async res => {

            const rows = await db.query(`SELECT id FROM departments WHERE name = '${res.departmentName}'`);

            let departmentId = 0;
            if(rows && rows[0] && rows[0][0].id) {
                departmentId = rows[0][0].id;
            }
            else {
                console.log('Department cannot be found!');
                return;

            }

            const role = new Role(res.roleTitle, res.roleSalary, departmentId);
            
            
            await db.query('INSERT INTO roles SET ?', role);

            return role;
            
        })
    };


}

module.exports = Role;