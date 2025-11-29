const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to SQLite database
const db = new sqlite3.Database('./visitor.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the visitor database.');
});

// Create tables if they don't exist
db.run(`CREATE TABLE IF NOT EXISTS Visitor (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  phone TEXT,
  idCardNumber TEXT,
  visitTime DATETIME,
  visitFloor TEXT,
  isRegistered BOOLEAN DEFAULT FALSE,
  receptionistId TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

db.run(`CREATE TABLE IF NOT EXISTS VisitorRecord (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  visitorId INTEGER,
  checkInTime DATETIME,
  checkOutTime DATETIME,
  status TEXT DEFAULT 'active',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(visitorId) REFERENCES Visitor(id) ON DELETE CASCADE
)`);

// API endpoints
app.get('/', (req, res) => {
  res.send('Visitor Check-in API');
});

// Add visitor
app.post('/api/visitors', (req, res) => {
  const { name, phone, idCardNumber, visitTime, visitFloor, receptionistId } = req.body;
  db.run(`INSERT INTO Visitor (name, phone, idCardNumber, visitTime, visitFloor, receptionistId) VALUES (?, ?, ?, ?, ?, ?)`,
    [name, phone, idCardNumber, visitTime, visitFloor, receptionistId],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID });
    });
});

// Get visitor by phone or idCardNumber
app.get('/api/visitors/:identifier', (req, res) => {
  const identifier = req.params.identifier;
  db.get(`SELECT * FROM Visitor WHERE phone = ? OR idCardNumber = ?`, [identifier, identifier], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (row) {
      res.json(row);
    } else {
      res.status(404).json({ error: 'Visitor not found' });
    }
  });
});

// Add visitor record
app.post('/api/visitor-records', (req, res) => {
  const { visitorId, checkInTime } = req.body;
  db.run(`INSERT INTO VisitorRecord (visitorId, checkInTime) VALUES (?, ?)`,
    [visitorId, checkInTime],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID });
    });
});

// Update visitor record (check out)
app.put('/api/visitor-records/:id', (req, res) => {
  const id = req.params.id;
  const { checkOutTime, status } = req.body;
  db.run(`UPDATE VisitorRecord SET checkOutTime = ?, status = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
    [checkOutTime, status, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ changes: this.changes });
    });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Close database connection when server exits
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Closed the database connection.');
    process.exit(0);
  });
});
