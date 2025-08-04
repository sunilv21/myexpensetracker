import { useEffect, useState } from "react";
import { fetchAuditLogs } from "../api/audit";
import {
  Box,
  Typography,
  CircularProgress,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { toast } from "react-hot-toast";

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetchAuditLogs();
        setLogs(res.data.logs || []);
      } catch (err) {
        toast.error("Failed to load audit logs");
        setLogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        bgcolor: "#f9fafb",
        minHeight: "100vh",
        ml: { md: "240px" },
      }}
    >
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 3 }}
      >
        Audit Logs
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
          <CircularProgress size={50} />
        </Box>
      ) : logs.length === 0 ? (
        <Typography align="center" sx={{ mt: 5 }} color="text.secondary">
          No logs available.
        </Typography>
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Sr. No.</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>User Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>User Email</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Target</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Timestamp</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((log, index) => (
                <TableRow key={log._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{log.user?.name || "N/A"}</TableCell>
                  <TableCell>{log.user?.email || "N/A"}</TableCell>
                  <TableCell>
                    {log.target
                      ? `${log.target?.name || "N/A"} (${log.target?.email || "N/A"})`
                      : "—"}
                  </TableCell>
                  <TableCell>
                    {new Date(log.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>{log.details || "N/A"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default AuditLogs;
