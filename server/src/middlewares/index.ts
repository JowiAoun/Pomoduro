import express from "express";
import { Types } from "mongoose";
import { get, merge } from "lodash";

import { getUserBySessionToken } from "../db/users";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["POMODURO-AUTH"];

    if (!sessionToken) {
      return res.status(403).json({ error: "User not authenticated" });
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.status(400).json({ error: "Invalid session token" });
    }

    merge(req, { identity: existingUser });

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "identity._id") as
      | Types.ObjectId
      | undefined;

    if (!currentUserId) {
      return res.status(403).json({ error: "User not authenticated" });
    }

    if (currentUserId.toString() !== id) {
      return res.status(404).json({ error: "Access forbidden" });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
