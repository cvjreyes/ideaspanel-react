/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect, useState } from "react";
import { useRoute } from "wouter";

import { api } from "../../helpers/api";
import AddCommentSection from "./AddCommentSection";
import CommentSection from "./CommentSection";

export default function Idea() {
  const [_, params] = useRoute("/idea/:idea_id");

  const [idea, setIdea] = useState({
    title: "",
    description: "",
    anonymous: false,
  });
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([
    {
      text: "primer comentario primer comentario primer comentario primer comentario primer comentario ",
      user: "Sean Saez Fuller",
      like: true,
      numVotosPositivos: 5,
    },
    {
      text: "segundo comentario",
      user: "Toni Enguix",
      like: false,
      numVotosPositivos: 4,
    },
    {
      text: "tercer comentario",
      user: "Manolo escobar",
      like: false,
      numVotosPositivos: 3,
    },
    {
      text: "cuarto comentario",
      user: "Asier Carracedo",
      like: true,
      numVotosPositivos: 2,
    },
    {
      text: "quinto comentario",
      user: "Xavi Pascual",
      like: false,
      numVotosPositivos: 7,
    },
  ]);

  useEffect(() => {
    const getIdeaInfo = async () => {
      const { body } = await api("get", `/ideas/get_info/${params.idea_id}`);
      setIdea(body[0]);
    };
    getIdeaInfo();
  }, []);

  const handleAddComment = () => {
    setComments([...comments, newComment]);
    setNewComment("");
  };

  return (
    <div css={ideaStyle}>
      <h1 className="page_title">Idea</h1>
      <form>
        <div className="infoIdea">
          <div className="info bold">{idea.title}</div>
          <div className="info">
            <i>{idea.description}</i>
          </div>
          <div className="image">
            {idea.image && <img src={idea.image} alt="IdeaImage" />}
          </div>
        </div>
        <div className="commentsWrapper">
          <div>
            <b>Comments: </b>
          </div>
          <CommentSection comments={comments} />
        </div>
        <div></div>
        <div className="addCommentsWrapper">
          <AddCommentSection
            comments={comments}
            newComment={newComment}
            setNewComment={setNewComment}
            handleAddComment={handleAddComment}
          />
        </div>
      </form>
    </div>
  );
}

const ideaStyle = {
  minHeight: "calc(70vh - 150px)",
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    padding: "50px 10vw 0",
    minHeight: "calc(80vh - 130px)",
    ".infoIdea": {
      minWidth: "310px",
      display: "flex",
      flexDirection: "column",
      ".info": {
        padding: "10px",
      },
    },
    ".image": {
      display: "flex",
      justifyContent: "start",
      height: "250px",
      marginTop: "50px",
      img: {
        width: "250px",
      },
    },
    ".commentsWrapper": {
      display: "flex",
      flexDirection: "column",
      padding: "10px",
    },
    ".addCommentsWrapper": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
};
