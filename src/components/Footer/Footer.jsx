import "./Footer.css";

import React, { useContext } from "react";
import MessageNote from "../generalComponents/MessageNote/MessageNote";
import handleMessage from "../../context/handleMessage";

const Footer = () => {
  const { message } = useContext(handleMessage);
  return (
    <div className="Footer-container">
      <MessageNote message={message.message} isEror={message.isEror} />
    </div>
  );
};

export default Footer;
