/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext, useEffect, useState } from "react";
import { useNotifications } from "reapop";
import { useRoute } from "wouter";

import { AuthContext } from "../../context/AuthContext";
import { api } from "../../helpers/api";
import { colors } from "../../helpers/colors";

import ButtonWithImage from "../general/ButtonWithImage";
import AddCommentSection from "./AddCommentSection";
import CommentSection from "./CommentSection";
import NoComments from "./NoComments";
import ThumbsUp from "../../assets/images/thumbs-up.png";

export default function Idea() {
  const [_, params] = useRoute("/idea/:idea_id");
  const { user } = useContext(AuthContext);
  const { notify } = useNotifications();

  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [ideasVotes, setIdeasVotes] = useState([]);
  const [checkUserVote, setCheckUserVote] = useState(false);
  const [idea, setIdea] = useState({
    title: "",
    description: "",
    anonymous: false,
  });

  const getIdeaVotes = async () => {
    const { body } = await api(
      "get",
      `/idea_votes/get_idea_votes/${params.idea_id}`
    );
    setIdeasVotes(body);
    const idx = body.findIndex((idea) => user.id === idea.user_id);
    if (idx === -1) {
      return setCheckUserVote(false);
    } else {
      setCheckUserVote(true);
    }
  };

  const getComments = async () => {
    const { body } = await api(
      "get",
      `/comments/get_comments_from_idea/${params.idea_id}`
    );
    setComments(body);
  };

  const getIdeaInfo = async () => {
    const { body } = await api("get", `/ideas/get_info/${params.idea_id}`);
    setIdea(body[0]);
  };

  useEffect(() => {
    getIdeaInfo();
    getIdeaVotes();
    getComments();
  }, []);

  const handleAddComment = async (e) => {
    e && e.preventDefault();
    const { ok } = await api("post", "/comments/add_comment", {
      idea_id: params.idea_id,
      user_id: user.id,
      comment: newComment,
    });
    if (!ok) return notify("Something went wrong", "error");
    notify("Comment successfully added", "success");
    getComments();
    setNewComment("");
  };

  const handleIdeaVote = async () => {
    if (checkUserVote) {
      const { ok } = await api(
        "delete",
        `/idea_votes/delete_idea_vote/${params.idea_id}/${user.id}`,
        {
          idea_id: Number(params.idea_id),
          user_id: user.id,
        }
      );
      if (!ok) return notify("Something went wrong", "error");
      notify("Unvote successfully done", "success");
    } else {
      const { ok } = await api("post", "/idea_votes/submit_idea_vote", {
        idea_id: Number(params.idea_id),
        user_id: user.id,
      });
      if (!ok) return notify("Something went wrong", "error");
      notify("Vote successfully done", "success");
    }
    getIdeaVotes();
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
          <div>
            <ButtonWithImage
              type="button"
              text={ideasVotes.length}
              width="60px"
              margin="20px 0 0 0"
              bgColor={checkUserVote ? colors["green"].background : ""}
              bgHover={checkUserVote ? colors["green"].backgroundHover : ""}
              // img
              src={ThumbsUp}
              onClick={() => handleIdeaVote()}
            />
          </div>
          <AddCommentSection
            newComment={newComment}
            setNewComment={setNewComment}
            handleAddComment={handleAddComment}
          />
        </div>
        <div className="right">
          <div>
            <b>Comments: </b>
          </div>
          {comments.length > 0 ? (
            <CommentSection comments={comments} />
          ) : (
            <NoComments />
          )}
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
