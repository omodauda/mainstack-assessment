import { Schema, model } from 'mongoose';
import { IProduct } from 'src/interfaces/product.interface';

const productSchema = new Schema<IProduct>({
  category: {
    type: Schema.Types.ObjectId,
    ref: 'ProductCategory',
    required: true
  },
  subcategory: {
    type: Schema.Types.ObjectId,
    ref: 'ProductSubCategory',
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 200
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true
  },
  images: [
    {
      public_id: String,
      url: String,
    }
  ]
}, { timestamps: true });

const Product = model<IProduct>('Product', productSchema);

export default Product;