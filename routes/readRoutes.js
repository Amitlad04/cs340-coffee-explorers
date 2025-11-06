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
        // In query1, we use a JOIN clause to display the names of the homeworlds
        const query1 = `SELECT * FROM Orders;`;

        const [orders] = await db.query(query1);

        // Render the coffees.hbs file, and also send the renderer
        //  an object that contains our coffees information
        res.render('orders', { orders: orders });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// READ route for Orders_has_Coffes
router.get('/orders-coffees', async function (req, res) {
    try {
        // Create and execute our queries
        // In query1, we use a JOIN clause to display the names of the homeworlds
        const query1 = `SELECT * FROM Orders_has_Coffees;`;

        const [orders_has_coffees] = await db.query(query1);

        // Render the coffees.hbs file, and also send the renderer
        //  an object that contains our coffees information
        res.render('orders-coffees', { orders_has_coffees: orders_has_coffees });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// READ route for PaymentMethods
router.get('/payment-methods', async function (req, res) {
    try {
        // Create and execute our queries
        // In query1, we use a JOIN clause to display the names of the homeworlds
        const query1 = `SELECT * FROM PaymentMethods;`;

        const [paymentMethods] = await db.query(query1);

        // Render the coffees.hbs file, and also send the renderer
        //  an object that contains our coffees information
        res.render('payment-methods', { paymentMethods: paymentMethods });
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