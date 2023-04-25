/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, keyframes } from "@emotion/react";
import React, { useContext, useEffect, useState } from "react";
import { useNotifications } from "reapop";
import { AiFillFilePdf } from "react-icons/ai";

import { AuthContext } from "../../context/AuthContext";
import { api } from "../../helpers/api";

import { useParams } from "react-router";
import { Section } from "../general/Section";
import AddCommentSection from "./AddCommentSection";
import CommentSection from "./CommentSection";
import NoResults from "../general/NoResults";
import { BsImage } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export default function Idea({ readOnly }) {
  let { id: ideaId } = useParams();
  const { user } = useContext(AuthContext);
  const { notify } = useNotifications();

  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [ideasVotes, setIdeasVotes] = useState([]);
  const [hasUserVoted, setHasUserVoted] = useState(false);
  const [pdf, setPdf] = useState(null);
  const [idea, setIdea] = useState({
    title: "",
    description: "",
    anonymous: false,
  });

  useEffect(() => {
    const getIdeaInfo = async () => {
      const { body } = await api("get", `/ideas/get_info/${ideaId}`);
      setPdf(body.pdf);
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
          <div className="bottom_img">
            {!readOnly && (
              <div className="boxLike">
                {hasUserVoted ? (
                  <AiFillHeart
                    className="btn_vote_active"
                    onClick={() => handleIdeaVote()}
                  />
                ) : (
                  <AiOutlineHeart
                    className="btn_vote"
                    onClick={() => handleIdeaVote()}
                  />
                )}
                {ideasVotes.length}
              </div>
            )}
            {pdf && (
              <a
                href={pdf}
                download={pdf.split("-").slice(1).join("-")}
                target="_blank"
                className="download_pdf"
              >
                DOWNLOAD PDF <AiFillFilePdf size={30} />
              </a>
            )}
          </div>
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
      ".bottom_img": {
        display: "flex",
        marginTop: "30px",
        height:"45px",
        justifyContent: "space-between"
      },
      ".boxLike": {
        width: "150px",
        display: "flex",
        alignItems: "center",
        ".btn_vote": {
          fontSize: "2rem",
          margin: "15px",
        },
        ".btn_vote_active": {
          display: "flex",
          color: "red",
          fontSize: "2rem",
          animation: `${circleAnim} 1s ease forwards`,
          margin: "15px",
        },
      },
      ".download_pdf": {
        display: "flex",
        justifyContent:"end",
        alignItems: "center",
        backgroundColor: "#155AAA",
        color: "white",
        padding: "5px 10px",
        borderRadius: "4px",
        textDecoration: "none",
        fontSize: "11px",
        width: "150px",
        ":hover": {
          background: "#C4C4C4",
        },
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
      aspectRatio: "7/4",
      backgroundColor: "#C3C3C3",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      img: {
        height: "100%",
        objectFit: "cover",
      },
    },
    ".noImage": {
      color: "#7E7E7E",
      fontSize: "6rem",
    },
  },
};
