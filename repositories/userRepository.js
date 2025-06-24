const db = require('../config/db');

const getById = (id) => {
    return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
};

const getAll = () => {
    return db.prepare('SELECT * FROM users').all();
};

const create = (name, email) => {
    return db.prepare('INSERT INTO users (name, email) VALUES (?, ?)').run(name, email);
};

const update = (id, fields) => {
    const sets = [];
    const values = [];

    if (fields.name) {
        sets.push('nome = ?');
        values.push(fields.name);
    }

    if (fields.email) {
        sets.push('email = ?');
        values.push(fields.email);
    }

    if (sets.length === 0) return;

    const sql = `UPDATE utenti SET ${sets.join(', ')} WHERE id = ?`;
    values.push(id);

    return db.prepare(sql).run(...values);
};

const deleteById = (id) => {
    return db.prepare('DELETE FROM users WHERE id = ?').run(id);
};

module.exports = { getById, getAll, create, update, deleteById };