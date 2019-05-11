-- Delete database if it exists
DROP DATABASE IF EXISTS bamazon_db;
-- Create database 
CREATE DATABASE bamazon_db;

-- Initialize using database
USE bamazon_db;

-- Create table to store products
CREATE TABLE products (
-- Set columns
item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price DECIMAL NOT NULL,
stock_quantity INTEGER(11) NOT NULL,
PRIMARY KEY (item_id)
);

-- Populate table
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Flatscreen TV", "Electronics", 450, 20),
("Blender", "Kitchen & Dining", 250, 30),
("Cutting Board", "Kitchen & Dining", 20, 35),
("Song Of Fire & Wind","Books",25,50),
("Samsung Galaxy S9","Electronics",400,40),
("Comforter","Bed & Bath", 85, 32),
("Record Player","Electronics", 135, 28),
("Headphones", "Electronics", 40, 52),
("Lap Top", "Electronics", 550, 22),
("Leaf Blower", "Garden & Outdoor", 145, 27);

SELECT * FROM products;

