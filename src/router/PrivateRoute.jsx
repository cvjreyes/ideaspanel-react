import React, { useContext } from "react";
import { Redirect } from "wouter";

import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ component: Component }) => {
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn ? <Component /> : <Redirect to="/login" />;
};

export default PrivateRoute;
