/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useLocation, useRoute } from "wouter";
import { useDropzone } from "react-dropzone";

import { api } from "../../helpers/api";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../general/Loading";
import NoResults from "../home/NoResults";
import SmallCard from "../general/SmallCard";
import Pagination from "../general/Pagination";
import { FullSection } from "../general/FullSection";

export default function Profile() {
  const [_, params] = useRoute("/profile/:user_id/:type");
  const [location, navigate] = useLocation();

  const { user, updateUserInfo } = useContext(AuthContext);

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

  const onDrop = useCallback((files) => {
    files.forEach(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      const { ok } = await api(
        "post",
        `/users/edit_profile_pic/${user.id}`,
        formData
      );
      if (ok) {
        updateUserInfo();
        getProfileData();
      }
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/svg": [],
    },
  });

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

  if (!profile) return <Loading />;
  return (
    <FullSection css={profileStyle}>
      <div className="profileWrapper">
        <div className="profileBox">
          <div className="profPicWrapper">
            <img
              alt="profile"
              src={profile.profile_pic}
              className="profile_pic"
            />
            {params
              ? params.user_id == user.id && (
                  <img
                    className="editIcon pointer"
                    alt="edit profile pic"
                    src="https://img.icons8.com/material-outlined/24/null/pencil--v1.png"
                    {...getInputProps()}
                    {...getRootProps()}
                  />
                )
              : navigate("/")}
          </div>
          <div className="infoProfile">
            <span>{profile.name}</span>
            <p>{profile.email}</p>
          </div>
        </div>
        {params ? (
          params.user_id == user.id ? (
            <div className="dropdownWrapper">
              {selectedOptions.map((selected, i) => {
                return (
                  <div key={selected}>
                    <button
                      className="dropdownButton"
                      onClick={() => toggleDropdown(selected)}
                      style={{
                        backgroundColor:
                          selected === params.type && "lightgray",
                        fontWeight: selected === params.type && "bold",
                        color: selected === params.type && "black",
                        borderRight: selected === params.type && "2px solid #155AAA",
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
          )
        ) : (
          navigate("/")
        )}
      </div>
      <div className="contentWrapper">
        <div>
          <span>Results found {lengthDisplayData}</span>

          {displayData.length > 0 ? (
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
          )}
        </div>
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
    </FullSection>
  );
}

const profileStyle = {
  flexDirection: "row",
  ".profileWrapper": {
    marginTop: "80px",
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
    ".profileBox": {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding: "0px",
      gap: "5px",
      p: { whiteSpace: "nowrap" },
      ".profPicWrapper": {
        position: "relative",
        width: "60px",
        flex: "none",
        order: "0",
        flexGrow: "0",
        ".profile_pic": {
          borderRadius: "100px",
        },
        ".editIcon": {
          position: "absolute",
          display: "block !important",
          backgroundColor: "white",
          borderRadius: "100px",
          padding: "5px",
          right: 0,
          bottom: 0,
          width: "25px",
          ":hover": {
            backgroundColor: "lightgray",
          },
        },
      },
    },
    ".infoProfile": {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      padding: "10px",
      gap: "10px",
      width: "203px",
      height: "62px",
      flex: "none",
      order: "1",
      flexGrow: "0",
      span: {
        fontWeight: "600",
        fontSize: "16px",
        lineHeight: "17px",
      },
      p: {
        fontSize: "14px",
        lineHeight: "15px",
        color: "#7E7E7E",
      },
    },
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
          backgroundColor: "#f4f4f4",
          color: "black",
          fontWeight: "bold",
          borderRight: "1px solid #C4C4C4",
        },
      },
    },
  },
  ".contentWrapper": {
    width: "100%",
    marginTop: "30px",
    gap: "20px",
    span: {
      display: "grid",
      fontSize: "16px",
      color: "#333",
      fontWeight: "bold",
      marginLeft: "10px",
      textAlign: "center",
    },
    ".ideasMapWrapper": {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 220px))",
      justifyContent: "center",
      marginTop: "20px",
      gap: "20px",
    },
  },
};
