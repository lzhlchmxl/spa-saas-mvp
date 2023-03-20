import { Schema, model, Document } from "mongoose";
import serviceCategoryModel from "./serviceCategory.model";
import * as T from '../utilities/types';
import { VendorServiceInterface } from "./vendorService.model";


export interface VendorProfileInterface extends Document {
  userId: string;
  firstName: string;
  lastName: string;
  businessName: string;
  phoneNumber: string;
  emailAddress: string;
  businessAddress: string;
  vendorServices: Array<VendorServiceInterface>;
  serviceCategories: T.ServiceCategoryId[];
}

const vendorProfileSchema = new Schema<VendorProfileInterface>({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  emailAddress: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  businessName: {
    type: String,
    required: true,
    trim: true,
  },
  businessAddress: {
    type: String,
    required: true,
  },
  serviceCategories: {
    type: [String],
    required: true,
  },
  vendorServices: {
    type: [Object], // [TODO] 
    required: false,
  },
}, {
  timestamps: true,
});

export default model<VendorProfileInterface>('VendorProfile', vendorProfileSchema);
