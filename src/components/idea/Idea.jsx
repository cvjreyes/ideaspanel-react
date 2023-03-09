/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";

import Button from "../general/Button";
import { api } from "../../helpers/api";
import { colors } from "../../helpers/colors";

export default function Idea() {
  const [_, params] = useRoute("/idea/:idea_id");
  const [__, navigate] = useLocation();

  const [idea, setIdea] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const getIdeaInfo = async () => {
      const { body } = await api("get", `/ideas/get_info/${params.idea_id}`);
      setIdea(body[0]);
    };
    getIdeaInfo();
  }, []);

  return (
    <div css={newIdeaStyle}>
      <h1 className="page_title">Idea</h1>
      <form>
        <div className="left">
          {/* <input readOnly placeholder="Title" value={idea.title} name="title" /> */}
          <div className="info">
            <b>Title: </b>
            {idea.title}
          </div>
          <div className="info">
            <b>Description: </b>
            {idea.description}
          </div>
        </div>
        <div className="right">
          {idea.image && <img src={idea.image} alt="IdeaImage" />}
        </div>
        <div className="bold">Comments:</div>
        <div className="commentsWrapper">
          <textarea
            placeholder="Write your comment"
            name="comment"
          ></textarea>
          <Button
            text="Save"
            color="white"
            fontWeight="600"
            textMargin="0 0 0 5px"
            width="100px"
            bgColor={colors["blue"].background}
            bgHover={colors["blue"].backgroundHover}
            onClick={() => navigate("/")}
          />
        </div>
      </form>
    </div>
  );
}

const newIdeaStyle = {
  minHeight: "calc(70vh - 150px)",
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    padding: "50px 10vw 0",
    minHeight: "calc(80vh - 130px)",
    margin: "50px 0 0",
    ".left": {
      display: "flex",
      flexDirection: "column",
      ".info": {
        padding: "10px",
        margin: "30px 0 0",
      },
    },
    ".right": {
      display: "flex",
      justifyContent: "center",
      height: "300px",
      img: {
        width: "300px",
      },
    },
    ".commentsWrapper": {
      gridColumn: "span 2",
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
      textarea: {
        margin: "0 30px 0 0",
        borderRadius: "8px",
        padding: "10px",
        height: "200px",
        width:"50vw"
      },
    },
  },
};
