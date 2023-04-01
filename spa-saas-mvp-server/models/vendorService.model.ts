import { Schema, model, Document } from "mongoose";
import { SpaResourceInterface } from "./spaResources.model";

export interface VendorServiceInterface extends Document {
  categoryId: string,
  vendorSpaId: string,
  vendorUserId: string,
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
  // [TODO] replace all usage of vendorUserId in vendorServices with vendorSpaId
  vendorUserId: {
    type: String,
    required: true,
    unique: false,
  },
  vendorSpaId: {
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
