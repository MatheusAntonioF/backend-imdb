import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
  isAdm: boolean;
}

function authenticate(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError('JWT token is missing on request', 400);

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub, isAdm } = decoded as ITokenPayload;

    request.user = {
      id: sub,
      isAdm,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 400);
  }
}

export default authenticate;
