import { Schema, model, Document } from "mongoose";
import { SpaResourceInterface } from "./spaResources.model";

export interface VendorServiceInterface extends Document {
  categoryId: string,
  spaId: string,
  vendorId: string,
  name: string,
  description: string,
  durationInSeconds: number,
  cost: string,
  requiredSpaResources: { spaResourceId: SpaResourceInterface['_id'], requiredCount: number  }[],
}

const vendorServiceSchema = new Schema<VendorServiceInterface>({
  categoryId: {
    type: String,
    // required: true,
    unique: false,
  },
  vendorId: {
    type: String,
    required: true,
    unique: false,
  },
  spaId: {
    type: String,
    required: true,
    unique: false,
  },
  name: {
    type: String,
    required: true,
    unique: false,
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
  requiredSpaResources: {
    type: [{ spaResourceId: Schema.Types.ObjectId, requiredCount: Number }],
    required: true,
  }
}, {
  timestamps: true,
});

export default model<VendorServiceInterface>('VendorService', vendorServiceSchema);
