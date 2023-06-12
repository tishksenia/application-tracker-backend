import express from "express";
import { rootRouter } from "./routes";
import cookieParser from "cookie-parser";
import path from "path";
import "dotenv/config";

const app = express();
const port = process.env.PORT;

import "./logging";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", rootRouter);

const server = app.listen(port, () => {
  console.log(
    `⚡️[server]: Server is running at http://localhost:${port} in ${app.get(
      "env"
    )} mode`
  );
});

process.on("SIGTERM", () => {
  console.debug("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.debug("HTTP server closed");
  });
});

export { app };
