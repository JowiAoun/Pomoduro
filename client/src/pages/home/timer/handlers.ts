import { TimerEnum } from "../../../utils/enums.ts";
import { SettingType } from "../../../utils/types.ts";

export const timerCallback = (time: number, timerType: TimerEnum) => {
  console.log("Timer completed:", time, "seconds", "(type:", timerType, ")");
};

export const handleStart =
  (start: boolean, setStart: (val: boolean) => void) => () => {
    const audioStart = new Audio("/sounds/timer-click.wav");
    audioStart.play();
    setStart(start);
  };

export const getInitialTimer = (timerType: TimerEnum, setting: SettingType) => {
  switch (timerType) {
    case TimerEnum.ShortBreak:
      return setting.timerShortBreak * 60;
    case TimerEnum.LongBreak:
      return setting.timerLongBreak * 60;
    default:
      return setting.timerPomodoro * 60;
  }
};

export const getVariant = (timerType: TimerEnum, start: boolean) => {
  switch (timerType) {
    case TimerEnum.ShortBreak:
      return "timer-control-break-short" + (start ? "-down" : "");
    case TimerEnum.LongBreak:
      return "timer-control-break-long" + (start ? "-down" : "");
    default:
      return "timer-control-pomodoro" + (start ? "-down" : "");
  }
};
