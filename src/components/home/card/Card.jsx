/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";

import { api } from "../../../helpers/api";

export default function Card({ item, user }) {
  const [profile, setProfile] = useState(null);
  const [location, navigate] = useLocation();

  const createdDate = new Date(item.created_at);

  useEffect(() => {
    const getProfileData = async () => {
      const { body } = await api("get", `/users/profile/${user}`);
      setProfile(body);
    };
    getProfileData();
  }, [user]);

  function clickCard() {
    setTimeout(() => {
      navigate(`/idea/${item.id}`);
    }, 1);
  }

  function clickProfile() {
    setTimeout(() => {
      navigate(`/profile/${item.user_id}`);
    }, 1);
  }

  return (
    <div css={cardStyle}>
      <div onClick={() => clickCard()}>
        <div className="image">
          {item.image && <img src={item.image} alt="idea" />}
        </div>
        <div className="boxCard" key={item.id}>
          <div className="line">
            <span className="bold">{item.title}</span>
          </div>
          <div className="line">
            <span className="">{item.description}</span>
          </div>
        </div>
      </div>
      {!item.anonymous ? (
        <div className="profileBox" onClick={() => clickProfile()}>
          {item.image ? (
            <div>
              <img src={item.image} alt="profile" className="profileImage" />
            </div>
          ) : (
            <div className="noImageProfile">
              <div></div>
            </div>
          )}
          <div className="infoProfile">
            <span className="bold">{profile?.name}</span>
            <span className="date">
              {`${createdDate.getDate()}/${
                createdDate.getMonth() + 1
              }/${createdDate.getFullYear()}`}
            </span>
          </div>
        </div>
      ) : (
        <div className="profileBox">
          <div>
            <img
              src="http://localhost:5026/images/default.png"
              alt="profile"
              className="profileAnonymous"
            />
          </div>
          <div className="infoProfile">
            <span className="bold">Anonymous</span>
            <span >
              {`${createdDate.getDate()}/${
                createdDate.getMonth() + 1
              }/${createdDate.getFullYear()}`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

const cardStyle = {
  borderRadius: "40px",
  border: "0 solid black",
  background: "white",
  margin: "50px",
  minHeight: "500px",
  cursor: "pointer",
  boxShadow: "0 10px 10px -1px lightblue",
  ".image": {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    img: {
      borderRadius: "10% 10% 0 0",
      objectFit: "cover",
      width: "100%",
      height: "200px",
    },
  },
  ".boxCard": {
    margin: "30px 0",
    padding: "0 30px 30px 30px",
  },
  ".profileBox": {
    padding: "10px",
    minHeight: "10vh",
    width: "380px",
    display: "flex",
    alignItems: "center",
    margin: "10px",
    fontStyle: "italic",
    ".infoProfile": {
      display: "flex",
      flexDirection: "column",
      marginLeft: "10px",
    },
    ".profileImage": {
      borderRadius: "50%",
      width: "120px",
      marginRight: "10px",
    },
    ".profileAnonymous": {
      height: "80px",
    },
    ":hover": {
      borderRadius: "10px",
      background: "linear-gradient(300deg, #e6e6e6, #ffffff)",
    },
    ".line": {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      padding: "10px",
    },
  },
};
