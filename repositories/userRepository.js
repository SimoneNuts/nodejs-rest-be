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

const update = (id, name, email) => {
    return db.prepare('UPDATE users SET name = ?, email = ? WHERE id = ?').run(name, email, id);
};

const deleteById = (id) => {
    return db.prepare('DELETE FROM users WHERE id = ?').run(id);
};

module.exports = { getById, getAll, create, update, deleteById };