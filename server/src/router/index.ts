import express from "express";

import authentication from "./authentication";
import users from "./users";
import tasks from "./tasks";
import settings from "./settings";

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  tasks(router);
  settings(router);

  return router;
};
