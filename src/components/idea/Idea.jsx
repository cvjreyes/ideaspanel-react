/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext, useEffect, useState } from "react";
import { useNotifications } from "reapop";
import { useRoute } from "wouter";

import { AuthContext } from "../../context/AuthContext";
import { api } from "../../helpers/api";

import AddCommentSection from "./AddCommentSection";
import CommentSection from "./CommentSection";
import NoComments from "./NoComments";

export default function Idea() {
  const [_, params] = useRoute("/idea/:idea_id");
  const { user } = useContext(AuthContext);
  const { notify } = useNotifications();

  const [idea, setIdea] = useState({
    title: "",
    description: "",
    anonymous: false,
  });
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  const getComments = async () => {
    const { body } = await api(
      "get",
      `/comments/get_comments_from_idea/${params.idea_id}`
    );
    setComments(body);
  };
  useEffect(() => {
    const getIdeaInfo = async () => {
      const { body } = await api("get", `/ideas/get_info/${params.idea_id}`);
      setIdea(body[0]);
    };
    getIdeaInfo();
    getComments();
  }, []);

  useEffect(() => {
    getComments();
  }, [comments]);

  const handleAddComment = async (e) => {
    e && e.preventDefault();
    const { ok } = await api("post", "/comments/add_comment", {
      idea_id: params.idea_id,
      user_id: user.id,
      comment: newComment,
    });
    if (!ok) return notify("Something went wrong", "error");
    notify("Vote successfully done", "success");
    setComments([
      ...comments,
      {
        idea_id: params.idea_id,
        user_id: user.id,
        like: 0,
        positiveVote: 0,
        comment: newComment,
      },
    ]);
    setNewComment("");
  };

  return (
    <div css={ideaStyle}>
      <h1 className="page_title">Idea</h1>
      <form>
        <div className="left">
          <div className="info bold">{idea.title}</div>
          <div className="info">
            <i>{idea.description}</i>
          </div>
          <div className="image">
            {idea.image && <img src={idea.image} alt="IdeaImage" />}
          </div>
          <AddCommentSection
            comments={comments}
            newComment={newComment}
            setNewComment={setNewComment}
            handleAddComment={handleAddComment}
          />
        </div>
        <div className="right">
          <div>
            <b>Comments: </b>
          </div>
          {comments ? <CommentSection comments={comments} /> : <NoComments />}
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
    ".left": {
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
    ".right": {
      display: "flex",
      flexDirection: "column",
      padding: "10px",
    },
  },
};
