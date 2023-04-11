/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import { colors } from "../../helpers/colors";
import { TextField } from "../home/components/TextField";
import { Button } from "../home/components/Button";

export default function AddCommentSection({
  newComment,
  setNewComment,
  handleAddComment,
}) {
  return (
    <div css={addCommentSectionStyles}>
      <TextField
        id="comment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        margin="0 0 15px"
        width="100%"
      />
      <Button onClick={handleAddComment} >
        Comment
      </Button>
    </div>
  );
}

const addCommentSectionStyles = {
  display: "flex",
  gap: "1rem"
};
