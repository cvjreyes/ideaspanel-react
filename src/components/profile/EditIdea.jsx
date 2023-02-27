/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import Switch from "react-switch";
import { useLocation, useRoute } from "wouter";
import { useNotifications } from "reapop";

import ButtonWithImage from "../general/ButtonWithImage";
import saveImg from "../../assets/images/save.svg";
import { api } from "../../helpers/api";
import { colors } from "../../helpers/colors";

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

  const onDrop = useCallback((files) => {
    setImage(files[0]);
  }, []);

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/svg": [],
    },
  });

  const submit = async (e) => {
    e && e.preventDefault();
    if (!idea.title || !idea.description)
      return notify("Please, fill all fields", "error");
    const { ok: ok1, body: insertId } = await api("post", "/ideas/upload", {
      form: idea,
    });
    if (!ok1) return notify("Something went wrong", "error");
    if (image?.name) {
      const formData = new FormData();
      formData.append("file", image);
      const { ok: ok2 } = await api(
        "post",
        `/ideas/upload_image/${insertId}`,
        formData
      );
      if (!ok2) return notify("Something went wrong", "error");
    }
    return notify("Idea updated successfully!", "success");
  };

  const saveAndPublish = async () => {
    if (!idea.title || !idea.description)
      return notify("Please, fill all fields", "error");
    const { ok: ok1, body: insertId } = await api("post", "/ideas/upload", {
      form: idea,
    });
    if (!ok1) return notify("Something went wrong", "error");
    if (image?.name) {
      const formData = new FormData();
      formData.append("file", image);
      const { ok: ok2 } = await api(
        "post",
        `/ideas/upload_image/${insertId}`,
        formData
      );
      if (!ok2) return notify("Something went wrong", "error");
    }
    setTimeout(() => {
      navigate("/ideas_panel/");
    }, 2000);
    return notify("Idea added successfully! Redirecting you home", "success");
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
          {idea.image ? (
            <div className="imageWrapper">
              <img alt="idea" src={idea.image} />
            </div>
          ) : image ? (
            <div className="dropzoneWrapper imgUploaded">
              <img
                alt="pic icon"
                src="https://img.icons8.com/3d-plastilina/69/null/image--v2.png"
              />
              <p>Image Uploaded ✔</p>
              <p>
                '{image.name}' {(image.size / (1024 * 1024)).toFixed(2)}MB
              </p>
            </div>
          ) : (
            <div
              className="dropzoneWrapper imgToUpload pointer"
              {...getRootProps()}
              style={{
                border: `1px dashed ${
                  isDragReject ? "red" : "rgb(133, 133, 133)"
                }`,
              }}
            >
              {isDragReject
                ? [
                    <img
                      alt="error"
                      src="https://img.icons8.com/pastel-glyph/64/null/error-handling.png"
                      key="1"
                    />,
                    <p key="2">Only accepts .jpg, .jpeg and .png</p>,
                  ]
                : [
                    <input {...getInputProps()} key="1" />,
                    <img
                      alt="drop"
                      src="https://img.icons8.com/ios/50/null/downloading-updates.png"
                      key="2"
                    />,
                    <p key="3">Only accepts .jpg, .jpeg and .png</p>,
                  ]}
            </div>
          )}
        </div>
        <div className="buttonWrapper">
          <ButtonWithImage
            type="submit"
            text="Save"
            padding="15px"
            width="150px"
            border="none"
            color="white"
            fontWeight="600"
            fontSize="16px"
            textMargin="0 0 0 5px"
            bgColor={colors["blue"].background}
            bgHover={colors["blue"].backgroundHover}
            // img
            alt="add"
            src={saveImg}
          />
          <ButtonWithImage
            type="button"
            onClick={saveAndPublish}
            text="Save and Publish"
            padding="15px"
            margin="0 0 0 1rem"
            width="200px"
            border="none"
            color="white"
            fontWeight="600"
            fontSize="16px"
            textMargin="0 0 0 5px"
            bgColor={colors["green"].background}
            bgHover={colors["green"].backgroundHover}
            // img
            alt="add"
            src={saveImg}
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
      ".imageWrapper": {
        border: "1px dashed rgb(133, 133, 133)",
        height: "300px",
        width: "300px",
      },
      ".dropzoneWrapper": {
        margin: "75px 0 0",
        display: "flex",
        flexDirection: "column",
        height: "300px",
        width: "300px",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        borderRadius: "8px",
        transition: "all 200ms linear",
        img: {
          width: "50px",
        },
        p: {
          fontSize: "12px",
          marginTop: "20px",
        },
      },
      ".imgToUpload": {
        ":hover": {
          backgroundColor: "rgba(225, 234, 248, 0.71)",
        },
      },
      ".imgUploaded": {
        border: "1px solid rgb(133, 133, 133)",
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
