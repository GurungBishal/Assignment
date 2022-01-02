import { Router } from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import {
  createCompany,
  deleteCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
} from '../controllers';

const router = Router();
var storage = multer.diskStorage({
  destination: function (_, __, cb) {
    fs.mkdirSync(`./public/images/`, {
      recursive: true,
    });

    cb(null, './public/images');
  },
  filename: function (_, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: function (_, file, cb) {
    const regex = new RegExp(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i);
    var ext = path.extname(file.originalname);

    if (regex.test(ext)) {
      return cb(null, true);
    }
    return cb(new Error('Only images with jpeg/png/gif/webp/bmp allowed'));
  },
});

router.post('/', upload.single('file'), createCompany);
router.get('/', getAllCompanies);
router.get('/:id', getCompanyById);
router.put('/:id', upload.single('file'), updateCompany);
router.delete('/:id', deleteCompany);

export default router;
