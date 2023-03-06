/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect, useState } from "react";
import { useNotifications } from "reapop";
import { api } from "../../helpers/api";

import Checkbox from "../general/Checkbox";
import Loading from "../general/Loading";
import NoResults from "../home/NoResults";

export default function ManageComittee() {
  const [users, setUsers] = useState(null);

  const { notify } = useNotifications();

  useEffect(() => {
    const getAllUsers = async () => {
      const { body } = await api("get", "/users/get_all_users");
      setUsers(body);
    };
    getAllUsers();
  }, []);

  const onChange = async (email, admin) => {
      const { ok } = await api("post", "/users/update_admin", {
        email: email,
        admin: admin ? 0 : 1,
      });
      notify(`${email} is now ${admin ? "not " : ""}admin`, "info");
      const idx = users.findIndex( user => user.email === email)
      const tempUsers = [...users]
      tempUsers[idx].isAdmin = tempUsers[idx].isAdmin ? 0 : 1
      setUsers(tempUsers)
  };

  return (
    <div css={manageComitteeStyle}>
      <h1 className="page_title">Manage Comittee</h1>
      <div className="manageBox">
        <div className="columnsBox bold">
          <div className="flexCenter">
            {/* <input placeholder="Email" /> */}
            Email
          </div>
          <div className="flexCenter">Admin</div>
        </div>
        {users ? (
          users.length > 0 ? (
            <div className="map">
              {users.map((item, i) => {
                return (
                  <div className="columnsBox" key={i}>
                    <div className="flexCenter">{item.email}</div>
                    <Checkbox
                      data={item}
                      key={i}
                      checked={!!item.isAdmin}
                      onChange={() => onChange(item.email, item.isAdmin)}
                      className="checkbox"
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <NoResults />
          )
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

const manageComitteeStyle = {
  ".manageBox": {
    display: "flex",
    flexDirection: "column",
    minHeight: "calc(90vh - 200px)",
    minWidth: "400px",
    width: "50vw",
    alignItems: "center",
    margin: "2% 25% 0",
    border: "5px solid black",
    borderRadius: "8px",
    padding: "10px",
    backgroundColor: "white",
    ".columnsBox": {
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      alignItems: "center",
      justifyContent: "center",
      height: "50px",
      width: "100%",
    },
    ".map": {
      width: "100%",
    },
  },
};
