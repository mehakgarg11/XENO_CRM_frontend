import React from "react";
import { Navigate } from "react-router-dom";
export default function ProtectedRoute({ children }) {
  const t = localStorage.getItem("token");
  return t ? children : <Navigate to="/login" replace />;
}
