import { Response, Request, NextFunction } from 'express';
import Product from 'src/database/models/Product';
import ProductCategory from 'src/database/models/ProductCategory';
import ProductSubCategory from 'src/database/models/ProductSubCategory';
import Cloudinary from 'src/utils/cloudinary';
import HttpException from 'src/utils/handlers/error.handler';

export default class ProductController {
  private Cloudinary = new Cloudinary();

  public getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await ProductCategory.find().select('-__v')
        .populate('subcategories');
      return res
        .status(200)
        .json({
          status: 'success',
          data: categories
        });
    } catch (error) {
      next(error);
    }
  };

  public createProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { category, subcategory, name, brand, description, price, quantity } = req.body;
    try {
      if (!req.files.length || !Array.isArray(req.files)) {
        throw new HttpException(400, 'no image file selected');
      };
      const existingCategory = await ProductCategory.findById(category);
      if (!existingCategory) {
        throw new HttpException(400, 'invalid product category');
      }
      const existingSubCategory = await ProductSubCategory.findById(subcategory);

      if (!existingSubCategory || existingCategory.id !== existingSubCategory.category._id.toString()) {
        throw new HttpException(400, 'invalid product subcategory');
      }

      const images = req.files;
      const imageData = [];
      for (const image of images) {
        const { public_id, secure_url } = await this.Cloudinary.uploadImage(image);
        imageData.push({ public_id, url: secure_url });
      }
      await Product.create({
        category,
        subcategory,
        name,
        brand,
        description,
        price,
        quantity,
        images: imageData
      });
      return res
        .status(201)
        .json({
          status: 'success',
          message: 'product created successfully'
        });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await Product.find().sort({ createdAt: 'desc' });
      return res
        .status(200)
        .json({
          status: 'success',
          data: products
        });
    } catch (error) {
      next(error);
    }
  };
}