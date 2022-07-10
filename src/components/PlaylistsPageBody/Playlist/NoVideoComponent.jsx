import React from "react";
import { Link } from "react-router-dom";

const NoVideoComponent = () => {
  return (
    <div>
      <p>No videos in playlist.</p>
      <p>Want to add? Press {<Link to="/search"> here</Link>}</p>
    </div>
  );
};

export default NoVideoComponent;
