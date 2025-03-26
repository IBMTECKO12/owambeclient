import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("token"); // Example authentication check
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
