import React, { useContext } from "react";
import { Redirect } from "wouter";

import { AuthContext } from "../context/AuthContext";
import { Outlet, redirect } from "react-router-dom";

const PublicRoute = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return !isLoggedIn ? <Outlet /> : redirect("/");
};

export default PublicRoute;
