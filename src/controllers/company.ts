import { ICompany, Company } from '../models';
import { RequestController } from '../utils/requestController';
import { companyValidator } from '../validators';
import {
  checkIfResourceExists,
  checkIfValidationHasError,
  pagination,
} from '../middleware';
import fs from 'fs';
import { promisify } from 'util';

const unlinkAsync = promisify(fs.unlink);

export const createCompany: RequestController = [
  ...companyValidator(false),
  checkIfValidationHasError,
  async (req, res) => {
    try {
      const company: ICompany = req.body;

      const filePath = req?.file?.path;

      const existingCompany = await Company.findOne({
        title: company.title,
      });

      if (existingCompany) {
        return res.status(400).json('Company already exists');
      }

      const newComapny = new Company({ ...company, image: filePath });

      await newComapny.save();
      return res.status(201).json(newComapny);
    } catch (error) {
      console.log(error);
      return res.status(500).json('Internal Server Error');
    }
  },
];

export const getAllCompanies: RequestController = [
  pagination,
  async (req, res) => {
    try {
      const { pageNumber, pageSize } = req.pagination;
      const companies = await Company.find()
        .limit(pageSize)
        .skip(pageNumber * pageSize)
        .sort({ createdtAt: -1 })
        .populate('category_id');

      const totalCount = await Company.countDocuments();

      return res.status(200).json({ data: companies, totalCount });
    } catch (error) {
      console.log(error);
      return res.status(500).json('Internal server error');
    }
  },
];

export const getCompanyById: RequestController = [
  checkIfResourceExists(Company),
  async (_, res) => {
    try {
      const company = res.typedLocals.requestedResource as unknown as ICompany;

      await company.populate('category_id');

      return res.status(200).json(company);
    } catch (error) {
      console.log(error);
      return res.status(500).json('Internal server error');
    }
  },
];

export const updateCompany: RequestController = [
  ...companyValidator(true),
  checkIfValidationHasError,
  checkIfResourceExists(Company),
  async (req, res) => {
    try {
      const company = res.typedLocals.requestedResource as unknown as ICompany;
      const filePath = req?.file?.path;

      if (filePath && filePath !== company.image) {
        await unlinkAsync(company.image);
      }

      await company.updateOne({ ...req.body, image: filePath });

      return res.status(200).json(company);
    } catch (error) {
      console.log(error);
      return res.status(500).json('Internal server error');
    }
  },
];

export const deleteCompany: RequestController = [
  checkIfResourceExists(Company),
  async (_, res) => {
    try {
      const company = res.typedLocals.requestedResource as unknown as ICompany;

      await unlinkAsync(company.image);

      await company.delete();

      return res.status(200).json(company);
    } catch (error) {
      console.log(error);
      return res.status(500).json('Internal server error');
    }
  },
];
