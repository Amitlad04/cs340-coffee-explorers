const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

// READ route for Coffees
router.get('/coffees', async function (req, res) {
    try {
        // Create and execute our queries
        const query1 = `SELECT * FROM Coffees;`;
        const [coffees] = await db.query(query1);

        // Render the coffees.hbs file, and also send the renderer
        //  an object that contains our coffees information
        res.render('coffees', { coffees: coffees });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// READ route for Customers
router.get('/customers', async function (req, res) {
    try {
        // Create and execute our queries
        const query1 = `SELECT * FROM Customers;`;
        const [customers] = await db.query(query1);

        // Render the coffees.hbs file, and also send the renderer
        //  an object that contains our Customers information
        res.render('customers', { customers: customers });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// READ route for Orders
router.get('/orders', async function (req, res) {
    try {
        // Create and execute our queries
        // In query1, we use a JOIN clause to display the names of customers
        const query1 = `SELECT Orders.order_id, 
               DATE_FORMAT(Orders.order_time_date, "%m-%d-%Y %H:%i") AS "order_time_date",  
               CONCAT(Customers.first_name, ' ', Customers.last_name) AS "name" FROM Orders
               JOIN Customers ON Orders.customer_id = Customers.customer_id;`;
        const query2 = 'SELECT * FROM Customers;';
        const [orders] = await db.query(query1);
        const [customers] = await db.query(query2);


        // Render the orders.hbs file, and also send the renderer
        //  an object that contains Orders and Customers information
        res.render('orders', { orders: orders, customers: customers });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// READ route for OrdersCoffees
router.get('/orders-coffees', async function (req, res) {
    try {
        // Create and execute our queries
        // In query1, we use several JOIN clauses to display the names of coffees and customers
        const query1 = `SELECT OrdersCoffees.order_id,
           CONCAT(Customers.first_name, " ", Customers.last_name) AS "customer",
           OrdersCoffees.line_item_id, Coffees.name AS "coffee", OrdersCoffees.qty,
           OrdersCoffees.price_at_order FROM OrdersCoffees
                 JOIN Coffees ON OrdersCoffees.coffee_id = Coffees.coffee_id
                 JOIN Orders ON OrdersCoffees.order_id = Orders.order_id
                 JOIN Customers ON Customers.customer_id = Orders.customer_id
            ORDER BY OrdersCoffees.order_id, OrdersCoffees.line_item_id;`;

        const query2 = 'SELECT * FROM Coffees;';

        // In query3, we use a JOIN clause to display the name of customers together with the order_id
        const query3 = `SELECT order_id,
            CONCAT(Customers.first_name, " ", Customers.last_name) AS "customer" FROM Orders
            JOIN Customers ON Customers.customer_id = Orders.customer_id
            ORDER BY Orders.order_id;`;

        const [orders_coffees] = await db.query(query1);
        const [coffees] = await db.query(query2);
        const [orders] = await db.query(query3);

        // Render the orders-coffees.hbs file, and also send the renderer
        //  an object that contains our OrdersCoffees, Coffees, and Orders information
        res.render('orders-coffees', { orders_coffees: orders_coffees, coffees: coffees, orders: orders });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// READ route for Payment Methods
router.get('/payment-methods', async function (req, res) {
    try {
        // Create and execute our queries
        // In query1, we use a JOIN clause to display the names of customers
        const query1 = `SELECT PaymentMethods.payment_method_id, PaymentMethods.number,
            PaymentMethods.cvv, PaymentMethods.name AS 'cardholder',
            DATE_FORMAT(PaymentMethods.expiration, "%m/%y") AS "expiration",
            Customers.first_name, Customers.last_name
            FROM PaymentMethods
            JOIN Customers ON PaymentMethods.customer_id = Customers.customer_id;`;

        const query2 = 'SELECT * FROM Customers;';
        const [payment_methods] = await db.query(query1);
        const [customers] = await db.query(query2);

        // Render the payment-methods.hbs file, and also send the renderer
        //  an object that contains our payment_methods and customers information
        res.render('payment-methods', { payment_methods: payment_methods, customers: customers });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// Export the router so app.js can use it
module.exports = router;