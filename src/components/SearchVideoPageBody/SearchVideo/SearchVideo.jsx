import "./SearchVideo.css";
import SearchIcon from "@mui/icons-material/Search";
import { useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import { useState } from "react";
// import handleChangeMesage from "../../../../context/handleChangeMesage";
import { BASE_URL } from "../../../general/main_var";
import handleSearchVideoApi from "../../../context/handleSearchVideoApi";
import handleMessage from "../../../context/handleMessage";

const SearchVideo = () => {
  const [inputVideo, setInputVideo] = useState("");
  // const { searchVideosFromServer } = useContext(handleAddVideoTolibrary);

  //   const { changeMessage, waitingMessage } = useContext(handleChangeMesage);
  //   const { setSearchPlaylistResults, newPlayList, setSearchVideoApiResults } =
  //     useContext(handleMainStates);
  const {
    setSearchVideoApiResults,
    updateVideoResurce,
    // changeMessage,
    // waitingMessage,
  } = useContext(handleSearchVideoApi);
  const { changeMessage, waitingMessage } = useContext(handleMessage);
  // const [message, setMessage] = useState("");
  // const changeMessage = (str, isEror = false) => {
  //   setMessage({ message: str, isEror: isEror });

  //   setTimeout(() => {
  //     setMessage("");
  //   }, 3000);
  // };
  // const waitingMessage = () => {
  //   changeMessage("Waiting for results from server");
  // };

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
      console.log("12");
      const data = await ans.json();
      console.log("13", { data });
      if (ans.status === 200) {
        setSearchVideoApiResults(data);
        console.log({ data });
        console.log(data[0].id, 13);
        updateVideoResurce(data[0].id);
        changeMessage("Great. we founded videos for you from YouTube");
      } else {
        changeMessage(data.message, "warning");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="SearchVideos-container">
      <Stack
        spacing={2}
        direction="row"
        justifyContent="center"
        // marginLeft="10%"
      >
        <Button
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
        </Button>{" "}
        <TextField
          className="SearchVideos-input"
          value={inputVideo}
          onChange={(e) => {
            setInputVideo(e.target.value);
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
        />
        {/* <Stack
          spacing={2}
          direction="row"
          // justifyContent="end"
          marginLeft="1px"
        > */}
        <Button
          onClick={() => {
            searchVideosFromServer(inputVideo);
            // setInputVideo("");
          }}
          variant="contained"
          style={{
            maxWidth: "90px    ",
            maxHeight: "30px",
            minWidth: "50px",
            minHeight: "20px",
            // fontSize: "2vh",
          }}
        >
          <SearchIcon />
        </Button>
      </Stack>
    </div>
  );
};

export default SearchVideo;
