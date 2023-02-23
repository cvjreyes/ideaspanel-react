import React, { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";
import Button from "../general/Button";

export default function Home() {
  const { logout } = useContext(AuthContext);

  return (
    <div>
      <h1>Home</h1>
      <Button text="Log out" onClick={logout} />
    </div>
  );
}
