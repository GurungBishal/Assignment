import { ValidationChain, body } from 'express-validator';
import { Document, ObjectId } from 'mongoose';

const createMainValidationChain =
  <T extends Document<ObjectId | any> = any>() =>
  (fieldName: keyof T, optional: boolean): ValidationChain => {
    if (optional)
      return body(fieldName as string).optional({ checkFalsy: true });

    return body(fieldName as string);
  };

export default createMainValidationChain;
