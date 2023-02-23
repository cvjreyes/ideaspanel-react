import React, { useContext } from "react";
import { Redirect } from "wouter";

import { AuthContext } from "../context/AuthContext";

const PublicRoute = ({ component: Component }) => {
  const { isLoggedIn } = useContext(AuthContext);
  return !isLoggedIn ? <Component /> : <Redirect to="/" />;
};

export default PublicRoute;
