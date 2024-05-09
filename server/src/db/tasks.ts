import mongoose, { Document } from "mongoose";

export interface TaskDocument extends Document {
  title: string;
  note: string;
  projectName: string;
  done: boolean;
  numCompleted: number;
  numToComplete: number;
}

const TaskSchema = new mongoose.Schema<TaskDocument>({
  title: { type: String, required: true },
  note: { type: String },
  projectName: { type: String },
  done: { type: Boolean, default: false },
  numCompleted: { type: Number },
  numToComplete: { type: Number },
});

const TaskModel = mongoose.model<TaskDocument>("Task", TaskSchema);

export default TaskModel;
