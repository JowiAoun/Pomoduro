import express from "express";
import {
  createTask,
  deleteTaskById,
  getTaskById,
  getTaskByIdMany,
  updateTaskById,
} from "../db/tasks";
import { get } from "lodash";
import { getUserById } from "../db/users";

export const getTasks = async (req: express.Request, res: express.Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "Missing or invalid request data" });
    }

    const user = await getUserById(userId);

    if (!user) {
      return res.status(400).json({ error: "Invalid user" });
    }

    const tasks = await getTaskByIdMany(user.tasks);

    return res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const addTask = async (req: express.Request, res: express.Response) => {
  try {
    const currentUserId = get(req, "identity._id") as string;
    const { values } = req.body;

    if (!currentUserId || !values) {
      res.status(400).json({ error: "Missing userID or task values" });
    }

    const user = await getUserById(currentUserId);

    if (!user) {
      res.status(400).json({ error: "Invalid user" });
    }

    const newTask = await createTask(values);

    user.tasks.push(newTask._id);
    await user.save();

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateTask = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { values } = req.body;

    if (!id || !values) {
      res.status(400).json({ error: "Missing id or task values" });
    }

    const updatedTask = await updateTaskById(id, values);

    if (!updatedTask) {
      return res.status(404).json({ error: "Could not update task" });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteTask = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "identity._id") as string;

    if (!currentUserId) {
      return res.status(400).json({ error: "Invalid cookie" });
    }

    const user = await getUserById(currentUserId);
    const task = await getTaskById(id);

    if (!task) {
      return res.status(404).json({ error: "Task does not exist" });
    }

    const taskIndex = user.tasks.indexOf(task._id);

    if (taskIndex === -1) {
      return res.status(404).json({ error: "Task does not exist" });
    }

    user.tasks.splice(taskIndex, 1);
    const deletedTask = await deleteTaskById(task._id);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task does not exist" });
    }

    user.save();

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
