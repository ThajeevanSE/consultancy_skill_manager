const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Convert pool to promise-based to use async/await
const promisePool = pool.promise();

// Test the connection
promisePool.getConnection()
  .then(connection => {
    console.log(" Successfully connected to MySQL Database");
    connection.release();
  })
  .catch(err => {
    console.error(" Database connection failed:", err.message);
  });

module.exports = promisePool;