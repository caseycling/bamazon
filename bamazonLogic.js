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
    });
}

//Prompt which asks user which id of the item they'd like to buy and the quantity
function purchaseItem() {
    inquirer
      .prompt([
          {
            name: "productId",
            type: "input",
            message: "What is the id of the product you would like to purchase?"
          },
          {
            name: "quantity",
            type: "input",
            message: "How many would you like to purchase"
          }
        ])
    //Take the productId answer and use it to query the database under id
    //If it is not found, alert the user to enter a valid id
    .then(function(answer) {
        connection.query("SELECT * FROM products", function(err, res) {
            if(err)  
            throw err;
            var quantity = answer.quantity;
            var chosenItem;
            for (var i = 0; i < res.length; i++) {
              if (res[i].item_id === parseInt(answer.productId)) {
                chosenItem = res[i];
                console.log(chosenItem)
              }
            }
        })
    connection.end();
   }) 
}

//Ask user how much of the specified product they wish to purchase
//Query bamazon database
//If the user enters too many, tell them how many are left and ask them to choose a lesser amount
//Otherwise, subtract the amount from the number remaining
//Update the database with correct amounts of inventory
//Tell the user the total cost of their purchase
