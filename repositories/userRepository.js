const db = require('../config/db');

const getById = (id) => {
    return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
};

const getByEmail = (email) => {
    return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
};

const getAll = () => {
    return db.prepare('SELECT * FROM users').all();
};

const create = (name, email, passwordHash) => {
    return db
        .prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)')
        .run(name, email, passwordHash);
};

const update = (id, fields) => {
    const sets = [];
    const values = [];

    if (fields.name) {
        sets.push('name = ?');
        values.push(fields.name);
    }

    if (fields.email) {
        sets.push('email = ?');
        values.push(fields.email);
    }

    if (sets.length === 0) return;

    const sql = `UPDATE users SET ${sets.join(', ')} WHERE id = ?`;
    values.push(id);

    return db.prepare(sql).run(...values);
};

const deleteById = (id) => {
    return db.prepare('DELETE FROM users WHERE id = ?').run(id);
};

module.exports = { getById, getByEmail, getAll, create, update, deleteById };