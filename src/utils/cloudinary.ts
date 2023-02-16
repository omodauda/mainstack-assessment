import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_api_secret
});

class Cloudinary {
  private cloud = cloudinary;

  public uploadImage = async (image: { path: string }): Promise<UploadApiResponse> => {
    return await this.cloud.uploader.upload(image.path, {
      folder: 'mainstack'
    });
  };

  public deleteImage = async (public_id: string): Promise<void> => {
    await cloudinary.uploader.destroy(public_id);
  };
}

export default Cloudinary;