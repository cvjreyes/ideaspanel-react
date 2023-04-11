/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext, useEffect, useState } from "react";
import { useNotifications } from "reapop";
import { AuthContext } from "../../context/AuthContext";
import { api } from "../../helpers/api";
import { useNavigate } from "react-router-dom";
import Back from "../../assets/images/back.png";
import ButtonWithImage from "../general/ButtonWithImage";
import Checkbox from "../general/Checkbox";
import Input from "../general/Input";
import Loading from "../general/Loading";
import { Section } from "../general/Section";
import NoResults from "../home/NoResultsTest";

export default function ManageComittee() {
  const [users, setUsers] = useState(null);
  const [displayUsers, setDisplayUsers] = useState(null);
  const [filterData, setFilterData] = useState("");

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
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

  const onChange = async (email, comittee, user_id) => {
    const { ok } = await api("post", "/users/update_comittee", {
      email: email,
      comittee: comittee ? 0 : 1,
    });
    if (!ok) return notify("Something went wrong", "error");
    notify(`${email} is now ${comittee ? "not " : ""}comittee`, "info");
    let isComittee = comittee ? 0 : 1;
    if (isComittee) {
      await api("post", "/comittee_votes/submit_comittee_votes", {
        user_id,
      });
    } else {
      await api("delete", `/comittee_votes/delete_comittee_votes/${user_id}`);
    }
    const idx = displayUsers.findIndex((user) => user.email === email);
    const tempUsers = [...displayUsers];
    tempUsers[idx].isComittee = tempUsers[idx].isComittee ? 0 : 1;
    setDisplayUsers(tempUsers);
  };

  return (
    <Section css={manageComitteeStyle} fullHeight>
      <div>
        <div className="topManageBox">
          <h1>Manage Comittee</h1>
          <div />
        </div>
        <div>
          <div className="manageBox">
            <div className="header_table bold">
              <div className="filter_email_box ">
                <Input
                  textAlign="center"
                  onChange={(e) => setFilterData(e.target.value)}
                  placeholder="Email"
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
                  width="100%"
                />
              </div>
              <div className="comittee">Is Comittee</div>
            </div>
            {displayUsers ? (
              displayUsers.length > 0 ? (
                <div className="body_table">
                  {displayUsers.map((item, i) => {
                    return (
                      <div className="rowBox" key={i}>
                        <div className="email">{item.email}</div>
                        <div className="checkboxContainer">
                          <Checkbox
                            data={item}
                            key={i}
                            checked={!!item.isComittee}
                            onChange={() =>
                              onChange(item.email, item.isComittee, item.id)
                            }
                            className="checkbox"
                          />
                        </div>
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
    </Section>
  );
}

const manageComitteeStyle = {
  ".topManageBox": {
    marginBottom: "30px",
    ".back_btn": {
      width: "50px",
      height: "45px",
      color: "#fff",
      cursor: "pointer",
      transition: "all 0.3s ease",
      borderRadius: "5px",
      border: "none",
      background: "#3a86ff",
      boxShadow: "0 5px #4433ff",
      ":hover": {
        boxShadow: "0 3px #4433ff",
        top: "1px",
      },
      ":active": {
        boxShadow: "0 0 #4433ff",
        top: "5px",
      },
    },
  },
  ".manageBox": {
    background: "#F5F5F5",
    border: "1px solid #C4C4C4",
    borderRadius: "10px",
    ".header_table": {
      display: "flex",
      alignItems: "center",
      borderBottom: "1px solid #C4C4C4",
      ".filter_email_box": {
        display: "flex",
        alignItems: "center",
        padding: "15px 10px",
        width: "50%"
      },
      ".comittee": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderLeft: "1px solid #C4C4C4",
        width: "50%"
      },
    },
    ".body_table": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      ".rowBox": {
        display: "flex",
        width: "100%",
        ".email": {
          display: "flex",
          alignItems: "center",
          padding: "15px 10px",
          justifyContent: "center",
          width: "50%",
          wordBreak: "break-all"
        },
        ".checkboxContainer": {
          width: "50%",
          display: "flex",
          alignItems: "center",
          borderLeft: "1px solid #C4C4C4",
          justifyContent: "center",
        },
      },
    },
  },
};
