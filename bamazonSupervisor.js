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
                "View Products Sales By Department",
                "Exit"
            ]
        }
    ]).then(function(answer) {
        var op = answer.option;
        option(op);
    }); // .then
} // function menu

function option(op) {
    if (op === "View Products Sales By Department") {
        view();
    } else if (op === "Exit") {
        console.log("See You Later!");
        connection.end();
        return;
    }
} // function option

function view() {
    connection.query("SELECT * FROM products RIGHT JOIN departments ON products.department_name = departments.department_name", function(err, res) {
        if (err) throw err;

        var totalClothing = 0;
        var totalShoes = 0;
        var totalJewelry = 0;
        var totalComputers = 0;
        var totalGaming = 0;
        var totalMobiles = 0;
        // Log all results
        for (var i = 0; i < res.length; i++) {
            if (res[i].department_name === "Clothing") {
                totalClothing += res[i].product_sales;
            } else if (res[i].department_name === "Shoes") {
                totalShoes += res[i].product_sales;
            } else if (res[i].department_name === "Jewelry") {
                totalJewelry += res[i].product_sales;
            } else if (res[i].department_name === "Computers") {
                totalComputers += res[i].product_sales;
            } else if (res[i].department_name === "Gaming") {
                totalGaming += res[i].product_sales;
            } else if (res[i].department_name === "Mobiles") {
                totalMobiles += res[i].product_sales;
            }
        }
        
        showResults(totalClothing, totalShoes, totalJewelry, totalComputers, totalGaming, totalMobiles);
    }); // connection.query
} // function view

function showResults(totalClothing, totalShoes, totalJewelry, totalComputers, totalGaming, totalMobiles) {
    connection.query("SELECT * FROM departments", function(err, res) {
        if (err) throw err;

        console.log("************************************");
        console.log("");
        for (var i = 0; i < res.length; i++) {
            console.log("ID ---------------> " + res[i].department_id);
            console.log("Name -------------> " + res[i].department_name);
            console.log("Over Head Costs --> " + res[i].over_head_costs);
            var profit = 0;
            if (res[i].department_name === "Clothing") {
                profit = totalClothing - res[i].over_head_costs;
                console.log("Sales ------------> " + totalClothing);
                console.log("Total Profit -----> " + profit); 
            } else if (res[i].department_name === "Shoes") {
                profit = totalShoes - res[i].over_head_costs;
                console.log("Sales ------------> " + totalShoes);
                console.log("Total Profit -----> " + profit);
            } else if (res[i].department_name === "Jewelry") {
                profit = totalJewelry - res[i].over_head_costs;
                console.log("Sales ------------> " + totalJewelry);
                console.log("Total Profit -----> " + profit);
            } else if (res[i].department_name === "Computers") {
                profit = totalComputers - res[i].over_head_costs;
                console.log("Sales ------------> " + totalComputers);
                console.log("Total Profit -----> " + profit);
            } else if (res[i].department_name === "Gaming") {
                profit = totalGaming - res[i].over_head_costs;
                console.log("Sales ------------> " + totalGaming);
                console.log("Total Profit -----> " + profit);
            } else if (res[i].department_name === "Mobiles") {
                profit = totalMobiles - res[i].over_head_costs;
                console.log("Sales ------------> " + totalMobiles);
                console.log("Total Profit -----> " + profit);
            }
            console.log("");
        } // for loop
        console.log("************************************");
        
        menu();
    }); // connection.query
} // function showResults