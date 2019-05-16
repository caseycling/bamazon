//Require MySQL package
var mysql = require("mysql")
//Require inquirer
var inquirer = require("inquirer")

//Create connection with mysql
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "$3ndNudes",
  database: "bamazon_db"
});

//Connect and use callback with MySQL and call managerOptions function
connection.connect(function (err) {
    if (err) {
      throw err;
    }
    console.log("connected as id " + connection.threadId);
  
    managerOptions();
});

