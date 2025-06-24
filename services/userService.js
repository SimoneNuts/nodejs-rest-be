const userRepo = require('../repositories/userRepository');

const getById = (id) => {
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
    // Perform create method from a repository
    return userRepo.create(nome, email);
};

const update = (id, nome, email) => {
    const result = userRepo.update(id, nome, email);
    if (result.changes === 0) {
        const err = new Error('User not found');
        err.statusCode = 404;
        throw err;
    }

    return result;
};

const deleteById = (id) => {
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