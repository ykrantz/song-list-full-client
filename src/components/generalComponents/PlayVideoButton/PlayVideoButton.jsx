import "./PlayVideoButton.css";
import React, { useContext } from "react";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import Tooltip from "@mui/material/Tooltip";
import handleVideoSrc from "../../../context/handleVideoSrc";

const PlayVideoButton = ({ id }) => {
  const {
    updateVideoSource,
    //  setAutoPlayFlag
  } = useContext(handleVideoSrc);

  return (
    <div className="PlayVideoButton-div">
      <Tooltip title={"play Video"}>
        <PlayCircleFilledWhiteIcon
          fontSize="large"
          onClick={() => {
            updateVideoSource(id);
            // setAutoPlayFlag(true);
          }}
        />
      </Tooltip>
    </div>
  );
};

export default PlayVideoButton;
