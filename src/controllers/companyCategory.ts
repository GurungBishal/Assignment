import { ICompanyCategory } from '../models';
import { RequestController } from '../utils/requestController';
import { CompanyCategory } from '../models';
import { companyCategoryValidaor } from '../validators';
import {
  checkIfResourceExists,
  checkIfValidationHasError,
  pagination,
} from '../middleware';

export const createCompanyCategory: RequestController = [
  ...companyCategoryValidaor(false),
  checkIfValidationHasError,
  async (req, res) => {
    try {
      const companyCategory: ICompanyCategory = req.body;

      const existingCompanyCategory = await CompanyCategory.findOne({
        title: companyCategory.title,
      });

      if (existingCompanyCategory) {
        return res.status(400).json('Company Category already exists');
      }

      const newCompanyCategory = new CompanyCategory(companyCategory);
      await newCompanyCategory.save();
      return res.status(201).json(newCompanyCategory);
    } catch (error) {
      console.log(error);
      return res.status(500).json('Internal Server Error');
    }
  },
];

export const getAllCompanyCategories: RequestController = [
  pagination,
  async (req, res) => {
    try {
      const { pageNumber, pageSize } = req.pagination;

      const companyCategories = await CompanyCategory.find()
        .limit(pageSize)
        .skip(pageNumber * pageSize)
        .sort({ createdAt: -1 });

      const totalCount = await CompanyCategory.countDocuments();

      return res.status(200).json({ data: companyCategories, totalCount });
    } catch (error) {
      console.log(error);
      return res.status(500).json('Internal server error');
    }
  },
];

export const getCompanyCategoryById: RequestController = [
  checkIfResourceExists(CompanyCategory),
  async (_eq, res) => {
    try {
      const companyCategory = res.typedLocals
        .requestedResource as unknown as ICompanyCategory;

      return res.status(200).json(companyCategory);
    } catch (error) {
      console.log(error);
      return res.status(500).json('Internal server error');
    }
  },
];

export const updateCompanyCategory: RequestController = [
  ...companyCategoryValidaor(true),
  checkIfValidationHasError,
  checkIfResourceExists(CompanyCategory),
  async (req, res) => {
    try {
      const companyCategory = res.typedLocals
        .requestedResource as unknown as ICompanyCategory;

      await companyCategory.updateOne(req.body);

      return res.status(200).json(companyCategory);
    } catch (error) {
      console.log(error);
      return res.status(500).json('Internal server error');
    }
  },
];

export const deleteCompanyCategory: RequestController = [
  checkIfResourceExists(CompanyCategory),
  async (_, res) => {
    try {
      const companyCategory = res.typedLocals
        .requestedResource as unknown as ICompanyCategory;

      await companyCategory.delete();

      return res.status(200).json(companyCategory);
    } catch (error) {
      console.log(error);
      return res.status(500).json('Internal server error');
    }
  },
];
