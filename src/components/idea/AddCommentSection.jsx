/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import { colors } from "../../helpers/colors";
import Button from "../general/ButtonWithImage";
import Input from "../general/Input";

export default function AddCommentSection({
  newComment,
  setNewComment,
  handleAddComment,
}) {
  return (
    <div css={addCommentSectionStyles}>
      <Input
        placeholder="Write your comment here..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        margin="0 0 15px"
        width="100%"
      />
      <Button
        text="Add Comment"
        onClick={handleAddComment}
        color="white"
      />
    </div>
  );
}

const addCommentSectionStyles = {
  background: "white",
  boxShadow: "8px 8px 17px #e4e5da, -8px -8px 17px #ffffff",
  borderRadius: "10px",
  padding: "20px",
  margin: "20px 0 0",
  width: "25vw",
  minWidth: "500px",
  button: {
    background: colors["blue"].background, // use the same background color as the button
    padding: "15px 25px",
    borderRadius: "5px",
    fontWeight: "bold",
    width:"100%",
    border: "none", // remove the border
    cursor: "pointer", // change the cursor to a pointer on hover
    transition: "all 0.3s ease-in-out", // add transition effect
    ":hover": {
      background: colors["blue"].backgroundHover, // use the same hover background color as the button
      transform: "scale(1.05)", // add scaling effect on hover
    },
    ":focus": {
      outline: "none", // remove the default focus outline
      boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.5)", // add custom focus box shadow
    },
  },
};
