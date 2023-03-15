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
  const [hasUserVoted, setHasUserVoted] = useState(false);
  const [idea, setIdea] = useState({
    title: "",
    description: "",
    anonymous: false,
  });

  useEffect(() => {
    const getIdeaInfo = async () => {
      const { body } = await api("get", `/ideas/get_info/${params.idea_id}`);
      setIdea(body[0]);
    };
    getIdeaInfo();
    getIdeaVotes();
    getComments();
  }, []);

  const getIdeaVotes = async () => {
    const { body } = await api(
      "get",
      `/idea_votes/get_idea_votes/${params.idea_id}`
    );
    setIdeasVotes(body);
    const idx = body.findIndex((idea) => user.id === idea.user_id);
    if (idx === -1) {
      return setHasUserVoted(false);
    } else {
      setHasUserVoted(true);
    }
  };

  const getComments = async () => {
    const { body } = await api(
      "get",
      `/comments/get_comments_from_idea/${params.idea_id}`
    );
    setComments(body);
  };

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
    const { ok } = await api("post", "/idea_votes/submit_idea_vote", {
      idea_id: Number(params.idea_id),
      user_id: user.id,
      check_vote: hasUserVoted,
    });
    if (!ok) return notify("Something went wrong", "error");
    notify(`${checkUserVote ? "Unv" : "V"}ote successfully done`, "success");
    getIdeaVotes();
  };

  return (
    <div css={ideaStyle}>
      <h1 className="page_title">Idea</h1>
      <form>
        <div className="left">
          <div className="info bold">{idea.title}</div>
          <div className="info">{idea.description}</div>
          <div className="image">
            {idea.image && <img src={idea.image} alt="IdeaImage" />}
          </div>
          <ButtonWithImage
            type="button"
            text={ideasVotes.length}
            width="60px"
            margin="20px 0 0 0"
            bgColor={hasUserVoted ? colors["green"].background : ""}
            bgHover={hasUserVoted ? colors["green"].backgroundHover : ""}
            // img
            src={ThumbsUp}
            onClick={() => handleIdeaVote()}
          />
          <AddCommentSection
            newComment={newComment}
            setNewComment={setNewComment}
            handleAddComment={handleAddComment}
          />
        </div>
        <div className="right">
          <b>Comments: </b>
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
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    padding: "50px 10vw 0",
    ".left": {
      minWidth: "500px",
      display: "flex",
      flexDirection: "column",
      ".info": {
        margin: "10px 0",
      },
      ".image": {
        display: "flex",
        justifyContent: "start",
        marginTop: "50px",
        img: {
          height: "200px",
          width: "350px",
        },
      },
    },
    ".right": {
      padding: "10px",
    },
  },
};
