/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import Switch from "react-switch";
import { useLocation } from "wouter";
import { useNotifications } from "reapop";

import ButtonWithImage from "../general/ButtonWithImage";
import saveImg from "../../assets/images/save.svg";
import { api } from "../../helpers/api";

export default function NewPost() {
  const [location, navigate] = useLocation();

  const { notify } = useNotifications();

  const [form, setForm] = useState({
    title: "",
    description: "",
    anonymous: false,
  });
  const [image, setImage] = useState(null);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
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
    if (!form.title || !form.description)
      return notify("Please, fill all fields", "error");
    if (form.description.length > 500)
      return notify("Description is too long. Max 500 characters", "error");
    const { ok: ok1, body: insertId } = await api("post", "/ideas/upload", {
      form,
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
      navigate("/");
    }, 2000);
    return notify("Idea added successfully! Redirecting you home", "success");
  };

  return (
    <div css={newIdeaStyle}>
      <h1 className="page_title">New Idea</h1>
      <form onSubmit={submit}>
        <div className="left">
          <input
            placeholder="Title"
            value={form.title}
            name="title"
            onChange={({ target }) => handleChange(target.name, target.value)}
          />
          <textarea
            placeholder="Describe your idea"
            value={form.description}
            name="description"
            onChange={({ target }) => handleChange(target.name, target.value)}
          ></textarea>
          {form.description.length > 700 && (
            <p className="red" style={{ marginTop: ".75rem" }}>
              Description is too long. Max 500 characters.
            </p>
          )}
          <div className="toggleWrapper">
            <p>Show User</p>
            <Switch
              onChange={(e) => handleChange("anonymous", !e)}
              checked={!form.anonymous}
            />
          </div>
        </div>
        <div className="right">
          {image ? (
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
            text="Save"
            width="150px"
            color="white"
            fontWeight="600"
            fontSize="16px"
            textMargin="0 0 0 5px"
            bgColor="linear-gradient(322deg, rgba(0,105,223,1) 0%, rgba(0,112,237,1) 21%, rgba(22,128,247,1) 100%)"
            bgHover="linear-gradient(180deg, #338DF1 -2.23%, #338DF1 -2.22%, #85BFFF 148.66%)"
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
