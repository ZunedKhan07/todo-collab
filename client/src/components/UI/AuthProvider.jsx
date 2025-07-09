import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../../redux/slices/authSlice";
import { useNavigate, useLocation } from "react-router-dom";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // ✅ After auth is loaded, if user is logged in and on /login or /register, redirect
  useEffect(() => {
    if (!loading && user && ["/login", "/register"].includes(location.pathname)) {
      navigate("/dashboard");
    }
  }, [user, loading, location.pathname, navigate]);

  if (loading) return <div>Loading session...</div>;

  return children;
};

export default AuthProvider;
