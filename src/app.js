import express from "express";
import { corsMiddleware } from "./middlewares/cors.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";
import healthRoutes from "./routes/healthRoutes.js";
import avatarRoutes from "./routes/avatarRoutes.js";

const app = express();

app.disable("x-powered-by");
app.use(corsMiddleware);
app.use(express.json({ limit: "64kb" }));

app.use("/", healthRoutes);
app.use("/faces", avatarRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
