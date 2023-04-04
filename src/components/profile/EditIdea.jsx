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
    setTimeout(() => {
      publish && navigate(`/profile/${user.id}/Validating`);
    }, 2000);
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
          <ButtonWithImage
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
          />
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
    },
  },
};
