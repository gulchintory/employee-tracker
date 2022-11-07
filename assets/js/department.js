const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const cTable = require('console.table');

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
  

class Department {
    constructor(name) {
        this.id = null;
        this.name = name;
    }

    async getDepartment(id) {
        try {
            const rows = await db.query('SELECT * FROM departments WHERE id = ?', id);
            return rows[0];
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    async viewAll() {
        console.log('heyeee')
        try {
            const rows = await db.query('SELECT * FROM departments');
            if (rows[0].length !== 0) {
                console.log('***** Departments *****\n');
                console.table(rows[0]);
                return;
            } else {
                console.log('No departments defined\n');
                return 0;
            }
        } catch (err) {
            console.log(err);
            return err;
        }

    };

    insertDepartment() {
        return inquirer.prompt([
            {
                type: 'input',
                name: 'departmentName',
                message: 'What is the name of the department?'
            }
        ])
        .then(async res => {
            const department = new Department(res.departmentName);
            
            try {
                const newDepartment = await db.query('INSERT INTO departments SET ?', department);
                return department;
            } catch (err) {
                console.log(err);
                return err;
            }
        })
    };

}

module.exports = Department;