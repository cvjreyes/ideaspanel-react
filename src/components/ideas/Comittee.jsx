/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext, useEffect, useState } from "react";
import { useNotifications } from "reapop";

import { AuthContext } from "../../context/AuthContext";
import { api } from "../../helpers/api";
import { colors } from "../../helpers/colors";

import { useNavigate } from "react-router-dom";
import thumbsDown from "../../assets/images/thumbs-down.png";
import thumbsUp from "../../assets/images/thumbs-up.png";
import Button from "../general/Button";
import ButtonWithImage from "../general/ButtonWithImage";
import Card from "../general/Card";
import Loading from "../general/Loading";

export default function Comittee() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
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
    const { ok } = await api("post", "/comittee_votes/submit_vote", {
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
        {data[0] ? (
          <div className="countdownWrapper flexColumn">
            <CountdownTimer date={data?.[0].sent_to_validate_at} />
          </div>
        ) : (
          <div style={{ marginTop: "100px", textAlign: "center" }}>
            That's all
          </div>
        )}
        {user.isAdmin && (
          <div className="manageComitteeButton">
            <Button
              text="Manage Comittee"
              onClick={() => navigate("/comittee/manage")}
              bgColor={colors["blue"].background}
              bgHover={colors["blue"].backgroundHover}
              color="white"
            />
          </div>
        )}
      </div>
      {data.length > 0 ? (
        <div className="contentWrapper">
          <div />
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
                  src={thumbsDown}
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
                  src={thumbsUp}
                />
              </div>
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
    height: "151px",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    width: "100%",
    ".countdownWrapper": {
      margin: "80px auto 0",
      fontWeight: 700,
      justifyContent: "flex-start",
      textAlign: "center",
      "> p": {
        fontSize: "1.2rem",
      },
      ".show-counter": {
        marginTop: "10px",
        border: "1px solid #ebebeb",
        borderRadius: "0.25rem",
        ".countdown": {
          padding: "0.5rem 1rem",
          display: "flex",
        },
      },
    },
    ".manageComitteeButton": {
      display: "flex",
      alignSelf: "flex-end",
      margin: "0 auto",
    },
  },
  ".contentWrapper": {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    width: "100%",
    ".boxVotes": {
      width: "80%",
      margin: "0 auto",
      display: "flex",
      justifyContent: "space-evenly",
    },
  },
};
