/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { colors } from "../../helpers/colors";

import ButtonWithImage from "../general/ButtonWithImage";
import ThumbsUp from "../../assets/images/thumbs-up.png";

export default function CommentSection({ comments }) {
  return (
    <div css={CommentSectionStyle}>
      {comments.map((comment, i) => (
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
          <div className="imageVotes">
            <ButtonWithImage
              type="button"
              text={comment.positiveVotes}
              width="60px"
              margin="0 20px"
              bgColor={comment.like ? colors["green"].background : ""}
              bgHover={comment.like ? colors["green"].backgroundHover : ""}
              // img
              src={ThumbsUp}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

const CommentSectionStyle = {
  margin: "10px 10px 30px 0",
  padding: "10px",
  borderRadius: "10px",
  border: "0 solid black",
  boxShadow: "0px 10px 10px 10px rgb(133, 133, 133)",
  ".comment": {
    margin: "10px 10px 10px 0",
    border: "4px solid #ccc",
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
    ".imageVotes": {
      display: "flex",
      flexDirection: "row",
      height: "50px",
      img: {
        width: "50px",
        height: "50px",
        padding: "10px",
        backgroundColor: "#99C6F8",
        borderRadius: "100px",
        margin:" 0 10px",
        objectFit: "cover",
      },
    },
  },
};
