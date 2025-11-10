import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("db connected")
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
};
