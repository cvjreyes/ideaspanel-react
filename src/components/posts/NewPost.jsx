/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";

export default function NewPost() {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        // const binaryStr = reader.result;
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div css={newpostStyle}>
      <div className="boxTitle">
        <h1>New Post</h1>
      </div>
      <div className="boxPost">
        <div className="leftBox">
          <input className="titleInput" placeholder="Title" />
          <textarea
            className="textArea"
            placeholder="Write the description"
            id="textarea"
            name="textarea"
            rows="20"
            cols="50"
          ></textarea>
          <div className="toggleWrapper">Toogle</div>
        </div>
        <div className="rightBox">
          <div className="dndBox pointer" {...getRootProps()}>
            <input {...getInputProps()} />
            <img
              alt="drop"
              src="https://img.icons8.com/ios/50/null/downloading-updates.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const newpostStyle = {
  marginTop: "50px",
  minHeight: "calc(100vh - 50px)",
  textAlign: "center",
  h1: {
    fontSize: "24px",
    marginTop: "100px",
  },
  ".boxPost": {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    padding: "50px 10vw 0",
    minHeight: "calc(100vh - 130px)",
    margin: "50px 0 0",
    ".leftBox": {
      display: "flex",
      flexDirection: "column",
      ".titleInput": {
        border: "1px solid black",
        borderRadius: "8px",
        padding: "10px",
      },
      ".textArea": {
        margin: "50px 0 0",
        borderRadius: "8px",
        padding: "10px",
      },
      ".toggleWrapper": {
        margin: "50px 0 0",
      },
    },
    ".rightBox": {
      display: "flex",
      justifyContent: "center",
      ".dndBox": {
        margin: "100px 0 0",
        display: "flex",
        height: "40vh",
        width: "40vh",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        border: "1px solid black",
        borderRadius: "8px",
        transition: "all 200ms linear",
        ":hover": {
          backgroundColor: "rgba(225, 234, 248, 0.71)",
        },
        img: {
          width: "50px",
        },
      },
    },
  },
};
