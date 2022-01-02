import { CompanyCategory, ICompany } from '../models';
import createMainValidationChain from '../utils/createMainValidationChain';

const getMainValidationChain = createMainValidationChain<ICompany>();

export const companyValidator = (optional: boolean) => {
  return [
    getMainValidationChain('title', optional).isString(),
    getMainValidationChain('image', true).isString(),
    getMainValidationChain('description', true).isString(),
    getMainValidationChain('status', optional).isBoolean(),
    getMainValidationChain('category_id', true).custom(
      async (value: string) => {
        if (value) {
          return CompanyCategory.findById(value).then((companyCategory) => {
            if (!companyCategory) {
              return Promise.reject('Company Category Not found');
            } else {
              return Promise.resolve();
            }
          });
        }
        return Promise.resolve();
      },
    ),
  ];
};
