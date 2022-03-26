import "./BackToHome.css";
import HomeIcon from "@mui/icons-material/Home";
import Tooltip from "@mui/material/Tooltip";

import { useNavigate } from "react-router";

import React from "react";

const BackToHome = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Tooltip title={"go back to home page"}>
        <HomeIcon
          fontSize="large"
          onClick={() => navigate("/")}
          className="BackToHome-home"
        />
      </Tooltip>
    </div>
  );
};

export default BackToHome;
