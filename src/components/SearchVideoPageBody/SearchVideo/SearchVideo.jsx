import "./SearchVideo.css";
import SearchIcon from "@mui/icons-material/Search";
import { useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import { useState } from "react";
import { BASE_URL } from "../../../general/main_var";
import handleSearchVideoApi from "../../../context/handleSearchVideoApi";
import handleMessage from "../../../context/handleMessage";
import CancelIcon from "@mui/icons-material/Cancel";
import IconButton from "@mui/material/IconButton";
const SearchVideo = () => {
  const [inputVideo, setInputVideo] = useState("");

  const { setSearchVideoApiResults, updateVideoResurce } =
    useContext(handleSearchVideoApi);
  const { changeMessage, waitingMessage } = useContext(handleMessage);

  const searchVideosFromServer = async (searchValue) => {
    try {
      console.log({ searchValue });
      if (searchValue === "") {
        changeMessage("You didn't enter search value", "error");
        return;
      } else if (searchValue.length > 20) {
        changeMessage(
          `Too long serach of ${searchValue.length} letters. please try less than 20 letters `,
          "warning"
        );
        return;
      }

      waitingMessage();
      const ans = await fetch(`${BASE_URL}/api/search/${searchValue}`);
      const data = await ans.json();
      if (ans.status === 200) {
        setSearchVideoApiResults(data);

        updateVideoResurce(data[0].id);
        console.log("found", 61);
        changeMessage(
          "Great. we founded videos for you from YouTube",
          "success"
        );
      } else {
        changeMessage(data.message, "warning");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="SearchVideos-container">
      <Stack spacing={2} direction="row" justifyContent="center">
        <IconButton
          onClick={() => {
            setInputVideo("");
          }}
          color={"error"}
        >
          <CancelIcon />
        </IconButton>

        <TextField
          className="SearchVideos-input"
          value={inputVideo}
          onChange={(e) => {
            setInputVideo(e.target.value);
          }}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              searchVideosFromServer(inputVideo);
            }
          }}
          placeholder="video name"
          label="enter video name"
          variant="outlined"
          style={{
            maxWidth: "20%",
            // maxHeight: "5px",
            minWidth: "40%",
            // minHeight: "5px",
            // height: "1px",
            // fontSize: "0.8vh",
          }}
          size="small"
        ></TextField>
        {/* <Stack
          spacing={2}
          direction="row"
          // justifyContent="end"
          marginLeft=
          "1px"
        > */}
        {/* <IconButton
          onClick={() => {
            searchVideosFromServer(inputVideo);
            // setInputVideo("");
          }}
          color={"primary"}
        >
          <SearchIcon />
        </IconButton> */}
        <Button
          onClick={() => {
            searchVideosFromServer(inputVideo);
            // setInputVideo("");
          }}
          variant="contained"
          // color={"primary"}
        >
          <SearchIcon />
        </Button>
        {/* <Button
            onClick={() => {
              setInputVideo("");
            }}
            variant="contained"
            style={{
              backgroundColor: "red",

              maxWidth: "90px    ",
              maxHeight: "30px",
              minWidth: "2%",
              minHeight: "20px",
              // fontSize: "0.8vh",
            }}
            size="small"
            // centerRipple="true"
            // style={{="center"}}
          >
            X
          </Button>{" "} */}
      </Stack>
    </div>
  );
};

export default SearchVideo;
