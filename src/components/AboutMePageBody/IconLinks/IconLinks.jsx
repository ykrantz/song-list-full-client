import "./IconLinks.css";

import * as React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import GitHubButton from "../GitHubButton/GitHubButton";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Tooltip } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

const CV_LINK =
  "https://drive.google.com/uc?export=download&id=1r1QoJlSoe6ej83cTiXRvXkgHYGOLX835";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function IconLinks() {
  return (
    <div>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignContent="center"
        alignItems={"center"}
      >
        <div className="AboutMe-linkedinLink">
          <a
            className="AboutMe-linkedinIcon"
            href="https://www.linkedin.com/in/yehuda-krantz/"
            target="_blank"
          >
            <Tooltip title={"my Linkdin"}>
              <LinkedInIcon fontSize="medium" color="primary" />
            </Tooltip>
          </a>
        </div>
        {/* </Item> */}

        {/* <Item> */}
        <div className="AboutMe-gitHubLink">
          <GitHubButton gitHubUrl="https://github.com/ykrantz" urlType="link" />
        </div>
      </Stack>
      <Stack
        direction="row"
        spacing={1}
        justifyContent="center"
        alignContent="center"
        alignItems={"center"}
        marginTop={1}
      >
        <div className="AboutMePageBody-myCvTitle">My CV: </div>

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
                fontSize="medium"
              />
            </Tooltip>
          </a>
        </div>
      </Stack>
    </div>
  );
}
