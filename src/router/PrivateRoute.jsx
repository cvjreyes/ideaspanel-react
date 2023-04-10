import React, { useContext } from "react";

import { Outlet, redirect } from "react-router-dom";
import Navbar from "../components/nav/Navbar";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn ? (
    <Navbar>
      <Outlet />
    </Navbar>
  ) : (
    redirect("/ideas_panel/login")
  );
};

export default PrivateRoute;
