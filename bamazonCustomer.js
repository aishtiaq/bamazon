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

//import Table from 'cli-table';

function afterConnection(){


    console.log("Items available in the inventory...");
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        const table = new Table({
            head: ['Item ID', 'Product Name', 'Price']
          , colWidths: [10, 50, 10]
        });

        for (var i=0; i<res.length; i++) {
            table.push(
                [res[i].item_id,res[i].product_name,res[i].price]
            );
        }
    
        console.log(table.toString());

        console.log("Enter product ID and Quantity");
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
            
            connection.query("SELECT * FROM products where ?",
            [
              {
                item_id: answers.id
              }
            ], function(err, res) {
                if (err) throw err;
                if(res[0].stock_quantity >= answers.quantity) {
                    connection.query("UPDATE products set ? where ?",[
                        {
                            stock_quantity: res[0].stock_quantity-answers.quantity,
                            product_sales: res[0].product_sales + (answers.quantity*res[0].price)
                        },
                        {
                            item_id: answers.id
                        }
                    ],function(err, update_res) {
                        console.log("Item purchased successfully. Your cost is $"+answers.quantity*res[0].price);
                        connection.end();
                    });
                    
                }  else {
                    console.log("Insufficient Quantity");
                    afterConnection();
                }

                
            });
            
        });
        
    });
}

