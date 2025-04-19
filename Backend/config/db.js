import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const DB_URL = `mongodb+srv://${process.env.DB_AUTH_USER}:${process.env.DB_AUTH_PASSWORD}@${process.env.DB_URL}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

    await mongoose.connect(DB_URL, {
      maxPoolSize: 10,
    });

    const db = mongoose.connection;
    db.on("connected", () => {
      console.log("Mongoose default connection established.", DB_URL, "on", db.name);
    });

    db.on("close", () => {
      console.log("Mongoose connection closed.");
    });

    db.on("disconnected", () => {
      console.log("Mongoose default connection ended.");
    });

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;


// import mongoose from "mongoose";

// const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect(process.env.DB_URL);
//         console.log(`Connection established : ${conn.connection.host}`);
//     } catch (error) {
//         console.log(error);
//         process.exit(1);
//     }
// }

// export default connectDB