import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Loader from "./components/Loader";
import { Box } from "@mui/material";

// Lazy loaded pages
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const ExpenseForm = lazy(() => import("./pages/ExpenseForm"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));
const AuditLogs = lazy(() => import("./pages/AuditLogs"));
const Insights = lazy(() => import("./pages/Insights"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  const location = useLocation();
  const isAuthPage = ["/", "/register"].includes(location.pathname);

  return (
    <Box className="flex flex-col min-h-screen">
      {!isAuthPage && <Header />}

      <Box component="main" className="flex-grow">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-expense"
              element={
                <ProtectedRoute>
                  <ExpenseForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
            <Route
              path="/audit-logs"
              element={
                <ProtectedRoute adminOnly>
                  <AuditLogs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/insights"
              element={
                <ProtectedRoute adminOnly>
                  <Insights />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Box>

      {!isAuthPage && <Footer />}
    </Box>
  );
};

export default App;
