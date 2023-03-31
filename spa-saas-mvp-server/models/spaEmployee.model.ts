import { Schema, model, Document } from "mongoose";
import * as T from '../utilities/types';

export interface SpaEmployeeInterface extends Document {
  spaId: string,
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  status: "active" | "vacation" | "off-work",
  permission: "basic" | "advanced",
  unavilableDateTimeRanges: T.DateTimeRange[],
}

export const spaEmployeeSchema = new Schema<SpaEmployeeInterface>({
  spaId: {
    type: String,
    required: true,
    unique: false,
  },
  // spaCode: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  username: {
    type: String,
    required: true,
    unique: false,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  permission: {
    type: String,
    required: true,
  },
  unavilableDateTimeRanges: {
    type: [{
      startDateTime: Date,
      endDateTime: Date,
    }],
    required: true,
  }
}, {
  timestamps: true,
});

export default model<SpaEmployeeInterface>('SpaEmployee', spaEmployeeSchema);
