import { Schema, model, Document } from "mongoose";
import * as T from '../utilities/types';
import { VendorServiceInterface } from "./vendorService.model";


export interface MySpaInterface extends Document {
  userId: string,
  name: string,
  description: string,
  vendorServices: Array<VendorServiceInterface>;
  serviceCategories: T.ServiceCategoryId[];
}

const mySpaSchema = new Schema<MySpaInterface>({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  vendorServices: {
    type: [Object], // [TODO]
    required: true,
  }
}, {
  timestamps: true,
});

export default model<MySpaInterface>('MySpa', mySpaSchema);
