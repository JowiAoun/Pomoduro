import { TimerEnum } from "./enums.ts";
import { SettingType, TaskType } from "./types.ts";

export const getSessionTokenFromCookie = () => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; POMODURO-AUTH=`);

  if (parts && parts.length >= 1) {
    const part = parts.pop();
    if (part) {
      return part.split(";")[0];
    }
  }

  return undefined;
};

export const getAppVariant = (timerType: TimerEnum) => {
  switch (timerType) {
    case TimerEnum.ShortBreak:
      return "timer-control-break-short";
    case TimerEnum.LongBreak:
      return "timer-control-break-long";
    default:
      return "timer-control-pomodoro";
  }
};

export const getNumCompleted = (tasks: TaskType[]) => {
  let n = 0;
  for (let i = 0; i < tasks.length; i++) n += tasks[i].numCompleted;
  return n;
};

export const getNumToComplete = (tasks: TaskType[]) => {
  let n = 0;
  for (let i = 0; i < tasks.length; i++) n += tasks[i].numToComplete;
  return n;
};

export const getFinishTime = (tasks: TaskType[], setting: SettingType) => {
  const numToComplete = getNumToComplete(tasks);
  const numCompleted = getNumCompleted(tasks);

  const totalPomodoroTime = numToComplete * setting.timerPomodoro;
  const completedPomodoroTime = numCompleted * setting.timerPomodoro;
  const longBreaks = Math.floor(numToComplete / setting.longBreakInterval);
  const longBreakTime = longBreaks * setting.timerLongBreak;
  const totalBreakTime = (numToComplete - 1) * setting.timerShortBreak;

  return (
    totalPomodoroTime - completedPomodoroTime + longBreakTime + totalBreakTime
  );
};

export const getRemainingTimeStr = (
  tasks: TaskType[],
  setting: SettingType
) => {
  const time = getFinishTime(tasks, setting);
  const hours = Math.floor(time / 60);
  const mins = time % 60;

  if (hours > 0) {
    if (mins === 0) {
      return hours + "h";
    } else {
      return hours + "h" + mins + "m";
    }
  } else {
    return mins + "m";
  }
};

export const getFinishTimeStr = (tasks: TaskType[], setting: SettingType) => {
  const date = new Date();
  const time = getFinishTime(tasks, setting);
  const hours = Math.floor(time / 60);
  const mins = time % 60;

  date.setHours(date.getHours() + hours);
  date.setMinutes(date.getHours() + mins);

  return date.getHours() + ":" + date.getMinutes().toString().padStart(2, "0");
};

export const getActionStr = (
  tasks: TaskType[],
  selectedTask: number,
  timerType: TimerEnum
) => {
  if (tasks.length > 0 && tasks[selectedTask]) {
    return tasks[selectedTask].title;
  } else if (
    timerType == TimerEnum.ShortBreak ||
    timerType == TimerEnum.LongBreak
  ) {
    return "Time for a break!";
  } else {
    return "Time to focus!";
  }
};
