/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  AiFillFile,
  AiOutlineClose,
  AiOutlineSave,
  AiOutlineUpload,
} from "react-icons/ai";
import { BsCheck } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import Switch from "react-switch";
import { useNotifications } from "reapop";
import { AuthContext } from "../../context/AuthContext";
import { api } from "../../helpers/api";
import { Button } from "../general/Button";
import { Section } from "../general/Section";
import { TextField } from "../general/TextField";

function IdeaForm({ isEditing }) {
  const { id: idea_id } = useParams();
  const navigate = useNavigate();
  const { notify } = useNotifications();
  const { user } = useContext(AuthContext);

  const [titleIsEmpty, setTitleIsEmpty] = useState(false);
  const [descriptionIsEmpty, setDescriptionIsEmpty] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    anonymous: false,
  });
  const [image, setImage] = useState(null);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
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


  const createSubmit = async (e) => {
    e && e.preventDefault();
    if (!form.title || !form.description) {
      setTitleIsEmpty(true);
      setDescriptionIsEmpty(true);
      return notify("Please, fill all fields", "error");
    }
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
    notify("Idea added successfully! Redirecting your profile", "success");
    navigate(`/profile/${user.id}/Drafts`);
  };

  const editSubmit = async (e, publish = 0) => {
    e && e.preventDefault();
    if (!form.title || !form.description) {
      setTitleIsEmpty(true);
      setDescriptionIsEmpty(true);
      return notify("Please, fill all fields", "error");
    }
    if (form.description.length > 500)
      return notify("Description is too long. Max 500 characters", "error");

    const { ok: ok1 } = await api("post", "/ideas/update", {
      form,
      publish,
    });
    if (!ok1) return notify("Something went wrong", "error");

    if (image?.name || image) {
      const formData = new FormData();
      formData.append("file", image);
      const { ok: ok2 } = await api(
        "post",
        `/ideas/upload_image/${form.id}`,
        formData
      );
      if (!ok2) return notify("Something went wrong", "error");
    } else {
      await api("delete", `/ideas/delete_img/${form.id}`);
    }
    getIdeaInfo();
    notify("Idea updated successfully!", "success");
    if (publish) {
      navigate(`/profile/${user.id}/Validating`);
    }
  };

  const getIdeaInfo = async () => {
    const { body } = await api("get", `/ideas/get_info/${idea_id}`);
    setImage(body.image);
    setForm(body);
  };

  useEffect(() => {
    setForm({
      title: "",
      description: "",
      anonymous: false,
    });
    setImage(null);
    if (isEditing) getIdeaInfo();
  }, [isEditing]);

  return (
    <Section css={newIdeaStyle} fullHeight>
      <h1>{isEditing ? "Edit idea" : "New idea"}</h1>
      <form className="form">
        <div className="formContent">
          <div className="left">
            <TextField
              id="title"
              value={form.title}
              onChange={({ target }) => handleChange(target.name, target.value)}
              error={titleIsEmpty && !form.title && "Required"}
            />
            <TextField
              textarea
              id="description"
              value={form.description}
              onChange={({ target }) => handleChange(target.name, target.value)}
              error={descriptionIsEmpty && !form.description && "Required"}
            />
            {form.description.length > 700 && (
              <p className="red" style={{ marginTop: ".75rem" }}>
                Description is too long. Max 500 characters.
              </p>
            )}

            <div className="checkboxContainer">
              <p>Anonymous</p>
              <Switch
                checked={Boolean(form.anonymous)}
                onChange={(e) => handleChange("anonymous", e)}
                onColor="#155AAA"
              />
            </div>
          </div>
          <div className="right">
            {image ? (
              <div className="dropzoneWrapper imgUploaded">
                <AiOutlineClose
                  className="close"
                  onClick={() => setImage(null)}
                />
                <AiFillFile className="icon" />
                <div className="text">
                  <p>Image Uploaded</p>
                  <BsCheck />
                </div>
                <p>
                  {!image.name
                    ? image.split("-").slice(1).join("-")
                    : `${image.name} ${(image.size / (1024 * 1024)).toFixed(
                        2
                      )}MB`}
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
                      <input {...getInputProps()} key="3" />,
                      <AiOutlineUpload className="icon" key="4" />,
                      <p key="5">Image</p>,
                    ]}
              </div>
            )}
            <p className="small">Image area displayed: 350px x 200px</p>
            <p className="small">Only accepts .jpg, .jpeg and .png</p>
          </div>
        </div>

        <div className="buttonWrapper">
          {isEditing ? (
            <>
              <Button onClick={(e) => editSubmit(e, 0)}>
                Save <AiOutlineSave />
              </Button>
              <Button onClick={(e) => editSubmit(e, 1)}>
                Publish <AiOutlineSave />
              </Button>
            </>
          ) : (
            <Button onClick={createSubmit}>Create new idea</Button>
          )}
        </div>
      </form>
    </Section>
  );
}

export { IdeaForm };

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
      borderRadius: "5px",
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
      position: "relative",
      color: "#155AAA",
      borderColor: "#155AAA",
      backgroundColor: "#E3EBF5",
      ".text": {
        display: "flex",
        alignItems: "center",
        gap: "0.4rem",
        svg: {
          fontSize: "1.4rem",
        },
      },
      ".close": {
        cursor: "pointer",
        position: "absolute",
        top: "1rem",
        right: "1rem",
        color: "#7E7E7E",
      },
    },
    ".small": { marginTop: "5px" },
    ".checkboxContainer": {
      color: "#7E7E7E",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
  },
  ".buttonWrapper": {
    display: "flex",
    justifyContent: "center",
    button: {
      margin: "0 20px",
    },
  },
};
