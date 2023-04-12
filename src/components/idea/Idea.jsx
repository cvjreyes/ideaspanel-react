/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, keyframes } from "@emotion/react";
import React, { useContext, useEffect, useState } from "react";
import { useNotifications } from "reapop";

import { AuthContext } from "../../context/AuthContext";
import { api } from "../../helpers/api";

import { useParams } from "react-router";
import ThumbsUpBlue from "../../assets/images/thumbs-up-blue.png";
import ThumbsUp from "../../assets/images/thumbs-up.png";
import ButtonWithImage from "../general/ButtonWithImage";
import { Section } from "../general/Section";
import AddCommentSection from "./AddCommentSection";
import CommentSection from "./CommentSection";
import NoResults from "../general/NoResults";
import { BsImage } from "react-icons/bs";

export default function Idea({ readOnly }) {
  let { id: ideaId } = useParams();
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
      const { body } = await api("get", `/ideas/get_info/${ideaId}`);
      setIdea(body);
    };
    getIdeaInfo();
    if (!readOnly) {
      getIdeaVotes();
      getComments();
    }
  }, []);

  const getIdeaVotes = async () => {
    const { body } = await api("get", `/idea_votes/get_idea_votes/${ideaId}`);
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
      `/comments/get_comments_from_idea/${ideaId}`
    );
    setComments(body);
  };

  const handleAddComment = async (e) => {
    e && e.preventDefault();
    console.log(e.target.value);
    const { ok } = await api("post", "/comments/add_comment", {
      idea_id: ideaId,
      user_id: user.id,
      comment: newComment,
    });
    if (!ok) return notify("Something went wrong", "error");
    notify("Comment successfully added", "success");
    getComments();
    setNewComment("");
  };

  const handleDeleteComment = async (comment_id) => {
    const { ok } = await api(
      "delete",
      `/comments/delete_comment/${comment_id}`
    );
    if (!ok) return notify("Something went wrong", "error");
    notify("Comment deleted", "success");
    getComments();
  };

  const handleIdeaVote = async () => {
    const { ok } = await api("post", "/idea_votes/submit_idea_vote", {
      idea_id: Number(ideaId),
      user_id: user.id,
      check_vote: hasUserVoted,
    });
    if (!ok) return notify("Something went wrong", "error");
    notify(`${hasUserVoted ? "Unv" : "V"}ote successfully done`, "success");
    getIdeaVotes();
  };

  return (
    <Section css={ideaStyle}>
      <h1>Idea</h1>
      <form className="form">
        <div className="left">
          <div className="imageContainer">
            {idea.image ? (
              <img src={idea.image} />
            ) : (
              <div>
                <BsImage className="noImage" />
              </div>
            )}
          </div>
          {!readOnly && (
            <ButtonWithImage
              type="button"
              text={ideasVotes.length}
              width="60px"
              margin="20px 0 0 0"
              bgColor={"transparent"}
              bgHover={"transparent"}
              // img
              src={hasUserVoted ? ThumbsUpBlue : ThumbsUp}
              onClick={() => handleIdeaVote()}
              className={hasUserVoted ? "btn_vote_active" : "btn_vote"}
            />
          )}
        </div>
        <div className="right">
          <h2 className="idea__title">{idea.title}</h2>
          <p className="idea__description">{idea.description}</p>
          {!readOnly && (
            <>
              <AddCommentSection
                newComment={newComment}
                setNewComment={setNewComment}
                handleAddComment={handleAddComment}
              />
              {comments.length > 0 ? (
                <CommentSection
                  comments={comments}
                  userID={user.id}
                  handleDeleteComment={handleDeleteComment}
                />
              ) : (
                <NoResults />
              )}
            </>
          )}
        </div>
      </form>
    </Section>
  );
}

const circleAnim = keyframes`
0%      {transform: scale(1); }
50%     {transform: scale(1.5); }
100%    {transform: scale(1); }
`;

const ideaStyle = {
  form: {
    display: "flex",
    gap: "2rem",
    ".left": {
      flex: 1,
      ".btn_vote_active": {
        display: "flex",
        animation: `${circleAnim} 1s ease forwards`,
      },
    },
    ".right": {
      flex: 1,
    },
    ".idea__title": {
      fontSize: "1.2rem",
      fontWeight: "400",
      marginBottom: "0.7rem",
    },
    ".idea__description": {
      color: "#7E7E7E",
      marginBottom: "1.5rem",
    },
    ".imageContainer": {
      backgroundColor: "red",
      aspectRatio: "7/4",
      backgroundColor: "#C3C3C3",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      img:{
        height:"100%",
        objectFit:"cover"
      }
    },
    ".noImage": {
      color: "#7E7E7E",
      fontSize: "6rem",
    },
  },
};
