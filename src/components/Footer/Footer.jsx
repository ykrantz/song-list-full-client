import "./Footer.css";

import React, { useContext } from "react";
import MessageNote from "../generalComponents/MessageNote/MessageNote";
import handleMessage from "../../context/handleMessage";
import { Snackbar } from "@mui/material";

const Footer = () => {
  const { message } = useContext(handleMessage);
  return (
    <div className="Footer-container">
      <MessageNote message={message.message} type={message.type} />
    </div>
  );
};

export default Footer;
