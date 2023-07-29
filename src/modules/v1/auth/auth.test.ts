import supertest from 'supertest';
import { User } from '@prisma/client';
import { faker } from '@faker-js/faker';

import token from '~/lib/token';
import { createApp } from '~/app';
import { authService } from './auth.service';

const app = createApp();

export const userPayload: User = {
  id: faker.string.uuid(),
  email: faker.internet.email(),
  name: faker.person.fullName(),
  password: faker.internet.password(),
};

export const adminUser: User = {
  id: faker.string.uuid(),
  email: faker.internet.email(),
  name: faker.person.fullName(),
  password: faker.internet.password(),
};

export const loginPayload = {
  email: userPayload.email,
  password: userPayload.password,
};

export const invalidUser = {
  email: 'user@blackhole.com',
  password: 'stringPassword123',
};

describe('Auth', () => {
  describe('post register route', () => {
    describe('given the user does not exist', () => {
      it('should return a 200 and user data', async () => {
        await supertest(app).post('/api/v1/auth/register').send(userPayload).expect(200);
      });
    });

    describe('given the user does exist', () => {
      it('should return a 409', async () => {
        await supertest(app).post('/api/v1/auth/register').send(userPayload).expect(409);
      });
    });
  });

  describe('post login route', () => {
    describe('given the user does not exist', () => {
      it('should return a 404', async () => {
        await supertest(app).post('/api/v1/auth/login').send(invalidUser).expect(400);
      });
    });

    describe('given the user does exist', () => {
      it('should return a 200 status and the accessToken', async () => {
        const { body, statusCode } = await supertest(app).post('/api/v1/auth/login').send(loginPayload);

        const decoded = await token.decodeToken(body.data.accessToken);

        expect(statusCode).toBe(200);

        expect(decoded?.sub).toBe;
      });
    });
  });

  describe('get logged in user(me) route', () => {
    describe('given the user is not logged in', () => {
      it('should return a 401', async () => {
        const { statusCode } = await supertest(app).get('/api/v1/auth/me');

        expect(statusCode).toBe(401);
      });
    });

    describe('given the user is logged in', () => {
      it('should return a 200 and return user info', async () => {
        const login = await authService.login(userPayload.email, userPayload.password);

        const jwt = login.accessToken;

        const { body, statusCode } = await supertest(app).get('/api/v1/auth/me').set('Authorization', `Bearer ${jwt}`);

        expect(statusCode).toBe(200);
        expect(body.data.email).toEqual(userPayload.email);
      });
    });
  });
});
