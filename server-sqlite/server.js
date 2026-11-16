
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to SQLite database
const db = new sqlite3.Database(
  path.join(__dirname, "closetcycle.db"),
  (err) => {
    if (err) {
      console.error("Database connection error:", err.message);
    } else {
      console.log("Connected to ClosetCycle SQLite Database");
    }
  }
);

// Create clothing table
db.run(`
  CREATE TABLE IF NOT EXISTS clothing (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT,
    type TEXT,
    price REAL,
    size TEXT,
    condition TEXT,
    image TEXT,
    description TEXT
  )
`);

// Home route
app.get("/", (req, res) => {
  res.send("ClosetCycle SQLite API is Running!");
});

// Read all clothing items
app.get("/clothing", (req, res) => {
  db.all("SELECT * FROM clothing ORDER BY id DESC", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Add a clothing item
app.post("/clothing", (req, res) => {
  const {
    name, category, type, price, size,
    condition, image, description
  } = req.body;

  const sql = `
    INSERT INTO clothing
    (name, category, type, price, size, condition, image, description)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    sql,
    [name, category, type, price, size, condition, image, description],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      db.get(
        "SELECT * FROM clothing WHERE id = ?",
        [this.lastID],
        (err, item) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.status(201).json({
            message: "Clothing Item Added Successfully",
            item,
          });
        }
      );
    }
  );
});

// Update a clothing item
app.put("/clothing/:id", (req, res) => {
  const {
    name, category, type, price, size,
    condition, image, description
  } = req.body;

  const sql = `
    UPDATE clothing
    SET name = ?, category = ?, type = ?, price = ?,
        size = ?, condition = ?, image = ?, description = ?
    WHERE id = ?
  `;

  db.run(
    sql,
    [name, category, type, price, size, condition, image, description, req.params.id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (this.changes === 0) {
        return res.status(404).json({ message: "Item Not Found" });
      }

      db.get(
        "SELECT * FROM clothing WHERE id = ?",
        [req.params.id],
        (err, item) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.json({
            message: "Clothing Item Updated Successfully",
            item,
          });
        }
      );
    }
  );
});

// Delete a clothing item
app.delete("/clothing/:id", (req, res) => {
  db.run(
    "DELETE FROM clothing WHERE id = ?",
    [req.params.id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (this.changes === 0) {
        return res.status(404).json({ message: "Item Not Found" });
      }

      res.json({ message: "Clothing Item Deleted Successfully" });
    }
  );
});

// Start server on port 3002
app.listen(3002, () => {
  console.log("SQLite Server Running on Port 3002");
});
