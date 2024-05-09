import express, { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { get, merge } from "lodash";
import UserModel from "../db/users";

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

    const existingUser = await UserModel.findOne({
      "auth.sessionToken": sessionToken,
    });

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
      return res.status(403).json({ error: "Access forbidden" });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const corsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");

    if (req.method === "OPTIONS") {
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );
      res.setHeader("Access-Control-Max-Age", "3600"); // Cache preflight response for 1 hour
      return res.sendStatus(200);
    }

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500).end;
  }
};
