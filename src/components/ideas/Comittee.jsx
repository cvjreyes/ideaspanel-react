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
  const { user } = useContext(AuthContext);
  const [__, navigate] = useLocation();
  const { notify } = useNotifications();

  const [data, setData] = useState(null);
  const [voted, setVoted] = useState(false);

  const getOldestUnapprovedIdea = async () => {
    const { body } = await api("get", `/ideas/to_approve/${user.id}`);
    setData(body);
    setVoted(false);
  };

  useEffect(() => {
    if (!user.isComittee) return navigate("/");
    getOldestUnapprovedIdea();
  }, []);

  const handleVote = async (e) => {
    if (voted) return;
    setVoted(true);
    const { ok } = await api("post", "/votes/submit_votes", {
      idea_id: data[0].id,
      user_id: user.id,
      vote: e,
    });
    if (!ok) return notify("Something went wrong", "error");
    notify("Vote successfully done", "success");
    setTimeout(() => {
      getOldestUnapprovedIdea();
    }, 2000);
  };

  if (!data) return <Loading />;

  return (
    <div css={comitteeStyle}>
      <div className="boxTop">
        <div />
        <h1 className="page_title">Comittee</h1>
        {user.isAdmin && (
          <Button
            text="Manage Comittee"
            className="manageComitteeButton"
            onClick={() => navigate("/comittee/manage")}
            bgColor={colors["blue"].background}
            bgHover={colors["blue"].backgroundHover}
            color="white"
          />
        )}
      </div>
      {data.length > 0 ? (
        <div>
          <Card item={{ ...data[0], anonymous: true }} comittee={true} />
          <div className="boxVotes">
            <div className="flexCenter">
              <ButtonWithImage
                type="button"
                bgColor={colors["red"].background}
                bgHover={colors["red"].backgroundHover}
                width="50px"
                onClick={() => handleVote(0)}
                // img
                src={ThumbsDown}
              />
            </div>
            <div className="flexCenter">
              <ButtonWithImage
                type="button"
                bgColor={colors["green"].background}
                bgHover={colors["green"].backgroundHover}
                width="50px"
                onClick={() => handleVote(1)}
                // img
                src={ThumbsUp}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>Thanks for voting ❤</div>
      )}
    </div>
  );
}

const comitteeStyle = {
  display: "flex",
  flexDirection: "column",
  minHeight: "calc(90vh - 50px)",
  width: "100%",
  alignItems: "center",
  ".boxTop": {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    width: "100%",
  },
  ".boxVotes": {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  ".manageComitteeButton": {
    display: "flex",
    alignSelf: "flex-end",
    width: "190px",
  },
};
