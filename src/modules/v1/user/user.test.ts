import supertest from 'supertest';
import { User } from '@prisma/client';
import { faker } from '@faker-js/faker';

import { createApp } from '~/app';
import { authService } from '../auth/auth.service';
import { loginPayload } from '../auth/auth.test';

// export const adminUser: User = {
//   id: '02885ab1-42a8-4edf-89c6-568b5edb1n1a',
//   email: 'admin@pafin.com',
//   name: 'admin',
//   password: 'admin-password',
// };

export const userPayload: User = {
  id: faker.string.uuid(),
  email: faker.internet.email(),
  name: faker.person.fullName(),
  password: faker.internet.password(),
};

const app = createApp();

// Helper function to log in and get the JWT token
async function getAccessToken() {
  const login = await authService.login(loginPayload.email, loginPayload.password);
  return login.accessToken;
}

describe('User CRUD', () => {
  let jwt: string; // JWT token to be used in the test cases

  beforeAll(async () => {
    if (!jwt) {
      jwt = await getAccessToken(); // Log in and get the JWT token before running the tests
    }
  });

  describe('post user route', () => {
    describe('given the user does authenticated', () => {
      it('should return a 200 and user data', async () => {
        const { body, statusCode } = await supertest(app)
          .post('/api/v1/users')
          .send(userPayload)
          .set('Authorization', `Bearer ${jwt}`);
        expect(statusCode).toBe(200);
        expect(body.data.id).toEqual(userPayload.id);
      });
    });
    describe('given the user does not authenticated', () => {
      it('should return a 401', async () => {
        const jwt = 'FAKE_TOKEN';

        await supertest(app).post('/api/v1/users').send(userPayload).set('Authorization', `Bearer ${jwt}`).expect(401);
      });
    });
  });

  describe('get user route', () => {
    describe('given the user does authenticated', () => {
      it('should return a 200 and user data', async () => {
        const { body, statusCode } = await supertest(app)
          .get(`/api/v1/users/${userPayload.id}`)
          .send({
            email: faker.internet.email(),
          })
          .set('Authorization', `Bearer ${jwt}`);
        expect(statusCode).toBe(200);
        expect(body.data.id).toEqual(userPayload.id);
      });
    });
  });

  describe('patch user route', () => {
    describe('given the user does authenticated', () => {
      it('should return a 200 and user data', async () => {
        const { body, statusCode } = await supertest(app)
          .patch(`/api/v1/users/${userPayload.id}`)
          .send({
            email: faker.internet.email(),
          })
          .set('Authorization', `Bearer ${jwt}`);
        expect(statusCode).toBe(200);
        expect(body.data.id).toEqual(userPayload.id);
      });
    });
  });

  describe('delete user route', () => {
    describe('given the user does authenticated', () => {
      it('should return a 200 and user data', async () => {
        const { body, statusCode } = await supertest(app)
          .delete(`/api/v1/users/${userPayload.id}`)
          .set('Authorization', `Bearer ${jwt}`);
        expect(statusCode).toBe(200);
        expect(body.data.id).toEqual(userPayload.id);
      });
    });
  });
});
