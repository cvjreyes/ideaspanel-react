import React, { useContext } from "react";
import { Redirect } from "wouter";

import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ component: Component }) => {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn) {
    return <Component />;
  } else {
    return <Redirect to="/login" />;
  }
};

export default PrivateRoute;
