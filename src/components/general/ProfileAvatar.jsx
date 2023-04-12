/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineUser } from "react-icons/ai";
import { AuthContext } from "../../context/AuthContext";
import { api } from "../../helpers/api";

function ProfileAvatar({ profile, anonymous, isEditable, ...props }) {
  const { updateUserInfo } = useContext(AuthContext);
  const onDrop = useCallback((files) => {
    files.forEach(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      const { ok } = await api(
        "post",
        `/users/edit_profile_pic/${profile.id}`,
        formData
      );
      if (ok) {
        updateUserInfo();
      }
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/svg": [],
    },
  });


  return (
    <div css={avatar} {...props}>
      {anonymous ? (
        <AiOutlineUser className="profile_anonymous" />
      ) : profile.profile_pic ? (
        <img alt="" src={profile.profile_pic} className="profile_pic" />
      ) : (
        <AiOutlineUser className="profile_anonymous" />
      )}

      {isEditable && (
        <img
          className="editIcon pointer"
          alt="edit profile pic"
          src="https://img.icons8.com/material-outlined/24/null/pencil--v1.png"
          {...getInputProps()}
          {...getRootProps()}
        />
      )}
    </div>
  );
}

export { ProfileAvatar };

const avatar = {
  position: "relative",
  width: "60px",
  height: "60px",
  flex: "none",
  order: "0",
  flexGrow: "0",
  backgroundColor: "#C3C3C3",
  borderRadius: "100px",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  ".profile_pic": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  ".profile_anonymous": {
    fontSize: "1.7rem",
    color: "#7E7E7E",
  },
  ".editIcon": {
    position: "absolute",
    display: "block !important",
    backgroundColor: "white",
    borderRadius: "100px",
    padding: "5px",
    right: 0,
    bottom: 0,
    width: "25px",
    ":hover": {
      backgroundColor: "lightgray",
    },
  },
};
