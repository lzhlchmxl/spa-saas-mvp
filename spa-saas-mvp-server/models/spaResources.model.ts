import { Schema, model, Document } from "mongoose";

export interface SpaResourceInterface extends Document {
  spaId: string,
  vendorId: string,
  name: string,
  availableCount: number,
  type: "ingradient" | "supply" | "spot" | "room",
}

export const spaResourceSchema = new Schema<SpaResourceInterface>({
  spaId: {
    type: String,
    required: true,
    unique: false,
  },
  vendorId: {
    type: String,
    required: true,
    unique: false,
  },
  name: {
    type: String,
    required: true,
    unique: false,
  },
  availableCount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

export default model<SpaResourceInterface>('SpaResource', spaResourceSchema);
