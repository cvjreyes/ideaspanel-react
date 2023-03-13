import React from "react";

export default function EditProfile() {
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
