import express from "express";
import {
  addExpense,
  getMyExpenses,
  getAllExpenses,
  updateExpenseStatus,
  softDeleteExpense,
  hardDeleteExpense,
} from "../controllers/expenseController.js";

import { protect, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// user Routes
router.post("/", protect, addExpense);
router.get("/my", protect, getMyExpenses);

// Admin Routes
router.get("/", protect, isAdmin, getAllExpenses);
router.patch("/:id/status", protect, isAdmin, updateExpenseStatus);

// Delete Routes (Admin Only)
router.patch("/:id/soft-delete", protect, isAdmin, softDeleteExpense);
router.delete("/:id/hard-delete", protect, isAdmin, hardDeleteExpense);

export default router;
