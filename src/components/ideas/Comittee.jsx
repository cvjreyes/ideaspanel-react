/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext, useEffect, useState } from "react";

import { api } from "../../helpers/api";
import ButtonWithImage from "../general/ButtonWithImage";
import Card from "../general/Card";
import Loading from "../general/Loading";
import ThumbsUp from "../../assets/images/thumbs-up.png";
import ThumbsDown from "../../assets/images/thumbs-down.png";
import { colors } from "../../helpers/colors";
import { AuthContext } from "../../context/AuthContext";
import NoResults from "../home/NoResults";

export default function Comittee() {
  const [data, setData] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getOldestUnapprovedIdea = async () => {
      const { body } = await api("get", `/ideas/to_approve/${user.id}`);
      setData(body);
    };
    getOldestUnapprovedIdea();
  }, []);

  if (!data) return <Loading />;
  if (!(data.length > 0)) return <NoResults />;

  return (
    <div css={comitteeStyle}>
      <h1 className="page_title">Comittee</h1>
      <Card item={{ ...data[0], anonymous: true }} />
      <div className="boxVotes">
        <div>
          <ButtonWithImage
            type="button"
            bgColor={colors["red"].background}
            bgHover={colors["red"].backgroundHover}
            width="50px"
            margin="0 50px"
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
  minHeight: "calc(100vh - 50px)",
  width: "100%",
  alignItems: "center",
  ".boxVotes": {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
  },
};
