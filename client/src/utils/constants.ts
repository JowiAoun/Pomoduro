import { UserType } from "./types.ts";

export const DOMAIN = "localhost";
export const PORT = 8080;

export const DEFAULT_USER: UserType = {
  _id: "",
  username: "",
  email: "",
  setting: {
    timerPomodoro: 25,
    timerShortBreak: 5,
    timerLongBreak: 15,
    autoStartBreaks: false,
    autoStartPomodoros: false,
    longBreakInterval: 4,
  },
  tasks: [],
};
