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
    //pagination
    let _pageNumber: string;
    let _size: string;

    if (req.query.pageNo) {
      _pageNumber = req.query.pageNo.toString();
    }
    if (req.query.size) {
      _size = req.query.size.toString();
    }

    const pageNumber = parseInt(_pageNumber, 10);
    const size = parseInt(_size, 10);
    const skip = size * (pageNumber - 1) || 0;
    const limit = size || 10;

    try {
      if (pageNumber <= 0) {
        throw new HttpException(400, 'invalid page number, should start at 1');
      }
      const products = await Product.find({}, {}, { limit, skip }).sort({ createdAt: 'desc' });
      const totalCount = await Product.count();
      const totalPages = Math.ceil(totalCount / size);
      const data = {
        data: products,
        total: totalCount,
        totalPages,
        currentPage: pageNumber
      };
      return res
        .status(200)
        .json({
          status: 'success',
          data
        });
    } catch (error) {
      next(error);
    }
  };

  public getProductById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const product = await Product.findById(id);
      if (!product) {
        throw new HttpException(400, 'product not found');
      }
      return res
        .status(200)
        .json({
          status: 'success',
          data: product
        });
    } catch (error) {
      next(error);
    }
  };

  public updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const product = await Product.findById(id);
      if (!product) {
        throw new HttpException(400, 'product not found');
      }

      if (req.body.category) {
        const existingCategory = await ProductCategory.findById(req.body.category);
        if (!existingCategory) {
          throw new HttpException(400, 'invalid product category');
        }
      }

      if (req.body.subcategory) {
        const existingSubCategory = await ProductSubCategory.findById(req.body.subcategory);
        if (!existingSubCategory) {
          throw new HttpException(400, 'invalid product subcategory');
        }
      }

      await Product.findByIdAndUpdate(id, req.body);
      return res
        .status(200)
        .json({
          status: 'success',
          message: 'product updated successfully'
        });
    } catch (error) {
      next(error);
    }
  };
}