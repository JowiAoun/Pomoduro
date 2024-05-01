import * as crypto from "crypto";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

dotenv.config();

const ENCODING = process.env.ENCODING;

export const randomSalt = () => crypto.randomBytes(128).toString("base64");
export const authentication = (salt: string, password: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(ENCODING)
    .digest("hex");
};

export const corsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.setHeader("Access-Control-Max-Age", "3600"); // Cache preflight response for 1 hour
    return res.sendStatus(200);
  }

  next();
};
