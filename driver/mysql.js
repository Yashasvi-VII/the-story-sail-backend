import dotenv from "dotenv";
import mysql from "mysql";

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};
const db = mysql.createPool(dbConfig);

// Test the connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the MySQL database!");
    connection.release(); // Release the connection to the pool
  }
});

export default db;
