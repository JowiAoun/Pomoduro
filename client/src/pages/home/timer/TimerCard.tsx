import React, { useState } from "react";
import Timer from "./Timer.tsx";
import { Button, Container, Group, Progress, Stack } from "@mantine/core";
import { TimerEnum } from "../../../utils/enums.ts";
import { SettingType } from "../../../utils/types.ts";
import {
  getInitialTimer,
  getVariant,
  handleStart,
  timerCallback,
} from "./handlers.ts";

interface TimerCardProps {
  setting: SettingType;
  timerType: TimerEnum;
  setTimerType: (val: TimerEnum) => void;
}

const TimerCard: React.FC<TimerCardProps> = ({
  setting,
  timerType,
  setTimerType,
}) => {
  const [start, setStart] = useState(setting.autoStartPomodoros);
  const [progress, setProgress] = useState(100);
  const [forceRender, setForceRender] = useState(false); // State to force re-render

  const handleTimerTypeChange = (type: TimerEnum) => {
    setForceRender(type == timerType && !forceRender);
    setTimerType(type);
    setProgress(100);
    setStart(
      (setting.autoStartPomodoros && type == TimerEnum.Pomodoro) ||
        (setting.autoStartBreaks && type == TimerEnum.ShortBreak) ||
        (setting.autoStartBreaks && type == TimerEnum.LongBreak)
    );
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
              initialTime={getInitialTimer(timerType, setting)}
              start={start}
              setStart={setStart}
              setProgress={setProgress}
              callback={(time: number) => timerCallback(time, timerType)}
            ></Timer>

            {start ? (
              <Button
                variant={getVariant(timerType, start)}
                size="xl"
                w="13rem"
                fw="bold"
                onClick={handleStart(false, setStart)}
              >
                PAUSE
              </Button>
            ) : (
              <Button
                variant={getVariant(timerType, start)}
                size="xl"
                w="13rem"
                fw="bold"
                onClick={handleStart(true, setStart)}
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
