DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INTEGER primary KEY,
    product_name VARCHAR(250) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price FLOAT NOT NULL,
    stock_quantity INTEGER NOT NULL
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1,"Macbook Pro","Electronics",1800.00,5);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (2,"Samasung Washing Machine","Appliances",2000.00,1);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (3,"La-Z-Boy Recliner","Furniture",750.00,1);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (4,"TV - 70in","Electronics",2500.00,15);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (5,"Ferarri","Auto",60000.00,1);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (6,"Floor Lamp","Lighting",100.00,50);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (7,"Desk","Furniture",200.00,5);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (8,"Kitchenaid Stand Mixer","Appliances",399.00,3);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (9,"Crib","Baby",450.00,8);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (10,"Sofa","Furniture",2800.00,1);


