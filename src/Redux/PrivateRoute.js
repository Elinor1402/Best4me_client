import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const isLogged = useSelector((state) => state.usersReducer.isLogged);

  return isLogged ? children : <Navigate to="/log-in" />;
};

export default PrivateRoute;
