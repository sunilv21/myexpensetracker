import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";

// Routes
import authRoutes from "./routes/authRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js"; // ✅ Includes soft/hard delete logic
import auditRoutes from "./routes/auditRoutes.js";

// Error Handlers
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";

// Config
dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Testing API
app.get("/", (req, res) => {
  res.send("expense-tracker-backend API is running...");
});

// Mount routes
app.use("/api/auth", authRoutes);               // Login/Register
app.use("/api/expenses", expenseRoutes);        // ✅ Includes soft/hard delete routes
app.use("/api/audit-logs", auditRoutes);        // Audit logs for admin actions

// Error handling middlewares
app.use(notFound);      // 404 handler
app.use(errorHandler);  // Global error handler

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
