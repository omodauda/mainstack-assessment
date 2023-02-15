import { Router } from 'express';
import Route from 'src/interfaces/route.interface';
import ProductController from 'src/controllers/product.controller';

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
  }
}

export default ProductRoute;