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
        bgColor={colors["blue"].background}
        bgHover={colors["blue"].backgroundHover}
        color="white"
        padding="10px 20px"
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
};
