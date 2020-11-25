import { Request, Response } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { container } from 'tsyringe';

class SessionController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const { token, user } = await container
      .resolve(AuthenticateUserService)
      .execute({ email, password });

    delete user.password;

    return response.json({ token, user });
  }
}

export default SessionController;
