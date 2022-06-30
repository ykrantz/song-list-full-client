import "./AboutMePageBody.css";

import React, { useContext, useEffect } from "react";
// import NavTabs from "../NavTabs/NavTabs";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Detail from "./Detail/Detail";
import Tooltip from "@mui/material/Tooltip";
import GitHubButton from "../AboutMePageBody/GitHubButton/GitHubButton";
// import { Box, Grid } from "@mui/material";
import handleHeader from "../../context/archive/handleHeader";
import { Stack } from "@mui/material";
import IconLinks from "./IconLinks/IconLinks";

// const CV_LINK =
//   "https://drive.google.com/uc?export=download&id=1r1QoJlSoe6ej83cTiXRvXkgHYGOLX835";

const aboutMeDetails = [
  "Looking for the next challenge in SW development",
  "Frontend: JavaScript, React.js || Backend: Node.js || DB: MongoDB, Sql",
  "B.Sc Industrial Management Information System engineer (Avg. 95, President's Honor List)",
  "SAP PP Manager: Characterization and Implementation efficiency solutions",
];

const AboutMePageBody = () => {
  return (
    <div className="AboutMePageBody-page">
      {/* <div className="AboutMePageBody-Nav-div">
        <NavTabs className="AboutMePageBody-Nav" tabName="aboutMe" />
      </div> */}
      <div className="AboutMePageBody-mainPage">
        <div className="AboutMePageBody-headerContainer">
          <h1 className="AboutMePageBody-title">Yehuda Krantz</h1>
          <div className="AboutMePageBody-linksAndCv">
            <IconLinks />
            {/* <div className="AboutMePageBody-myCvTitle">
              My CV:
              <div className="AboutMePageBody-cvDiv">
                <a
                  className="AboutMePageBody-cvFile"
                  // if want to show  directly in google
                  // href="https://drive.google.com/file/d/1giY5P58xg94jsrnIFpy_ZC9mfUBgV0Xs/view?usp=sharing"
                  href={CV_LINK}
                >
                  <Tooltip title={"downlaod CV"}>
                    <FileDownloadIcon
                      className="AboutMePageBody-cvFile"
                      variant="contained"
                      fontSize="large"
                    />
                  </Tooltip>
                </a>
              </div>
            </div> */}
          </div>
        </div>
        <p className="AboutMePageBody-portfolio">
          <b>Portfolio: </b>
          <a href="https://portfolio-ykrantz.netlify.app/" target="_blank">
            https://portfolio-ykrantz.netlify.app
          </a>{" "}
        </p>
        {/* <h4 className="AboutMePageBody-aboutMeTitle">About Me: </h4> */}
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
