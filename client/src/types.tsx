export type TaskType = {
  id: string;
  userId: string;
  title: string;
  note: string;
  projectName: string;
  done: boolean;
  numCompleted: number;
  numToComplete: number;
  created: string
};

export type SettingsType = {
  userId: string;
  timerPomodoro: number,
  timerShortBreak: number,
  timerLongBreak: number,
  autoStartBreaks: boolean,
  autoStartPomodoros: boolean,
  longBreakInterval: number,
}