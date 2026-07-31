import { Request, Response } from 'express';
import { CloudinaryHelper } from '../../config/cloudinary.config';

export async function uploadSingleImageHandler(req: Request, res: Response) {
  try {
    if (req.file) {
      const fileName = req.file.originalname || `trade-chart-${Date.now()}.png`;
      const result = await CloudinaryHelper.uploadFile(req.file.buffer, fileName);
      return res.json({ url: result.secure_url, success: true });
    }

    if (req.body.image) {
      // If base64 string provided
      const base64Data = req.body.image;
      const buffer = Buffer.from(base64Data.replace(/^data:image\/\w+;base64,/, ''), 'base64');
      const fileName = `trade-chart-${Date.now()}.png`;
      const result = await CloudinaryHelper.uploadFile(buffer, fileName);
      return res.json({ url: result.secure_url, success: true });
    }

    return res.status(400).json({ error: 'No image file provided' });
  } catch (err: any) {
    console.error('Cloudinary upload error:', err);
    return res.status(500).json({ error: err.message || 'Image upload failed' });
  }
}

export async function uploadMultipleImagesHandler(req: Request, res: Response) {
  try {
    const urls: string[] = [];

    if (req.files && Array.isArray(req.files)) {
      for (const file of req.files) {
        const fileName = file.originalname || `trade-chart-${Date.now()}.png`;
        const result = await CloudinaryHelper.uploadFile(file.buffer, fileName);
        urls.push(result.secure_url);
      }
      return res.json({ urls, success: true });
    }

    return res.status(400).json({ error: 'No image files provided' });
  } catch (err: any) {
    console.error('Cloudinary multiple upload error:', err);
    return res.status(500).json({ error: err.message || 'Multiple image upload failed' });
  }
}
