const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/authController');
const validateBody = require('../middlewares/validateBody');
const { registerSchema, loginSchema } = require('../validations/authValidation');

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login user and return a JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: JWT token
 */
router.post('/login', validateBody(loginSchema), login);

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 *       409:
 *         description: Email already registered
 */
router.post('/register', validateBody(registerSchema), register);

module.exports = router;
