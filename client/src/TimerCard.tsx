import React, { useState } from "react";
import Timer from "./Timer.tsx";
import { Button, Container, Group, Progress, Stack } from "@mantine/core";

interface TimerCardProps {
  timerPomodoro: number;
  timerShortBreak: number;
  timerLongBreak: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
}

enum TimerType {
  Pomodoro = 0,
  ShortBreak = 1,
  LongBreak = 2,
}

const TimerCard: React.FC<TimerCardProps> = ({
  timerPomodoro,
  timerShortBreak,
  timerLongBreak,
  autoStartBreaks,
  autoStartPomodoros,
}) => {
  const [start, setStart] = useState(autoStartPomodoros);
  const [timerType, setTimerType] = useState(TimerType.Pomodoro);
  const [progress, setProgress] = useState(100);
  const [forceRender, setForceRender] = useState(false); // State to force re-render

  const timerCallback = (time: number) => {
    console.log("Timer completed:", time, "seconds", "(type:", timerType, ")");
  };

  const handleTimerTypeChange = (type: TimerType) => {
    setForceRender(type == timerType && !forceRender);
    setTimerType(type);
    setProgress(100);
    setStart(
      (autoStartPomodoros && type == TimerType.Pomodoro) ||
        (autoStartBreaks && type == TimerType.ShortBreak) ||
        (autoStartBreaks && type == TimerType.LongBreak)
    );
  };

  const getInitialTimer = () => {
    switch (timerType) {
      case TimerType.ShortBreak:
        return timerShortBreak * 60;
      case TimerType.LongBreak:
        return timerLongBreak * 60;
      default:
        return timerPomodoro * 60;
    }
  };

  return (
    <>
      <Progress value={progress} color="red" />
      <Container size="xs" py="1.5rem" my="2rem">
        <Stack align="center">
          <Group>
            <Button onClick={() => handleTimerTypeChange(TimerType.Pomodoro)}>
              Pomodoro
            </Button>
            <Button onClick={() => handleTimerTypeChange(TimerType.ShortBreak)}>
              Short Break
            </Button>
            <Button onClick={() => handleTimerTypeChange(TimerType.LongBreak)}>
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
              size="xl"
              w="11rem"
              fw="bold"
              onClick={() => setStart(false)}
            >
              PAUSE
            </Button>
          ) : (
            <Button
              size="xl"
              w="11rem"
              fw="bold"
              onClick={() => setStart(true)}
            >
              START
            </Button>
          )}
        </Stack>
      </Container>
    </>
  );
};

export default TimerCard;
