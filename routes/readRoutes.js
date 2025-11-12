const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

// READ route for Coffees
router.get('/coffees', async function (req, res) {
    try {
        // Create and execute our queries
        // In query1, we use a JOIN clause to display the names of the homeworlds
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
        // In query1, we use a JOIN clause to display the names of the homeworlds
        const query1 = `SELECT * FROM Customers;`;

        const [customers] = await db.query(query1);

        // Render the coffees.hbs file, and also send the renderer
        //  an object that contains our coffees information
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
        const query1 = `SELECT Orders.order_id, Orders.order_time_date, 
               Customers.first_name AS "First Name", Customers.last_name AS "Last Name" FROM Orders
               LEFT JOIN Customers ON Orders.customer_id = Customers.customer_id;`;
        const query2 = 'SELECT * FROM Customers;';
        const [orders] = await db.query(query1);
        const [customers] = await db.query(query2);

        // Render the bsg-people.hbs file, and also send the renderer
        //  an object that contains our bsg_people and bsg_homeworld information
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
        // In query1, we use a JOIN clause to display the names of customers
        const query1 = `SELECT OrdersCoffees.order_id, Coffees.name, OrdersCoffees.qty,
                               OrdersCoffees.price_at_order FROM OrdersCoffees
                                                                     LEFT JOIN Coffees ON OrdersCoffees.coffee_id = Coffees.coffee_id;`;
        const query2 = 'SELECT * FROM Coffees;';
        const query3 = 'SELECT order_id FROM Orders;';
        const [orders_coffees] = await db.query(query1);
        const [coffees] = await db.query(query2);
        const [orders] = await db.query(query3);

        // Render the orders-coffees.hbs file, and also send the renderer
        //  an object that contains our OrdersCoffees and Coffees information
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
            PaymentMethods.cvv, PaymentMethods.name AS 'cardholder', PaymentMethods.expiration,
            Customers.first_name AS 'First Name', Customers.last_name AS 'Last Name' FROM PaymentMethods
            LEFT JOIN Customers ON PaymentMethods.customer_id = Customers.customer_id;`;
        const query2 = 'SELECT * FROM Customers;';
        const [payment_methods] = await db.query(query1);
        const [customers] = await db.query(query2);

        // Render the bsg-people.hbs file, and also send the renderer
        //  an object that contains our bsg_people and bsg_homeworld information
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