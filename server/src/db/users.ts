import mongoose, { Document, ObjectId } from "mongoose";

export interface UserDocument extends Document {
  username: string;
  email: string;
  auth: {
    password: string;
    salt: string;
    sessionToken: string;
  };
  tasks: ObjectId[];
  setting: ObjectId;
  _dateCreated: number;
}

const UserSchema = new mongoose.Schema<UserDocument>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  auth: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
  tasks: { type: [mongoose.Schema.Types.ObjectId], ref: "Task", default: [] },
  setting: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Setting",
    default: null,
  },
  _dateCreated: {
    type: Number,
    default: () => Math.floor(new Date().getTime() / 1000),
  },
});

const UserModel = mongoose.model<UserDocument>("User", UserSchema);

export default UserModel;
