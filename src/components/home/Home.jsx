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
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    const getThings = async () => {
      await Promise.all([
        api("get", "/ideas/get_some/0"),
        api("get", "/users/get_all_users_info"),
        // api("get", "/users/get_user_idea_info"),
      ]).then((values) => {
        setData(values[0].body);
        setProfiles(values[1].body);
      });
    };
    getThings();
  }, [])

  // useEffect(() => {
    // const getData = async () => {
    //   const { body } = await api("get", "/ideas/get_some/0");
    //   setData(body);
    // };
    // getData();
    // const getProfile = async () => {
    //   const { body } = await api("get", `/users/get_users_idea_info/${data[0].user_id}`);
    //   setProfiles(body);
    // };
    // getProfile();
  // }, []);

  // useEffect(() => {
  //   console.log(data[0].user_id);
  //   console.log(profiles);
  //   const profileFilter = profiles.filter((profile) => profile.id == data[0].user_id)
  //   console.log(profileFilter);
  // }, [data, profiles])
  
  return (
    <div css={homeStyle}>
      <h1 className="page_title">Ideas Panel</h1>
      {data ? (
        data.length > 0 ? (
          <div className="map">
            {data.map((item) => {
              return (
                <Card
                  item={item}
                  user={profiles.filter((profile) => profile.id == item.user_id)}
                  key={item.id}
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
