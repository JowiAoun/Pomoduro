import express from "express";
import { isAuthenticated } from "../middlewares";
import {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/tasks";

export default (router: express.Router) => {
  // TODO: Reformat userID and taskID to be less general
  // TODO: and add isOwner check
  router.get("/tasks/:userId", isAuthenticated, getTasks);
  router.post("/tasks/:userId", isAuthenticated, addTask);
  router.patch("/tasks/:id", isAuthenticated, updateTask);
  router.delete("/tasks/:id", isAuthenticated, deleteTask); // TODO: delegate deleteTask owner check to isOwner
};
