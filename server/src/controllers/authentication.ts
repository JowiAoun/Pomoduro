import express from "express";
import UserModel from "../db/users";
import { authentication, randomSalt } from "../helpers";
import dotenv from "dotenv";

dotenv.config();
const DOMAIN = process.env.DOMAIN;

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Missing request data" });
    }

    const user = await UserModel.findOne({ email: email })
      .select("+auth.salt +auth.password")
      .populate("tasks")
      .populate("setting");

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const expectedHash = authentication(user.auth.salt, password);

    if (user.auth.password !== expectedHash) {
      return res.status(403).json({ error: "Password incorrect" });
    }

    const salt = randomSalt();
    user.auth.sessionToken = authentication(salt, user._id.toString());

    await user.save();

    res.cookie("POMODURO-AUTH", user.auth.sessionToken, {
      domain: DOMAIN,
      path: "/",
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Missing request data" });
    }

    const existingUser = await UserModel.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ error: "User with email already exists" });
    }

    const salt = randomSalt();
    const user = await UserModel.create({
      username,
      email,
      auth: {
        salt,
        password: authentication(salt, password),
      },
    });

    if (!user) {
      return res.status(500).json({ error: "User could not be created" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = async (req: express.Request, res: express.Response) => {
  try {
    // Clear the authentication cookie
    res.clearCookie("POMODURO-AUTH", {
      domain: DOMAIN,
      path: "/",
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
