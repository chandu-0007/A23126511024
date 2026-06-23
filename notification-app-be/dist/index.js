// src/server.ts
import express from "express";
import cors from "cors";
import { requestLogger, Log } from "./middleware/logger.js";
import notificationRoutes from "./route/router.js";
const app = express();
const PORT = 4000;
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(requestLogger);
app.use("/", notificationRoutes);
app.get("/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});
app.use((err, _req, res, _next) => {
    Log("backend", "fatal", "handler", `Unhandled error: ${err.message}`);
    res.status(500).json({ error: "Internal server error" });
});
app.listen(PORT, async () => {
    console.log("server is running on port " + PORT);
});
//# sourceMappingURL=index.js.map