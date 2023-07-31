import * as argon from 'argon2';
import httpStatus from 'http-status';
import { User } from '@prisma/client';
import createError from 'http-errors';

import { userService } from '../user/user.service';
import { tokenService } from '../token/token.service';

const register = async (user: User) => {
  if (user.id) {
    const existingUser = await userService.getUserById(user.id);

    if (existingUser?.email !== user.email) throw createError(httpStatus.CONFLICT, 'User already registered');
  }

  const hashedPassword = await argon.hash(user.password);

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

  const isPasswordValid = await argon.verify(user?.password, password);

  if (!isPasswordValid) {
    throw createError(httpStatus.BAD_REQUEST, 'Invalid email or password');
  }

  const accessToken = tokenService.generateAccessToken(user);

  return {
    accessToken,
  };
};

export const authService = {
  register,
  login,
};
