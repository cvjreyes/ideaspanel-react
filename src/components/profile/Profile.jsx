/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useLocation, useRoute } from "wouter";

import Button from "../general/Button";
import { api, handleFetch } from "../../helpers/api";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../general/Loading";
import SmallCard from "../general/SmallCard";
import { useDropzone } from "react-dropzone";

export default function Profile() {
  const [_, params] = useRoute("/profile/:user_id");
  const [location] = useLocation();

  const { user, logout, updateUserInfo } = useContext(AuthContext);

  const [profile, setProfile] = useState(null);
  const [drafts, setDrafts] = useState(null);
  const [denied, setDenied] = useState(null);
  const [published, setPublished] = useState(null);
  const [validating, setValidating] = useState(null);

  const getProfileData = async () => {
    const { body } = await api("get", `/users/profile/${params.user_id}`);
    setProfile(body);
  };

  useLayoutEffect(() => {
    getProfileData();
  }, [location]);

  useEffect(() => {
    const getUserIdeas = async () => {
      const results = await Promise.allSettled([
        api("get", `/ideas/get_drafts/${profile.id}`),
        api("get", `/ideas/get_denied/${profile.id}`),
        api("get", `/ideas/get_published/${profile.id}`),
        api("get", `/ideas/get_validating/${profile.id}`),
      ]);
      const [tempDrafts, tempDenied, tempPublished, tempValidating] =
        handleFetch(results);
      setDrafts(tempDrafts);
      setDenied(tempDenied);
      setPublished(tempPublished);
      setValidating(tempValidating);
    };
    profile && getUserIdeas();
  }, [profile]);

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

  if (!profile) return <Loading />;
  return (
    <div css={profileStyle}>
      <div className="headWrapper">
        <div />
        <div>
          <div className="profPicWrapper">
            <img
              alt="profile"
              src={profile.profile_pic}
              className="profile_pic"
            />
            <img
              className="editIcon pointer"
              alt="edit profile pic"
              src="https://img.icons8.com/material-outlined/24/null/pencil--v1.png"
              {...getInputProps()}
              {...getRootProps()}
            />
          </div>
          <h1 className="page_title">{profile.name}</h1>
          <p>{profile.email}</p>
        </div>
        <div>
          <Button
            color="white"
            bgColor="#338DF1"
            bgHover="linear-gradient(180deg, #338DF1 -2.23%, #338DF1 -2.22%, #85BFFF 148.66%)"
            text="Logout"
            onClick={logout}
            width="150px"
            margin="0 20px"
          />
        </div>
      </div>
      <div className="contentWrapper">
        <div className="ideasWrapper">
          <h3>Published ({published?.length})</h3>
          <div className="ideasMapWrapper">
            {published?.map((item, i) => {
              return (
                <SmallCard
                  item={item}
                  navigateTo={`/idea/${item.id}`}
                  key={`published${i}`}
                />
              );
            })}
          </div>
        </div>
        {user.id == params.user_id && [
          <div className="ideasWrapper" key="1">
            <h3>Validating ({validating?.length})</h3>
            <div className="ideasMapWrapper">
              {validating?.map((item, i) => {
                return (
                  <SmallCard
                    item={item}
                    navigateTo={`/profile/read_only/${item.id}`}
                    key={`validating${i}`}
                  />
                );
              })}
            </div>
          </div>,
          <div className="ideasWrapper" key="2">
            <h3>Drafts ({drafts?.length})</h3>
            <div className="ideasMapWrapper">
              {drafts?.map((item, i) => {
                return (
                  <SmallCard
                    item={item}
                    navigateTo={`/profile/edit_idea/${item.id}`}
                    key={`drafts${i}`}
                  />
                );
              })}
            </div>
          </div>,
          <div className="ideasWrapper" key="3">
            <h3>Denied ({denied?.length})</h3>
            <div className="ideasMapWrapper">
              {denied?.map((item, i) => {
                return (
                  <SmallCard
                    item={item}
                    navigateTo={`/profile/read_only/${item.id}`}
                    key={`denied${i}`}
                  />
                );
              })}
            </div>
          </div>,
        ]}
      </div>
    </div>
  );
}

const profileStyle = {
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  padding: "0 10vw",
  minHeight: "85vh",
  ".headWrapper": {
    marginTop: "100px",
    display: "grid",
    gridTemplateColumns: ".2fr 1fr .2fr",
    h1: { margin: "10px 0" },
    p: { whiteSpace: "nowrap" },
    ".profPicWrapper": {
      margin: "0 auto",
      display: "flex",
      height: "50px",
      width: "50px",
      backgroundColor: "#99C6F8",
      borderRadius: "100px",
      position: "relative",
      ".profile_pic": {
        borderRadius: "100px",
      },
      ".editIcon": {
        display: "block !important",
        position: "absolute",
        bottom: "-10px",
        right: "-10px",
        width: "30px",
        height: "30px",
        backgroundColor: "white",
        borderRadius: "100px",
        padding: "5px",
        ":hover": {
          backgroundColor: "lightgray",
        },
      },
    },
  },
  ".contentWrapper": {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(461px, 1fr))",
    width: "100%",
    marginTop: "30px",
    gap: "20px",
    ".ideasWrapper": {
      textAlign: "left",
      marginTop: "20px",
      ".ideasMapWrapper": {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 220px))",
        marginTop: "20px",
        gap: "20px",
      },
    },
  },
};
