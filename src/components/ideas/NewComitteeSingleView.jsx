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

export default function NewComitteeSingleView() {
  const [_, params] = useRoute("/comittee/:idea_id");
  const { user } = useContext(AuthContext);
  const [__, navigate] = useLocation();

  const [data, setData] = useState(null);

  useEffect(() => {
    if (!user.isComittee) return navigate("/");
    const getData = async () => {
      const { body } = await api("get", `/ideas/get_info/${params.idea_id}`);
      setData(body);
    };
    getData();
  }, []);

  if (!data) return <Loading />;
  return (
    <div css={singleViewStyle} className="page_title">
      <div className="top">
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
      <BoxVotes />
    </div>
  );
}

const BoxVotes = () => {
  return (
    <div className="boxVotes">
      <ButtonWithImage
        type="button"
        bgColor={colors["red"].background}
        bgHover={colors["red"].backgroundHover}
        width="50px"
        onClick={() => handleVote(0)}
        // img
        src={thumbsDown}
      />
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
  );
};

const singleViewStyle = {
  width: "fit-content",
  margin: "100px auto",
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
};
