import React, { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return !isLoggedIn ? <Outlet /> : <Navigate replace to="/" />;
};

export default PublicRoute;
