import { Router } from 'express';
import multer from 'multer';
import * as uploadController from './upload.controller';

const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  storage: multer.memoryStorage(),
});

const router = Router();

router.post('/image', upload.single('image'), uploadController.uploadSingleImageHandler);
router.post('/images', upload.array('images', 10), uploadController.uploadMultipleImagesHandler);

export default router;
