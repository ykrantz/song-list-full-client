import "./MessageNote.css";
import React from "react";

const MessageNote = ({ message, isEror }) => {
  return (
    <span className={isEror ? "MessageNote-eror" : "MessageNote-normal"}>
      {message}
    </span>
  );
};

export default MessageNote;
