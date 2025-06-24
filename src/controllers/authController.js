const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepo = require('../repositories/userRepository');

const login = (req, res) => {
    const { email, password } = req.body;

    const user = userRepo.getByEmail(email);
    if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email
        }
    });
};

const register = (req, res) => {
    const { username, email, password } = req.body;

    const existingUser = userRepo.getByEmail(email);
    if (existingUser) {
        return res.status(409).json({ error: 'Email already registered' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const result = userRepo.create(username, email, hashedPassword);

    // Recupera l'utente appena creato tramite id
    const user = userRepo.getById(result.lastInsertRowid);

    // Genera il token JWT
    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email
        }
    });
};

module.exports = { login, register };
