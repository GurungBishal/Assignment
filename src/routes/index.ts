import { Router } from 'express';
import companyCategoryRouter from './companyCategory';
import companyRouter from './company';
import { checkIfApiKeyExists } from '../middleware/checkIfApiKeyExists';

const router = Router();

router.use('/companyCategory', checkIfApiKeyExists, companyCategoryRouter);

router.use('/company', checkIfApiKeyExists, companyRouter);

export default router;
