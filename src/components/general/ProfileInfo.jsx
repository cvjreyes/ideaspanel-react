/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import React from "react";
import { ProfileAvatar } from "./ProfileAvatar";

function ProfileInfo({ profile, anonymous = false, isEditable = false }) {
  return (
    <div css={profileStyle}>
      <ProfileAvatar profile={profile} isEditable={isEditable} anonymous={anonymous} />
      <div className="infoProfile">
        {!anonymous ? (
          <>
            <span>{profile.name}</span>
            <p>{profile.email}</p>
          </>
        ) : (
          <span>Anonymous</span>
        )}
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
  minHeight:"77px",
  p: { wordBreak: "break-all" },
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
