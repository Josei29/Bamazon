DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sarcastic Funny T-Shirt", "Clothing", 10.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Levi's Jeans", "Clothing", 25.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("NIKE Lebron 15", "Shoes", 250.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("UA Curry 2.5", "Shoes", 100.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Rolex Everose Diamond Watch", "Jewelry", 135000.00, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Alienware 17 VR Ready", "Computers", 2200.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Inspiron 7800 Gaming", "Computers", 1500.00, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Playstation 4", "Gaming", 300.00, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Xbox One X", "Gaming", 480.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Iphone X", "Mobiles", 1000.00, 5);