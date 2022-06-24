import "./PlayVideoButton.css";
import React, { useContext } from "react";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import Tooltip from "@mui/material/Tooltip";

const PlayVideoButton = ({ id, updateVideoResurce }) => {
  // const { updateVideoResurce } = useContext(handlePlaylist);
  return (
    <div className="PlayVideoButton-div">
      <Tooltip title={"play Video"}>
        <PlayCircleFilledWhiteIcon
          fontSize="large"
          onClick={() => {
            // setAutoplayFlag(true);
            updateVideoResurce(id);
          }}
        />
      </Tooltip>
    </div>
  );
};

export default PlayVideoButton;
