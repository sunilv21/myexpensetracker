import api from "./axios";

export const createExpense = (data) => api.post("/expenses", data);
export const getMyExpenses = () => api.get("/expenses/my");
export const getAllExpenses = () => api.get("/expenses");
export const updateExpenseStatus = (id, status) =>
  api.patch(`/expenses/${id}/status`, { status });

// Soft Delete (admin only)
export const softDeleteExpense = (id) =>
  api.patch(`/expenses/${id}/soft-delete`);

// Hard Delete (admin only)
export const hardDeleteExpense = (id) =>
  api.delete(`/expenses/${id}/hard-delete`);
