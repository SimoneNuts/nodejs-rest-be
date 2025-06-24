const userService = require('../services/userService');

const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userService.getById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        const status = err.statusCode || 500;
        res.status(status).json({ error: err.message });
    }
};

const getAll = async (req, res) => {
    try {
        const users = await userService.getAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const update = async (req, res) => {
    const { id } = req.params;
    const { username, email } = req.body;

    try {
        const result = await userService.update(id, username, email);
        if (result.changes === 0) {
            return res.status(404).json({ error: 'User not found or nothing updated' });
        }
        res.json({ message: 'User updated successfully', updatedRows: result.changes });
    } catch (err) {
        const status = err.statusCode || 500;
        res.status(status).json({ error: err.message });
    }
};

const deleteById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await userService.deleteById(id);
        if (result.changes === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully', deletedRows: result.changes });
    } catch (err) {
        const status = err.statusCode || 500;
        res.status(status).json({ error: err.message });
    }
};

module.exports = { getById, getAll, update, deleteById };