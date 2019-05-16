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

//Function lists options for manager
function managerOptions() {
    inquirer.prompt({
        name: "managerChoice",
        type: "list",
        message: "Hello corporate overlord. What would you like to do today?",
        choices: [
        "View products for sale", 
        "View low inventory", 
        "Add to inventroy", 
        "Add new product"
        ]
    })
    .then(function (answer) {
        if(answer.managerChoice === "View products for sale") {
            displayInventory();
        }
        else if(answer.managerChoice === "View low inventory") {
            console.log("yess")
        }
        else if(answer.managerChoice === "Add to inventory") {
            console.log("yess")
        }
        else (answer.managerChoice === "Add new product") 
            console.log("yess")
    })
}




function endConnection() {
    connection.end();
}
