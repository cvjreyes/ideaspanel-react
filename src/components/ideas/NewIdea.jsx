/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useDropzone } from "react-dropzone";
import { useCallback, useContext, useState } from "react";
import Switch from "react-switch";
import { useLocation } from "wouter";
import { useNotifications } from "reapop";
import { api } from "../../helpers/api";
import { AuthContext } from "../../context/AuthContext";
import { TextField } from "../home/components/TextField";
import { FullSection } from "../general/FullSection";
import { Button } from "../home/components/Button";
import { AiOutlineUpload, AiFillFile } from "react-icons/ai";

export default function NewPost() {
  const [__, navigate] = useLocation();
  const { notify } = useNotifications();
  const { user } = useContext(AuthContext);

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
      navigate(`/profile/${user.id}/Drafts`);
    }, 2000);
    return notify(
      "Idea added successfully! Redirecting your profile",
      "success"
    );
  };

  return (
    <FullSection css={newIdeaStyle}>
      <h1>New Idea</h1>
      <form onSubmit={submit} className="form">
        <div className="formContent">
          <div className="left">
            <TextField
              id="title"
              value={form.title}
              onChange={({ target }) => handleChange(target.name, target.value)}
            />
            <TextField
              textarea
              id="description"
              value={form.description}
              onChange={({ target }) => handleChange(target.name, target.value)}
            />
            {form.description.length > 700 && (
              <p className="red" style={{ marginTop: ".75rem" }}>
                Description is too long. Max 500 characters.
              </p>
            )}

            <div className="checkboxContainer">
              <p>Anonymous</p>
              <Switch
                onChange={(e) => handleChange("anonymous", !e)}
                checked={!form.anonymous}
                onColor="#155AAA"
              />
            </div>
          </div>
          <div className="right">
            {image ? (
              <div className="dropzoneWrapper imgUploaded">
                <AiFillFile className="icon" />
                <p>Image Uploaded ✔</p>
                <p>
                  '{image.name}' {(image.size / (1024 * 1024)).toFixed(2)}MB
                </p>
              </div>
            ) : (
              <div className="dropzoneWrapper imgToUpload" {...getRootProps()}>
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
                      <AiOutlineUpload className="icon" />,
                      <p key="3" className="">
                        Image
                      </p>,
                    ]}
              </div>
            )}
            <p className="small">Image area displayed: 350px x 200px</p>
            <p className="small">Only accepts .jpg, .jpeg and .png</p>
          </div>
        </div>

        <div className="buttonWrapper">
          <Button>Create new idea</Button>
        </div>
      </form>
    </FullSection>
  );
}

const newIdeaStyle = {
  ".form": {
    height: "100%",
  },
  ".formContent": {
    display: "flex",
    gap: "3rem",
    marginBottom: "3rem",
    ".left": {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      flex: 1.5,
    },
    ".right": {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      flex: 1,
    },
    ".dropzoneWrapper": {
      border: "1px solid #C3C3C3",
      backgroundColor: "#F7F7F7",
      display: "flex",
      gap: "0.3rem",
      flexDirection: "column",
      height: "200px",
      justifyContent: "center",
      alignItems: "center",
      padding: "10px",
      borderRadius: "10px",
      fontSize: "1rem",
      transition: "all 200ms linear",
      ".icon": {
        fontSize: "3rem",
      },
    },
    ".imgToUpload": {
      cursor: "pointer",
      color: "#C3C3C3",
      "&:hover": {
        backgroundColor: "#f2f2f2f2",
        borderColor: "#7E7E7E",
      },
    },
    ".imgUploaded": {
      color: "#155AAA",
      borderColor: "#155AAA",
      backgroundColor: "#E3EBF5",
    },
    ".small": { marginTop: "5px" },
    ".checkboxContainer": {
      color: "#7E7E7E",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
  },
  ".buttonWrapper":{
    display:"flex",
    justifyContent:"center"
  }
};
