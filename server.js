const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = 3000;

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'La mia API',
            version: '1.0.0',
            description: 'Documentazione API con swagger-ui',
        },
    },
    apis: ['./routes/*.js'], // assicurati che ci siano commenti swagger qui
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middleware per parsare JSON nel body (mettilo prima delle rotte!)
app.use(express.json());

// Inizializza il database (se è async, usa await)
const { initializeDatabase } = require('./config/dbSetup');
initializeDatabase();

const appRoutes = require('./routes/index');
app.use('/api/v1', appRoutes);

// Swagger UI route per documentazione API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
