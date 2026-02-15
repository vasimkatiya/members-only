require("dotenv").config();
const { Client } = require("pg");

const main = async () => {
  const client = new Client({
    connectionString: process.env.DB_URL,
  });

  try {
    await client.connect();

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        role VARCHAR(20) DEFAULT 'user',
        password VARCHAR(40) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);


    await client.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        message TEXT NOT NULL,
        user_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_user
          FOREIGN KEY(user_id)
          REFERENCES users(id)
          ON DELETE CASCADE
      );
    `);

  
    await client.query(`
      UPDATE users
      SET role = 'admin'
      WHERE email = 'vasimkatiya@gmail.com';
    `);

    console.log("Tables created and admin updated successfully!");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.end();
  }
};

module.exports = main;
