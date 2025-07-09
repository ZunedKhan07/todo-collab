import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ Component }) => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return user ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
