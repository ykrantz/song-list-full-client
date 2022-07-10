import React from "react";
import { Link } from "react-router-dom";

const LogInRegisterLink = () => {
  return (
    <div>
      <p>
        Please {<Link to="/login"> log in</Link>} /{" "}
        {<Link to="/register"> register</Link>}
        <br></br> to get your playlists
      </p>
    </div>
  );
};

export default LogInRegisterLink;
