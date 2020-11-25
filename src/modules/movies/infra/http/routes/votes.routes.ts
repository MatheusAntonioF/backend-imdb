import { Router } from 'express';

import VoteController from '../controllers/VoteController';

const votesRouter = Router();
const votesController = new VoteController();

votesRouter.post('/users/:user_id/movies/:movie_id', votesController.create);

export default votesRouter;
