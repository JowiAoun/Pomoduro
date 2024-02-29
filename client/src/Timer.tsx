import React, { useEffect, useState } from "react";
import { Text } from "@mantine/core";

interface TimerProps {
  initialTime: number;
  start: boolean;
  setStart: (val: boolean) => void;
  callback: (time: number) => void;
}

const Timer: React.FC<TimerProps> = ({
  initialTime,
  start,
  setStart,
  callback,
}) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (start && time > 0) {
      const intervalId = setInterval(() => setTime((time) => time - 1), 1000);
      return () => clearInterval(intervalId);
    }

    if (time <= 0) {
      setStart(false);
      callback(initialTime - time);
    }
  }, [start, time]);

  return (
    <Text>
      {Math.floor(time / 60).toLocaleString(undefined, {
        minimumIntegerDigits: 2,
      })}
      :
      {(time % 60).toLocaleString(undefined, {
        minimumIntegerDigits: 2,
      })}
    </Text>
  );
};

export default Timer;
