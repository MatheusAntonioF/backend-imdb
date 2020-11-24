import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';

export default class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const user = await container
      .resolve(CreateUserService)
      .execute({ name, email, password });

    delete user.password;

    return response.json(user);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const user = await container
      .resolve(DeleteUserService)
      .execute({ user_id });

    return response.json(user);
  }
}
