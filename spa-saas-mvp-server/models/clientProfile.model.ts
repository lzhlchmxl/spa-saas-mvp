import { Schema, model, Document } from "mongoose";

export interface ClientProfileInterface extends Document {
  userId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  phoneNumber: string;
  emailAddress: string;
  homeAddress: string;
}

const clientProfileSchema = new Schema<ClientProfileInterface>({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  homeAddress: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default model<ClientProfileInterface>('ClientProfile', clientProfileSchema);
