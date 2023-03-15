import { Schema, model, Document } from "mongoose";

export interface VendorProfileInterface extends Document {
  userId: string;
  businessName: string;
  phoneNumber: string;
  emailAddress: string;
  businessAddress: string;
  services: string[];
}

const vendorProfileSchema = new Schema<VendorProfileInterface>({
  userId: {
    type: String,
    required: true,
    unique: true
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
  services: {
    type: [String],
    required: true,
  },
}, {
  timestamps: true,
});

export default model<VendorProfileInterface>('VendorProfile', vendorProfileSchema);
