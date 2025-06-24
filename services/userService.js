const userRepo = require('../repositories/userRepository');

const getById = (id) => {
    // Check id
    if (!id) {
        const err = new Error('ID is required');
        err.statusCode = 400;
        throw err;
    }
    // Perform getById from a repository
    const user = userRepo.getById(id);
    // Check response
    if (!user) {
        const err = new Error('User not found');
        err.statusCode = 404;
        throw err;
    }
    return user;
};

const getAll = () => {
    return userRepo.getAll();
};

const create = (nome, email) => {
    // Check name and email
    if (!nome || !email) {
        throw new Error('Name and email are required');
    }
    // Email validation
    if (!email.includes('@')) {
        throw new Error('Email not valid');
    }
    // Perform create method from a repository
    return userRepo.create(nome, email);
};

const update = (id, nome, email) => {
    if (!id || !nome || !email) {
        const err = new Error('ID, name, and email are required');
        err.statusCode = 400;
        throw err;
    }

    if (!email.includes('@')) {
        const err = new Error('Email not valid');
        err.statusCode = 400;
        throw err;
    }

    const result = userRepo.update(id, nome, email);
    if (result.changes === 0) {
        const err = new Error('User not found');
        err.statusCode = 404;
        throw err;
    }

    return result;
};

const deleteById = (id) => {
    // Check id
    if (!id) {
        throw new Error('ID is required');
    }
    // Perform delete method from repository
    const result = userRepo.deleteById(id);
    // Check result
    if (result.changes === 0) {
        const err = new Error('User not found');
        err.statusCode = 404;
        throw err;
    }
    return result;
};

module.exports = { getById, getAll, create, update, deleteById };