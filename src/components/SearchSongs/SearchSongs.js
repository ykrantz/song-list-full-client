import { useContext, useRef } from "react";
import handleAddSongTolibrary from "../../context/handleSearchSongApi";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import "./SearchSongs.css";
import { useState } from "react/cjs/react.development";

const SearchSongs = ({ findSongs }) => {
  const [inputSong, setInputSong] = useState("");
  const { searchSongsFromServer } = useContext(handleAddSongTolibrary);

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
            centerRipple="true"
            // style={{="center"}}
          >
            X
          </Button>{" "}
          <TextField
            className="SearchSongs-input"
            value={inputSong}
            onChange={(e) => {
              setInputSong(e.target.value);
              findSongs(inputSong);
            }}
            placeholder="song name"
            label="enter song name"
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
          Search Song From YouTube
        </Button>
      </Stack>
    </div>
  );
};

export default SearchSongs;
