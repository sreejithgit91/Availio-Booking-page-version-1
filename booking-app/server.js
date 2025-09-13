import express from 'express';
import pkg from 'sqlite3';
const { Database } = pkg;
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React app build
app.use(express.static(path.join(__dirname, 'dist')));

// For debugging - log all requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Initialize SQLite DB
const db = new Database('./booking.db');

// Create tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT,
    startTime TEXT,
    endTime TEXT,
    duration INTEGER,
    courtId TEXT,
    courtName TEXT,
    basePrice REAL
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS participants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bookingId INTEGER,
    name TEXT,
    isOrganizer INTEGER,
    FOREIGN KEY(bookingId) REFERENCES bookings(id)
  )`);
});

// API to add a booking
app.post('/api/bookings', (req, res) => {
  const { date, startTime, endTime, duration, courtId, courtName, basePrice, participants } = req.body;
  db.run(
    `INSERT INTO bookings (date, startTime, endTime, duration, courtId, courtName, basePrice) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [date, startTime, endTime, duration, courtId, courtName, basePrice],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      const bookingId = this.lastID;
      if (participants && participants.length) {
        const stmt = db.prepare(`INSERT INTO participants (bookingId, name, isOrganizer) VALUES (?, ?, ?)`);
        participants.forEach(p => {
          stmt.run(bookingId, p.name, p.isOrganizer ? 1 : 0);
        });
        stmt.finalize();
      }
      res.json({ bookingId });
    }
  );
});

// API to get all bookings
app.get('/api/bookings', (req, res) => {
  db.all(`SELECT * FROM bookings`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// API to get participants for a booking
app.get('/api/bookings/:id/participants', (req, res) => {
  db.all(`SELECT * FROM participants WHERE bookingId = ?`, [req.params.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')));

// Finally, catch-all route for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop the server');
}); 