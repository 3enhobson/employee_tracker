const inquirer = require('inquirer');

const fs = require('fs')

function init() {
    inquirer([
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: 'View all employees'
        }
    ])
}






var figlet = require('figlet');

figlet('EMPLOYEE \n TRACKER', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});