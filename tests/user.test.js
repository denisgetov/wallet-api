const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('User API tests', () => {
  let userId;

  test('Register a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ username: 'testuser' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.username).toBe('testuser');
    userId = res.body._id;
  });

  test('Deposit money', async () => {
    const res = await request(app)
      .post(`/api/users/${userId}/deposit`)
      .send({ amount: 100 });

    expect(res.statusCode).toBe(200);
    expect(res.body.balance).toBe(100);
  });
});
