import React, { useContext, useEffect } from "react";
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
    <div>
      <h1 className="page_title">EditProfile</h1>
      <p>click on idea {`=>`} if equal go to edit else go to view</p>
      <p>redirect home if params.user_id !== context user.id</p>
      <p>Edit image</p>
      <p>Edit bio?</p>
    </div>
  );
}
