import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to database");
  } catch (error) {
    console.log(`Error connection to database: ${error.message}`);
  }
};

export default connectDB;