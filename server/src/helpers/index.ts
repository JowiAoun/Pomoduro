import * as crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const ENCODING = process.env.ENCODING;

export const randomSalt = () => crypto.randomBytes(128).toString("base64");
export const authentication = (salt: string, password: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(ENCODING)
    .digest("hex");
};
