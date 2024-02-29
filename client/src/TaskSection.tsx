import React from "react";
import { Button, Divider, Group, Stack, Text } from "@mantine/core";
import { IconCirclePlus } from "@tabler/icons-react";
import TaskMenu from "./TaskMenu";
import Task from "./Task.tsx";

interface TasksProps {
  tasks: { title: string; numCompleted: number; numToComplete: number }[];
  timerPomodoro: number;
  timerShortBreak: number;
  timerLongBreak: number;
  longBreakInterval: number;
}

const TaskSection: React.FC<TasksProps> = ({
  tasks,
  timerPomodoro,
  timerShortBreak,
  timerLongBreak,
  longBreakInterval,
}) => {
  function getNumCompleted() {
    let n = 0;
    for (let i = 0; i < tasks.length; i++) n += tasks[i].numCompleted;
    return n;
  }

  function getNumToComplete() {
    let n = 0;
    for (let i = 0; i < tasks.length; i++) n += tasks[i].numToComplete;
    return n;
  }

  function getFinishTime() {
    const numToComplete = getNumToComplete();
    const numCompleted = getNumCompleted();

    const totalPomodoroTime = numToComplete * timerPomodoro;
    const completedPomodoroTime = numCompleted * timerPomodoro;
    const longBreaks = Math.floor(numToComplete / longBreakInterval);
    const longBreakTime = longBreaks * timerLongBreak;
    const totalBreakTime = (numToComplete - 1) * timerShortBreak;

    return (
      totalPomodoroTime - completedPomodoroTime + longBreakTime + totalBreakTime
    );
  }

  function getRemainingTimeStr() {
    const time = getFinishTime();
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
  }

  function getFinishTimeStr() {
    let date = new Date();
    const time = getFinishTime();
    const hours = Math.floor(time / 60);
    const mins = time % 60;

    date.setHours(date.getHours() + hours);
    date.setMinutes(date.getHours() + mins);

    return date.getHours() + ":" + date.getMinutes();
  }

  return (
    <Stack>
      <Text>
        #{1}
        <br></br>
        {"abcd"}
      </Text>

      <Group>
        <Text>Tasks</Text>
        <TaskMenu></TaskMenu>
      </Group>

      <Divider></Divider>

      {tasks.map((task, index) => (
        <Task
          title={task.title}
          numCompleted={task.numCompleted}
          numToComplete={task.numToComplete}
          key={index}
        />
      ))}

      <Button>
        <IconCirclePlus></IconCirclePlus>Add Task
      </Button>
      {/*TODO: complete finish time and use current time to get finish at*/}
      <Text>
        Pomos: {getNumCompleted()} / {getNumToComplete()} Finish At:{" "}
        {getFinishTimeStr()} ({getRemainingTimeStr()})
      </Text>
    </Stack>
  );
};

export default TaskSection;
