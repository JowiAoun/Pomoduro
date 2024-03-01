import React, { useState } from "react";
import {
  Button,
  Center,
  Container,
  Divider,
  Group,
  Stack,
  Text,
} from "@mantine/core";
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
  const [selectedTask, setSelectedTask] = useState(0);

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

    return (
      date.getHours() + ":" + date.getMinutes().toString().padStart(2, "0")
    );
  }

  return (
    <Stack>
      <Container>
        <Center>
          <Text>#{1}</Text> {/*TODO: make 1 not static*/}
        </Center>
        <Center>
          <Text>{tasks[selectedTask].title}</Text>
        </Center>
      </Container>

      <Group justify="space-between">
        <Text>Tasks</Text>
        <TaskMenu></TaskMenu>
      </Group>

      <Divider></Divider>

      {tasks.map((task, index) => (
        <Task
          title={task.title}
          numCompleted={task.numCompleted}
          numToComplete={task.numToComplete}
          setSelectedTask={setSelectedTask}
          key={index}
          index={index}
        />
      ))}

      <Button>
        <IconCirclePlus></IconCirclePlus>Add Task
      </Button>

      <Text>
        Pomos: {getNumCompleted()} / {getNumToComplete()} Finish At:{" "}
        {getFinishTimeStr()} ({getRemainingTimeStr()})
      </Text>
    </Stack>
  );
};

export default TaskSection;
