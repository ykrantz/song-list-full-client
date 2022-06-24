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
          minWidth: "30px",
          minHeight: "30px",
          fontSize: "8px",
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
