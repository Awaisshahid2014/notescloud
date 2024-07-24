import React from "react";
import { useAuth } from "../../contexts/auth/AuthState";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { authToken } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        authToken ? <Component {...props} /> : <Navigate to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
