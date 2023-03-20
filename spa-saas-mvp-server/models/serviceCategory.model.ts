import { Schema, model, Document } from "mongoose";

export interface ServiceCategoryInterface extends Document {
  name: string,
  description: string,
}

const serviceCategorySchema = new Schema<ServiceCategoryInterface>({
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
}, {
  timestamps: true,
});

export default model<ServiceCategoryInterface>('ServiceCategory', serviceCategorySchema);
