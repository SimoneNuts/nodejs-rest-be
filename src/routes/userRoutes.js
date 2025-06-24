const express = require('express');
const { getById, getAll, update, deleteById } = require('../controllers/userController');
const router = express.Router();

// Middleware to protect routes
const authenticate = require('../middlewares/authenticate');

const { createUserSchema, updateUserSchema, idParamSchema } = require('../validations/userValidation');
const validateBody = require('../middlewares/validateBody');
const validateParams = require('../middlewares/validateParams');

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User management and utilities<>
 *
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "123"
 *         username:
 *           type: string
 *           example: "Mario"
 *         email:
 *           type: string
 *           example: "mario.rossi@example.com"
 *     UserUpdate:
 *       type: object
 *       required:
 *         - username
 *         - email
 *       properties:
 *         username:
 *           type: string
 *           example: "Mario"
 *         email:
 *           type: string
 *           example: "mario.rossi@example.com"
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "User not found"
 */

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Retrieve a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User data found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', authenticate, validateParams(idParamSchema), getById);

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     tags: [Users]
 *     summary: Retrieve all users
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', authenticate, getAll);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     tags: [Users]
 *     summary: Update user information by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:id', authenticate, validateParams(idParamSchema), validateBody(updateUserSchema), update);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Delete a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User deleted
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', authenticate, validateParams(idParamSchema), deleteById);

module.exports = router;
