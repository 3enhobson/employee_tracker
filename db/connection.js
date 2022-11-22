const mysql = require("mysql2");
require('dotenv').config()

const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: process.env.DB_PASSWORD,
        database: "employee_db"
    },
    console.log(`Connected to the employees_db database.`)
);

connection.connect(function (err) {
    if (err) throw err;
  });
  
  
  module.exports = connection;