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
        choices: ["View Product Sales by Department","Create New Department","quit"]
        }
    ]).then(function(answers) {
        
        switch(answers.options) {
            case "View Product Sales by Department":
                viewProductSales();
                break;
            case "Create New Department":
                addDepartment();
                break;
            case "quit":
                connection.end();
                break;
        }
    });

}

function viewProductSales() {
    var query="SELECT d.department_id, d.department_name, d.over_head_costs, \
    ifnull(sum(p.product_sales),0) product_sales, \
    ifnull(sum(p.product_sales-d.over_head_costs),0) total_profit FROM \
    products p right join departments d on p.department_id = d.department_id \
    group by d.department_id order by d.department_id";
    connection.query(query, function(err, res) {
        if (err) throw err;
  
        const table = new Table({
            head: ['Department ID', 'Department Name', 'Overhead Costs','Product Sales','Total Profit']
          , colWidths: [10, 30, 20,15,15]
        });


        for (var i=0; i<res.length; i++) {
            table.push(
                [res[i].department_id,res[i].department_name,"$"+res[i].over_head_costs,"$"+res[i].product_sales,res[i].total_profit]
            );
               
        }
        console.log(table.toString());
        afterConnection();
    });
}





function addDepartment() {

    console.log("Enter Information for new Department");
    inquirer.prompt([
        {
            type: "input",
            message: "Enter Department ID",
            name: "id"
        },
        {
            type: "input",
            message: "Enter Department Name",
            name: "name"
        },
        {
            type: "input",
            message: "Enter Overhead Costs",
            name: "cost"
        }
    ]).then(function(answers) {
        connection.query("INSERT INTO departments (department_id, department_name, over_head_costs) VALUES (?,?,?)",[
            answers.id, answers.name, answers.cost
        ],function(err, res) {
            if (err) throw err;
            if(res.affectedRows>=1) 
                console.log("Department Added successfully");
            else
                console.log("An error occurred");
            
            afterConnection();
        });
    });
   
}