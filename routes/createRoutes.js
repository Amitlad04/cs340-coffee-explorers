const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

// CREATE route for Coffees

// CREATE route for Customers
router.post('/customers/create', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_CreateCustomer(?, ?, ?, ?, ?, ?, ?, ?, @new_id);`;

        // Store ID of last inserted row
        const [[[rows]]] = await db.query(query1, [
            data.create_customer_first_name,
            data.create_customer_last_name,
            data.create_customer_street,
            data.create_customer_city,
            data.create_customer_state,
            data.create_customer_zip,
            data.create_customer_email,
            data.create_customer_phone
        ]);

        console.log(`CREATE customer. ID: ${rows.new_id} ` +
            `Name: ${data.create_customer_first_name} ${data.create_customer_last_name}`
        );

        // Redirect the user to the updated webpage
        res.redirect('/customers');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// CREATE route for Orders
router.post('/orders/create', async function (req, res) {
    try {
        let data = req.body;

        const query1 = `CALL sp_CreateOrder(?, ?, @new_id);`;

        const [[[rows]]] = await db.query(query1, [
            data.create_order_time_date,
            data.create_order_customer
        ]);

        console.log(`CREATE order. ID: ${rows.new_id} ` +
            `Customer: ${data.create_order_customer} Date: ${data.create_order_time_date}`
);

        res.redirect('/orders');
    } catch (error) {
        console.error('Error executing queries:', error);
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// CREATE route for OrdersCoffee



// Export the router so app.js can use it
module.exports = router;