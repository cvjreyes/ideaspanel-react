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
  const [checkUserVote, setCheckUserVote] = useState([]);
  const [idea, setIdea] = useState({
    title: "",
    description: "",
    anonymous: false,
  });

  const getVotesIdea = async () => {
    const { body } = await api(
      "get",
      `/idea_votes/get_idea_votes/${params.idea_id}`
    );
    setIdeasVotes(body);
  };
  
  const checkUserVotesIdea = async () => {
    const { body } = await api(
      "get",
      `/idea_votes/check_user_idea_vote/${params.idea_id}/${user.id}`
    );
    setCheckUserVote(body);
  };

  useEffect(() => {
    const getIdeaInfo = async () => {
      const { body } = await api("get", `/ideas/get_info/${params.idea_id}`);
      setIdea(body[0]);
    };
    const getComments = async () => {
      const { body } = await api(
        "get",
        `/comments/get_comments_from_idea/${params.idea_id}`
      );
      setComments(body);
    };

    getIdeaInfo();
    getVotesIdea();
    getComments();
    checkUserVotesIdea();
  }, []);

  useEffect(() => {
    getVotesIdea();
    checkUserVotesIdea();
  }, [ideasVotes, checkUserVote]);

  const handleAddComment = async (e) => {
    e && e.preventDefault();
    const { ok } = await api("post", "/comments/add_comment", {
      idea_id: params.idea_id,
      user_id: user.id,
      comment: newComment,
    });
    if (!ok) return notify("Something went wrong", "error");
    notify("Comment successfully added", "success");
    setComments([
      ...comments,
      {
        idea_id: params.idea_id,
        user_id: user.id,
        name: user.name,
        like: 0,
        positiveVotes: 0,
        comment: newComment,
        profile_pic: user.profile_pic,
      },
    ]);
    setNewComment("");
  };

  const handleIdeaVote = async (e) => {
    if (e.length > 0) {
      const { ok } = await api("delete", `/idea_votes/delete_idea_vote/${params.idea_id}/${user.id}`, {
        idea_id: Number(params.idea_id),
        user_id: user.id,
      });
      setCheckUserVote(ok);
      if (!ok) return notify("Something went wrong", "error");
    } else {
      const { ok } = await api("post", "/idea_votes/submit_idea_vote", {
        idea_id: Number(params.idea_id),
        user_id: user.id,
      });
      setCheckUserVote(ok);
      if (!ok) return notify("Something went wrong", "error");
    }
    notify("Vote successfully done", "success");
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
              bgColor={
                checkUserVote.length > 0 ? colors["green"].background : ""
              }
              bgHover={
                checkUserVote.length > 0 ? colors["green"].backgroundHover : ""
              }
              // img
              src={ThumbsUp}
              onClick={() => handleIdeaVote(checkUserVote)}
            />
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
