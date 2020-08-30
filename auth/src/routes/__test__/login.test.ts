import request from 'supertest';
import { app } from '../../app';

it('fails when a email that does not exist is supplied', async () => {
  await request(app)
    .post('/api/users/login')
    .send({ email: '0@gmail.com', password: '12345678' })
    .expect(400);
});

it('fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: '0@gmail.com', password: '12345678' })
    .expect(201);

  return request(app)
    .post('/api/users/login')
    .send({ email: '0@gmail.com', password: '1234567' })
    .expect(400);
});

it('responds with a cookie when given valid credentials', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: '0@gmail.com', password: '12345678' })
    .expect(201);

  const response = await request(app)
    .post('/api/users/login')
    .send({ email: '0@gmail.com', password: '12345678' })
    .expect(200);

  expect(response.get('Set-cookie')).toBeDefined();
});
