import { Request, Response, NextFunction } from 'express';

import { authService } from './auth.service';
import { userService } from '../user/user.service';
import { User } from '../user/types';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body;

    const registeredUser = await authService.register(user);

    return res.json({
      status: 'success',
      payload: registeredUser,
    });
  } catch (error) {
    return next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const tokens = await authService.login(email, password);

    return res.json({
      status: 'success',
      payload: tokens,
    });
  } catch (error) {
    return next(error);
  }
};

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const currentUser = (await userService.getUserById(res.locals.user.id)) as User;

    delete currentUser.password;

    return res.json({
      status: 'success',
      payload: currentUser,
    });
  } catch (error) {
    return next(error);
  }
};
