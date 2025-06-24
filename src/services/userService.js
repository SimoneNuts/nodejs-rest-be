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

const update = (id, username, email) => {
    const result = userRepo.update(id, username, email);
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

module.exports = { getById, getAll, update, deleteById };