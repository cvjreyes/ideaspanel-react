import React from "react";
import { useState } from "react";
import moment from "moment/moment";
import { AiOutlineClose } from "react-icons/ai";

const Comment = ({ comment, userID, handleDeleteComment }) => {
  const [isReadMore, setIsReadMore] = useState(false);
  let commentDate = new Date(comment.comment_at);
  return (
    <div className="comment">
      <img
        src={comment.profile_pic}
        alt="profile"
        style={{
          padding:
            comment.profile_pic === "http://localhost:5026/images/default.png"
              ? "10px"
              : "",
        }}
      />
      <div className="info">
        <div className="comment__header">
          <p className="comment__title">{comment.name}</p>
          <p className="comment__date">
            {moment(commentDate, "YYYYMMDD").fromNow()}
          </p>
        </div>
        <div className="textComment">
          <p>
            {isReadMore || comment.comment.length < 150
              ? comment.comment
              : `${comment.comment.slice(0, 150)}...`}
          </p>
        </div>
        {comment.comment.length > 150 && (
          <button
            className="comment__readMore"
            type="button"
            onClick={() => setIsReadMore((prev) => !prev)}
          >
            {isReadMore ? "Read less" : "Read more"}
          </button>
        )}
      </div>
      {userID === comment.user_id ? (
        <div className="delete" onClick={() => handleDeleteComment(comment.id)}>
          <AiOutlineClose />
        </div>
      ) : null}
    </div>
  );
};

export { Comment };
