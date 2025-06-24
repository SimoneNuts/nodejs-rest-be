require('dotenv').config();

const express = require('express');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = 3000;

const swaggerSpec = require('./config/swaggerConfig');

// Middleware for JSON (it must always be before the routes)
app.use(express.json());

// Initialize DB
const { initializeDatabase } = require('./config/dbSetup');
initializeDatabase();

// Routes
const appRoutes = require('./routes/index');
app.use('/api/v1', appRoutes);

// Swagger UI route for API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
