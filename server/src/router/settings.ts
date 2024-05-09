import express from "express";
import { isAuthenticated } from "../middlewares";
import {
  addSetting,
  getSetting,
  updateSetting,
  deleteSetting,
} from "../controllers/settings";

export default (router: express.Router) => {
  // TODO: Reformat userID and taskID to be less general and add isOwner check
  router.post("/settings", isAuthenticated, addSetting);
  router.get("/settings", isAuthenticated, getSetting);
  router.patch("/settings/:id", isAuthenticated, updateSetting);
  router.delete("/settings/:id", isAuthenticated, deleteSetting); // TODO: delegate deleteTask owner check to isOwner
};
