import httpStatus from 'http-status';
import createError from 'http-errors';
import { User, PrismaClient, Prisma } from '@prisma/client';

import { GetUsersServiceParams } from './types';

const prisma = new PrismaClient();

const listUsers = async ({ page = 1, limit = 10, sortField = 'name', sortOrder = 'desc' }: GetUsersServiceParams) => {
  const orderBy = { [sortField]: sortOrder };

  const users = await prisma.user.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy,
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  const total = await prisma.user.count();

  const totalPages = Math.ceil(total / limit);
  return { users, total, totalPages, currentPage: page, perPage: limit };
};

const createUser = async (user: User) => {
  try {
    const createdUser = await prisma.user.create({
      data: user,
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return createdUser;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      throw createError(httpStatus.CONFLICT, 'User already exists with this email');
    }
    throw error;
  }
};

const getUserById = (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
};

const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

const updateUser = async (id: string, user: Partial<User>) => {
  const updatedUser = await prisma.user.update({
    where: { id },
    data: user,
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
  return updatedUser;
};

const deleteUser = async (userId: string) => {
  const deletedUser = await prisma.user.delete({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
  return deletedUser;
};

export const userService = {
  listUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail,
};
