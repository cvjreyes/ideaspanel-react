/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext, useEffect, useState } from "react";

import Button from "../general/Button";
import Input from "../general/Input";
import ProfileImage from "../../assets/images/profile.jpg";
import { api } from "../../helpers/api";
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
  const [editButton, setEditButton] = useState(false);
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState([user]);

  function handleClick() {
    return setEditButton(!editButton);
  }

  useEffect(() => {
    const getProfileData = async () => {
      if (profileData[0].id === user.id) {
        const { body: profile } = await api("get", `/users/profile/${user.id}`);
        const profileInf = profile.map((data) => ({
          ...data,
        }));
        setProfileData(profileInf);
      }
    };
    getProfileData();
  }, []);

  return (
    <div css={profileStyle}>
      <div className="titleWrapper">
        <h1>Profile</h1>
      </div>
      <div className="profileWrapper">
        <div className="pictureWrapper">
          <Button className="saveButton" text={"Save"} width="100px" />
          <img src={ProfileImage} />
          <Button text={"Change profile picture"} width="250px" />
        </div>
        <div className="informationWrapper">
          <h1 className="flexCenter">Profile Information</h1>
          <img
            alt="edit"
            src="https://img.icons8.com/external-others-amoghdesign/24/null/external-write-multimedia-solid-24px-others-amoghdesign.png"
            className="edit pointer"
            onClick={handleClick}
          />
          <div className="lineInfo">
            <label className="separate bold">Full name: </label>
            {editButton ? (
              <Input
                width={"80%"}
                placeholder="Write the full name" /*value={profileData[0].name}*/
              />
            ) : (
              <label>{profileData[0].name}</label>
            )}
          </div>
          <div className="lineInfo">
            <label className="separate bold">Email: </label>
            {editButton ? (
              <Input
                width={"80%"}
                placeholder="Write the email" /*value={profileData[0].email}*/
              />
            ) : (
              <label>{profileData[0].email}</label>
            )}
          </div>
          <div className="lineInfo">
            <label className="separate bold">Description: </label>
            {editButton ? (
              <textarea
                className="textArea"
                placeholder="Write the description"
                id="textarea"
                name="textarea"
                rows="5"
              ></textarea>
            ) : (
              <label>Soy desarrollador en Technipenergies</label>
            )}
          </div>
          <div className="lineInfo">
            <label className="separate bold">Number of post published: </label>
            <label>25</label>
          </div>
        </div>
      </div>
    </div>
  );
}

const profileStyle = {
  marginTop: "50px",
  // minHeight: "calc(100vh - 50px)",
  ".titleWrapper": {
    display: "flex",
    marginTop: "65px",
    justifyContent: "center",
    h1: {
      fontSize: "40px",
    },
  },
  ".profileWrapper": {
    display: "flex",
    minHeight: "70vh",
    justifyContent: "center",
    alignItems: "center",
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
    ".informationWrapper": {
      display: "flex",
      flexDirection: "column",
      height: "55vh",
      width: "45vw",
      margin: "100px 50px 50px 50px",
      padding: "30px",
      border: "1px solid black",
      borderRadius: "8px",
      background: "linear-gradient(300deg, #e6e6e6, #ffffff)",
      h1: {
        fontSize: "23px",
      },
      ".separate": {
        marginRight: "20px",
      },
      ".lineInfo": {
        display: "grid",
        gridTemplateColumns: "2fr 5fr",
        marginTop: "50px",
        alignItems: "center",
      },
      img: {
        width: "30px",
      },
    },
  },
};
