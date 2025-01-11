import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false }, // To assign admin privileges
});

const UsersModel = mongoose.models.Users || mongoose.model("Users", userSchema);
export default UsersModel;
