/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext, useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";

import { AuthContext } from "../../context/AuthContext";
import { api } from "../../helpers/api";
import { colors } from "../../helpers/colors";
import ButtonWithImage from "../general/ButtonWithImage";

import Card from "../general/Card";
import { CountdownTimer } from "../general/CountDown";
import Loading from "../general/Loading";

import thumbsUp from "../../assets/images/thumbs-up.png";
import thumbsDown from "../../assets/images/thumbs-down.png";
import Back from "../../assets/images/back.png";
import { useNotifications } from "reapop";

export default function NewComitteeSingleView() {
  const [_, params] = useRoute("/comittee/:idea_id");
  const { user } = useContext(AuthContext);
  const [__, navigate] = useLocation();
  const { notify } = useNotifications();

  const [data, setData] = useState(null);

  const getData = async () => {
    const { body } = await api(
      "get",
      `/ideas/get_info_and_vote/${params.idea_id}`
    );
    setData(body);
  };

  useEffect(() => {
    if (!user.isComittee) return navigate("/");
    getData();
  }, []);

  const handleVote = async (vote) => {
    const { ok } = await api("post", "/comittee_votes/submit_vote", {
      idea_id: data.id,
      user_id: user.id,
      vote,
    });
    if (!ok) return notify("Something went wrong", "error");
    notify("Vote successfully done", "success");
    getData();
  };

  if (!data) return <Loading />;
  return (
    <div css={singleViewStyle}>
      <div className="top page_title">
        <ButtonWithImage
          src={Back}
          onClick={() => navigate("/comittee")}
          bgColor={colors["blue"].background}
          bgHover={colors["blue"].backgroundHover}
          width="70px"
        />
        <CountdownTimer date={data.sent_to_validate_at} />
      </div>
      <Card item={{ ...data, anonymous: true }} comittee={true} />
      <BoxVotes handleVote={handleVote} approved={data.approved} />
      <p className="remove pointer" onClick={() => handleVote(null)}>
        Remove vote
      </p>
    </div>
  );
}

const BoxVotes = ({ handleVote, approved }) => {
  return (
    <div className="boxVotes">
      <VoteWrapper voted={approved !== null && !approved}>
        <ButtonWithImage
          type="button"
          bgColor={colors["red"].background}
          bgHover={colors["red"].backgroundHover}
          width="50px"
          onClick={() => handleVote(0)}
          // img
          src={thumbsDown}
        />
      </VoteWrapper>
      <VoteWrapper voted={approved}>
        <ButtonWithImage
          type="button"
          bgColor={colors["green"].background}
          bgHover={colors["green"].backgroundHover}
          width="50px"
          onClick={() => handleVote(1)}
          // img
          src={thumbsUp}
        />
      </VoteWrapper>
    </div>
  );
};

const VoteWrapper = ({ children, voted }) => {
  const voteWrapperStyle = {
    padding: "5px",
    border: voted && "2px solid blue",
    borderRadius: "6px",
  };

  return <div css={voteWrapperStyle}>{children}</div>;
};

const singleViewStyle = {
  width: "fit-content",
  margin: "100px auto 0",
  ".top": {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    alignItems: "flex-end",
    justifyItems: "center",
    width: "100vw",
  },
  ".boxVotes": {
    width: "400px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-evenly",
  },
  ".remove": {
    textAlign: "center",
    marginTop: "30px",
    color: "blue",
    ":hover": {
      textDecoration: "underline",
    },
  },
};
