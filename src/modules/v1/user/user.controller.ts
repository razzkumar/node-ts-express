import { Request, Response, NextFunction } from 'express';

import { userService } from './user.service';
import { SortField, SortOrder } from './types';

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const user = req.body;

    const updatedUser = await userService.updateUser(id, user);

    return res.json({
      status: 'success',
      payload: updatedUser,
    });
  } catch (error) {
    return next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body;

    const newUser = await userService.createUser(user);

    return res.json({
      status: 'success',
      payload: newUser,
    });
  } catch (error) {
    return next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const user = await userService.getUserById(id);

    return res.json({
      status: 'success',
      payload: user,
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const deletedUser = await userService.deleteUser(id);

    return res.json({
      status: 'success',
      payload: deletedUser,
    });
  } catch (error) {
    return next(error);
  }
};

export const listUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit, sort, order } = req.query;

    const { users, total, totalPages, perPage, currentPage } = await userService.listUsers({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      sortField: sort as SortField,
      sortOrder: order as SortOrder,
    });

    return res.json({
      status: 'success',
      data: users,
      total,
      totalPages,
      perPage,
      currentPage,
    });
  } catch (error) {
    return next(error);
  }
};
