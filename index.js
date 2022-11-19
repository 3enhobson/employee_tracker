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
        }
    });
}

//View All Employees function
function viewEmployees() {
    db.allEmployees()
    .then(([rows]) => {
        let employees = rows;
        console.log('\n');
        console.table(employees);
    })
    .then(() => init());
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