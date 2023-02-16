import { Schema, model } from 'mongoose';
import { IProductCategory } from 'src/interfaces/product.interface';



const productCategorySchema = new Schema<IProductCategory>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

productCategorySchema.virtual('subcategories', {
  ref: 'ProductSubCategory',
  localField: '_id',
  foreignField: 'category'
});

const ProductCategory = model<IProductCategory>('ProductCategory', productCategorySchema);

export default ProductCategory;