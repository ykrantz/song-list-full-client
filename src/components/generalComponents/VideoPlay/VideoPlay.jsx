import "./VideoPlay.css";
import React from "react";
import Plyr from "plyr-react";
import "plyr-react/dist/plyr.css";

const VideoPlay = ({ videoSrc }) => {
  return (
    <div className="VideoPlay-container">
      <div className="VideoPlay-Plyr">
        <Plyr
          source={videoSrc}
          height={"1px"}
          width={"30%"}
          // options={{ autoplay: true }}
          // options={{ autoplay: autoplayFlag }}
        />
      </div>
    </div>
  );
};

export default VideoPlay;
