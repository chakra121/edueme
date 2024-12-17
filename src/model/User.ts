import mongoose, { Schema } from "mongoose";
import type { Document, Model } from "mongoose";
import type { DemoForm } from "../app/api/register/interface";

// Define the interface extending both Document and DemoForm
export interface DemoFormDocument extends Document, DemoForm {
  password: string; // Add password field
}

// Define the schema
const DemoFormSchema: Schema = new Schema<DemoFormDocument>({
  name: { type: String, required: true, trim: true },
  phoneNumber: { type: String, required: true, match: /^[0-9]{10}$/ },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
  grade: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 }, // Add password
});

// Define the model with explicit typing
const DemoFormModel: Model<DemoFormDocument> =
  mongoose.models.DemoForm ??
  mongoose.model<DemoFormDocument>("DemoForm", DemoFormSchema);

export default DemoFormModel;
