import { Schema, model, Document } from "mongoose";

export interface VendorServiceInterface extends Document {
  name: string,
  description: string,
  duration: string,
  cost: string,
}

const vendorServiceSchema = new Schema<VendorServiceInterface>({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
    unique: true
  },
  duration: {
    type: String,
    required: true,
    unique: true
  },
  cost: {
    type: String,
    required: true,
    unique: true
  },
}, {
  timestamps: true,
});

export default model<VendorServiceInterface>('VendorService', vendorServiceSchema);
