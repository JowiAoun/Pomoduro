import express from "express";
import UserModel from "../db/users";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await UserModel.find();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findById(id)
      .populate("tasks")
      .populate("setting");

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    await UserModel.findByIdAndDelete(id).then(() =>
      res.status(200).json({ success: true })
    );
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: "Missing request data" });
    }

    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    user.username = username;
    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
