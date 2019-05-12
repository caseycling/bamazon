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
  
connection.connect(function(err) {
    if (err) {
      throw err;
    }
    console.log("connected as id " + connection.threadId);
    afterConnection();
});
//Function which logs all the information from the products table in the MySQL database
function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(res);
        purchaseItem();
        connection.end();
    });
}

//Prompt which asks user which id of the item they'd like to buy and the quantity
function purchaseItem() {
    inquirer
      .prompt([
        {
            name: "productId",
            type: "input",
            message: "What is the id of the production you would like to purchase?",
        },
        {
            name: "quantity",
            type: "input",
            message: "Please enter the amount you would like to purchase"
        }
    ])
    .then(function(answer) {
        console.log(answer.productId)
        console.log(answer.quantity)
    })
}


