require('dotenv').config();

const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swaggerConfig');
const { initializeDatabase } = require('./config/dbSetup');

const app = express();

// Middleware for JSON (must be before routes)
app.use(express.json());

// Abilita CORS
app.use(cors());

// Asynchronous bootstrap function
async function startServer() {
    try {
        await initializeDatabase(); // 🛠️ Wait for the DB to be initialized

        // Routes
        const appRoutes = require('./routes/index');
        app.use('/api/v1', appRoutes);

        // Swagger UI
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

        console.log('🚀 App ready to be used (DB initialized)');
    } catch (error) {
        console.error('❌ Failed to initialize database:', error);
        process.exit(1);
    }
}

startServer();

module.exports = app;
