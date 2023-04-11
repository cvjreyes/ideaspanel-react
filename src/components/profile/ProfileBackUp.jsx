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
import { useDropzone } from "react-dropzone";
import { useRoute } from "wouter";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { api } from "../../helpers/api";
import Loading from "../general/Loading";
import Pagination from "../general/Pagination";
import SmallCard from "../general/SmallCard";
import NoResults from "../home/NoResults";

export default function ProfileBackUp() {
  const [_, params] = useRoute("/profile/:user_id/:type");
  const navigate = useNavigate();

  const { user, updateUserInfo } = useContext(AuthContext);

  const [profile, setProfile] = useState(null);
  const [displayData, setDisplayData] = useState([]);
  const [lengthAllOptions, setLengthAllOptions] = useState([]);
  const [lengthDisplayData, setLengthDisplayData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10; // o el número de elementos que desee mostrar por página

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
  }, []);

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
    <div css={profileStyle}>
      <div className="headWrapper">
        <div />
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
          <h1 className="page_title">{profile.name}</h1>
          <p>{profile.email}</p>
        </div>
      </div>
      <div className="contentWrapper">
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
                      }}
                    >
                      {selected}
                      <p>{lengthAllOptions[i]}</p>
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
        <div>
          <span>Results found {lengthDisplayData}</span>
          {displayData && (
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              displayData={displayData}
              itemsPerPage={itemsPerPage}
              maxPagesToShow={3}
            />
          )}
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
      </div>
    </div>
  );
}

const profileStyle = {
  display: "flex",
  flexDirection: "column",
  padding: "0 10vw",
  minHeight: "calc(80vh - 50px)",
  ".headWrapper": {
    textAlign: "center",
    marginTop: "70px",
    display: "grid",
    gridTemplateColumns: ".2fr 1fr .2fr",
    h1: { margin: "10px 0" },
    p: { whiteSpace: "nowrap" },
    ".profileBox": {
      marginLeft: "25%",
    },
    ".profPicWrapper": {
      margin: "0 auto",
      display: "flex",
      height: "50px",
      width: "50px",
      backgroundColor: "#99C6F8",
      borderRadius: "100px",
      position: "relative",
      ".profile_pic": {
        borderRadius: "100px",
      },
      ".editIcon": {
        display: "block !important",
        position: "absolute",
        bottom: "-10px",
        right: "-10px",
        width: "30px",
        height: "30px",
        backgroundColor: "white",
        borderRadius: "100px",
        padding: "5px",
        ":hover": {
          backgroundColor: "lightgray",
        },
      },
    },
  },
  ".contentWrapper": {
    display: "grid",
    gridTemplateColumns: "1fr 5fr",
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
    ".dropdownWrapper": {
      width: "200px",
      height: "200px",
      fontSize: "16px",
      border: "3px solid #999",
      padding: "10px 0",
      backgroundColor: "#fff",
      borderRadius: "10px",
      marginTop: "80px",
      p: {
        fontWeight: "bold",
      },
      ".dropdownButton": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: "12px 16px",
        cursor: "pointer",
        backgroundColor: "#fff",
        border: "0",
        transition: "background-color 0.3s ease-out",
        ":hover": {
          backgroundColor: "#f4f4f4",
        },
      },
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
