/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect, useState } from "react";

import { api } from "../../helpers/api";

import Card from "./card/Card";
import Loading from "../general/Loading";
import NoResults from "./NoResults";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const { body } = await api("get", "/ideas/get_some/0");
      setData(body);
    };
    getData();
  }, []);
  
  return (
    <div css={homeStyle}>
      <h1 className="page_title">Ideas Panel</h1>
      {data ? (
        data.length > 0 ? (
          <div className="map">
            {data.map((item, i) => {
              return (
                <Card
                  item={item}
                  key={i}
                />
              );
            })}
          </div>
        ) : (
          <NoResults />
        )
      ) : (
        <Loading />
      )}
    </div>
  );
}

const homeStyle = {
  minHeight: "calc(100vh - 50px)",
  ".map": {
    display: "grid",
    justifyContent: "center",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 458px))",
  },
};
