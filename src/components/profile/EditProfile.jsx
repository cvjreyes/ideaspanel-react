/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function EditProfile() {
  const { user_id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user_id != user.id) navigate("/");
  }, []);

  return (
    <div css={editProfileStyle}>
      <h1 className="page_title">EditProfile</h1>
      <p>Edit image</p>
      <p>Edit bio?</p>
    </div>
  );
}

const editProfileStyle = {
  minHeight: "75vh",
};
