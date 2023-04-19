/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Comment } from "./Comment";
export default function CommentSection({
  comments,
  userID,
  handleDeleteComment,
}) {
  return (
    <div css={CommentSectionStyle}>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          userID={userID}
          handleDeleteComment={handleDeleteComment}
        />
      ))}
    </div>
  );
}

const CommentSectionStyle = {
  marginTop: "2rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.2rem",
  ".comment": {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    padding: "8px",
    ":hover": {
      backgroundColor: "#E3EBF5",
      borderRadius: "8px",
    },
    ".boxNoImage": {
      width: "50px",
      height: "50px",
      flex: "none",
      backgroundColor: "#C3C3C3",
      borderRadius: "100px",
      overflow: "hidden",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginRight: "17px",
      ".profile_anonymous": {
        fontSize: "2rem",
        color: "#7E7E7E",
      },
    },
    ".info": {
      alignItems: "center",
      textAlign: "left",
      width: "100%",
    },
    ".comment__header": {
      display: "flex",
      gap: "1rem",
      marginBottom: "0.4rem",
    },
    ".comment__date": {
      color: "#7E7E7E",
    },
    img: {
      width: "45px",
      height: "45px",
      backgroundColor: "#99C6F8",
      borderRadius: "100px",
      marginRight: "1.2rem",
      objectFit: "cover",
    },
    ".dateComment": {
      whiteSpace: "nowrap",
    },
    ".textComment": {
      color: "#7E7E7E",
    },
    ".comment__readMore": {
      backgroundColor: "unset",
      border: "unset",
      cursor: "pointer",
    },
    ".delete": {
      marginLeft: "2rem",
      color: "#7E7E7E",
      cursor: "pointer",
    },
  },
};
