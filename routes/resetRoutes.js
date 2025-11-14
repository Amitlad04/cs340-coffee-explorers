const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');


router.post('/reset-database', async function (req, res) {
    try {
        await db.query('CALL sp_load_coffeedb();');

        // Redirect the user to the updated webpage
        res.redirect('/');
    } catch (error) {
        console.error('Error resetting database', error);
        res.status(500).send(
            'Error resetting database'
        );
    }
});




// Export the router so app.js can use it
module.exports = router;