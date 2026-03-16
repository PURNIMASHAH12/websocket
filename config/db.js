import mongoose from "mongoose";

// Connect
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONOG_URL);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

export default connectDB;
