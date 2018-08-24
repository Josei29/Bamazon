var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "",

  // Your password
  password: "",
  database: "bamazonDB"
}); // connection

connection.connect(function(err) {
    console.log("Loading...");
    if (err) throw err;
    console.log("Welcome To Bamazon!");
    showProducts();
}); // connection.connect

function showProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log("************************************");
        console.log("");
        // Log all results
        for (var i = 0; i < res.length; i++) {
            console.log("ID -----> " + res[i].id);
            console.log("Name ---> " + res[i].product_name);
            console.log("Price --> " + res[i].price);
            console.log("");
        }
        console.log("************************************");
        ask();
    }); // connection.query
} // function showProducts

function ask() {
    inquirer.prompt([
        {
            name: "item",
            message: "Please Select The Item ID You Would Like To Buy",
            type: "number"
        },
        {
            name: "quantity",
            message: "How Many Would You Like To Buy",
            type: "number"
        }       
    ]).then(function(answer) {
        if (answer.item && answer.quantity) {
            var item = answer.item;
            var quantity = answer.quantity;
            checkItem(item, quantity);
        } else {
            ask();
        }
    }); // .then
} // function ask

function checkItem(item, quantity) {
    connection.query("Select * From products WHERE ?", { id: item } , function(err, res) {
        if (err) {
            console.log("Please Try Again");
            ask();
        }
        
        if (res[0].stock_quantity >= parseInt(quantity)) {
            console.log("");
            console.log("Great!");
            console.log("");
            var q = res[0].stock_quantity;
            update(item, quantity, q);
        } else {
            console.log("Insufficient quantity!");
            console.log("Please Try Again Next Time!");
            connection.end();
        }
    }); // connection.query
} // function checkItem

function update(item, quantity, q) {
    var newQuantity = q - quantity; 
    connection.query("UPDATE products SET ? WHERE ?", 
    [
        {
            stock_quantity: newQuantity
        }, 
        {
            id: item
        }
    ], function(err, res) {
            if (err) throw err;
            pay(item, quantity);
    }); // function (err, res)  
} // function update

function pay(item, quantity) {
    var total = 0;
    connection.query("SELECT * FROM products WHERE ?", {id: item} , function(err, res) {
        if (err) throw err;
        total = res[0].price * quantity;
        console.log("************************************");
        console.log("");
        console.log("Your Total Will Be --> $" + total);
        console.log("Thank You So Much!");
        console.log("");
        console.log("************************************");

        sales(item, total);
    }); // connection.query
}

function sales(item, total) {
    connection.query("SELECT * FROM products WHERE ?", {id: item} , function(err, res) {
        if (err) throw err;
        
        var sales = res[0].product_sales + total;

        salesUpdate(item, sales);
    }); // connection.query
}

function salesUpdate(item, sales) {
    connection.query("UPDATE products SET ? WHERE ?", 
    [
        {
            product_sales: sales
        }, 
        {
            id: item
        }
    ], function(err, res) {
            if (err) throw err;
            connection.end();
    }); // function (err, res)  
}
