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
import { TaskType } from "./types.tsx";
import { TimerEnum } from "./enums.tsx";

interface TasksProps {
  _tasks: TaskType[];
  timerPomodoro: number;
  timerShortBreak: number;
  timerLongBreak: number;
  longBreakInterval: number;
  timerType: TimerEnum;
}

const TaskSection: React.FC<TasksProps> = ({
  _tasks,
  timerPomodoro,
  timerShortBreak,
  timerLongBreak,
  longBreakInterval,
  timerType,
}) => {
  const [selectedTask, setSelectedTask] = useState(_tasks.length > 0 ? 0 : -1);
  const [tasks, setTasks] = useState(_tasks);

  function handleDelete(id: string) {
    setSelectedTask(0);
    setTasks((tasks: TaskType[]) =>
      tasks.filter((task: TaskType) => task.id !== id)
    );
  }

  function handleSelect(id: string) {
    const index = tasks.findIndex((task: TaskType) => task.id === id);
    setSelectedTask(index);
  }

  function handleClearFinishedTasks() {
    setTasks((tasks: TaskType[]) =>
      tasks.filter((task: TaskType) => task.numCompleted < task.numToComplete)
    );
    tasks.length > 0 ? setSelectedTask(0) : setSelectedTask(-1);
  }

  function handleClearActPomodoros() {
    setTasks((tasks: TaskType[]) =>
      tasks.map((task: TaskType) => {
        task.numCompleted = 0;
        return task;
      })
    );
  }

  function handleAddFromTemplate() {
    throw new Error("Function not implemented.");
  }

  function handleImportFromTodoist() {
    throw new Error("Function not implemented.");
  }

  function handleClearAllTasks() {
    setSelectedTask(-1);
    setTasks([]);
  }

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

  function getActionStr() {
    if (tasks.length > 0) {
      return tasks[selectedTask].title;
    } else if (
      timerType == TimerEnum.ShortBreak ||
      timerType == TimerEnum.LongBreak
    ) {
      return "Time for a break!";
    } else {
      return "Time to focus!";
    }
  }

  return (
    <Stack>
      <Container>
        <Center>
          <Text>#{1}</Text> {/*TODO: make 1 not static*/}
        </Center>
        <Center>
          <Text variant="bold">{getActionStr()}</Text>
        </Center>
      </Container>

      <Group justify="space-between">
        <Text variant="bold">Tasks</Text>
        <TaskMenu
          handleClearFinishedTasks={handleClearFinishedTasks}
          handleClearActPomodoros={handleClearActPomodoros}
          handleAddFromTemplate={handleAddFromTemplate}
          handleImportFromTodoist={handleImportFromTodoist}
          handleClearAllTasks={handleClearAllTasks}
        ></TaskMenu>
      </Group>

      <Divider size={2} opacity={0.9}></Divider>
      <Stack gap="xs">
        {tasks.map((task: TaskType, index: number) => (
          <Task
            task={task}
            handleSelect={handleSelect}
            handleDelete={handleDelete}
            variant={selectedTask === index ? "task-menu-select" : "task-menu"}
            key={index}
          />
        ))}
      </Stack>

      <Button variant="add-task">
        <IconCirclePlus style={{ marginRight: "0.5rem" }}></IconCirclePlus>
        <Text variant="bold">Add Task</Text>
      </Button>

      {tasks.length > 0 && (
        <Container w="100%" px="0" py="0">
          <Divider />
          <Container variant="tasks-remaining">
            <Text>
              Pomos: {getNumCompleted()} / {getNumToComplete()} Finish At:{" "}
              {getFinishTimeStr()} ({getRemainingTimeStr()})
            </Text>
          </Container>
        </Container>
      )}
    </Stack>
  );
};

export default TaskSection;
