import express from "express";
import { rootRouter } from "./routes";
import cookieParser from "cookie-parser";
import path from "path";
import "dotenv/config";
// middleware to log HTTP requests and errors
import logger from "morgan";

const app = express();
const port = process.env.PORT;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", rootRouter);

const server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

process.on("SIGTERM", () => {
  console.debug("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.debug("HTTP server closed");
  });
});

module.exports = app;
