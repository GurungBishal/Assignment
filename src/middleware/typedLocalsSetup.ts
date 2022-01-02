import { RequestHandler } from 'express';

export const typedLocalsSetup: RequestHandler = (_, res, next) => {
  res.typedLocals = res.locals;
  next();
};
