const db = require('../config/db');

const getById = (id) => {
    return db('users').where({ id }).first();
};

const getByEmail = (email) => {
    return db('users').where({ email }).first();
};

const getAll = () => {
    return db('users').select('*');
};

const create = (username, email, passwordHash) => {
    return db('users').insert({
        username,
        email,
        password: passwordHash
    });
};

const update = (id, fields) => {
    if (Object.keys(fields).length === 0) return Promise.resolve();

    return db('users')
        .where({ id })
        .update(fields);
};

const deleteById = (id) => {
    return db('users').where({ id }).del();
};

module.exports = { getById, getByEmail, getAll, create, update, deleteById };