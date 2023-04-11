import React, { useContext } from "react";

import { Navigate, Outlet, redirect } from "react-router-dom";
import Navbar from "../components/nav/Navbar";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn ? (
    <Navbar>
      <Outlet />
    </Navbar>
  ) : (
    <Navigate replace to="/login" />
  );
};

export default PrivateRoute;
