import "./VideoPlay.css";
import React, { useContext } from "react";
import Plyr from "plyr-react";
import "plyr-react/dist/plyr.css";
import handleVideoSrc from "../../../context/handleVideoSrc";

const VideoPlay = ({ videoSrc }) => {
  // const { autoPlayFlag } = useContext(handleVideoSrc);

  return (
    <div className="VideoPlay-container">
      <div className="VideoPlay-Plyr">
        <Plyr
          source={videoSrc}
          height={"1px"}
          width={"30%"}
          // options={{ autoplay: true }}
          // options={{ autoplay: autoPlayFlag }}
        />
      </div>
    </div>
  );
};

export default VideoPlay;
