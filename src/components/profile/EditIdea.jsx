/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect, useState, useContext } from "react";
import Switch from "react-switch";
import { useLocation, useRoute } from "wouter";
import { useNotifications } from "reapop";

import ButtonWithImage from "../general/ButtonWithImage";
import saveImg from "../../assets/images/save.svg";
import publishImg from "../../assets/images/publish.gif";
import { api } from "../../helpers/api";
import { colors } from "../../helpers/colors";
import ImageComponent from "./ImageComponent";
import Loading from "../general/Loading";
import { AuthContext } from "../../context/AuthContext";

export default function EditIdea() {
  const [_, params] = useRoute("/edit_idea/:idea_id");
  const [__, navigate] = useLocation();
  const { user } = useContext(AuthContext);

  const { notify } = useNotifications();

  const [idea, setIdea] = useState({
    title: "",
    description: "",
    anonymous: false,
  });
  const [image, setImage] = useState(null);
  const [activePublish, setActivePublish] = useState(false);

  const getIdeaInfo = async () => {
    const { body } = await api("get", `/ideas/get_info/${params.idea_id}`);
    setIdea(body);
  };

  useEffect(() => {
    getIdeaInfo();
  }, []);

  const handleChange = (key, value) => {
    setIdea({ ...idea, [key]: value });
  };

  const submit = async (e, publish = 0) => {
    e && e.preventDefault();
    if (!idea.title || !idea.description)
      return notify("Please, fill all fields", "error");
    const { ok: ok1 } = await api("post", "/ideas/update", {
      form: idea,
      publish,
    });
    if (!ok1) return notify("Something went wrong", "error");
    if (image?.name) {
      const formData = new FormData();
      formData.append("file", image);
      const { ok: ok2 } = await api(
        "post",
        `/ideas/upload_image/${idea.id}`,
        formData
      );
      if (!ok2) return notify("Something went wrong", "error");
    }
    setActivePublish(true);
    setTimeout(() => {
      publish && navigate(`/profile/${user.id}/Validating`);
    }, 3000);
    getIdeaInfo();
    return notify("Idea updated successfully!", "success");
  };

  if (!idea) return <Loading />;
  return (
    <div css={newIdeaStyle}>
      <h1 className="page_title">Edit Idea</h1>
      <form onSubmit={submit}>
        <div className="left">
          <input
            placeholder="Title"
            value={idea.title}
            name="title"
            onChange={({ target }) => handleChange(target.name, target.value)}
          />
          <textarea
            placeholder="Describe your idea"
            value={idea.description}
            name="description"
            onChange={({ target }) => handleChange(target.name, target.value)}
          ></textarea>
        </div>
        <div className="right">
          <ImageComponent
            idea={idea}
            image={image}
            setImage={setImage}
            getIdeaInfo={getIdeaInfo}
          />
          <div className="toggleWrapper">
            <p>Show my name</p>
            <Switch
              onChange={(e) => handleChange("anonymous", !e)}
              checked={!idea.anonymous}
            />
          </div>
        </div>
        <div className="buttonWrapper">
          <ButtonWithImage
            text="Save"
            color="white"
            fontWeight="600"
            textMargin="0 0 0 5px"
            bgColor={colors["blue"].background}
            bgHover={colors["blue"].backgroundHover}
            // img
            src={saveImg}
          />
          {/* <ButtonWithImage
            type="button"
            onClick={(e) => submit(e, 1)}
            text="Publish"
            margin="0 0 0 1rem"
            color="white"
            fontWeight="600"
            textMargin="0 0 0 5px"
            bgColor={colors["green"].background}
            bgHover={colors["green"].backgroundHover}
            // img
            blend={true}
            imgFilter="invert(100%)"
            src={publishImg}
          /> */}
          <div className="containerPublish">
            <button
              id="btn"
              onClick={(e) => submit(e, 1)}
              className={`btn-publish ${activePublish ? "active-btn" : ""}`}
            >
              <p
                id="btnText"
                className={`p-text ${activePublish ? "active-p" : ""}`}
              >
                Publish
              </p>
              <div
                className={`check-box ${
                  activePublish ? "active-check-box" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  className={`svg-publish ${activePublish ? "active-svg" : ""}`}
                >
                  <path
                    fill="transparent"
                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                    className={`path-publish ${
                      activePublish ? "active-path" : ""
                    }`}
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

const newIdeaStyle = {
  minHeight: "calc(100vh - 50px)",
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    padding: "0 10vw",
    minHeight: "calc(90vh - 130px)",
    margin: "50px 0 0",
    gap: "20px",
    ".left": {
      display: "flex",
      flexDirection: "column",
      input: {
        border: "1px solid rgb(133, 133, 133)",
        borderRadius: "8px",
        padding: "10px",
      },
      textarea: {
        margin: "30px 0 0",
        borderRadius: "8px",
        padding: "10px",
        height: "300px",
      },
    },
    ".right": {
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      ".toggleWrapper": {
        margin: "50px 0 0",
        display: "flex",
        alignItems: "center",
        border: "1px solid rgb(133, 133, 133)",
        borderRadius: "8px",
        padding: "20px",
        width: "fit-content",
        p: {
          marginRight: "1rem",
        },
      },
    },
    ".buttonWrapper": {
      gridColumn: "span 2",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      ".containerPublish": {
        marginLeft: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ".btn-publish": {
          width: "170px",
          height: "50px",
          border: "none",
          outline: "none",
          background: "lightskyblue",
          fontSize: "22px",
          borderRadius: "10px",
          textAlign: "center",
          boxShadow: "0 6px 20px -5px rgba(0,0,0,0.4)",
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
          ".p-text": {
            color: "#fff",
            fontWeight: "600",
          },
          ".active-p": {
            marginRight: "60px",
            transition: "1s",
          },
          ".check-box": {
            width: "50px",
            height: "50px",
            borderRadius: "10px",
            boxShadow: "0 0 12px -2px rgba(0,0,0,0.5)",
            position: "absolute",
            top: "0",
            right: "-20px",
            opacity: "0",
            ".svg-publish": {
              width: "30px",
              margin: "10px",
              ".path-publish": {
                strokeWidth: "3",
                stroke: "#fff",
                strokeDasharray: "34",
                strokeDashoffset: "34",
                strokeLinecap: "round",
              },
              ".active-path": {
                strokeDashoffset: "0",
                transition: "1s",
                transitionDelay: "1s",
              },
            },
            ".active-svg": {
              strokeDashoffset: "0",
              transition: "1s",
              transitionDelay: "1s",
            },
          },
          ".active-check-box": {
            right: "0",
            opacity: "1",
            transition: "1s",
          },
        },
        ".active-btn": {
          background: "lightseagreen",
          transition: "1s",
        },
      },
    },
  },
};
