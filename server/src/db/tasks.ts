import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  note: { type: String },
  projectName: { type: String },
  done: { type: Boolean, default: false },
  numCompleted: { type: Number },
  numToComplete: { type: Number },
});

const TaskModel = mongoose.model("Task", TaskSchema);

export const getTaskById = (id: string) => TaskModel.findById(id);
export const getTaskByIdMany = (ids: string[] | mongoose.Types.ObjectId[]) =>
  TaskModel.find({ _id: { $in: ids } });
export const createTask = (values: Record<string, any>) =>
  new TaskModel(values).save().then((task) => task.toObject());
export const deleteTaskById = (id: string | mongoose.Types.ObjectId) =>
  TaskModel.findOneAndDelete({ _id: id });
export const updateTaskById = (id: string, values: Record<string, any>) =>
  TaskModel.findByIdAndUpdate(id, values);
