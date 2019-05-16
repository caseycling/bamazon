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
            if (answer.managerChoice === "View products for sale") {
                displayInventory();
            }
            else if (answer.managerChoice === "View low inventory") {
                displayLowInventory();
            }
            else if (answer.managerChoice === "Add to inventory") {
                console.log("yess")
            }
            else (answer.managerChoice === "Add new product")
            console.log("yess")
        })
}

//Function which logs all the information from the products table in the MySQL database
function displayInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        //Obligatory welcome message
        console.log("-------------------------------------------------------")
        console.log("Here you are, m'lord")
        //Loop through each item in the products table
        for (var i = 0; i < res.length; i++) {
            console.log("-------------------------------------------------------")
            console.log("Product name: " + res[i].product_name);
            console.log("Department: " + res[i].department_name);
            console.log("Price: $" + res[i].price);
            console.log("Product ID: " + res[i].item_id);
            console.log("Quantity: " + res[i].stock_quantity)
        }
    })
}

function displayLowInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        //Obligatory welcome message
        console.log("-------------------------------------------------------")
        console.log("Here you are, m'lord")
        //Loop through each item in the products table
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity < 5) {
                console.log("-------------------------------------------------------")
                console.log("Product name: " + res[i].product_name);
                console.log("Department: " + res[i].department_name);
                console.log("Price: $" + res[i].price);
                console.log("Product ID: " + res[i].item_id);
                console.log("Quantity: " + res[i].stock_quantity)
            } else {
                console.log("-------------------------------------------------------")
                console.log(res[i].product_name + "has plenty in stock")
            }
        }
    })
}


        function endConnection() {
            connection.end();
        }
