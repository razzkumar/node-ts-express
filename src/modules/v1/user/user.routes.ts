import express from 'express';

import { isAuthenticated } from '~/middlewares/isAuthenticated';
import { listUsers, createUser, getUserById, updateUser, deleteUser } from './user.controller';

const router = express.Router();

router.post('/', isAuthenticated, createUser);
router.get('/:id', isAuthenticated, getUserById);

router.get('/', isAuthenticated, listUsers);
router.patch('/:id', isAuthenticated, updateUser);
router.delete('/:id', isAuthenticated, deleteUser);

export default router;

/**
 * @openapi
 * components:
 *  schemas:
 *    UserInput:
 *      type: object
 *      required:
 *        - email
 *        - name
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: dev@pafin.com
 *        name:
 *          type: string
 *          default: developer
 *        password:
 *          type: string
 *          default: stringPassword123
 *    UserResponse:
 *      type: object
 *      properties:
 *        data:
 *          type: object
 *          example:
 *            [
 *              {
 *                "id": "clknjtlkv0000orm6ly0tweww",
 *                "name": "developer",
 *                "email": "dev@pafin.com",
 *              }
 *            ]
 *          properties:
 *              email:
 *                type: string
 *              name:
 *                type: string
 *              id:
 *                type: string
 *        status:
 *          type: string
 *    UserListResponse:
 *      type: object
 *      properties:
 *        data:
 *          type: array
 *          example:
 *            [
 *              {
 *                "id": "clknjtlkv0000orm6ly0tweww",
 *                "name": "developer",
 *                "email": "dev@pafin.com",
 *              }
 *            ]
 *        status:
 *          type: string
 *        total:
 *          type: number
 *        totalPages:
 *          type: number
 *        perPage:
 *          type: numbar
 *        currentPage:
 *          type: numbar
 */

/**
 * @openapi
 * '/api/v1/users':
 *  post:
 *     tags:
 *     - Users
 *     summary: Create a user
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
 *
 */
// page, limit, sort, order;
/**
 * @openapi
 * '/api/v1/users':
 *  get:
 *     tags:
 *     - Users
 *     summary: Get List of users
 *     parameters:
 *      - name: page
 *        in: query
 *        description: page number
 *        required: false
 *      - name: limit
 *        in: query
 *        description: items per page
 *        required: false
 *      - name: sort
 *        in: query
 *        description: sort by (name,email)
 *        required: false
 *      - name: order
 *        in: query
 *        description: order(asc,desc)
 *     security:
 *      - bearerAuth: []
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserListResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 * '/api/v1/users/{id}':
 *  get:
 *     tags:
 *     - Users
 *     summary: Get a single User by the id
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The id of the user
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schema/UserResponse'
 *       404:
 *         description: User not found
 *  put:
 *     tags:
 *     - Users
 *     summary: Update a single user
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The id of the user
 *        required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/UserInput'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schema/UserResponse'
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User not found
 *  delete:
 *     tags:
 *     - Users
 *     summary: Delete a single user
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The id of the user
 *        required: true
 *     responses:
 *       200:
 *         description: User deleted
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User not found
 */
