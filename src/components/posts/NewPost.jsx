/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useDropzone } from "react-dropzone";
import React, { useCallback } from "react";

import Eye from "../../assets/images/eye.png";

export default function NewPost() {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
          <div>Toogle</div>
        </div>
        <div className="rightBox">
          <div className="dndBox" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <div>
                <p>Drop the files here ...</p>
                <img src={Eye} />
              </div>
            )}
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
    display: "flex",
    flexDirection: "row",
    height: "70vh",
    justifyContent: "center",
    margin: "10px",
    ".leftBox": {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      width: "70vh",
      flexDirection: "column",
      ".titleInput": {
        margin: "50px",
        border: "1px solid black",
        borderRadius: "8px",
        padding: "10px",
      },
      ".textArea": {
        margin: "0 50px 50px 50px",
        borderRadius: "10px",
        padding: "10px",
      },
    },
    ".rightBox": {
      display: "flex",
      justifyContent: "center",
      alignItems: " center",
      width: "70vh",
      margin: "10px",
      ".dndBox": {
        display: "flex",
        height: "40vh",
        width: "40vh",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        border: "10px solid black",
        borderRadius: "8px",
        img:{
          height:"20px",
          width:"30px",
          marginTop:"5%"
        }
      },
    },
  },
};
