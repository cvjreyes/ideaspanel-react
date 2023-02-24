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
    setData(DataJson.results);
  }, []);

  return (
    <div css={homeStyle}>
      <h1 className="page_title">Ideas Panel</h1>
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
  minHeight: "calc(100vh - 50px)",
  ".map": {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  },
};
