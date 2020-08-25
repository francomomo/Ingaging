import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';

import { currentUserRouter } from './routes/currentUser';
import { loginRouter } from './routes/login';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

import { errorHandler } from './middlewares/errorHandler';
import { NotFoundError } from './errors/notFoundError';

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(loginRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log('App running on Port 3000');
});
