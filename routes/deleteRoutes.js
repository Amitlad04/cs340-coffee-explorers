const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

// DELETE route for Coffees

// DELETE route for Customers
router.post('/customers/delete', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_DeleteCustomer(?);`;
        await db.query(query1, [data.delete_customer_id]);

        console.log(`DELETE customer. ID: ${data.delete_customer_id} `
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




// Export the router so app.js can use it
module.exports = router;