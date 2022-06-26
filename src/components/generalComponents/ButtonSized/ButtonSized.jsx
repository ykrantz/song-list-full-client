import "./ButtonSized.css";

import React from "react";
import { Button } from "@mui/material";

const ButtonSized = ({ onClickFunc, title }) => {
  return (
    <div>
      <Button
        style={{
          maxWidth: "90px    ",
          maxHeight: "30px",
          minWidth: "50px",
          minHeight: "20px",
          fontSize: "0.8vh",
          padding: "5px",
        }}
        // size={"small"}
        onClick={() => onClickFunc()}
        variant="contained"
      >
        {title}{" "}
      </Button>
    </div>
  );
};

export default ButtonSized;
