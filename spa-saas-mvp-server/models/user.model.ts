import { Schema, model, Document } from "mongoose";

export interface UserInterface extends Document {
  username: string;
  password: string;
  role: 'client' | 'vendor';
}

const userSchema = new Schema<UserInterface>({
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

export default model<UserInterface>('User', userSchema);
