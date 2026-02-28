import { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  refresh_token: {
    type: String,
    default: null,
  },
});

const UserModel = model("User", userSchema);
export default UserModel;
