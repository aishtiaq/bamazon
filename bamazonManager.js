var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});


connection.connect(function(err) {
  if (err) throw err;
  afterConnection();
});

function afterConnection() {

    inquirer.prompt([
        {
        type: "list",
        message: "Select an Option",
        name: "options",
        choices: ["View Products for Sale","View Low Inventory","Add to Inventory","Add New Product","quit"]
        }
    ]).then(function(answers) {
        
        switch(answers.options) {
            case "View Products for Sale":
                viewProducts();
                break;
            case "View Low Inventory":
                viewLowInventory();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                addProduct();
                break;
            case "quit":
                connection.end();
                break;
        }
    });

}

function viewProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        const table = new Table({
            head: ['Item ID', 'Product Name', 'Price', 'Quantity']
          , colWidths: [10, 40, 10, 10]
        });

        
        for (var i=0; i<res.length; i++) {
            table.push(
                [res[i].item_id,res[i].product_name,"$"+res[i].price,res[i].stock_quantity]
            );
        }
    
        console.log(table.toString());

        afterConnection();
    });
}

function viewLowInventory() {
    connection.query("SELECT * FROM products where stock_quantity <=5 ",function(err, res) {
        if (err) throw err;
        const table = new Table({
            head: ['Item ID', 'Product Name', 'Price', 'Quantity']
          , colWidths: [10, 40, 10, 10]
        });

        
        for (var i=0; i<res.length; i++) {
            table.push(
                [res[i].item_id,res[i].product_name,"$"+res[i].price,res[i].stock_quantity]
            );
        }
    
        console.log(table.toString());
        afterConnection();
    });
}

function addInventory() {

   
    console.log("Enter ItemID and Quantity to add Inventory")
    inquirer.prompt([
        {
        type: "input",
        message: "Enter Product ID",
        name: "id"
        },
        {
        type: "input",
        message: "Enter Quantity",
        name: "quantity"
        }
    ]).then(function(answers) {
        connection.query("UPDATE products set stock_quantity=stock_quantity+"+answers.quantity+" where item_id="+answers.id,function(err, res) {
            if (err) throw err;

            if(res.affectedRows>=1) 
                console.log("Inventory Updated successfully");
            else
                console.log("An error occurred");
            
            afterConnection();
        });
    });
  
}

function addProduct() {

    connection.query("SELECT * FROM departments", function(err, res) {
        if (err) throw err;
       
    
        var departments=[];
        for (var i=0; i<res.length; i++) {
            
            var department = {
                name: res[i].department_name,
                value: res[i].department_id
            }
            departments.push(department);
        }
    
    
    console.log("Enter Information for new Product")
    inquirer.prompt([
        {
            type: "input",
            message: "Enter Product ID",
            name: "id"
        },
        {
            type: "input",
            message: "Enter Product Name",
            name: "name"
        },
        {
            type: "list",
            message: "Enter Department ID",
            name: "dept",
            choices: departments
        },
        {
            type: "input",
            message: "Enter Price per Unit",
            name: "price"
        },
        {
            type: "input",
            message: "Enter Quantity",
            name: "quantity"
        }
    ]).then(function(answers) {
        connection.query("INSERT INTO products (item_id, product_name, department_id, price, stock_quantity) VALUES (?,?,?,?,?)",[
            answers.id, answers.name, answers.dept, answers.price, answers.quantity
        ],function(err, res) {

            if (err) throw err;

            if(res.affectedRows>=1) 
                console.log("Inventory Added successfully");
            else
                console.log("An error occurred");
            
            afterConnection();
        });
    });
        
});
}