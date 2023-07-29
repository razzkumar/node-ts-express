import httpStatus from 'http-status';
import createError from 'http-errors';
import { Request, Response, NextFunction } from 'express';

import token from '~/lib/token';
import { userService } from '~/modules/v1/user/user.service';

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get the authorization header from the request
    const authHeader = req.headers['authorization'];

    // Check if the authorization header exists
    if (!authHeader) {
      return res.status(401).json({ error: 'No authorization header provided' });
    }

    // Split the header into parts
    const headerParts = authHeader.split(' ');

    // Check if the header is in the correct format
    if (headerParts.length !== 2 || headerParts[0] !== 'Bearer') {
      // Handle incorrect header format
      return res.status(401).json({ error: 'Invalid Authorization header format' });
    }

    // Extract the access token
    const accessToken = headerParts[1];

    // since user data is stored on jwt for is most likely going to be used in the next middleware
    const decoded = token.verify({ token: accessToken, audience: 'access' });

    let user;
    if (decoded.sub) {
      user = await userService.getUserById(decoded.sub as string);
    }

    if (!user) next(createError(httpStatus.UNAUTHORIZED, 'Invalid or expired token'));

    res.locals.user = user;

    return next();
  } catch (error) {
    return next(error);
  }
};
