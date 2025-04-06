// src/components/PrivateRoute.js

import { Navigate } from "react-router-dom";
import { isAuthenticated, hasRole } from "../utils/auth";

const PrivateRoute = ({ children, allowedRoles }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  const user = JSON.parse(localStorage.getItem('user'));
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />; // Optional: Create this page
  }

  return children;
};

export default PrivateRoute;
