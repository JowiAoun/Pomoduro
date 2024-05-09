import express from "express";
import SettingModel from "../db/settings";
import { get } from "lodash";
import UserModel from "../db/users";

export const getSetting = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const currentUserId = get(req, "identity._id") as string;

    if (!currentUserId) {
      return res.status(400).json({ error: "Missing or invalid request data" });
    }

    const user = await UserModel.findById(currentUserId).populate("setting");

    if (!user) {
      return res.status(400).json({ error: "Invalid user" });
    }

    return res.status(200).json(user.setting);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const addSetting = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const currentUserId = get(req, "identity._id") as string;
    const { values } = req.body;

    if (!currentUserId || !values) {
      return res
        .status(400)
        .json({ error: "Missing userID or setting values" });
    }

    const user = await UserModel.findById(currentUserId);

    if (!user) {
      return res.status(400).json({ error: "Invalid user" });
    }

    if (user.setting) {
      return res
        .status(404)
        .json({ error: "Setting already exists, update setting instead" });
    }

    const newSetting = await SettingModel.create(values);

    user.setting = newSetting._id;
    await user.save();

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateSetting = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { values } = req.body;

    if (!id || !values) {
      return res.status(400).json({ error: "Missing id or settings values" });
    }

    const updatedSetting = await SettingModel.findByIdAndUpdate(id, values);

    if (!updatedSetting) {
      return res.status(500).json({ error: "Could not update setting" });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteSetting = async (
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

    if (!user) {
      return res.status(404).json({ error: "User does not exist" });
    }

    await SettingModel.findByIdAndDelete(id);

    user.setting = null;
    await user.save();

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
