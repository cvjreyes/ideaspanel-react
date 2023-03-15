/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext, useEffect, useState } from "react";
import { useNotifications } from "reapop";
import { useLocation } from "wouter";

import { AuthContext } from "../../context/AuthContext";
import { api } from "../../helpers/api";
import { colors } from "../../helpers/colors";

import ButtonWithImage from "../general/ButtonWithImage";
import Checkbox from "../general/Checkbox";
import Input from "../general/Input";
import Loading from "../general/Loading";
import NoResults from "../home/NoResults";
import Back from "../../assets/images/back.png";

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
    const checkComittee = () => {
      if (!user.isComittee) return navigate("/comittee");
    };
    checkComittee();
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

  const onChange = async (email, comittee) => {
    const { ok } = await api("post", "/users/update_comittee", {
      email: email,
      comittee: comittee ? 0 : 1,
    });
    if (!ok) return notify("Something went wrong", "error");
    notify(`${email} is now ${comittee ? "not " : ""}comittee`, "info");
    const idx = displayUsers.findIndex((user) => user.email === email);
    const tempUsers = [...displayUsers];
    tempUsers[idx].isComittee = tempUsers[idx].isComittee ? 0 : 1;
    setDisplayUsers(tempUsers);
  };

  return (
    <div css={manageComitteeStyle}>
      <div className="topManageBox">
        <ButtonWithImage
          src={Back}
          onClick={() => navigate("/comittee")}
          bgColor={colors["blue"].background}
          bgHover={colors["blue"].backgroundHover}
        />
        <h1 className="page_title">Manage Comittee</h1>
        <div />
      </div>
      <div className="flexCenter">
        <div className="manageBox">
          <div className="columnsBox bold">
            <div className="flexCenter">
              <Input
                textAlign="center"
                width="90%"
                onChange={(e) => setFilterData(e.target.value)}
                defaultValue="Search Email"
                onFocus={(e) => {
                  e.target.value = "";
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
            <div className="flexCenter">Comittee</div>
          </div>
          {displayUsers ? (
            displayUsers.length > 0 ? (
              <div className="map">
                {displayUsers.map((item, i) => {
                  return (
                    <div className="columnsBox" key={i}>
                      <div className="email flexCenter">{item.email}</div>
                      <Checkbox
                        data={item}
                        key={i}
                        checked={!!item.isComittee}
                        onChange={() => onChange(item.email, item.isComittee)}
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
    </div>
  );
}

const manageComitteeStyle = {
  ".topManageBox": {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    minWidth: "1200px",
    alignItems: "flex-end",
    marginBottom: "30px",
    button: {
      width: "60px",
      justifySelf: "flex-end",
      marginBottom: "-10px",
    },
  },
  ".manageBox": {
    display: "flex",
    flexDirection: "column",
    minHeight: "calc(85vh - 200px)",
    minWidth: "600px",
    alignItems: "center",
    margin: "0 20vw",
    border: "1px solid black",
    borderRadius: "8px",
    padding: "20px 10px",
    backgroundColor: "linear-gradient(145deg, #ffffff, #e4e5da)",
    boxShadow: "20px 20px 60px #d7d8ce, -20px -20px 60px #ffffff",
    ".columnsBox": {
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      height: "50px",
      width: "100%",
      ".email": {
        whiteSpace: "nowrap",
        minWidth: "400px",
      },
    },
    ".map": {
      width: "100%",
    },
  },
};
