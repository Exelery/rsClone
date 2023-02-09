import mysql from 'mysql2';
import dotenv from 'dotenv'
dotenv.config()


export const authDb = mysql.createConnection({
  host: process.env.HOST,
  port: process.env.DBPORT,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME
});

authDb.connect((err) => {
  if (err) {
    console.error(`Error connecting to database: ${err.stack}`);
    return;
  }
  console.log(`Connected to database as id ${authDb.threadId}`);
})

const createTable =`CREATE TABLE IF NOT EXISTS ${process.env.DBNAME} (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(200) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`

authDb.query(createTable, function (err, result) {
  if (err) throw err;
  console.log("Table created");
});
