/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext, useEffect, useState } from "react";
import { useRoute } from "wouter";

import Button from "../general/Button";
import { api } from "../../helpers/api";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../general/Loading";
import SmallCard from "../general/SmallCard";

export default function Profile() {
  const [_, params] = useRoute("/profile/:user_id");
  const { user, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [drafts, setDrafts] = useState(null);

  useEffect(() => {
    const getProfileData = async () => {
      if (user.id !== Number(params.user_id)) {
        const { body } = await api("get", `/users/profile/${params.user_id}`);
        setProfile(body);
      } else setProfile(user);
    };
    getProfileData();
  }, []);

  useEffect(() => {
    const getUserIdeas = async () => {
      const { body } = await api("get", "/ideas/get_drafts");
      setDrafts(body);
    };
    if (profile) {
      getUserIdeas();
    }
  }, [profile]);

  if (!profile) return <Loading />;
  return (
    <div css={profileStyle}>
      <div className="headWrapper">
        <div />
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
      <div className="draftsWrapper">
        <h3>Drafts ({drafts?.length})</h3>
        <div className="draftsMapWrapper">
          {drafts?.map((item, i) => {
            return <SmallCard item={item} key={i} />;
          })}
        </div>
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
    // display: "flex",
    // flexDirection: "column",
    // alignItems: "center",
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
};
