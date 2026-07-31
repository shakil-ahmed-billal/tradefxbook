import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dl6twwnqv',
  api_key: process.env.CLOUDINARY_API_KEY || '582918856444237',
  api_secret: process.env.CLOUDINARY_API_SECRET || '6bKTUfGDWLDoYmR-rxSSmSnunEo',
  secure: true,
});

export async function uploadImageToCloudinary(fileBuffer: Buffer, folder: string = 'tradefxbook/journals'): Promise<string> {
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
    uploadStream.end(fileBuffer);
  });
}

export async function uploadBase64ToCloudinary(base64Data: string, folder: string = 'tradefxbook/journals'): Promise<string> {
  const result = await cloudinary.uploader.upload(base64Data, {
    folder,
    resource_type: 'auto',
  });
  return result.secure_url;
}

export default cloudinary;
