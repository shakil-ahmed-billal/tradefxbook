import { Request, Response } from 'express';
import { uploadImageToCloudinary, uploadBase64ToCloudinary } from '../../utils/cloudinary';

export async function uploadSingleImageHandler(req: Request, res: Response) {
  try {
    if (req.file) {
      const imageUrl = await uploadImageToCloudinary(req.file.buffer, 'tradefxbook/journals');
      return res.json({ url: imageUrl, success: true });
    }

    if (req.body.image) {
      const imageUrl = await uploadBase64ToCloudinary(req.body.image, 'tradefxbook/journals');
      return res.json({ url: imageUrl, success: true });
    }

    return res.status(400).json({ error: 'No image file or base64 data provided' });
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
        const url = await uploadImageToCloudinary(file.buffer, 'tradefxbook/journals');
        urls.push(url);
      }
      return res.json({ urls, success: true });
    }

    if (req.body.images && Array.isArray(req.body.images)) {
      for (const img of req.body.images) {
        const url = await uploadBase64ToCloudinary(img, 'tradefxbook/journals');
        urls.push(url);
      }
      return res.json({ urls, success: true });
    }

    return res.status(400).json({ error: 'No image files provided' });
  } catch (err: any) {
    console.error('Cloudinary multiple upload error:', err);
    return res.status(500).json({ error: err.message || 'Multiple image upload failed' });
  }
}
