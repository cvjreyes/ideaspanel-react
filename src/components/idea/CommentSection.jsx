/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

export default function CommentSection({ comments }) {
  return (
    <div css={CommentSectionStyle}>
      {comments.map((comment, i) => {
        let commentDate = new Date(comment.comment_at);
        return (
          <div className="comment" key={i}>
            <div className="imageVotes">
              <img
                src={
                  comment.profile_pic
                    ? comment.profile_pic
                    : "http://localhost:5026/images/default.png"
                }
                alt="profile"
              />
            </div>
            <div className="info">
              <div className="bold">{comment.name}</div>
              <div>
                <i>{comment.comment}</i>
              </div>
            </div>
            <div className="dateComment">
              <i className="bold">Last update: </i>{commentDate.getDate()}/{commentDate.getMonth()+1}/{commentDate.getFullYear()}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const CommentSectionStyle = {
  margin: "10px 10px 30px 0",
  minWidth:"500px",
  padding: "10px",
  borderRadius: "10px",
  border: "0 solid black",
  background: "white",
  boxShadow: "8px 8px 17px #e4e5da, -8px -8px 17px #ffffff",
  ".comment": {
    margin: "10px 10px 10px 0",
    border: "2px solid #ccc",
    borderRadius: "10px",
    padding: "10px",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    ".info": {
      width: "70%",
    },
    img: {
      width: "50px",
      height: "50px",
      padding: "10px",
      backgroundColor: "#99C6F8",
      borderRadius: "100px",
      margin: " 0 10px",
      objectFit: "cover",
    },
    ".dateComment": {
      whiteSpace: "nowrap",
    }
  },
};
