import { Types } from 'mongoose';

export interface IProductCategory {
  name: string;
}

export interface IProductSubCategory {
  name: string;
  category: Types.ObjectId
}

export interface IProduct {
  category: Types.ObjectId;
  subcategory: Types.ObjectId;
  name: string;
  brand: string;
  description: string;
  price: number;
  quantity: number;
  images: [IProductImages]
}

export interface IProductImages {
  url: string;
  id: string;
}