/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect, useState } from "react";
import { api } from "../../helpers/api";

export default function ManageComittee() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const getAllUsers = async () => {
      const { body } = await api("get", "/users/get_all_users");
      setUsers(body);
      console.log(body);
    };
    getAllUsers();
  }, []);

  return (
    <div>
      <h1 className="page_title">Manage Comittee</h1>
      <div>Datos usuarios</div>
    </div>
  );
}
