/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import { AuthContext } from "../../context/AuthContext";

export default function EditProfile() {
  const [_, params] = useRoute("/profile/edit_profile/:user_id");
  const [__, navigate] = useLocation();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (params.user_id != user.id) navigate("/");
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
