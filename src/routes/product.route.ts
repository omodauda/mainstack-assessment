import { Router } from 'express';
import Route from 'src/interfaces/route.interface';
import ProductController from 'src/controllers/product.controller';
import multerImageUpload from 'src/utils/multer';

class ProductRoute implements Route {
  public path = '/products';
  public router = Router();
  private ProductController = new ProductController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .route(`${this.path}/categories`)
      .get(this.ProductController.getCategories);

    this.router
      .route(`${this.path}/create`)
      .post(multerImageUpload.array('image'), this.ProductController.createProduct);
  }
}

export default ProductRoute;