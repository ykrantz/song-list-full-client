import "./InputAndButton.css";
// import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";

const InputAndButton = ({ buttonFunc, icon, type }) => {
  const [inputVideo, setInputVideo] = useState("");

  const butttonIconType = {
    search: <SearchIcon />,
    create: <AddCircleOutlinedIcon />,
  };
  return (
    <div className="SearchVideos-container">
      <Stack spacing={2} direction="row" justifyContent="center">
        <Tooltip title={`clear ${icon} `}>
          <IconButton
            onClick={() => {
              setInputVideo("");
            }}
            color={"error"}
          >
            <CancelIcon />
          </IconButton>
        </Tooltip>

        <TextField
          className="SearchVideos-input"
          value={inputVideo}
          onChange={(e) => {
            setInputVideo(e.target.value);
          }}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              buttonFunc(inputVideo);
            }
          }}
          placeholder={`${type} name`}
          label={`enter ${type} name`}
          variant="outlined"
          style={{
            maxWidth: "20%",
            minWidth: "40%",
          }}
          size="small"
        ></TextField>

        <Tooltip title={`${icon} ${type}`}>
          <IconButton
            color={"primary"}
            onClick={() => {
              buttonFunc(inputVideo);
            }}
          >
            {butttonIconType[icon]}
          </IconButton>
        </Tooltip>
      </Stack>
    </div>
  );
};

export default InputAndButton;
