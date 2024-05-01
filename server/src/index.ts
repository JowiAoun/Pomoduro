import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import dotenv from "dotenv";
import mongoose from "mongoose";

import router from "./router";
import { corsMiddleware } from "./helpers";

// -- Set environment variables
dotenv.config();

const DOMAIN = process.env.DOMAIN;
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// -- Set up app
const app = express();

app.use(corsMiddleware);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/", router());

// -- Connect to MongoDB cluster
mongoose.Promise = Promise;
mongoose.connect(MONGO_URI);
mongoose.connection.on("error", (error: Error) => {
  console.log(error);
});

// -- Set up server
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on http://${DOMAIN}:${PORT}/`);
});
