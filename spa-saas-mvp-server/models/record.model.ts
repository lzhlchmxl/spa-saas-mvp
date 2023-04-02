import { Schema, model, Document } from "mongoose";

export interface RecordInterface extends Document {
  clientId: string,
  vendorId: string,
  spaId: string,
  serviceId: string,
  serviceStage: ServiceStage,
  scheduledStartDateTime: Date,
  practitioner: string,
  paymentStage: "",
}

type ServiceStage = "booking" | "booked" | "rescheduling" | "canceled" | "completed" | "paid"

const recordSchema = new Schema<RecordInterface>({
  clientId: {
    type: String,
    required: true,
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
  serviceId: {
    type: String,
    required: false,
  },
  serviceStage: {
    type: String,
    required: true,
    unique: false,
  },
  scheduledStartDateTime: {
    type: Date,
    required: true,
  },
  practitioner: {
    type: String,
    required: true,
  },
  paymentStage: {
    type: String,
    required: false,
  }
}, {
  timestamps: true,
});

export default model<RecordInterface>('Record', recordSchema);
