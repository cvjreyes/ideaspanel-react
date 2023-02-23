/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect, useState } from "react";

import Card from "./card/Card";
import DataJson from "./data.json";
import Loading from "../general/Loading";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0")
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));
    setData(DataJson.results);
  }, []);

  return (
    <div css={homeStyle}>
      <div className="boxTitle">
        <div />
        <h1>Ideas Panel</h1>
        <div />
      </div>
      <div className="map">
        {data.length > 0 ? (
          data.map((item) => {
            // return <Card item={item} key={item.id} />;
          })
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

const homeStyle = {
  marginTop: "50px",
  minHeight: "calc(100vh - 50px)",
  ".boxTitle": {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    alignItems: "center",
    padding: "0 10%",
    height: "15vh",
    h1: {
      fontSize: "24px",
      letterSpacing: "1px",
      whiteSpace: "nowrap",
      textAlign: "center",
    },
  },
  ".map": {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  },
};
