import { Types } from 'mongoose';

export interface IProductCategory {
  name: string;
}

export interface IProductSubCategory {
  name: string;
  category: Types.ObjectId
}