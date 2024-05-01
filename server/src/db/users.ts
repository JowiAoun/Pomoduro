import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      default: [],
    },
  ],
  settings: {
    timerPomodoro: { type: Number, default: 25 },
    timerShortBreak: { type: Number, default: 5 },
    timerLongBreak: { type: Number, default: 15 },
    autoStartBreaks: { type: Boolean, default: false },
    autoStartPomodoros: { type: Boolean, default: false },
    longBreakInterval: { type: Number, default: 4 },
  },
});

const UserModel = mongoose.model("User", UserSchema);

export const getUsers = () => UserModel.find().populate("tasks");
export const getUserByEmail = (email: string) =>
  UserModel.findOne({ email }).populate("tasks");
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({
    "authentication.sessionToken": sessionToken,
  }).populate("tasks");
export const getUserById = (id: string) =>
  UserModel.findById(id).populate("tasks");
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);
