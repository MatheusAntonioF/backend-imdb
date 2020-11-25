import { Request, Response, NextFunction } from 'express';
import AppError from '@shared/errors/AppError';

function adminitrator(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const { isAdm } = request.user;

  if (!isAdm)
    throw new AppError('You dont have permission to acess this resource', 400);

  next();
}

export default adminitrator;
