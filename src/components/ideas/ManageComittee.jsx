/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext, useEffect, useState } from "react";
import { useNotifications } from "reapop";
import { useLocation } from "wouter";

import { AuthContext } from "../../context/AuthContext";
import { api } from "../../helpers/api";

import Checkbox from "../general/Checkbox";
import Input from "../general/Input";
import Loading from "../general/Loading";
import NoResults from "../home/NoResults";

export default function ManageComittee() {
  const [users, setUsers] = useState(null);
  const [displayUsers, setDisplayUsers] = useState(null);
  const [filterData, setFilterData] = useState("");

  const { user } = useContext(AuthContext);
  const [__, navigate] = useLocation();
  const { notify } = useNotifications();

  useEffect(() => {
    const getAllUsers = async () => {
      const { body } = await api("get", "/users/get_all_users");
      setUsers(body);
      setDisplayUsers(body);
    };
    getAllUsers();
  }, []);

  useEffect(() => {
    const checkAdmin = () => {
      if (!user.isAdmin) return navigate("/comittee");
    };
    checkAdmin();
  }, []);

  useEffect(() => {
    users && filter();
  }, [filterData]);

  const filter = () => {
    if (!filterData) return setDisplayUsers([...users]);
    let tempUsers = [...users];
    tempUsers = tempUsers.filter((x) =>
      x.email.toLowerCase().includes(filterData.toLowerCase())
    );
    setDisplayUsers(tempUsers);
  };

  const onChange = async (email, admin) => {
    const { ok } = await api("post", "/users/update_admin", {
      email: email,
      admin: admin ? 0 : 1,
    });
    if (!ok) return notify("Something went wrong", "error");
    notify(`${email} is now ${admin ? "not " : ""}admin`, "info");
    const idx = users.findIndex((user) => user.email === email);
    const tempUsers = [...users];
    tempUsers[idx].isAdmin = tempUsers[idx].isAdmin ? 0 : 1;
    setDisplayUsers(tempUsers);
  };

  return (
    <div css={manageComitteeStyle}>
      <h1 className="page_title">Manage Comittee</h1>
      <div className="manageBox">
        <div className="columnsBox bold">
          <div className="flexCenter">
            <Input
              width="90%"
              onChange={(e) => setFilterData(e.target.value)}
              defaultValue="Search Email"
              onFocus={(e) => {
                e.target.value = "";
                setFilterData("");
              }}
              onBlur={(e) => {
                e.target.value = e.target.defaultValue;
                setFilterData("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  e.target.value = e.target.defaultValue;
                  e.target.blur();
                  setFilterData("");
                }
              }}
            />
          </div>
          <div className="flexCenter">Admin</div>
        </div>
        {displayUsers ? (
          displayUsers.length > 0 ? (
            <div className="map">
              {displayUsers.map((item, i) => {
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
    border: "1px solid black",
    borderRadius: "8px",
    padding: "10px",
    backgroundColor: "linear-gradient(145deg, #ffffff, #e4e5da)",
    boxShadow: "20px 20px 60px #d7d8ce, -20px -20px 60px #ffffff",
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
