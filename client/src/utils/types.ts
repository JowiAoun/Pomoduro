export type TaskType = {
  _id: string;
  userId: string;
  title: string;
  note: string;
  projectName: string;
  done: boolean;
  numCompleted: number;
  numToComplete: number;
  created: string;
};

export type SettingType = {
  timerPomodoro: number;
  timerShortBreak: number;
  timerLongBreak: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  longBreakInterval: number;
};

export type UserType = {
  _id: string;
  username: string;
  email: string;
  tasks: TaskType[];
  setting: SettingType;
};
