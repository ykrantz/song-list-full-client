import { useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import "./SearchSongs.css";
import { useState } from "react";
import handleMainStates from "../../../../context/handleMainStates";
import handleChangeMesage from "../../../../context/handleChangeMesage";
import { BASE_URL } from "../../../../general/main_var";

const SearchSongs = () => {
  const [inputSong, setInputSong] = useState("");
  // const { searchSongsFromServer } = useContext(handleAddSongTolibrary);
  const { changeMessage, waitingMessage } = useContext(handleChangeMesage);
  const { setSearchPlaylistResults, newPlayList, setSearchSongApiResults } =
    useContext(handleMainStates);

  const findVideoInPlayList = (songInput) => {
    const songsFounded = newPlayList.filter((song) =>
      song.title.toLowerCase().includes(songInput.toLowerCase())
    );
    setSearchPlaylistResults(songsFounded);
    if (songsFounded.length === 0) {
      changeMessage("No videos was founded in current playlist", true);
    } else {
      changeMessage("Great. we founded videos for you in current playlist");
    }
  };

  const searchSongsFromServer = async (searchValue) => {
    if (searchValue === "") {
      changeMessage("You didn't enter search value");
      return;
    } else if (searchValue.length > 20) {
      changeMessage(
        `Too long serach of ${searchValue.length} letters. please try less than 20 letters `,
        true
      );
      return;
    }

    waitingMessage();
    const ans = await fetch(`${BASE_URL}/api/search/${searchValue}`);
    const data = await ans.json();
    if (ans.status === 200) {
      setSearchSongApiResults(data);
      console.log({ data });
      changeMessage("Great. we founded videos for you from YouTube");
    } else {
      changeMessage(data.message, true);
    }
  };

  const searchVideosInPlaylist = (textToSearch) => {
    setInputSong(textToSearch);
    if (textToSearch === "") {
      setSearchPlaylistResults([]);
      return;
    } else {
      findVideoInPlayList(textToSearch);
    }
  };
  return (
    <div className="SearchSongs-container">
      <Stack spacing={4} direction="row" marginLeft={"100px"}>
        <Stack
          spacing={2}
          direction="row"
          // justifyContent="end"
          marginLeft="10px"
        >
          <Button
            onClick={() => {
              setInputSong("");
            }}
            variant="contained"
            style={{
              backgroundColor: "red",
            }}
            size="small"
            // centerRipple="true"
            // style={{="center"}}
          >
            X
          </Button>{" "}
          <TextField
            className="SearchSongs-input"
            value={inputSong}
            onChange={(e) => {
              searchVideosInPlaylist(e.target.value);
            }}
            placeholder="video name"
            label="enter video name"
            variant="outlined"
          />
        </Stack>
        <Button
          onClick={() => {
            searchSongsFromServer(inputSong);
            // setInputSong("");
          }}
          variant="contained"
        >
          Search video
        </Button>
      </Stack>
    </div>
  );
};

export default SearchSongs;
