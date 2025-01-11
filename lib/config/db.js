import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://izhar:ly3ttnVnCnmUDc2s@blog.a1362.mongodb.net/",
    {
      dbName: "blog",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  console.log("MongoDB connected");
};

export default connectDB;
