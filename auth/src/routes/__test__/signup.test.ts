import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: '0@gmail.com',
      password: '12345678',
    })
    .expect(201);
});

it('returns a 400 with an invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: '0gmail.com',
      password: '12345678',
    })
    .expect(400);
});

it('returns a 400 with an invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: '0@gmail.com',
      password: '1',
    })
    .expect(400);
});

it('returns a 400 with missing email and password', async () => {
  return request(app).post('/api/users/signup').send({}).expect(400);
});

it('returns a 400 with missing email or password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: '0@gmail.com', password: '' })
    .expect(400);

  return request(app)
    .post('/api/users/signup')
    .send({ email: '', password: '12345678' })
    .expect(400);
});

it('disallows duplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: '0@gmail.com', password: '12345678' })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({ email: '0@gmail.com', password: '12345678' })
    .expect(400);
});

it('sets a cookie after successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({ email: '1@gmail.com', password: '12345678' })
    .expect(201);

  expect(response.get('Set-cookie')).toBeDefined();
});
