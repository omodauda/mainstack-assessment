import { Schema, model } from 'mongoose';
import { IProductCategory } from 'src/interfaces/product';



const productCategorySchema = new Schema<IProductCategory>({
  name: {
    type: String,
    required: true,
    unique: true,
  }
});

const ProductCategory = model<IProductCategory>('ProductCategory', productCategorySchema);

export default ProductCategory;