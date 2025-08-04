import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as PieTooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getAllExpenses } from "../api/expense";
import { toast } from "react-hot-toast";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#00C49F",
  "#FFBB28",
  "#FF6666",
  "#A28FD0",
  "#FF8A65",
  "#D4E157",
];

const Insights = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [categoryData, setCategoryData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await getAllExpenses();
        const expenses = res.data;

        if (!expenses.length) {
          setCategoryData([]);
          setDailyData([]);
          return;
        }

        // Category-wise grouping
        const catMap = {};
        expenses.forEach((e) => {
          catMap[e.category] = (catMap[e.category] || 0) + e.amount;
        });

        const category = Object.entries(catMap).map(([category, total]) => ({
          name: category,
          value: total,
        }));

        // Daily-wise grouping
        const dateMap = {};
        expenses.forEach((e) => {
          const date = new Date(e.date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
          });
          dateMap[date] = (dateMap[date] || 0) + e.amount;
        });

        const daily = Object.entries(dateMap)
          .map(([date, total]) => ({ date, total }))
          .sort(
            (a, b) =>
              new Date(`${a.date} 2025`) - new Date(`${b.date} 2025`)
          );

        setCategoryData(category);
        setDailyData(daily);
      } catch (error) {
        toast.error("Failed to fetch insights");
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: 300,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!categoryData.length && !dailyData.length) {
    return (
      <Box sx={{ mt: 5, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary">
          No expense data to display insights.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 2,
        width: "100%",
        ml: { xs: 0, md: "240px" },
        maxWidth: "calc(100% - 240px)",
        transition: "all 0.3s ease",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold" }}
      >
        Expense Insights
      </Typography>

      <Paper
        elevation={0}
        className="p-8 my-5 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20"
      >
        <Typography variant="h6" gutterBottom>
          Total Expenses by Category
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <PieTooltip />
          </PieChart>
        </ResponsiveContainer>
      </Paper>

      <Paper
        elevation={0}
        className="p-8 my-5 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20"
      >
        <Typography variant="h6" gutterBottom>
          Daily Expense Trend
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="linear"
              dataKey="total"
              stroke={theme.palette.primary.main}
              strokeWidth={2}
              dot={{
                r: 5,
                stroke: theme.palette.secondary.main,
                strokeWidth: 2,
                fill: theme.palette.primary.light,
              }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default Insights;
