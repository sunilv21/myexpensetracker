import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  Typography,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ListAltIcon from "@mui/icons-material/ListAlt";
import InsightsIcon from "@mui/icons-material/Insights";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import { useAuth } from "../context/AuthContext";

const drawerWidth = 240;

const Header = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#FFBF00",
          color: "#ffffff",
        },
      }}
    >
      <Box sx={{ p: 2 }}>
  <Typography
    variant="h6"
    sx={{ fontWeight: "bold", cursor: "pointer", color: "black" }}
    onClick={() => navigate("/dashboard")}
  >
    My Expense Tracker
  </Typography>
</Box>

<Divider sx={{ borderColor: "rgba(0,0,0,0.1)" }} />

<List>
  {token ? (
    <>
      <ListItem button component={RouterLink} to="/dashboard">
        <ListItemIcon sx={{ color: "black" }}>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" primaryTypographyProps={{ sx: { color: "black" } }} />
      </ListItem>

      <ListItem button component={RouterLink} to="/add-expense">
        <ListItemIcon sx={{ color: "black" }}>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="Add Expense" primaryTypographyProps={{ sx: { color: "black" } }} />
      </ListItem>

      {user?.role === "admin" && (
        <>
          <ListItem button component={RouterLink} to="/admin">
            <ListItemIcon sx={{ color: "black" }}>
              <AdminPanelSettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Admin Panel" primaryTypographyProps={{ sx: { color: "black" } }} />
          </ListItem>

          <ListItem button component={RouterLink} to="/audit-logs">
            <ListItemIcon sx={{ color: "black" }}>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary="Audit Logs" primaryTypographyProps={{ sx: { color: "black" } }} />
          </ListItem>

          <ListItem button component={RouterLink} to="/insights">
            <ListItemIcon sx={{ color: "black" }}>
              <InsightsIcon />
            </ListItemIcon>
            <ListItemText primary="Insights" primaryTypographyProps={{ sx: { color: "black" } }} />
          </ListItem>
        </>
      )}
    </>
  ) : (
    <ListItem button component={RouterLink} to="/">
      <ListItemIcon sx={{ color: "black" }}>
        <LoginIcon />
      </ListItemIcon>
      <ListItemText primary="Login" primaryTypographyProps={{ sx: { color: "black" } }} />
    </ListItem>
  )}
</List>

<Box sx={{ flexGrow: 1 }} />

{token && (
  <Box sx={{ p: 2, mt: "auto" }}>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1, color: "black" }}>
      <PersonIcon />
      <Typography variant="body2" sx={{ color: "black" }}>
        {user?.name}
      </Typography>
    </Box>
    <Tooltip title="Logout">
      <IconButton onClick={handleLogout}>
        <LogoutIcon sx={{ color: "black" }} />
      </IconButton>
    </Tooltip>
  </Box>
)}

    </Drawer>
  );
};

export default Header;
