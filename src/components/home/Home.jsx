/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect, useState } from "react";

import Card from "./card/Card";
import DataJson from "./data.json";
import TechnipLogo from "../../assets/images/technip.png";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0")
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));
    console.log(DataJson.results);
    setData(DataJson.results);
    console.log(data);
  }, []);

  return (
    <div css={homeStyle}>
      <div className="boxTitle">
        <div className="eight">
          <h1>Home Cards</h1>
        </div>
        <img src={TechnipLogo} alt="technip" className="technipLogo" />
      </div>
      <Card data={data} />
    </div>
  );
}

const homeStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  ".technipLogo": {
    position: "absolute",
    top: "20px",
    right: "100px",
    width: "180px",
  },
  ".boxTitle": {
    display: "flex",
    height: "15vh",
    alignItems: "center",
    ".eight": {
      h1: {
        width: "50vw",
        fontSize: "30px",
        letterSpacing: "1px",
        display: "grid",
        gridTemplateColumns: "2fr auto 2fr",
        gridTemplateRows: "16px 0",
        gridGap: "22px",
        ":after, :before": {
          content: '" "',
          display: "block",
          borderBottom: "2px solid #ccc",
          backgroundColor: "#f8f8f8",
        },
      },
    },
  },
};
