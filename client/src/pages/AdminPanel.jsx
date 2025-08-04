import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
  MenuItem,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Grid,
} from "@mui/material";
import { toast } from "react-hot-toast";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { getAllExpenses, softDeleteExpense, hardDeleteExpense } from "../api/expense";
import Papa from "papaparse";

const AdminPanel = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    category: "",
    user: "",
    startDate: "",
    endDate: "",
  });

  const fetchAll = async () => {
    try {
      const res = await getAllExpenses();
      setExpenses(res.data);
      setFilteredExpenses(res.data);
    } catch (err) {
      toast.error("Failed to load expenses");
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    if (filteredExpenses.length === 0) {
      toast.error("No expenses to export");
      return;
    }

    const csv = Papa.unparse(
      filteredExpenses.map((e) => ({
        ID: e._id,
        Amount: e.amount,
        Category: e.category,
        "User Name": e.user?.name || "",
        "User Email": e.user?.email || "",
        Date: new Date(e.date).toLocaleDateString(),
        Notes: e.notes || "",
      }))
    );

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "expenses.csv");
    link.click();
  };

  const handleSoftDelete = async (id) => {
    try {
      await softDeleteExpense(id);
      toast.success("Expense soft deleted");
      fetchAll();
    } catch (error) {
      toast.error("Soft delete failed");
    }
  };

  const handleHardDelete = async (id) => {
    try {
      await hardDeleteExpense(id);
      toast.success("Expense permanently deleted");
      fetchAll();
    } catch (error) {
      toast.error("Hard delete failed");
    }
  };

  useEffect(() => {
    const filtered = expenses.filter((expense) => {
      const matchCategory = filters.category
        ? expense.category === filters.category
        : true;

      const matchUser = filters.user
        ? expense.user?.name?.toLowerCase().includes(filters.user.toLowerCase())
        : true;

      const expenseDate = new Date(expense.date);
      const matchStartDate = filters.startDate
        ? expenseDate >= new Date(filters.startDate)
        : true;

      const matchEndDate = filters.endDate
        ? expenseDate <= new Date(filters.endDate)
        : true;

      return matchCategory && matchUser && matchStartDate && matchEndDate;
    });

    setFilteredExpenses(filtered);
  }, [filters, expenses]);

  useEffect(() => {
    fetchAll();
  }, []);

  const categories = [...new Set(expenses.map((e) => e.category))];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "#f9fafb", minHeight: "100vh", ml: { md: "240px" } }}>
      <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: "bold", mb: 3 }}>
        Admin Panel – All Expenses
      </Typography>

      {/* FILTERS */}
      <Paper elevation={1} sx={{ p: 3, mb: 4, maxWidth: "100%" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              select
              label="Category"
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
              size="small"
              fullWidth
            >
              <MenuItem value="">All</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="User Name"
              value={filters.user}
              onChange={(e) =>
                setFilters({ ...filters, user: e.target.value })
              }
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Start Date"
              type="date"
              value={filters.startDate}
              onChange={(e) =>
                setFilters({ ...filters, startDate: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="End Date"
              type="date"
              value={filters.endDate}
              onChange={(e) =>
                setFilters({ ...filters, endDate: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
              size="small"
              fullWidth
            />
          </Grid>
        </Grid>
      </Paper>

      {/* CSV BUTTON */}
      <Box display="flex" justifyContent="flex-end" alignItems="center" sx={{ mb: 3 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleExportCSV}
          startIcon={<DownloadIcon />}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 2,
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            px: 3,
            py: 1,
          }}
        >
          Export CSV
        </Button>
      </Box>

      {/* EXPENSE TABLE */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
          <CircularProgress size={50} />
        </Box>
      ) : filteredExpenses.length === 0 ? (
        <Typography align="center" color="text.secondary">
          No expenses match the filters.
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
              <TableRow>
                <TableCell><strong>Category</strong></TableCell>
                <TableCell><strong>Amount</strong></TableCell>
                <TableCell><strong>User</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
                <TableCell><strong>Note</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredExpenses.map((expense) => (
                <TableRow
                  key={expense._id}
                  sx={{
                    ...(expense.status === "deleted" && {
                      color: "red",
                      "& td": { color: "red" },
                    }),
                  }}
                >
                  <TableCell>{expense.category}</TableCell>
                  <TableCell style={{ color: "red" }}>₹{expense.amount}</TableCell>
                  <TableCell>{expense.user?.name}</TableCell>
                  <TableCell>{expense.user?.email}</TableCell>
                  <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                  <TableCell>{expense.notes || "-"}</TableCell>
                  <TableCell>
                    <IconButton
                      color="warning"
                      onClick={() => handleSoftDelete(expense._id)}
                      title="Soft Delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleHardDelete(expense._id)}
                      title="Hard Delete"
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default AdminPanel;
