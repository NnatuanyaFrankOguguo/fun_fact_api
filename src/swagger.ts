import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from'swagger-ui-express';
import express from 'express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Fun Facts API',
            version: '1.0.0',
            description: 'API for retrieving fun facts about numbers',
        },
    },
    apis: ['./routes/*.ts'],  // annotate your routes with Swagger comments
};

const specs = swaggerJsdoc(options);

export const setupSwagger =  (app: express.Application) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));  // serve swagger at /api-docs

    // add your routes here...
}