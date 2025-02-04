import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"; // Import bcrypt
import type { Document, Model } from "mongoose";
import type { StudentRegisterForm } from "../app/api/auth/signup/interface";

export interface StudentDocument extends Document, Omit<StudentRegisterForm, "confirmPassword"> {}

const StudentSchema: Schema<StudentDocument> = new Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  gender: { type: String, required: true },
  grade: { type: String, required: true },
  schoolName: { type: String, required: true, trim: true },
  phoneNumber: { 
    type: String, 
    required: true, 
    match: /^[0-9]{10}$/ 
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
  parentEmail: {
    type: String,
    required: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
  password: { 
    type: String, 
    required: true, 
    minlength: 6 
  },
  userRole: { 
    type: String, 
    required: true,
    default: "student"
  },
}, {
  collection: 'users' // Explicit collection name
});

// Hash password before saving to the database
StudentSchema.pre<StudentDocument>("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if password is modified

  try {
    const salt = await bcrypt.genSalt(10); // Generate a salt
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next();
  } catch (error: any) {
    next(error);
  }
});

// Method to compare passwords (useful for login)
StudentSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

const StudentModel: Model<StudentDocument> =
  mongoose.models.Student ||
  mongoose.model<StudentDocument>("Student", StudentSchema);

export default StudentModel;