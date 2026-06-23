// src/server.ts
import express from "express";
import type  { Request, Response, NextFunction } from "express"; 
import cors from "cors";
import { requestLogger, Log } from "./middleware/logger.js";
import notificationRoutes from "./route/router.js";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use("/", notificationRoutes);

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  Log("backend", "fatal", "handler", `Unhandled error: ${err.message}`);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, async () => {
  await Log("backend", "info", "server", `Server started on port ${PORT}`);
});