--EXAMPLES OF QUERIES MADE FOR ASSIGNMENT

--------------------
-- Coffees Queries 
--------------------

--Get all from Coffees table
SELECT *
FROM Coffees;

--------------------
-- Customers Queries
--------------------

-- Get all customers for the customers page 
SELECT *
FROM Customers;

--------------------
-- Orders Queries
--------------------

-- Get all orders with customers first and last name
SELECT Orders.order_id, Orders.order_time_date, Customers.first_name, Customers.last_name 
FROM Orders
LEFT JOIN Customers ON Orders.customer_id = Customers.customer_id;

-- Get the order id
SELECT order_id 
FROM Orders;

-- Insert order
INSERT INTO Orders (order_time_date, customer_id)
VALUES (:order_time_date, :customer_id);

-- Update order
UPDATE Orders
SET order_time_date = :order_time_date, customer_id = :customer_id
WHERE order_id = :order_id;

-- Delete order 
DELETE FROM Orders
WHERE order_id = :order_id;

--------------------
--OrdersCoffees
--------------------

-- get all coffee line items
SELECT OrdersCoffees.order_id, Coffees.name, OrdersCoffees.qty, OrdersCoffees.price_at_order 
FROM OrdersCoffees
LEFT JOIN Coffees ON OrdersCoffees.coffee_id = Coffees.coffee_id;

-- Insert line item 
INSERT INTO OrdersCoffees (order_id, coffee_id, qty, price_at_order)
VALUES (:order_id, :coffee_id, :qty, :price_at_order);

-- Update line item
UPDATE OrdersCoffees
SET qty = :qty, price_at_order = :price_at_order
WHERE order_id = :order_id
AND coffee_id = :coffee_id;

-- Delete line item
DELETE FROM OrdersCoffees
WHERE order_id = :order_id
AND coffee_id = :coffee_id;

--------------------
-- PaymentMethods queries 
--------------------

-- Get all payment methods 
SELECT PaymentMethods.payment_method_id, PaymentMethods.number, PaymentMethods.cvv, PaymentMethods.name AS 'cardholder', 
    PaymentMethods.expiration, Customers.first_name, Customers.last_name 
FROM PaymentMethods
LEFT JOIN Customers ON PaymentMethods.customer_id = Customers.customer_id;

-- Add payment method (one per customer due to UNIQUE on customer_id)
INSERT INTO PaymentMethods (number, expiration, cvv, name, customer_id)
VALUES (:number, :expiration, :cvv, :name, :customer_id);

-- Update payment methods
UPDATE PaymentMethods
SET number = :number, expiration = :expiration, cvv = :cvv, name = :name
WHERE payment_method_id = :payment_method_id;

-- Delete payment method
DELETE FROM PaymentMethods
WHERE payment_method_id = :payment_method_id;