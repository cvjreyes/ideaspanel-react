/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { api } from "../../helpers/api";
import { AuthContext } from "../../context/AuthContext";

function ProfileInfo({ profile, isEditable = false, getProfileData }) {
  const { user, updateUserInfo } = useContext(AuthContext);
  const onDrop = useCallback((files) => {
    files.forEach(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      const { ok } = await api(
        "post",
        `/users/edit_profile_pic/${user.id}`,
        formData
      );
      if (ok) {
        updateUserInfo();
        getProfileData();
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
    <div className="profileBox" css={profileStyle}>
      <div className="profPicWrapper">
        <img alt="profile" src={profile.profile_pic} className="profile_pic" />
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
      <div className="infoProfile">
        <span>{profile.name}</span>
        <p>{profile.email}</p>
      </div>
    </div>
  );
}

const profileStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "0px",
    gap: "5px",
    p: { "wordBreak": "break-all" },
    ".profPicWrapper": {
      position: "relative",
      width: "60px",
      height: "60px",
      flex: "none",
      order: "0",
      flexGrow: "0",
      ".profile_pic": {
        borderRadius: "100px",
        width: "100%",
        height: "100%",
        objectFit: "cover"
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
    },
  ".infoProfile": {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "10px",
    gap: "10px",
    width: "203px",
    flex: "none",
    order: "1",
    flexGrow: "0",
    span: {
      fontWeight: "600",
      fontSize: "16px",
      lineHeight: "17px",
    },
    p: {
      fontSize: "14px",
      lineHeight: "15px",
      color: "#7E7E7E",
    },
  },
};

export { ProfileInfo };
