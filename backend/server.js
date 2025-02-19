// Backend (Express.js + MySQL)
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "amazon_db",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

// Fetch transactions with enhanced search & filtering
app.get("/transactions", (req, res) => {
  let sql = "SELECT * FROM transactions";
  const filters = [];

  if (req.query.store) {
    filters.push(`store LIKE ?`);
  }
  if (req.query.category) {
    filters.push(`category LIKE ?`);
  }
  if (req.query.title) {
    filters.push(`title LIKE ?`);
  }
  if (req.query.minPrice) {
    filters.push(`price >= ?`);
  }
  if (req.query.maxPrice) {
    filters.push(`price <= ?`);
  }

  if (filters.length) {
    sql += " WHERE " + filters.join(" AND ");
  }

  db.query(
    sql,
    [
      req.query.store ? `%${req.query.store}%` : null,
      req.query.category ? `%${req.query.category}%` : null,
      req.query.title ? `%${req.query.title}%` : null,
      req.query.minPrice ? req.query.minPrice : null,
      req.query.maxPrice ? req.query.maxPrice : null,
    ].filter((val) => val !== null),
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    }
  );
});

app.listen(5000, () => console.log("Server running on port 5000"));
