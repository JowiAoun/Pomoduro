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
import { SettingType, TaskType } from "../../../utils/types.ts";
import { TimerEnum } from "../../../utils/enums.ts";
import {
  handleAddFromTemplate,
  handleCancelAddTask,
  handleClearActPomodoros,
  handleClearAllTasks,
  handleClearFinishedTasks,
  handleDelete,
  handleImportFromTodoist,
  handleSave,
  handleSaveAddTask,
  handleSelect,
  handleSelectAddTask,
} from "./handlers.ts";
import {
  getActionStr,
  getFinishTimeStr,
  getNumCompleted,
  getNumToComplete,
  getRemainingTimeStr,
} from "../../../utils/helpers.ts";
import TaskEdit from "./TaskEdit.tsx";

interface TasksProps {
  _tasks: TaskType[];
  setting: SettingType;
  timerType: TimerEnum;
}

const TaskSection: React.FC<TasksProps> = ({ _tasks, setting, timerType }) => {
  const [selectedTask, setSelectedTask] = useState<number>(
    _tasks.length > 0 ? 0 : -1
  );
  const [tasks, setTasks] = useState<TaskType[]>(_tasks);
  const [isAddingTask, setIsAddingTask] = useState<boolean>(false);

  return (
    <Stack>
      <Container>
        <Center>
          <Text>#{selectedTask + 1}</Text>
        </Center>
        <Center>
          <Text variant="bold">
            {getActionStr(tasks, selectedTask, timerType)}
          </Text>
        </Center>
      </Container>

      <Group justify="space-between">
        <Text variant="bold">Tasks</Text>
        <TaskMenu
          handleClearFinishedTasks={() =>
            handleClearFinishedTasks(setTasks, tasks, setSelectedTask)
          }
          handleClearActPomodoros={() =>
            handleClearActPomodoros(setTasks, tasks)
          }
          handleAddFromTemplate={() => handleAddFromTemplate}
          handleImportFromTodoist={() => handleImportFromTodoist}
          handleClearAllTasks={() =>
            handleClearAllTasks(setSelectedTask, setTasks)
          }
        ></TaskMenu>
      </Group>

      <Divider size={2} opacity={0.9}></Divider>
      <Stack gap="xs">
        {tasks.map((task: TaskType, index: number) => (
          <Task
            task={task}
            handleSelect={(id: string) =>
              handleSelect(id, tasks, setSelectedTask)
            }
            handleDelete={(id: string) =>
              handleDelete(id, tasks, setSelectedTask, setTasks)
            }
            handleSave={(id: string, newTask: TaskType) =>
              handleSave(id, tasks, setTasks, newTask)
            }
            variant={selectedTask === index ? "task-menu-select" : "task-menu"}
            key={index}
          />
        ))}
      </Stack>

      {isAddingTask ? (
        <TaskEdit
          task={{
            _id: "NEW",
            userId: "",
            title: "",
            note: "",
            projectName: "",
            done: false,
            numCompleted: 0,
            numToComplete: 0,
            created: "",
          }}
          handleDelete={function (): void {}}
          handleCancel={() => handleCancelAddTask(setIsAddingTask)}
          handleSave={(task: TaskType) =>
            handleSaveAddTask(task, tasks, setTasks, setIsAddingTask)
          }
          isNewTask={true}
        />
      ) : (
        <Button
          variant="add-task"
          onClick={() => handleSelectAddTask(setIsAddingTask)}
        >
          <IconCirclePlus style={{ marginRight: "0.5rem" }}></IconCirclePlus>
          <Text variant="bold">Add Task</Text>
        </Button>
      )}

      {tasks.length > 0 && (
        <Container w="100%" px="0" py="0">
          <Divider />
          <Container variant="tasks-remaining">
            <Text>
              Pomos: {getNumCompleted(tasks)} / {getNumToComplete(tasks)} Finish
              At: {getFinishTimeStr(tasks, setting)} (
              {getRemainingTimeStr(tasks, setting)})
            </Text>
          </Container>
        </Container>
      )}
    </Stack>
  );
};

export default TaskSection;
