import mongoose, { Document } from "mongoose";

export interface SettingDocument extends Document {
  timerPomodoro: number;
  timerShortBreak: number;
  timerLongBreak: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  longBreakInterval: number;
}

const SettingSchema = new mongoose.Schema<SettingDocument>({
  timerPomodoro: { type: Number, default: 25 },
  timerShortBreak: { type: Number, default: 5 },
  timerLongBreak: { type: Number, default: 15 },
  autoStartBreaks: { type: Boolean, default: false },
  autoStartPomodoros: { type: Boolean, default: false },
  longBreakInterval: { type: Number, default: 4 },
});

const SettingModel = mongoose.model<SettingDocument>("Setting", SettingSchema);

export default SettingModel;
