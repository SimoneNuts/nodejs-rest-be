const userService = require('../services/userService');

const getById = (req, res) => {
    const { id } = req.params;
    try {
        const user = userService.getById(id);
        res.json(user);
    } catch (err) {
        const status = err.statusCode || 500;
        res.status(status).json({ error: err.message });
    }
};

const getAll = (req, res) => {
    try {
        const users = userService.getAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const update = (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    try {
        const result = userService.update(id, name, email);
        res.json({ message: 'User updated successfully', updatedRows: result.changes });
    } catch (err) {
        const status = err.statusCode || 500;
        res.status(status).json({ error: err.message });
    }
};

const deleteById = (req, res) => {
    const { id } = req.params;
    try {
        const result = userService.deleteById(id);
        res.json({ message: 'User deleted successfully', deletedRows: result.changes });
    } catch (err) {
        const status = err.statusCode || 500;
        res.status(status).json({ error: err.message });
    }
};

module.exports = { getById, getAll, update, deleteById };