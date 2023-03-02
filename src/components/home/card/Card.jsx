/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useLocation } from "wouter";

export default function Card({ item, key }) {
  const [__, navigate] = useLocation();

  const createdDate = new Date(item.created_at);
  const actualDate = new Date();
  const daysPassed = (
    (actualDate - createdDate) /
    1000 /
    60 /
    60 /
    24
  ).toFixed();

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

  // console.log("Card: ", item.id);
  return (
    <div css={cardStyle} key={item.id}>
      <div onClick={() => clickCard()}>
        <div className="image">
          {item.image ? (
            <img src={item.image} alt="idea" />
          ) : (
            <div className="noImageIdea"></div>
          )}
        </div>
        <div className="boxCard">
          <div className="line">
            <span className="bold">{item.title}</span>
          </div>
          <div className="line">
            <span>{item.description}</span>
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
            <div>
              <div></div>
            </div>
          )}
          <div className="infoProfile">
            <span className="bold">
              {item.name}
            </span>
            <span className="date">
              {`${createdDate.getDate()}/${
                createdDate.getMonth() + 1
              }/${createdDate.getFullYear()}`}
            </span>
            {daysPassed != 0 ? (
              <span className="bold">{daysPassed} day/s ago</span>
            ) : (
              <span className="bold">Today</span>
            )}
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
            <span>
              {`${createdDate.getDate()}/${
                createdDate.getMonth() + 1
              }/${createdDate.getFullYear()}`}
            </span>
            {daysPassed != 0 ? (
              <span className="bold">{daysPassed} day/s ago</span>
            ) : (
              <span className="bold">Today</span>
            )}
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
  minWidth: "350px",
  cursor: "pointer",
  boxShadow: "0 10px 10px -1px rgb(133, 133, 133)",
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
    ".noImageIdea": {
      marginTop: "200px",
    },
  },
  ".boxCard": {
    margin: "30px 0",
    padding: "0 30px 30px 30px",
    height: "170px",
    width: "340px",
    // whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    "::after": {
      content: '"..."',
      position: "absolute",
      right: "0",
    },
  },
  ".profileBox": {
    padding: "10px",
    minHeight: "10vh",
    width: "330px",
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
      width: "60px",
      marginRight: "10px",
      height: "60px",
      // objectFit: "cover",
    },
    ".profileAnonymous": {
      height: "60px",
      background: "linear-gradient(300deg, #e6e6e6, #ffffff)",
      borderRadius: "50%",
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
    // ".noImageProfile": {
    //   marginLeft: "120px"
    // }
  },
};
