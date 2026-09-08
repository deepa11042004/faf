import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import path from "path";
import swaggerUi from "swagger-ui-express";

import routes from "./routes/index.js";
import { swaggerSpec } from "./config/swagger.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import { ApiResponse } from "./utils/apiResponse.js";
import { HTTP_STATUS } from "./config/constants.js";

const app = express();

// Security Middlewares
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use(cors({
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per windowMs
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 15 minutes."
  }
});
app.use("/api/", limiter);

// Request Parsing & Logging
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(morgan("dev"));

// Static Folders for Uploads, Images & Public Assets
app.use("/uploads", express.static(path.join(process.cwd(), "public/uploads")));
app.use("/images", express.static(path.join(process.cwd(), "public/images")));
app.use("/public", express.static(path.join(process.cwd(), "public")));

// Swagger API Documentation UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Root & Healthcheck Endpoints
app.get(["/", "/health"], (req, res) => {
  return res.json({ status: "OK", message: "FAF Security Backend API is running successfully." });
});

// API Version 1 Routes & Fallback Aliases
app.use("/api/v1", routes);
app.use("/api", routes);

// 404 Route Handler
app.use((req, res) => {
  return ApiResponse.error(res, `Route ${req.originalUrl} not found.`, [], HTTP_STATUS.NOT_FOUND);
});

// Global Error Handler Middleware
app.use(errorHandler);

export default app;
