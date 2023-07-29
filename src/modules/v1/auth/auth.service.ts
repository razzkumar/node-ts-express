import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { User } from '@prisma/client';
import createError from 'http-errors';

import { config } from '~/config';
import { userService } from '../user/user.service';
import { tokenService } from '../token/token.service';

const register = async (user: User) => {
  if (user.id) {
    const existingUser = await userService.getUserById(user.id);

    if (existingUser?.email !== user.email) throw createError(httpStatus.CONFLICT, 'User already registered');
  }

  const hashedPassword = await bcrypt.hash(user.password as string, Number(config.bcrypt.saltRounds));

  return await userService.createUser({
    ...user,
    password: hashedPassword,
  });
};

const login = async (email: string, password: string) => {
  const user = await userService.getUserByEmail(email);

  if (!user) {
    throw createError(httpStatus.BAD_REQUEST, 'Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user?.password as string);

  if (!isPasswordValid) {
    throw createError(httpStatus.BAD_REQUEST, 'Invalid email or password');
  }

  const accessToken = await tokenService.generateAccessToken(user);

  return {
    accessToken,
  };
};

export const authService = {
  register,
  login,
};
