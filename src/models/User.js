import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  _id: Schema.Types.ObjectId,
  username: {
    type: String,
    required: true,
  },
});

const User = model("User", UserSchema);

export { User, UserSchema };
