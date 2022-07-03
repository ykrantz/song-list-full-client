import "./PlayVideoButton.css";
import React, { useContext } from "react";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import Tooltip from "@mui/material/Tooltip";
import handleVideoSrc from "../../../context/handleVideoSrc";

const PlayVideoButton = ({ id }) => {
  const { updateVideoSource } = useContext(handleVideoSrc);

  // const { updateVideoResurce } = useContext(handlePlaylist);
  return (
    <div className="PlayVideoButton-div">
      <Tooltip title={"play Video"}>
        <PlayCircleFilledWhiteIcon
          fontSize="large"
          onClick={() => {
            // setAutoplayFlag(true);
            updateVideoSource(id);
          }}
        />
      </Tooltip>
    </div>
  );
};

export default PlayVideoButton;
