/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";

import { api } from "../../helpers/api";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../general/Loading";
import NoResults from "../home/NoResults";
import SmallCard from "../general/SmallCard";
import Pagination from "../general/Pagination";
import { FullSection } from "../general/FullSection";
import { ProfileInfo } from "../general/ProfileInfo";
import { Grid } from "../general/Grid";
import { IdeaCard } from "../home/components/Card";

export default function Profile() {
  const [_, params] = useRoute("/profile/:user_id/:type");
  const [location, navigate] = useLocation();

  const { user } = useContext(AuthContext);

  const [profile, setProfile] = useState(null);
  const [displayData, setDisplayData] = useState([]);
  const [lengthDisplayData, setLengthDisplayData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8; // o el número de elementos que desee mostrar por página

  const [selectedOption, setSelectedOption] = useState("Published");

  const selectedOptions = ["Published", "Denied", "Validating", "Drafts"];

  const getProfileData = async () => {
    const { body } = await api("get", `/users/profile/${params.user_id}`);
    setProfile(body);
  };

  const getUserIdeas = async () => {
    const { body } = await api(
      "get",
      `/ideas/get_profile_ideas/${params.user_id}/${params.type}`
    );
    setDisplayData(body);
    setLengthDisplayData(body.length);
  };

  useLayoutEffect(() => {
    if (params) {
      getProfileData();
    } else {
      navigate("/");
    }
  }, [location]);

  useEffect(() => {
    profile && getUserIdeas();
    if (params.user_id != user.id)
      return navigate(`/profile/${params.user_id}/Published`);
  }, [profile, selectedOption]);

  const toggleDropdown = (selected) => {
    setSelectedOption(selected);
    setCurrentPage(1);
    getUserIdeas();
    navigate(`/profile/${params.user_id}/${selected}`);
  };

  const paginate = (array) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return array.slice(startIndex, endIndex);
  };

  const isCurrentUserAccount = params.user_id == user.id;

  console.log(displayData)

  if (!profile) return <Loading />;
  return (
    <FullSection >
      <div css={profileStyle}>
        <div className="profileWrapper">
          <ProfileInfo
            profile={profile}
            isEditable={isCurrentUserAccount}
            user={user}
            getProfileData={getProfileData}
          />
          {isCurrentUserAccount ? (
            <div className="dropdownWrapper">
              {selectedOptions.map((selected, i) => {
                return (
                  <div key={selected}>
                    <button
                      className="dropdownButton"
                      onClick={() => toggleDropdown(selected)}
                      style={{
                        backgroundColor: selected === params.type && "#D0DEEE",
                        fontWeight: selected === params.type && "bold",
                        color: selected === params.type && "black",
                        borderRight:
                          selected === params.type && "2px solid #155AAA",
                      }}
                    >
                      {selected}
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div />
          )}
        </div>
        <div className="contentWrapper">
          <span>Results found {lengthDisplayData}</span>

          {displayData.length > 0 ? (
            <Grid>
              {params
                ? paginate(displayData).map((item, i) => {
                    const navigateTo =
                      params.type === "Denied" || params.type === "Validating"
                        ? `/read_only/${item.id}`
                        : params.type === "Published"
                        ? `/idea/${item.id}`
                        : params.type === "Drafts" && `/edit_idea/${item.id}`;
                    return (
                      <IdeaCard info={item} navigateTo={navigateTo} key={i} />
                    );
                  })
                : navigate("/")}
            </Grid>
          ) : (
            <NoResults />
          )}

          {/*  {displayData.length > 0 ? (
            <div className="ideasMapWrapper">
              {params
                ? paginate(displayData).map((item, i) => {
                    const navigateTo =
                      params.type === "Denied" || params.type === "Validating"
                        ? `/read_only/${item.id}`
                        : params.type === "Published"
                        ? `/idea/${item.id}`
                        : params.type === "Drafts" && `/edit_idea/${item.id}`;
                    return (
                      <SmallCard item={item} navigateTo={navigateTo} key={i} />
                    );
                  })
                : navigate("/")}
            </div>
          ) : (
            <NoResults />
          )} */}
           {displayData && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            displayData={displayData}
            itemsPerPage={itemsPerPage}
            maxPagesToShow={3}
          />
        )}
        </div>
       
      </div>
    </FullSection>
  );
}

const profileStyle = {
  display: "flex",
  gap: "2rem",
  height: "100%",
  flexDirection: "row",
  ".profileWrapper": {
    marginTop: "50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "10px 0px",
    gap: "30px",
    width: "400px",
    height: "284px",
    left: "178px",
    top: "152px",
    borderRight: "1px solid #C4C4C4",
    ".dropdownWrapper": {
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "0px",
      width: "400px",
      height: "172px",
      borderTop: "1px solid #C4C4C4",
      flex: "none",
      order: "1",
      alignSelf: "stretch",
      flexGrow: "0",
      p: {
        fontWeight: "bold",
      },
      ".dropdownButton": {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "13px 10px",
        gap: "10px",
        width: "400px",
        height: "43px",
        color: "#7E7E7E",
        flex: "none",
        order: "0",
        alignSelf: "stretch",
        flexGrow: "0",
        background: "transparent",
        border: "0",
        ":hover": {
          backgroundColor: "#f2f2f2",
          color: "black",
          borderRight: "1px solid #C4C4C4",
        },
      },
    },
  },
  ".contentWrapper": {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: "20px",
    span: {
      display: "grid",
      fontSize: "16px",
      color: "#333",
      fontWeight: "bold",
      marginLeft: "10px",
      textAlign: "center",
    },
  },
};
