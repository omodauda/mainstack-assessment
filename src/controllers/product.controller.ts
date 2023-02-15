import { Response, Request, NextFunction } from 'express';
import ProductCategory from 'src/database/models/ProductCategory';

export default class ProductController {

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
}