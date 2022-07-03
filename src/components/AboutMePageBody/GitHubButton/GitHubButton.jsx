import "./GitHubButton.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import React from "react";
import { useNavigate } from "react-router";

const GitHubButton = ({ gitHubUrl, urlType }) => {
  const color = { client: "primary", server: "secondary", link: "secondary" };
  return (
    <div>
      <IconButton aria-label="git link">
        <a href={gitHubUrl} target="_blank">
          <Tooltip title={"GitHub " + urlType}>
            <GitHubIcon fontSize="medium" color={color[urlType]} />
          </Tooltip>
        </a>
      </IconButton>
    </div>
  );
};

export default GitHubButton;
