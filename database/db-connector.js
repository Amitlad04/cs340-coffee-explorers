// Get an instance of mysql we can use in the app
let mysql = require('mysql2')


console.log('DB Config:', {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW ? '***hidden***' : undefined,
    database: process.env.DB
});

// Create a 'connection pool' using the provided credentials
const pool = mysql.createPool({
    waitForConnections: true,
    connectionLimit   : 10,
    host              : process.env.DB_HOST,
    user              : process.env.DB_USER,
    password          : process.env.DB_PW,
    database          : process.env.DB
}).promise(); // This makes it so we can use async / await rather than callbacks

// Export it for use in our application
module.exports = pool;