const express = require('express');
const { getById, getAll, update, deleteById } = require('../controllers/userController');
const router = express.Router();

// Middleware to protect routes
const authenticate = require('../middlewares/authenticate');

const { createUserSchema, updateUserSchema, idParamSchema} = require('../validations/userValidation');
const validateBody = require('../middlewares/validateBody');
const validateParams = require('../middlewares/validateParams');

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     tags:
 *         - User Utilities
 *     summary: Return a user given his ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User Data
 */

router.get('/:id', authenticate, validateParams(idParamSchema), getById);

/**
 * @swagger
 * /api/v1/users/:
 *   get:
 *     tags:
 *        - User Utilities
 *     summary: Return all users
 *     responses:
 *       200:
 *         description: Users list
 */
router.get('/', authenticate, getAll);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     tags:
 *        - User Utilities
 *     summary: Update a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User successfully updated
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 */
router.put('/:id', authenticate, validateParams(idParamSchema), validateBody(updateUserSchema), update);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     tags:
 *         - User Utilities
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
 *         description: User successfully deleted
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authenticate, validateParams(idParamSchema), getById);

module.exports = router;