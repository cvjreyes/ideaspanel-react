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
          <div className="info">
            <div className="bold">{comment.user}</div>
            <div>
              <i>{comment.text}</i>
            </div>
          </div>
          <div className="imageVotes">
            <ButtonWithImage
              type="button"
              text={comment.numVotosPositivos}
              width="60px"
              margin="0 20px"
              bgColor={comment.like && colors["green"].background}
              bgHover={comment.like && colors["green"].backgroundHover}
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
  overflowY: "auto",
  height: "40vh",
  /* Hide scrollbar for IE, Edge and Firefox */
  msOverflowStyle: "none" /* IE and Edge */,
  scrollbarWidth: "none" /* Firefox */,
  /* Hide scrollbar for Chrome, Safari and Opera */
  "::-webkit-scrollbar": {
    display: "none",
  },
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
    ".info": {
      width: "70%",
    },
    ".imageVotes": {
      display: "flex",
      flexDirection: "row",
    },
  },
};
