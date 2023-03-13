/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";

import Button from "../general/Button";
import { api, handleFetch } from "../../helpers/api";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../general/Loading";
import SmallCard from "../general/SmallCard";

export default function Profile() {
  const [_, params] = useRoute("/profile/:user_id");
  const [location, navigate] = useLocation();

  const { user, logout } = useContext(AuthContext);

  const [profile, setProfile] = useState(null);
  const [drafts, setDrafts] = useState(null);
  const [denied, setDenied] = useState(null);
  const [published, setPublished] = useState(null);

  useLayoutEffect(() => {
    const getProfileData = async () => {
      if (user.id !== Number(params.user_id)) {
        const { body } = await api("get", `/users/profile/${params.user_id}`);
        setProfile(body);
      } else setProfile(user);
    };
    getProfileData();
  }, [location]);

  useEffect(() => {
    const getUserIdeas = async () => {
      const results = await Promise.allSettled([
        api("get", `/ideas/get_drafts/${profile.id}`),
        api("get", `/ideas/get_denied/${profile.id}`),
        api("get", `/ideas/get_published/${profile.id}`),
      ]);
      const [tempDrafts, tempDenied, tempPublished] = handleFetch(results);
      setDrafts(tempDrafts);
      setDenied(tempDenied);
      setPublished(tempPublished);
    };
    profile && getUserIdeas();
  }, [profile]);

  if (!profile) return <Loading />;
  return (
    <div css={profileStyle}>
      <div className="headWrapper">
        <div>
          {user.id == params.user_id && (
            <Button
              color="white"
              bgColor="#338DF1"
              bgHover="linear-gradient(180deg, #338DF1 -2.23%, #338DF1 -2.22%, #85BFFF 148.66%)"
              text="Edit"
              onClick={() =>
                navigate(`/profile/edit_profile/${params.user_id}`)
              }
              width="150px"
              margin="0 20px"
            />
          )}
        </div>
        <div>
          <div className="profPicWrapper">
            <img alt="profile" src={user.profile_pic} />
          </div>
          <h1 className="page_title">{user.name}</h1>
          <p>{user.email}</p>
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
        <div className="draftsWrapper">
          <h3>Published ({published?.length})</h3>
          <div className="draftsMapWrapper">
            {published?.map((item, i) => {
              return <SmallCard item={item} key={i} />;
            })}
          </div>
        </div>
        <div />
        {user.id == params.user_id && [
          <div className="draftsWrapper" key="1">
            <h3>Drafts ({drafts?.length})</h3>
            <div className="draftsMapWrapper">
              {drafts?.map((item, i) => {
                return <SmallCard item={item} key={i} />;
              })}
            </div>
          </div>,
          <div className="draftsWrapper" key="2">
            <h3>Denied ({denied?.length})</h3>
            <div className="draftsMapWrapper">
              {denied?.map((item, i) => {
                return <SmallCard item={item} key={i} />;
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
  ".headWrapper": {
    marginTop: "100px",
    display: "grid",
    gridTemplateColumns: ".5fr 1fr .5fr",
    h1: { margin: "10px 0" },
    ".profPicWrapper": {
      margin: "0 auto",
      display: "flex",
      height: "50px",
      width: "50px",
      backgroundColor: "#99C6F8",
      borderRadius: "100px",
    },
  },
  ".contentWrapper": {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    ".draftsWrapper": {
      textAlign: "left",
      marginTop: "20px",
      ".draftsMapWrapper": {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 240px))",
        width: "50vw",
        marginTop: "20px",
      },
    },
  },
};
