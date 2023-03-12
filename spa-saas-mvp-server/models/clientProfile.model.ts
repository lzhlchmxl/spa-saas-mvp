import { Schema, model, Document } from "mongoose";

export interface ClientProfileInterface extends Document {
  userId: string;
  username: string;
  password: string;
  role: 'client' | 'vendor';
}

const userSchema = new Schema<ClientProfileInterface>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8
  },
  role: {
    type: String,
    enum: ['client', 'vendor'],
  }
}, {
  timestamps: true,
});

export default model<ClientProfileInterface>('User', userSchema);
