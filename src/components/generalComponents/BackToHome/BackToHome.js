import "./BackToHome.css";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router";

import React from "react";

const BackToHome = () => {
  const navigate = useNavigate();

  return (
    <div>
      <HomeIcon
        fontSize="large"
        onClick={() => navigate("/")}
        className="BackToHome-home"
      />
    </div>
  );
};

export default BackToHome;
