var mysql = require("mysql");
var inquirer = require("inquirer");

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


function afterConnection(){


    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log("Item ID \t Product Name \t\t Price");
        for (var i=0; i<res.length; i++) {
            console.log(res[i].item_id+"\t\t"+res[i].product_name+"\t\t"+res[i].price);
            
        }
    
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

                console.log(res);

                if(res[0].stock_quantity >= answers.quantity) {
                    connection.query("UPDATE products set ? where ?",[
                        {
                            stock_quantity: res[0].stock_quantity-answers.quantity
                        },
                        {
                            item_id: answers.id
                        }
                    ],function(err, update_res) {
                        console.log("Item purchase successfully. Your cost is $"+answers.quantity*res[0].price);
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

