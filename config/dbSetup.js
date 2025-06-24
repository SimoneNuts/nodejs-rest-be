const db = require('./db');

function initializeDatabase() {
    const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

    db.prepare(createUsersTable).run();
    console.log("Table \"users\" created or already existing.");
}

module.exports = { initializeDatabase };