require('dotenv').config();

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../config/swaggerConfig');
const { initializeDatabase } = require('../config/dbSetup');

const app = express();

// Middleware for JSON (must be before routes)
app.use(express.json());

// Initialize DB
initializeDatabase();

// Routes
const appRoutes = require('./routes/index');
app.use('/api/v1', appRoutes);

// Swagger UI route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
