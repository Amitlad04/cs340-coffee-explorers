require('dotenv').config();

const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const PORT = process.env.PORT || 3457;

// Database
const db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars'); // Import express-handlebars engine

app.engine('.hbs', engine({ extname: '.hbs' })); // Create instance of handlebars
app.set('view engine', '.hbs'); // Use handlebars engine for *.hbs files.

// ########################################
// ########## ROUTE HANDLERS

// READ ROUTES
app.get('/', async function (req, res) {
    try {
        res.render('home'); // Render the home.hbs file
    } catch (error) {
        console.error('Error rendering page:', error);
        // Send a generic error message to the browser
        res.status(500).send('An error occurred while rendering the page.');
    }
});

// COFFEES TABLE
app.get('/coffees', async function (req, res) {
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

app.get('/customers', async function (req, res) {
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

app.get('/orders', async function (req, res) {
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

app.get('/orders_has_coffees', async function (req, res) {
    try {
        // Create and execute our queries
        // In query1, we use a JOIN clause to display the names of the homeworlds
        const query1 = `SELECT * FROM Orders_has_Coffees;`;

        const [orders_has_coffees] = await db.query(query1);

        // Render the coffees.hbs file, and also send the renderer
        //  an object that contains our coffees information
        res.render('orders_has_coffees', { orders_has_coffees: orders_has_coffees });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.get('/paymentMethods', async function (req, res) {
    try {
        // Create and execute our queries
        // In query1, we use a JOIN clause to display the names of the homeworlds
        const query1 = `SELECT * FROM PaymentMethods;`;

        const [paymentMethods] = await db.query(query1);

        // Render the coffees.hbs file, and also send the renderer
        //  an object that contains our coffees information
        res.render('paymentMethods', { paymentMethods: paymentMethods });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});


// ########################################
// ########## LISTENER

app.listen(PORT, function () {
    console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});


