DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INTEGER primary KEY,
    product_name VARCHAR(250) NOT NULL,
    department_id INTEGER NOT NULL,
    price FLOAT NOT NULL,
    stock_quantity INTEGER NOT NULL,
    product_sales FLOAT NOT NULL default 0
);

CREATE TABLE departments (
    department_id INTEGER primary KEY,
    department_name VARCHAR(250) NOT NULL,
    over_head_costs FLOAT NOT NULL
);

INSERT INTO departments (department_id,department_name,over_head_costs) 
VALUES (1,"Electronics",5000.00);
INSERT INTO departments (department_id,department_name,over_head_costs) 
VALUES (2,"Appliances",15000.00);
INSERT INTO departments (department_id,department_name,over_head_costs) 
VALUES (3,"Furniture",4000.00);
INSERT INTO departments (department_id,department_name,over_head_costs) 
VALUES (4,"Lighting",4000.00);
INSERT INTO departments (department_id,department_name,over_head_costs) 
VALUES (5,"Auto",20000.00);

INSERT INTO products (item_id, product_name, department_id, price, stock_quantity)
VALUES (1,"Macbook Pro",1,1800.00,5);
INSERT INTO products (item_id, product_name, department_id, price, stock_quantity)
VALUES (2,"Samasung Washing Machine",2,2000.00,1);
INSERT INTO products (item_id, product_name, department_id, price, stock_quantity)
VALUES (3,"La-Z-Boy Recliner",3,750.00,1);
INSERT INTO products (item_id, product_name, department_id, price, stock_quantity)
VALUES (4,"TV - 70in",1,2500.00,15);
INSERT INTO products (item_id, product_name, department_id, price, stock_quantity)
VALUES (5,"Ferarri",5,60000.00,1);
INSERT INTO products (item_id, product_name, department_id, price, stock_quantity)
VALUES (6,"Floor Lamp",4,100.00,50);
INSERT INTO products (item_id, product_name, department_id, price, stock_quantity)
VALUES (7,"Desk",3,200.00,5);
INSERT INTO products (item_id, product_name, department_id, price, stock_quantity)
VALUES (8,"Kitchenaid Stand Mixer",2,399.00,3);
INSERT INTO products (item_id, product_name, department_id, price, stock_quantity)
VALUES (9,"Crib",3,450.00,8);
INSERT INTO products (item_id, product_name, department_id, price, stock_quantity)
VALUES (10,"Sofa",3,2800.00,1);


