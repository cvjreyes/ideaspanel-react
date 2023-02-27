/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect, useState } from "react";

import { api } from "../../helpers/api";

import Card from "./card/Card";
import Loading from "../general/Loading";
import { api } from "../../helpers/api";

export default function Home() {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   setData(DataJson.results);
  // }, []);

  useEffect(() => {
    const getData = async () => {
      const { ok, body } = await api("get", "/ideas/get_some/0");
      setData(body);
    };
    getData();
  }, []);

  return (
    <div css={homeStyle}>
      <h1 className="page_title">Ideas Panel</h1>
      <div className="map">
        {data.length > 0 ? (
          data.map((item) => {
            return <Card item={item} key={item.id} />;
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
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 500px))",
  },
};
