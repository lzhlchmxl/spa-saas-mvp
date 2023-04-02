import { Schema, model, Document } from "mongoose";
import { SpaEmployeeInterface } from './spaEmployee.model';
import { VendorServiceInterface } from "./vendorService.model";
import { SpaResourceInterface } from "./spaResources.model";
import { RecordInterface } from "./record.model";

export interface MySpaInterface extends Document {
  userId: string,
  name: string,
  description: string,
  employees: SpaEmployeeInterface['_id'],
  serviceIds: VendorServiceInterface['_id'],
  resourceIds: SpaResourceInterface['_id'],
  recordIds: RecordInterface['_id'],
}

const mySpaSchema = new Schema<MySpaInterface>({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: false,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
  employees: {
    type: [Schema.Types.ObjectId],
    required: true,
    unique: false,
  },
  serviceIds: {
    type: [Schema.Types.ObjectId],
    required: true,
  },
  resourceIds: {
    type: [Schema.Types.ObjectId],
    required: true,
  },
  recordIds: {
    type: [Schema.Types.ObjectId],
    required: true,
  }

}, {
  timestamps: true,
});

export default model<MySpaInterface>('MySpa', mySpaSchema);
