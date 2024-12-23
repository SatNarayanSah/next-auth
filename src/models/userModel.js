import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: string,
    required: [true, "please provide username"],
    unique: true,
  },
  email: {
    type: string,
    required: [true, "please provide enail"],
    unique: true,
  },

  password: {
    type: string,
    required: [true, "please provide password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: string,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});


const User = mongoose.model.users || mongoose.model("users", userSchema)
export default User