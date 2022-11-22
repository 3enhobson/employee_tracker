const inquirer = require('inquirer');
const db = require("./db");
const fs = require('fs');
require("console.table");
const figlet = require('figlet');



const initChoicesArray = [
    'View All Emplyees', 
    'View All Departments', 
    'View All Roles', 
    'Add Employee',
    'Add A Department', 
    'Add A Role', 
    'Update An Employee Role',
    'Quit'
];

function init() {
    inquirer.prompt([
        {
            type: 'list',
            name: "userChoice",
            message: 'What would you like to do?',
            choices: initChoicesArray,
        },
    ]).then((answer) => {
        let choice = answer.userChoice;
        switch (choice) {
            case 'View All Emplyees':
                viewEmployees();
                break;

            case 'View All Departments':
                viewDepartments();
                break;

            case 'View All Roles':
                viewRoles();
                break;    

            case 'Add Employee':
                addEmployee();
                break;  
                
            case 'Add A Department':
                addDepartment();
                break;
                
            case 'Add A Role':
                addRole();
                break; 
                
            case 'Update An Employee Role':
                updateRole();
                break;

            case 'Quit':
                quit();
                break;       
        }
    });
}

function viewEmployees() {
    db.allEmployees()
    .then(([rows]) => {
        let employees = rows;
        console.log('\n');
        console.table(employees);
    })
    .then(() => init());
}

function viewDepartments() {
    db.allDepartments()
    .then(([rows]) => {
        let departments = rows;
        console.log("\n");
        console.table(departments);
    })
    .then(() => init());
}

function viewRoles() {
    db.allRoles()
    .then(([rows]) =>{
        let roles = rows;
        console.log('\n');
        console.table(roles);
    })
    .then(() => init());
}

function addEmployee() {
   inquirer.prompt([
    {
        name: "first_name",
        message: "Enter the employees first name:"
    },
    {
        name: "last_name",
        message: "Enter the employees last name:"
    }
   ])
   .then(res => {
      let firstName = res.first_name;
      let lastName = res.last_name;

      db.allRoles().then(([rows]) => {
        let roles = rows;
        const roleOptions = roles.map(({id, title}) => ({
            name: title,
            value: id
        }));

        inquirer.prompt({
            type: "list",
            name: "roleId",
            message: "What role would you like to assign to this employee?",
            choices: roleOptions
        })
        .then(res => {
            let roleId = res.roleId;

            db.allEmployees().then(([rows]) => {
                let employees = rows;
                const managers = employees.map(({id, first_name, last_name}) => ({
                    name: `${first_name} ${last_name}`,
                    value: id
                }));
                managers.unshift({name:"none", value: null});

                inquirer.prompt({
                    type: "list",
                    name: "managerId",
                    message: "Who manages this employee?",
                    choices: managers
                }).then(res => {
                    let employee = {
                        first_name: firstName,
                        last_name: lastName,
                        role_id: roleId,
                        manager_id: res.managerId
                    }

                db.addEmployee(employee);
                }).then(() => init())
            })
        })
      })

   })

}

function addDepartment() {
    inquirer.prompt([
        {
            name: "name",
            message: "Name the department you would like to add"
        }
    ]).then(res => {
        let name = res;
        db.addDepartment(name).then(() => init())
    })
}

function addRole() {
    db.allDepartments().then(([rows]) => {
        let departments = rows;
        const departmentOptions = departments.map(({id, name}) => ({
            name: name,
            value: id
        }));
        inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "which role would you like to add?"
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary for this role?"
            },
            {
                type: "list",
                name: "department_id",
                message: "what department does this role fall under?",
                choices: departmentOptions
            }
        ]).then(role => {
            db.addRole(role).then(() => init())
        })
    })
}

function updateRole() {
    db.allEmployees().then(([rows]) => {
        let employees = rows;
        const employeeOptions = employees.map(({id, first_name, last_name}) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }))
        inquirer.prompt([
            {
                type: "list",
                name: "employeeId",
                message: "Which employee would you like to update?",
                choices: employeeOptions
            }
        ])
            .then(res => {
                let employeeId = res.employeeId;
                db.allRoles().then(([rows]) => {
                    let roles = rows;
                    const roleOptions = roles.map(({id, title}) => ({
                        name: title,
                        value: id
                    }))
                    inquirer.prompt([
                        {
                            type: "list",
                            name: "roleId",
                            message: "Which role would you like to assign to this employee?",
                            choices: roleOptions
                        }
                    ]).then(res => db.updateRole(employeeId, res.roleId))
                    .then(() => init())
                })
            })
        
    })
}

function quit() {
    process.exit();
}









figlet('EMPLOYEE \n TRACKER', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
    init();
});