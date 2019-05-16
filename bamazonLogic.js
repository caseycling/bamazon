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

connection.connect(function (err) {
  if (err) {
    throw err;
  }
  console.log("connected as id " + connection.threadId);

  itemDisplay();
});

//Function which logs all the information from the products table in the MySQL database
function itemDisplay() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    //Obligatory welcome message
    console.log("-------------------------------------------------------")
    console.log("Welcome to Bamazon! The originally-named, totally unique online store!")
    //Loop through each item in the products table
    for (var i = 0; i < res.length; i++) {
      console.log("-------------------------------------------------------")
      console.log("Product name: " + res[i].product_name);
      console.log("Department: " + res[i].department_name);
      console.log("Price: $" + res[i].price);
      console.log("Product ID: " + res[i].item_id);
      if (res[i].stock_quantity < 10) {
        console.log("Less than 10 remaining!")
      }
    }

    selectItem();
  });
}

//variable to save selected item
var selectedItem;

//Prompt which asks user which id of the item they'd like to buy and the quantity
function selectItem() {
  inquirer.prompt({
    name: "productId",
    type: "input",
    message: "What is the id of the product you would like to purchase?"
  })
    //Take the productId answer and use it to query the database under id
    //If it is not found, alert the user to enter a valid id
    .then(function (answer) {
      connection.query("SELECT * FROM products", function (err, res) {
        if (err)
          throw err;
          // console.log("Please enter a valid Id")
          // selectItem();

        //Loop through the results from MySQL and compare them with the productId answer given in inquirer
        for (var i = 0; i < res.length; i++) {
          //If any item_id matches the productId, set chosenItem equal to that product
          if (res[i].item_id === parseInt(answer.productId)) {
            selectedItem = res[i];
          }
        }
        selectQuantity();
      })
    })
}

//Varible to save customer total in global scope
var customerTotal = 0;

//Function that verifies customer quantity
function selectQuantity() {
  inquirer.prompt({
    name: "quantity",
    type: "input",
    message: "How many would you like to purchase"
  })
    .then(function (answer) {
      
      //Set customer total
      customerTotal = (answer.quantity * selectedItem.price);
      //Set new quantity
      var newQuantity = (selectedItem.stock_quantity - answer.quantity)

      //If the customer requests more of the item than we have left, alert them of how much of the product is remaining
      if (selectedItem.stock_quantity < answer.quantity) {
        console.log("Sorry, we only have " + selectedItem.stock_quantity + " left of that product")
        selectQuantity();

      //If customer chooses none, fire purchase more function
      } else if (parseInt(answer.quantity) === 0) {
        console.log("No worries. It's okay to change your mind")
        purchaseMore();

      } else {
        //Confirm the customer would like to make the purchase
        inquirer.prompt({
          name: "verify",
          type: "confirm",
          message: "Your total comes to $" + (customerTotal) + ". Would you like to make this purchase?"
        })

          //If they answer yes, thank them and call the purchaseMore function
          .then(function (answer) {
            if (answer.verify === true) {

              //Otherwise, update the database by subtracting the customers request from the stock_quantity
              connection.query("UPDATE products SET ? WHERE ?",
                [
                  //Set stock_quantity equal to the newQuantity
                  {
                    stock_quantity: newQuantity
                  },
                  //Where the item_id is the chosenItem.
                  {
                    item_id: selectedItem.item_id
                  }
                ])
              console.log("Thank you for shopping!")
              purchaseMore();
              //Otherwise, redirect them to the selectQuantity function
            } else {
              console.log("Okay, let's try this again")
              selectQuantity();
            }
          })
      }
    })
}

//Ask the user if they would like to make another purchase
function purchaseMore() {
  inquirer.prompt({
    name: "purchaseMore",
    type: "confirm",
    message: "Would you like to make another purchase?"
  })
    .then(function (answer) {
      //If yes, then call the purchaseItem function again
      console.log()
      if (answer.purchaseMore === true) {
        itemDisplay();
        //Otherwise, call the endConnection function
      } else if (answer.purchaseMore === false) {
        endConnection();
      }
    })
}

//Function ends connection 
function endConnection() {
  console.log("Thank you for choosing Bamazon!") 
  connection.end();
}
