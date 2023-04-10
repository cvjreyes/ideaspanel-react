import React, { useContext } from "react";
import { Redirect } from "wouter";

import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ component }) => {
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn ? component : <Redirect to="/ideas_panel/login" />;
};

export default PrivateRoute;
