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

import { api, handleFetch } from "../../helpers/api";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../general/Loading";
import NoResults from "../home/NoResults";
import SmallCard from "../general/SmallCard";
import Button from "../general/Button";

export default function Profile() {
  const [_, params] = useRoute("/profile/:user_id");
  const [location] = useLocation();

  const { user, logout, updateUserInfo } = useContext(AuthContext);

  const [profile, setProfile] = useState(null);
  const [drafts, setDrafts] = useState(null);
  const [denied, setDenied] = useState(null);
  const [published, setPublished] = useState(null);
  const [validating, setValidating] = useState(null);
  const [displayData, setDisplayData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10; // o el número de elementos que desee mostrar por página

  const [selectedOption, setSelectedOption] = useState("Published");

  const selectedOptions = ["Published", "Denied", "Validating", "Drafts"];

  const getProfileData = async () => {
    const { body } = await api("get", `/users/profile/${params.user_id}`);
    setProfile(body);
  };

  useLayoutEffect(() => {
    getProfileData();
  }, [location]);

  useEffect(() => {
    const getUserIdeas = async () => {
      const results = await Promise.allSettled([
        api("get", `/ideas/get_drafts/${profile.id}`),
        api("get", `/ideas/get_denied/${profile.id}`),
        api("get", `/ideas/get_published/${profile.id}`),
        api("get", `/ideas/get_validating/${profile.id}`),
      ]);
      const [tempDrafts, tempDenied, tempPublished, tempValidating] =
        handleFetch(results);
      setDrafts(tempDrafts);
      setDenied(tempDenied);
      setPublished(tempPublished);
      setValidating(tempValidating);
      setDisplayData(tempPublished);
    };
    profile && getUserIdeas();
  }, [profile]);

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
    if (selected == "Published") {
      setDisplayData(published);
    } else if (selected == "Denied") {
      setDisplayData(denied);
    } else if (selected == "Validating") {
      setDisplayData(validating);
    } else if (selected == "Drafts") {
      setDisplayData(drafts);
    }
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
        <div>
          <div className="profPicWrapper">
            <img
              alt="profile"
              src={profile.profile_pic}
              className="profile_pic"
            />
            <img
              className="editIcon pointer"
              alt="edit profile pic"
              src="https://img.icons8.com/material-outlined/24/null/pencil--v1.png"
              {...getInputProps()}
              {...getRootProps()}
            />
          </div>
          <h1 className="page_title">{profile.name}</h1>
          <p>{profile.email}</p>
        </div>
        <div>
          <Button
            color="white"
            bgColor="#338DF1"
            bgHover="linear-gradient(180deg, #338DF1 -2.23%, #338DF1 -2.22%, #85BFFF 148.66%)"
            text="Logout"
            onClick={logout}
            width="150px"
            margin="0 20px"
          />
        </div>
      </div>
      <div className="contentWrapper">
        <div className="dropdownWrapper">
          {selectedOptions.map((selected) => {
            return (
              <div key={selected}>
                <button
                  className="dropdownButton"
                  onClick={() => toggleDropdown(selected)}
                  style={{
                    backgroundColor: selectedOption === selected && "lightgray",
                  }}
                >
                  {selected}
                </button>
              </div>
            );
          })}
        </div>
        <div>
          {displayData.length > itemsPerPage && (
            <div className="paginationButtons">
              {currentPage !== 1 && (
                <button onClick={() => setCurrentPage(currentPage - 1)}>
                  Prev
                </button>
              )}
              {Array(Math.ceil(displayData.length / itemsPerPage))
                .fill()
                .map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    style={{ fontWeight: currentPage === i + 1 && "bold" }}
                  >
                    {i + 1}
                  </button>
                ))}
              {currentPage !== Math.ceil(displayData.length / itemsPerPage) && (
                <button onClick={() => setCurrentPage(currentPage + 1)}>
                  Next
                </button>
              )}
            </div>
          )}
          {displayData.length > 0 ? (
            <div className="ideasMapWrapper">
              {paginate(displayData).map((item, i) => {
                const navigateTo =
                  selectedOption === "Denied" || selectedOption === "Validating"
                    ? `/profile/read_only/${item.id}`
                    : selectedOption === "Published"
                    ? `/idea/${item.id}`
                    : selectedOption === "Drafts" &&
                      `/profile/edit_idea/${item.id}`;
                return (
                  <SmallCard item={item} navigateTo={navigateTo} key={i} />
                );
              })}
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
  textAlign: "center",
  padding: "0 10vw",
  minHeight: "80vh",
  ".headWrapper": {
    marginTop: "100px",
    display: "grid",
    gridTemplateColumns: ".2fr 1fr .2fr",
    h1: { margin: "10px 0" },
    p: { whiteSpace: "nowrap" },
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
    ".dropdownWrapper": {
      width: "200px",
      height: "200px",
      fontSize: "16px",
      border: "3px solid #999",
      padding: "10px 0",
      backgroundColor: "#fff",
      borderRadius: "10px",
      marginTop: "80px",
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
    ".paginationButtons": {
      display: "flex",
      justifyContent: "center",
      marginTop: "1rem",
      button: {
        margin: "0 0.5rem",
        padding: "0.5rem",
        border: "1px solid #ccc",
        borderRadius: "5px",
        backgroundColor: "#fff",
        cursor: "pointer",
        transition: "all 0.3s ease",
        ":hover": {
          backgroundColor: "#ccc",
        },
        ":focus": {
          outline: "none",
          backgroundColor: "#ccc",
          boxShadow: "0 0 0 3px #ddd",
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
