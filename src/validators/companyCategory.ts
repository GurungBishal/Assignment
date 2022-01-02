import { ICompanyCategory } from '../models';
import createMainValidationChain from '../utils/createMainValidationChain';

const getMainValidationChain = createMainValidationChain<ICompanyCategory>();

export const companyCategoryValidaor = (optional: boolean) => {
  return [getMainValidationChain('title', optional).isString()];
};
