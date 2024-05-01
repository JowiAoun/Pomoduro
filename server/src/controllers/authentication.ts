import express from "express";
import { createUser, getUserByEmail } from "../db/users";
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

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password !== expectedHash) {
      return res.status(403).json({ error: "Password incorrect" });
    }

    const salt = randomSalt();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();

    res.cookie("POMODURO-AUTH", user.authentication.sessionToken, {
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

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ error: "User with email already exists" });
    }

    const salt = randomSalt();
    const user = await createUser({
      username,
      email,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

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
