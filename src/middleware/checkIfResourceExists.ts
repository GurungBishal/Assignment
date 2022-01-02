import { RequestHandler } from 'express';
import { Model } from 'mongoose';

export function checkIfResourceExists<M extends Model<any> = Model<any>>(
  model: M,
): RequestHandler {
  return async (req, res, next) => {
    try {
      const { id } = req.params;

      const requestedResource = await model.findById(id);

      if (!requestedResource) {
        return res.status(404).json('Requested Resource not found');
      }

      res.typedLocals.requestedResource = requestedResource;

      return next();
    } catch (error) {
      console.log(error);
      return res.status(500).json('Internal server error');
    }
  };
}
