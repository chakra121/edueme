import mongoose, { Schema, type Document } from "mongoose";
import type { DemoForm } from "../app/api/register/interface";

interface DemoFormDocument extends Document, DemoForm {}

const DemoFormSchema: Schema = new Schema<DemoFormDocument>({
  name: { type: String, required: true, trim: true },
  phoneNumber: { type: String, required: true, match: /^[0-9]{10}$/ },
  email: { type: String, required: true, unique: true, match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ },
  grade: { type: String, required: true },
});

const DemoFormModel =
  mongoose.models.DemoForm ??
  mongoose.model<DemoFormDocument>("DemoForm", DemoFormSchema);

export default DemoFormModel;
