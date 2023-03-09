/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect, useState } from "react";
import Switch from "react-switch";
import { useLocation, useRoute } from "wouter";
import { useNotifications } from "reapop";

import ButtonWithImage from "../general/ButtonWithImage";
import saveImg from "../../assets/images/save.svg";
import publishImg from "../../assets/images/publish.gif";
import { api } from "../../helpers/api";
import { colors } from "../../helpers/colors";
import ImageComponent from "./ImageComponent";

export default function EditIdea() {
  const [_, params] = useRoute("/profile/edit_idea/:idea_id");
  const [__, navigate] = useLocation();

  const { notify } = useNotifications();

  const [idea, setIdea] = useState({
    title: "",
    description: "",
    anonymous: false,
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    const getIdeaInfo = async () => {
      const { body } = await api("get", `/ideas/get_info/${params.idea_id}`);
      setIdea(body[0]);
    };
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
      publish && navigate("/");
    }, 2000);
    return notify("Idea updated successfully!", "success");
  };

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

          <div className="toggleWrapper">
            <p>Show User</p>
            <Switch
              onChange={(e) => handleChange("anonymous", !e)}
              checked={!idea.anonymous}
            />
          </div>
        </div>
        <div className="right">
          <ImageComponent idea={idea} image={image} setImage={setImage} />
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
    padding: "50px 10vw 0",
    minHeight: "calc(90vh - 130px)",
    margin: "50px 0 0",
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
      ".toggleWrapper": {
        margin: "30px 0 0",
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
    ".right": {
      display: "flex",
      justifyContent: "center",
    },
    ".buttonWrapper": {
      gridColumn: "span 2",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
    },
  },
};
