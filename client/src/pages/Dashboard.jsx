// Dashboard.jsx
import { useEffect, useState } from "react";
import { getMyExpenses } from "../api/expense";
import {
    Box,
    Card,
    CardContent,
    CircularProgress,
    Typography,
    Alert,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Grid
} from "@mui/material";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import dayjs from "dayjs";

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [expenseLoading, setExpenseLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user, loading } = useAuth();

    const getTotal = (items) => items.reduce((sum, e) => sum + e.amount, 0);

    const getThisMonthExpenses = (items) => {
        const now = dayjs();
        return items.filter(e => dayjs(e.date).isSame(now, 'month'));
    };

    const getThisWeekExpenses = (items) => {
        const startOfWeek = dayjs().startOf('week');
        return items.filter(e => dayjs(e.date).isAfter(startOfWeek));
    };

    useEffect(() => {
        if (!user) return;

        const fetchExpenses = async () => {
            try {
                const res = await getMyExpenses();
                setExpenses(res.data);
            } catch (err) {
                setError("Failed to load expenses");
                toast.error("Failed to load expenses");
            } finally {
                setExpenseLoading(false);
            }
        };

        fetchExpenses();
    }, [user]);

    if (loading || expenseLoading) {
        return (
            <Box className="flex justify-center items-center min-h-screen ml-64">
                <CircularProgress />
            </Box>
        );
    }

    const total = getTotal(expenses);
    const monthTotal = getTotal(getThisMonthExpenses(expenses));
    const weekTotal = getTotal(getThisWeekExpenses(expenses));

    return (
        <Box className="p-6 bg-gray-100 min-h-screen ml-64">
            <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: "bold" }}>
                My Expenses
            </Typography>

            {error ? (
                <Alert severity="error">{error}</Alert>
            ) : expenses.length === 0 ? (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "80vh",
                    }}
                >
                    <Typography
                        variant="h6"
                        align="center"
                        sx={{ fontWeight: "bold", color: "text.secondary" }}
                    >
                        No expenses found.
                    </Typography>
                </Box>
            ) : (
                <>
                    <Grid container spacing={2} sx={{ mt: 3 }}>
                        <Grid item xs={12} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="subtitle2">Total Expenditure</Typography>
                                    <Typography variant="h6" color="red">₹{total}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="subtitle2">This Month</Typography>
                                    <Typography variant="h6" color="red">₹{monthTotal}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="subtitle2">This Week</Typography>
                                    <Typography variant="h6" color="red">₹{weekTotal}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    <Box mt={4} className="overflow-x-auto">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Sr.No</TableCell>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Amount (₹)</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Note</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {expenses.map((expense, index) => (
                                    <TableRow key={expense._id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{expense.category}</TableCell>
                                        <TableCell style={{ color: "red" }}>₹{expense.amount}</TableCell>
                                        <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                                        <TableCell>{expense.notes || '-'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default Dashboard;
