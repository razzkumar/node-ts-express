import express from 'express';

import { validate } from '~/middlewares/validateApiSchema';
import { userSchema, loginSchema } from './auth.api.schema';
import { isAuthenticated } from '~/middlewares/isAuthenticated';
import { register, login, getProfile } from './auth.controller';

const router = express.Router();

router.post('/login', validate(loginSchema), login);
router.post('/register', validate(userSchema), register);

router.get('/me', isAuthenticated, getProfile);

export default router;

/**
 * @openapi
 * components:
 *  schemas:
 *    LoginInput:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: dev@pafin.com
 *        password:
 *          type: string
 *          default: stringPassword123
 *    LoginResponse:
 *      type: object
 *      properties:
 *        data:
 *          type: object
 *          properties:
 *              accessToken:
 *                type: string
 *        status:
 *          type: string
 */

/**
 * @openapi
 * '/api/v1/auth/register':
 *  post:
 *     tags:
 *     - Auth
 *     summary: Register
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/UserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 * '/api/v1/auth/login':
 *  post:
 *     tags:
 *     - Auth
 *     summary: Login with email and password
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/LoginResponse'
 *       404:
 *         description: User not found
 * '/api/v1/auth/me':
 *  get:
 *     tags:
 *     - Auth
 *     summary: Get Authenticated User
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/UserResponse'
 *       404:
 *         description: Not logged in
 */
