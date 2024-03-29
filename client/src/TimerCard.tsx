import React, { useState } from "react";
import Timer from "./Timer.tsx";
import { Button, Container, Group, Progress, Stack } from "@mantine/core";
import { TimerEnum } from "./enums.tsx";

interface TimerCardProps {
  timerPomodoro: number;
  timerShortBreak: number;
  timerLongBreak: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  timerType: TimerEnum;
  setTimerType: (val: TimerEnum) => void;
}

const TimerCard: React.FC<TimerCardProps> = ({
  timerPomodoro,
  timerShortBreak,
  timerLongBreak,
  autoStartBreaks,
  autoStartPomodoros,
  timerType,
  setTimerType,
}) => {
  const [start, setStart] = useState(autoStartPomodoros);
  const [progress, setProgress] = useState(100);
  const [forceRender, setForceRender] = useState(false); // State to force re-render
  const audioStart = new Audio("/sounds/timer-click.wav");

  const timerCallback = (time: number) => {
    console.log("Timer completed:", time, "seconds", "(type:", timerType, ")");
  };

  const handleTimerTypeChange = (type: TimerEnum) => {
    setForceRender(type == timerType && !forceRender);
    setTimerType(type);
    setProgress(100);
    setStart(
      (autoStartPomodoros && type == TimerEnum.Pomodoro) ||
        (autoStartBreaks && type == TimerEnum.ShortBreak) ||
        (autoStartBreaks && type == TimerEnum.LongBreak)
    );
  };

  const handleStart = (start: boolean) => () => {
    audioStart.play();
    setStart(start);
  };

  const getInitialTimer = () => {
    switch (timerType) {
      case TimerEnum.ShortBreak:
        return timerShortBreak * 60;
      case TimerEnum.LongBreak:
        return timerLongBreak * 60;
      default:
        return timerPomodoro * 60;
    }
  };

  const getVariant = () => {
    switch (timerType) {
      case TimerEnum.ShortBreak:
        return "timer-control-break-short" + (start ? "-down" : "");
      case TimerEnum.LongBreak:
        return "timer-control-break-long" + (start ? "-down" : "");
      default:
        return "timer-control-pomodoro" + (start ? "-down" : "");
    }
  };

  return (
    <>
      <Container size="sm">
        <Progress size="sm" w="100%" value={progress} variant="main" />
      </Container>
      <Container size="xs">
        <Container variant="timer">
          <Stack align="center">
            <Group gap={0}>
              <Button
                variant={
                  timerType == TimerEnum.Pomodoro
                    ? "timer-type-selected"
                    : "timer-type"
                }
                onClick={() => handleTimerTypeChange(TimerEnum.Pomodoro)}
              >
                Pomodoro
              </Button>
              <Button
                variant={
                  timerType == TimerEnum.ShortBreak
                    ? "timer-type-selected"
                    : "timer-type"
                }
                onClick={() => handleTimerTypeChange(TimerEnum.ShortBreak)}
              >
                Short Break
              </Button>
              <Button
                variant={
                  timerType == TimerEnum.LongBreak
                    ? "timer-type-selected"
                    : "timer-type"
                }
                onClick={() => handleTimerTypeChange(TimerEnum.LongBreak)}
              >
                Long Break
              </Button>
            </Group>

            <Timer
              key={timerType + (forceRender ? "-forceRender" : "")}
              initialTime={getInitialTimer()}
              start={start}
              setStart={setStart}
              setProgress={setProgress}
              callback={timerCallback}
            ></Timer>

            {start ? (
              <Button
                variant={getVariant()}
                size="xl"
                w="13rem"
                fw="bold"
                onClick={handleStart(false)}
              >
                PAUSE
              </Button>
            ) : (
              <Button
                variant={getVariant()}
                size="xl"
                w="13rem"
                fw="bold"
                onClick={handleStart(true)}
              >
                START
              </Button>
            )}
          </Stack>
        </Container>
      </Container>
    </>
  );
};

export default TimerCard;
