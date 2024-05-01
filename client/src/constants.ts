import { UserType } from "./types.tsx";

export const DOMAIN = "localhost";
export const PORT = 8081;

export const DEFAULT_USER: UserType = {
  _id: "",
  username: "",
  email: "",
  settings: {
    timerPomodoro: 25,
    timerShortBreak: 5,
    timerLongBreak: 15,
    autoStartBreaks: false,
    autoStartPomodoros: false,
    longBreakInterval: 4,
  },
  tasks: [],
};
