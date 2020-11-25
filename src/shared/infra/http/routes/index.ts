import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionRouter from '@modules/users/infra/http/routes/session.routes';

import movieRouter from '@modules/movies/infra/http/routes/movies.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/session', sessionRouter);
routes.use('/movies', movieRouter);

export default routes;
