import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { NextFunction, Request, Response } from "express";
import ApiError from "./utils/ApiError";
import AuthRoutes from "./routes/auth.routes";
import LinkRoutes from "./routes/link.routes";
import RedirectRoute from "./routes/redirect.routes"

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(cookieParser());

// Config middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/links", LinkRoutes);

// Healthcheck route
app.get("/healthcheck", (req, res) => {
  res.send("working fine");
});

// Ridrect route
app.use('/', RedirectRoute);

// Global error middleware
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    const { statusCode, message, success } = err;
    res.status(statusCode).json({ statusCode, success, message });
  } else {
    console.log(err);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

export default app;
