import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import config from '../config';

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name || process.env.CLOUDINARY_CLOUD_NAME,
  api_key: config.cloudinary.api_key || process.env.CLOUDINARY_API_KEY,
  api_secret: config.cloudinary.api_secret || process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const uploadImageToCloudinary = async (
  fileBuffer: Buffer,
  folder: string = 'tradefxbook/journals'
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto',
      },
      (error, result) => {
        if (error || !result) {
          return reject(error || new Error('Cloudinary upload failed'));
        }
        resolve(result.secure_url);
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

export const uploadBase64ToCloudinary = async (
  base64Data: string,
  folder: string = 'tradefxbook/journals'
): Promise<string> => {
  const result = await cloudinary.uploader.upload(base64Data, {
    folder,
    resource_type: 'auto',
  });
  return result.secure_url;
};

export const deleteImageFromCloudinary = async (publicId: string): Promise<boolean> => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === 'ok';
  } catch (error) {
    console.error('Cloudinary deletion error:', error);
    return false;
  }
};

export default cloudinary;
