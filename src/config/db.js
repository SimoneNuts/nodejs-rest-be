const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

let db;

console.log('Current NODE_ENV:', process.env.NODE_ENV);

if (process.env.NODE_ENV === 'test') {
    db = new Database(':memory:');
    console.log('🧪 In-memory test database loaded');
} else {
    const dataDir = path.resolve(__dirname, '../../data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
    const dbPath = path.join(dataDir, 'database.sqlite3');
    db = new Database(dbPath, { verbose: console.log });
    console.log('💾 Persistent database loaded at', dbPath);
}

module.exports = db;