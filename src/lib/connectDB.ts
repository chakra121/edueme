import mongoose from "mongoose";

export const connectDb = async () => {
  if (mongoose.connections[0]?.readyState) {
    return true;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      dbName: "authentication" // Explicit database name
    });
    console.log("MongoDB connected to authentication database");
    console.log("MongoDB connected");
  } catch (error) {
    console.log("DB Connection Failed", error);
    process.exit(1);
  }
};