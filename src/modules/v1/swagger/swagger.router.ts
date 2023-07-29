import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Router, Request, Response } from 'express';

import { version } from '~/package.json';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'REST API Docs',
      version,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/**/*routes.ts', './src/index.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

const router = Router();

// Docs in JSON format
router.get('/json', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Swagger page
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
