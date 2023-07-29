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
