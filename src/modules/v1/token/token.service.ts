import token from '~/lib/token';
import { config } from '~/config';
import { User } from '../user/types';

const generateAccessToken = (user: User) => {
  delete user.password;

  return token.generate({
    payload: user,
    expiresIn: config.jwt.accessToken.expiresIn,
    audience: 'access',
    subject: user.id,
  });
};

export const tokenService = {
  generateAccessToken,
};
