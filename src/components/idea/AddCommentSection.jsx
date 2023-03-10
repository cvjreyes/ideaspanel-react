/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

export default function AddCommentSection({
  comments,
  newComment,
  setNewComment,
  handleAddComment,
}) {
  return (
    <div css={addCommentSectionStyles}>
      <ul className="list_comments">
        {comments.length > 0 &&
          comments.map((comment, index) => {
            <li key={index} className="comment">
              {comment}
            </li>;
          })}
      </ul>
      <textarea
        placeholder="Add a comment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button onClick={handleAddComment}>Add Comment</button>
    </div>
  );
}

const addCommentSectionStyles = {
  //   border: "4px solid #ccc",
  boxShadow: "0px 10px 10px 10px rgb(133, 133, 133)",
  borderRadius: "10px",
  padding: "20px",
  margin: "20px 0",
  width: "37vw",
  minWidth: "300px",
  ".list_comments": {
    listStyle: "none",
  },
  ".comment": {
    backgroundColor: "#f9f9f9",
    padding: "10px",
    marginBottom: "10px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "3px",
  },
  button: {
    backgroundColor: "#0077cc",
    color: "#fff",
    border: "none",
    borderRadius: "3px",
    padding: "10px 20px",
    cursor: "pointer",
  },
};
