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
    unique: true,
  },
  vendorUserId: {
    type: String,
    required: true,
    unique: true,
  },
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
  durationInSeconds: {
    type: Number,
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
