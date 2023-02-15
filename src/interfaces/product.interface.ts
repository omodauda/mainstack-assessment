import { Types } from 'mongoose';

export interface IProductCategory {
  name: string;
  subcategories?: [Types.ObjectId]
}

export interface IProductSubCategory {
  name: string;
  category: Types.ObjectId
}