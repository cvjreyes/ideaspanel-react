/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext, useLayoutEffect, useState } from "react";
import { Link, useLocation } from "wouter";

import { AuthContext } from "../../context/AuthContext";
import { api } from "../../helpers/api";

import ButtonWithImage from "../general/ButtonWithImage";
import Loading from "../general/Loading";
import SmallCard from "../general/SmallCard";
import NoResults from "../home/NoResults";
import Settings from "../../assets/images/settings.png";

export default function NewComittee() {
  const [location, navigate] = useLocation();
  const { user } = useContext(AuthContext);

  const [data, setData] = useState(null);

  useLayoutEffect(() => {
    if (!user.isComittee) return navigate("/");
    const getData = async () => {
      const { body } = await api("get", "/ideas/get_all_validating");
      setData(body);
    };
    getData();
  }, [location]);

  return (
    <div css={comitteeStyle}>
      <div className="top">
        <div />
        <h1 className="page_title">Comittee</h1>
        <ButtonWithImage
          onClick={() => navigate("/comittee/manage")}
          className="manage_btn"
          src="https://img.icons8.com/ios-filled/250/null/settings.png"
          imgWidth="30px"
        />
      </div>
      <div className="ideasWrapper">
        <div className="ideasMapWrapper">
          {data ? (
            data.length > 0 ? (
              data.map((item, i) => {
                return (
                  <Link
                    to={`/comittee/${item.id}`}
                    key={item.id}
                    className="card"
                  >
                    <SmallCard item={item} />
                    {item.approved !== null &&
                      (item.approved ? (
                        <div className="overlay flexCenter">
                          <img
                            alt="voted"
                            src="https://img.icons8.com/arcade/64/null/checked.png"
                          />
                        </div>
                      ) : (
                        <div className="overlay flexCenter">
                          <img
                            alt="voted"
                            src="https://img.icons8.com/color/48/null/close-window.png"
                          />
                        </div>
                      ))}
                  </Link>
                );
              })
            ) : (
              <NoResults />
            )
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
}

const comitteeStyle = {
  padding: "0 10vw",
  minHeight: "85vh",
  ".top": {
    display: "grid",
    gridTemplateColumns: "1fr 3fr 1fr",
    alignItems: "flex-end",
    ".manage_btn": {
      backgroundColor: "transparent",
      width:"60px",
      ":hover": {
        transform: "rotate(360deg)",
        transition: "transform 0.5s ease-in-out",
      },
    },
  },
  ".ideasWrapper": {
    textAlign: "left",
    marginTop: "50px",
    ".ideasMapWrapper": {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 220px))",
      justifyContent: "center",
      marginTop: "20px",
      gap: "20px",
      ".card": {
        position: "relative",
        ":hover": {
          ".overlay": { top: -5 },
          ".pointer": {
            boxShadow: "12px 12px 24px #e4e5da, -12px -12px 24px #ffffff",
            top: -5,
          },
        },
      },
      ".overlay": {
        position: "absolute",
        top: 0,
        left: 0,
        borderRadius: "20px",
        width: "100%",
        height: "calc(100% - 30px)",
        backgroundColor: "rgba(230, 230, 230, .5)",
        zIndex: 10,
        transition: "all 200ms linear",
        img: {
          width: "50px",
          height: "50px",
        },
      },
    },
  },
};
