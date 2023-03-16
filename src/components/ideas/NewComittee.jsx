/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext, useEffect, useState } from "react";
import { Link } from "wouter";
import { AuthContext } from "../../context/AuthContext";
import { api } from "../../helpers/api";
import Loading from "../general/Loading";
import SmallCard from "../general/SmallCard";
import NoResults from "../home/NoResults";

export default function NewComittee() {
  const { user } = useContext(AuthContext);

  const [data, setData] = useState(null);

  useEffect(() => {
    if (!user.isComittee) return navigate("/");
    const getData = async () => {
      const { body } = await api("get", "/ideas/get_all_validating");
      setData(body);
    };
    getData();
  }, []);

  return (
    <div css={comitteeStyle}>
      <h1 className="page_title">Comittee</h1>
      <div className="ideasWrapper">
        <h3>Validating... ({data?.length})</h3>
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
                    <SmallCard
                      item={item}
                      // navigateTo={`/comittee/${item.id}`}
                    />
                    {item.voter_id && (
                      <div className="overlay flexCenter">
                        <img
                          alt="voted"
                          src="https://img.icons8.com/arcade/64/null/checked.png"
                        />
                      </div>
                    )}
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
  ".ideasWrapper": {
    textAlign: "left",
    marginTop: "20px",
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
