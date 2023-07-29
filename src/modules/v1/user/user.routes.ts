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
