import { Schema, model, Document } from "mongoose";

export interface VendorServiceInterface extends Document {
  categoryId: string,
  vendorUserId: string,
  name: string,
  description: string,
  durationInSeconds: number,
  cost: string,
}

const vendorServiceSchema = new Schema<VendorServiceInterface>({
  categoryId: {
    type: String,
    required: true,
    unique: false,
  },
  vendorUserId: {
    type: String,
    required: true,
    unique: false,
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
    unique: false,
  },
  durationInSeconds: {
    type: Number,
    required: true,
    unique: false,
  },
  cost: {
    type: String,
    required: true,
    unique: false,
  },
}, {
  timestamps: true,
});

export default model<VendorServiceInterface>('VendorService', vendorServiceSchema);
