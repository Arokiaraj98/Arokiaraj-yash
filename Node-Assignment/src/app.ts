import "reflect-metadata";
import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { AppDataSource } from "./config/database";
import { swaggerSpec } from "./config/swagger";
import authRoutes from "./routes/authRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/auth", authRoutes);

// Health check
app.get("/health", (_, res) => res.json({ status: "ok" , time: new Date() }));

// 404 handler
app.use((_, res) => {
  res.status(404).json({ success: false, message: "Route not found or Check request method" });
});

// Initialize DB then start server
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });

export default app;
