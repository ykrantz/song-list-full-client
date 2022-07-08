import "./AboutMePageBody.css";

import React, { useContext, useEffect } from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Detail from "./Detail/Detail";
import Tooltip from "@mui/material/Tooltip";
import GitHubButton from "../AboutMePageBody/GitHubButton/GitHubButton";
import { Stack } from "@mui/material";
import IconLinks from "./IconLinks/IconLinks";

const aboutMeDetails = [
  "Looking for the next challenge in SW development",
  "Frontend: JavaScript, React.js || Backend: Node.js || DB: MongoDB, Sql",
  "B.Sc Industrial Management Information System engineer (Avg. 95, President's Honor List)",
  "SAP PP Manager: Characterization and Implementation efficiency solutions",
];

const AboutMePageBody = () => {
  return (
    <div className="AboutMePageBody-page">
      <div className="AboutMePageBody-mainPage">
        <div className="AboutMePageBody-headerContainer">
          <h1 className="AboutMePageBody-title">Yehuda Krantz</h1>
          <div className="AboutMePageBody-linksAndCv">
            <IconLinks />
          </div>
        </div>
        <p className="AboutMePageBody-portfolio">
          <b className="AboutMePageBody-portfolioTitle">Portfolio: </b>
          <br></br>
          <a href="https://portfolio-ykrantz.netlify.app/" target="_blank">
            https://portfolio-ykrantz.netlify.app
          </a>{" "}
        </p>
        <ul className="AboutMePageBody-ulDetails">
          {aboutMeDetails.map((detail) => (
            <Detail key={detail} detail={detail} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AboutMePageBody;

//
