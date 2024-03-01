import React, { useEffect, useState } from "react";
import { Text } from "@mantine/core";

interface TimerProps {
  initialTime: number;
  start: boolean;
  setStart: (val: boolean) => void;
  setProgress: (val: number) => void;
  callback: (time: number) => void;
}

const Timer: React.FC<TimerProps> = ({
  initialTime,
  start,
  setStart,
  callback,
  setProgress,
}) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (start && time > 0) {
      const intervalId = setInterval(() => setTime((time) => time - 1), 1000);
      setProgress((time / initialTime) * 100);
      return () => clearInterval(intervalId);
    }

    if (time <= 0) {
      setStart(false);
      callback(initialTime - time);
    }
  }, [start, time]);

  return (
    <Text size="7.5rem" fw="bold" py="1rem">
      {Math.floor(time / 60)
        .toString()
        .padStart(2, "0")}
      :{(time % 60).toString().padStart(2, "0")}
    </Text>
  );
};

export default Timer;
