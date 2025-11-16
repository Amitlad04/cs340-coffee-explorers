const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

// UPDATE route for Coffees

// UPDATE route for Customers
router.post('/customers/update', async function (req, res) {
    try {
        // Parse frontend form information
        const data = req.body;

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = 'CALL sp_UpdateCustomer(?, ?, ?, ?, ?, ?, ?, ?, ?);';
        const query2 = 'SELECT first_name, last_name FROM Customers WHERE customer_id = ?;';
        await db.query(query1, [
            data.update_customer_id,
            data.update_customer_first_name,
            data.update_customer_last_name,
            data.update_customer_street,
            data.update_customer_city,
            data.update_customer_state,
            data.update_customer_zip,
            data.update_customer_email,
            data.update_customer_phone,
        ]);
        const [[rows]] = await db.query(query2, [data.update_customer_id]);

        console.log(`UPDATE customer. ID: ${data.update_customer_id} ` +
            `Name: ${rows.first_name} ${rows.last_name}`
        );

        // Redirect the user to the updated webpage data
        res.redirect('/customers');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

router.post('/orders/update', async function (req, res) {
    try {
        // Parse frontend form information
        const data = req.body;

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = 'CALL sp_UpdateOrder(?, ?, ?);';
        const query2 = 'SELECT order_time_date, customer_id FROM Orders WHERE order_id = ?;';
        await db.query(query1, [
            data.update_order_id,
            data.update_order_time_date,
            data.update_order_customer,
        ]);
        const [[rows]] = await db.query(query2, [data.update_order_id]);

        console.log(`UPDATE order. ID: ${data.update_order_id} ` +
    `Customer: ${rows.customer_id} Date: ${rows.order_time_date}`
);

        // Redirect the user to the updated webpage data
        res.redirect('/orders');
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