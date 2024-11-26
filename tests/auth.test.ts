import request from 'supertest';

const BASE_URL = 'https://restful-booker.herokuapp.com';

const credentials = {
  username: 'admin',
  password: 'password123',
};

describe('Authentication Tests', () => {
  it('should generate a token with valid credentials', async () => {
    const response = await request(BASE_URL)
      .post('/auth')
      .send(credentials);

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty('token');
    expect(typeof response.body.token).toBe('string');
  });

  it('should return error with invalid credentials', async () => {
    const response = await request(BASE_URL)
      .post('/auth')
      .send({
        username: 'invalid_user',
        password: 'wrong_password',
      });

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty('reason');
    expect(response.body.reason).toBe('Bad credentials');
  });
});

