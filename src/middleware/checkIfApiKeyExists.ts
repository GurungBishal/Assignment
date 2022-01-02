import { RequestHandler } from 'express';

export const checkIfApiKeyExists: RequestHandler = (req, _, next) => {
  const apiKey = req.headers.api_key;

  if (!apiKey) throw new Error('Api Key doesnot exist');

  if (apiKey !== process.env.API_KEY) throw new Error('Api Key doesnot match');

  return next();
};
