import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required!"],
  },
  image: {
    type: String,
  },
});

const User = model("User", UserSchema);

export default User;
