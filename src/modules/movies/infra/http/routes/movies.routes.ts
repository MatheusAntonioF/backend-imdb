import { Router } from 'express';

import authenticate from '@modules/users/infra/http/middlewares/authenticate';
import adminisrator from '../middlewares/administrator';
import MovieController from '../controllers/MovieController';

const moviesRouter = Router();
const movieController = new MovieController();

moviesRouter.post('/', authenticate, adminisrator, movieController.create);

export default moviesRouter;
