import { Schema, model } from 'mongoose';
import { IProductSubCategory } from 'src/interfaces/product.interface';

const productSubCategory = new Schema<IProductSubCategory>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'ProductCategory'
  }
});

const ProductSubCategory = model<IProductSubCategory>('ProductSubCategory', productSubCategory);

export default ProductSubCategory;