import express from "express";
import TaskModel from "../db/tasks";
import { get } from "lodash";
import UserModel from "../db/users";
import { ObjectId } from "mongoose";

export const getTasks = async (req: express.Request, res: express.Response) => {
  try {
    const currentUserId = get(req, "identity._id") as string;

    if (!currentUserId) {
      return res.status(400).json({ error: "Missing or invalid request data" });
    }

    const user = await UserModel.findById(currentUserId);

    if (!user) {
      return res.status(400).json({ error: "Invalid user" });
    }

    const tasks = await TaskModel.find({ _id: { $in: user.tasks } });

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
      return res.status(400).json({ error: "Missing userID or task values" });
    }

    const user = await UserModel.findById(currentUserId);

    if (!user) {
      return res.status(400).json({ error: "Invalid user" });
    }

    if (values._id) {
      delete values._id;
    }

    const newTask = await TaskModel.create(values);

    user.tasks.push(newTask._id);
    await user.save();

    return res.status(200).json(newTask);
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
      return res.status(400).json({ error: "Missing id or task values" });
    }

    const updatedTask = await TaskModel.findByIdAndUpdate(id, values);

    if (!updatedTask) {
      return res.status(500).json({ error: "Could not update task" });
    }

    return res.status(200).json(updatedTask);
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

    const user = await UserModel.findById(currentUserId);
    const task = await TaskModel.findById(id);

    if (!task) {
      return res.status(404).json({ error: "Task does not exist" });
    }

    const taskIndex = user.tasks.indexOf(task._id);

    if (taskIndex === -1) {
      return res.status(404).json({ error: "Task does not exist" });
    }

    user.tasks.splice(taskIndex, 1);
    const deletedTask = await TaskModel.findByIdAndDelete(task._id);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task does not exist" });
    }

    await user.save();

    return res.status(200).json(deletedTask);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteTaskAll = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const currentUserId = get(req, "identity._id") as string;

    if (!currentUserId) {
      return res.status(400).json({ error: "Invalid cookie" });
    }

    const user = await UserModel.findById(currentUserId);

    if (!user) {
      return res.status(404).json({ error: "User does not exist" });
    }

    const deletionPromises = user.tasks.map(async (taskId: ObjectId) => {
      await TaskModel.findByIdAndDelete(taskId);
    });

    user.tasks = [];

    await Promise.all(deletionPromises);

    await user.save();

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
