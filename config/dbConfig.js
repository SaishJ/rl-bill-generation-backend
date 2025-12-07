import mongoose from "mongoose";

console.log(process.env.MONGO_STRING);

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_STRING);
    console.log(
      `Connected to ${connect.connection.host} ${connect.connection.name}`
    );
  } catch (error) {
    console.log("Error while connecting to database:", error);
    process.exit(1);
  }
};

export default connectDb;
