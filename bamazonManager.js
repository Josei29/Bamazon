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

menu();

function menu() {
    inquirer.prompt([
        {
            name: "option",
            message: "Please Select An Option",
            type: "list",
            choices: [
                "View Products For Sale",
                "View Low Inventory",
                "Add To Inventory",
                "Add New Product",
                "Exit"
            ]
        }
    ]).then(function(answer) {
        var op = answer.option;
        option(op);
    }); // .then
} // function menu

function option(op) {
    if (op === "View Products For Sale") {
        view();
    } else if (op === "View Low Inventory") {
        low();
    } else if (op === "Add To Inventory") {
        addInventory();
    } else if (op === "Add New Product") {
        addNew();
    } else if (op === "Exit") {
        console.log("See You Later!");
        connection.end();
        return;
    }
} // function option

function view() {
    connection.query("SELECT * FROM products WHERE stock_quantity > 0", function(err, res) {
        if (err) throw err;
        console.log("************************************");
        console.log("");
        // Log all results
        for (var i = 0; i < res.length; i++) {
            console.log("ID --------> " + res[i].id);
            console.log("Name ------> " + res[i].product_name);
            console.log("Price -----> " + res[i].price);
            console.log("Quantity --> " + res[i].stock_quantity)
            console.log("");
        }
        console.log("************************************");
        menu();
    }); // connection.query
} // function view

function low() {
    connection.query("SELECT * FROM products WHERE stock_quantity <= 5", function(err, res) {
        if (err) throw err;
        console.log("************************************");
        console.log("");
        // Log all results
        for (var i = 0; i < res.length; i++) {
            console.log("ID --------> " + res[i].id);
            console.log("Name ------> " + res[i].product_name);
            console.log("Price -----> " + res[i].price);
            console.log("Quantity --> " + res[i].stock_quantity);
            console.log("");
        }
        console.log("************************************");
        menu();
    }); // connection.query
} // function low

function addInventory() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log("************************************");
        console.log("");
        // Log all results
        for (var i = 0; i < res.length; i++) {
            console.log("ID --------> " + res[i].id);
            console.log("Name ------> " + res[i].product_name);
            console.log("Price -----> " + res[i].price);
            console.log("Quantity --> " + res[i].stock_quantity);
            console.log("");
        }
        console.log("************************************");

        inquirer.prompt([
            {
                name: "item",
                message: "Please Select The Item ID",
                type: "number"
            },
            {
                name: "quantity",
                message: "How Many Would You Like To Add",
                type: "number"
            }       
        ]).then(function(answer) {
            if (answer.item && answer.quantity) {
                var item = answer.item;
                var quantity = answer.quantity;
                
                connection.query("UPDATE products SET ? WHERE ?", 
                [
                    {
                        stock_quantity: quantity
                    }, 
                    {
                        id: item
                    }
                ] , function(err, res) {
                    if (err) {
                        console.log("Please Try Again");
                        menu();
                    } // if
                    
                    console.log("Updating... ");
                    console.log("");
                    console.log("Success!"); 
                    connection.end();
                }); // connection.query
            } else {
                console.log("Please Try Again");
                menu();
            } // else
        }); // .then
    }); // connection.query
} // function addInventory

function addNew() {
    inquirer.prompt([
        {
            name: "name",
            message: "Please Enter The Item Name",
            type: "input"
        },
        {
            name: "department",
            message: "Please Enter The Department Name",
            type: "input"
        },
        {
            name: "price",
            message: "Please Enter The Item Price",
            type: "number"
        },
        {
            name: "quantity",
            message: "Please Enter The Item Quantity",
            type: "number"
        }       
    ]).then(function(answer) {
        if (answer.name && answer.department && answer.price && answer.quantity) {
            var name = answer.name;
            var department = answer.department;
            var price = answer.price;
            var quantity = answer.quantity;
            newRow(name, department, price, quantity);
        } else {
            console.log("Please Try Again");
            menu();
        }
    }); // .then
} // function addNew

function newRow(name, department, price, quantity) {
    var values = {product_name: name, department_name: department, price: price, stock_quantity: quantity};
    connection.query("INSERT INTO products SET ?", values, function(err, res) {
        if (err) throw err;
        console.log("New Item Added!");
        menu();
    }); // connection.query
} // function newRow