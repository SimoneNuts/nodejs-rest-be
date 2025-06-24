const knex = require('knex');
const path = require('path');
const fs = require('fs');

let dbConfig;

if (process.env.NODE_ENV === 'test') {
    dbConfig = {
        client: 'sqlite3',
        connection: {
            filename: ':memory:'
        },
        useNullAsDefault: true
    };
    console.log('🧪 In-memory test database loaded');
} else {
    const dataDir = path.resolve(__dirname, '../../data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
    const dbPath = path.join(dataDir, 'database.sqlite3');
    dbConfig = {
        client: 'sqlite3',
        connection: {
            filename: dbPath
        },
        useNullAsDefault: true,
        // optional: log queries (come verbose)
        // debug: true
    };
    console.log('💾 Persistent database loaded at', dbPath);
}

const db = knex(dbConfig);

module.exports = db;