import { Router } from 'express';
import {
  createCompanyCategory,
  deleteCompanyCategory,
  getAllCompanyCategories,
  getCompanyCategoryById,
  updateCompanyCategory,
} from '../controllers';

const router = Router();

router.get('/', getAllCompanyCategories);
router.get('/:id', getCompanyCategoryById);
router.post('/', createCompanyCategory);
router.post('/:id', getCompanyCategoryById);
router.put('/:id', updateCompanyCategory);
router.delete('/:id', deleteCompanyCategory);

export default router;
