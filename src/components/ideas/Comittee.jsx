/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "wouter";

import { api } from "../../helpers/api";
import { colors } from "../../helpers/colors";
import { AuthContext } from "../../context/AuthContext";
import { useNotifications } from "reapop";

import ButtonWithImage from "../general/ButtonWithImage";
import Button from "../general/Button";
import Card from "../general/Card";
import Loading from "../general/Loading";
import ThumbsUp from "../../assets/images/thumbs-up.png";
import ThumbsDown from "../../assets/images/thumbs-down.png";
import NoResults from "../home/NoResults";

export default function Comittee() {
  const [data, setData] = useState(null);
  const { user } = useContext(AuthContext);

  const [__, navigate] = useLocation();
  const { notify } = useNotifications();

  useEffect(() => {
    const getOldestUnapprovedIdea = async () => {
      const { body } = await api("get", `/ideas/to_approve/${user.id}`);
      setData(body);
    };
    getOldestUnapprovedIdea();
  }, []);

  const handleVote = async (e) => {
    console.log("idea: ", data[0].id);
    const { ok } = await api("post", "/votes/submit_votes", {
      idea_id: data[0].id,
      user_id: user.id,
      vote: e,
    });
    if (!ok) return notify("Something went wrong", "error");
    notify("Vote successfully done", "success");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  if (!data) return <Loading />;
  if (!(data.length > 0)) return <NoResults />;

  return (
    <div css={comitteeStyle}>
      <h1 className="page_title">Comittee</h1>
      <Button text="Manage Comittee" width="200px" className="manageComitteeButton" onClick={() => navigate("/comittee/manage")}/>
      <Card item={{ ...data[0], anonymous: true }} />
      <div className="boxVotes">
        <div>
          <ButtonWithImage
            type="button"
            bgColor={colors["red"].background}
            bgHover={colors["red"].backgroundHover}
            width="50px"
            margin="0 50px"
            onClick={() => handleVote(0)}
            // img
            src={ThumbsDown}
          />
        </div>
        <div>
          <ButtonWithImage
            type="button"
            bgColor={colors["green"].background}
            bgHover={colors["green"].backgroundHover}
            width="50px"
            margin="0 50px"
            onClick={() => handleVote(1)}
            // img
            src={ThumbsUp}
          />
        </div>
      </div>
    </div>
  );
}

const comitteeStyle = {
  display: "flex",
  flexDirection: "column",
  minHeight: "calc(90vh - 50px)",
  width: "100%",
  alignItems: "center",
  ".boxVotes": {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  ".manageComitteeButton": {
    display: "flex",
    alignSelf:"flex-end",
    textAlign: "center",
    margin:"0 200px"
  }
};
