import { Router } from 'express';
import Route from 'src/interfaces/route.interface';
import ProductController from 'src/controllers/product.controller';
import multerImageUpload from 'src/utils/multer';
import validationMiddleware from 'src/middlewares/validation.middleware';
import { updateProductValidation } from 'src/validations/product.validation';

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
      .post(
        multerImageUpload.array('image'),
        this.ProductController.createProduct
      );

    this.router
      .route(`${this.path}`)
      .get(this.ProductController.getAllProducts);

    this.router
      .route(`${this.path}/:id`)
      .get(this.ProductController.getProductById)
      .patch(
        validationMiddleware(updateProductValidation),
        this.ProductController.updateProduct
      );
  }
}

export default ProductRoute;