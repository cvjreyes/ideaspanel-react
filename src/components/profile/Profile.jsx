/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext, useEffect, useState } from "react";

import Button from "../general/Button";
import Input from "../general/Input";
import ProfileImage from "../../assets/images/profile.jpg";
import { api } from "../../helpers/api";
import { AuthContext } from "../../context/AuthContext";
import { useRoute } from "wouter";
import Loading from "../general/Loading";

export default function Profile() {
  const [_, params] = useRoute("/profile/:user_id");
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isEditable, setIsEditable] = useState(false);

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
    const getUserPosts = async () => {
      setPosts([{ title: "test title", description: "test description" }]);
    };
    if (profile) {
      getUserPosts();
    }
  }, [profile]);

  const handleChange = (e) => {};

  if (!profile) return <Loading />;
  return (
    <div css={profileStyle}>
      <h1 className="page_title">Profile</h1>
      <div className="profileWrapper">
        <div className="pictureWrapper">
          <Button className="saveButton" text="Save" width="100px" />
          {/* <img src={ProfileImage} /> */}
          <Button text="Change profile picture" width="250px" />
        </div>
        {isEditable ? (
          <div className="editableInfoWrapper">
            <div className="lineInfo">
              <p className="bold">Full name: </p>
              <Input
                width="80%"
                placeholder="Write the full name"
                value={profile.name}
              />
            </div>
            <div className="lineInfo">
              <p className="bold">Bio: </p>
              <textarea
                className="textArea"
                placeholder="Write the description"
                id="textarea"
                name="textarea"
                rows="5"
              ></textarea>
            </div>
          </div>
        ) : (
          <div className="informationWrapper">
            <div className="titleWrapper">
              <img
                alt="edit"
                src="https://img.icons8.com/external-others-amoghdesign/24/null/external-write-multimedia-solid-24px-others-amoghdesign.png"
                className="pointer"
                onClick={() => setIsEditable(true)}
              />
              <h2 className="flexCenter">Profile Information</h2>
            </div>
            <div className="lineInfo">
              <p className="bold">Full name: </p>
              <p>{profile.name}</p>
            </div>
            <div className="lineInfo">
              <p className="bold">Email: </p>
              <p>{profile.email}</p>
            </div>
            <div className="lineInfo">
              <p className="bold">Description: </p>
              <p>{profile.bio}</p>
            </div>
            <div className="lineInfo">
              <label className="bold">Num of posts: </label>
              <label>{posts.length}</label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const profileStyle = {
  ".profileWrapper": {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    ".pictureWrapper": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      height: "50vh",
      width: "45vw",
      ".saveButton": {
        display: "flex",
        justifyContent: "start",
        width: "10vw",
      },
      img: {
        padding: "50px",
        height: "400px",
        width: "400px",
      },
    },
    ".lineInfo": {
      display: "grid",
      gridTemplateColumns: "2fr 5fr",
      marginTop: "50px",
      alignItems: "center",
    },
    ".informationWrapper": {
      marginTop: "100px",
      display: "flex",
      flexDirection: "column",
      minHeight: "55vh",
      width: "45vw",
      padding: "30px",
      border: "1px solid rgb(133, 133, 133)",
      borderRadius: "8px",
      background: "linear-gradient(300deg, #e6e6e6, #ffffff)",
      ".titleWrapper": {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        alignItems: "center",
      },
      h2: {
        fontSize: "18px",
      },
      img: {
        width: "30px",
      },
    },
  },
};
