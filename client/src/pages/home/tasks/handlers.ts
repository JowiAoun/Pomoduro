import { TaskType } from "../../../utils/types.ts";
import {
  serverCreateTask,
  serverDeleteTask,
  serverDeleteTaskAll,
  serverUpdateTask,
} from "../../../utils/tasks.ts";

export const handleDelete = async (
  id: string,
  tasks: TaskType[],
  setSelectedTask: (x: number) => void,
  setTasks: (tasks: TaskType[]) => void
) => {
  setSelectedTask(0);
  setTasks(tasks.filter((task: TaskType) => task._id !== id));
  const isDeleted = await serverDeleteTask(id);

  if (!isDeleted) {
    console.log("Could not delete task");
  }
};

export const handleSelect = (
  id: string,
  tasks: TaskType[],
  setSelectedTask: (x: number) => void
) => {
  const index = tasks.findIndex((task: TaskType) => task._id === id);
  setSelectedTask(index);
};

export const handleSave = async (
  id: string,
  tasks: TaskType[],
  setTasks: (tasks: TaskType[]) => void,
  newTask: TaskType
): Promise<TaskType | null> => {
  if (!newTask.title || newTask.title.trim() == "") {
    return null;
  }

  if (id === "NEW") {
    setTasks([...tasks, newTask]);
    const createdTask = serverCreateTask(newTask); //TODO: Change ID in server before creating

    if (!createdTask) {
      console.log("Could not create task");
    }

    return createdTask;
  }

  setTasks(tasks.map((task) => (task._id === id ? newTask : task)));
  const updatedTask = await serverUpdateTask(id, newTask);

  if (!updatedTask) {
    console.log("Could not update task");
  }

  return updatedTask;
};

export const handleClearFinishedTasks = (
  setTasks: (tasks: TaskType[]) => void,
  tasks: TaskType[],
  setSelectedTask: (x: number) => void
) => {
  setTasks(
    tasks.filter((task: TaskType) => task.numCompleted < task.numToComplete)
  );
  tasks.length > 0 ? setSelectedTask(0) : setSelectedTask(-1);
};

export const handleClearActPomodoros = (
  setTasks: (tasks: TaskType[]) => void,
  tasks: TaskType[]
) => {
  setTasks(
    tasks.map((task: TaskType) => {
      task.numCompleted = 0;
      return task;
    })
  );
};

export const handleAddFromTemplate = () => {
  throw new Error("Function not implemented.");
};

export const handleImportFromTodoist = () => {
  throw new Error("Function not implemented.");
};

export const handleClearAllTasks = async (
  setSelectedTask: (x: number) => void,
  setTasks: (tasks: TaskType[]) => void
) => {
  const res = await serverDeleteTaskAll();

  if (!res.success) {
    console.log("Could not delete all tasks");
    return;
  }

  setSelectedTask(-1);
  setTasks([]);
};

export const handleSelectAddTask = (
  setIsAddingTask: (val: boolean) => void
) => {
  setIsAddingTask(true);
};

export const handleCancelAddTask = (
  setIsAddingTask: (val: boolean) => void
) => {
  setIsAddingTask(false);
};

export const handleSaveAddTask = async (
  task: TaskType,
  tasks: TaskType[],
  setTasks: (tasks: TaskType[]) => void,
  setIsAddingTask: (val: boolean) => void
) => {
  const res = await handleSave(task._id, tasks, setTasks, task);

  if (!res) {
    return;
  }

  if (res._id) {
    task._id = res._id;
  }

  setIsAddingTask(false);
};
