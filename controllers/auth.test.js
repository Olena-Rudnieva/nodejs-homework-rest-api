const mongoose = require('mongoose');
const app = require('../app');
const request = require('supertest');

const { TEST_DB_HOST, PORT } = process.env;

describe('test login controller', () => {
  let server = null;

  beforeAll(async () => {
    await mongoose.connect(TEST_DB_HOST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  test('test login with correct data', async () => {
    const loginData = {
      email: 'test2@gmail.com',
      password: '123456',
    };

    const result = await request(app).post('/api/users/login').send(loginData);
    expect(result.statusCode).toBe(200);
    expect(result.body).toMatchObject({
      user: {
        email: expect.any(String),
        subscription: expect.any(String),
      },
    });
    expect(result.body).toHaveProperty('token');
  });
});
