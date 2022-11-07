const inquirer = require('inquirer');

const Department = require('./assets/js/department');
const Employee = require('./assets/js/employee');
const Role = require('./assets/js/role');

console.clear();

console.log("\n-----EMPLOYEE------\n-----MANAGER-----\n\n");

generateApp();

function generateApp() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'generateApp',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Quit']
        }
    ])
    .then((userChoice) => {
        switch (userChoice.generateApp) {
            case 'View all departments':
                console.log('\n');
                viewDepartments();
                break;
            case 'View all roles':
                console.log('\n');
                viewRoles();
                break;
            case 'View all employees':
                console.log('\n');
                viewEmployees();
                break;
            
            case 'Add a department':
                console.log('\n');
                addDepartment();
                break;

            case 'Add a role':
                console.log('\n');
                addRole();
                break;
            
            case 'Add an employee':
                console.log('\n');
                addEmployee();
                break;
            
            case 'Update an employee role':
                console.log('\n');
                editEmployeeRole();
                break;

            default:
                console.log('\Quit!\n\n');
                process.exit();
                break;
        }
    })
}

async function viewDepartments() {
    const department = new Department();
    const viewDepartments = await department.viewAll();

    generateApp();
}

async function addDepartment() {
    const department = new Department();
    const newDepartment = await department.insertDepartment();

    console.log(`\ Added ${newDepartment.name} to the department database!\n`);

    generateApp();
}


async function viewRoles() {
    const role = new Role();
    const viewRoles = await role.viewAll();

    generateApp();
}

async function addRole() {
    const role = new Role();
    const newRole = await role.insertRole();
    console.log(`\ Added ${newRole.title} to the role database!\n`);
    generateApp();
}


async function viewEmployees() {
    const employee = new Employee();
    const viewEmployees = await employee.viewAll();

    generateApp();
}

async function addEmployee() {
    const employee = new Employee();
    const role = new Role();

    const viewRoles = await role.viewAll();
   
    const newEmployee = await employee.insertEmployee();

    console.log(`\ Added ${newEmployee.first_name} ${newEmployee.last_name} to the employee database!\n`);
    
    generateApp();
}

async function editEmployeeRole() {
    const employee = new Employee();
    const viewEmployees = await employee.viewAll();
    const updateEmployeeRole = await employee.updateEmployeeRole();
    generateApp();
}
