import "./InputAndButton.css";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { useContext, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";
import findItemsInList from "../../../actions/sideFunctions/findItemsInList";
import handleSearchResults from "../../../context/handleSearchResults";

const InputAndButton = ({ buttonFunc, icon, type, itemsList }) => {
  const [inputValue, setInputValue] = useState("");
  const {
    searchVideoResults,
    setSearchVideoResults,
    searchPlaylistResults,
    setPlaylistResults,
  } = useContext(handleSearchResults);

  const butttonIconType = {
    search: <SearchIcon />,
    create: <AddCircleOutlinedIcon />,
  };
  const placeHolderText = {
    video: "video to search",
    playlist: "playlist  to create",
  };

  // const searchTypeState = {
  //   video: itemsList,
  //   playlist: searchPlaylistResults,
  // };
  const searchTypeSet = {
    video: setSearchVideoResults,
    playlist: setPlaylistResults,
  };

  const itemsFoundInExistingList = (str) => {
    const itemsFoundInExistingList = findItemsInList(str, itemsList, "title");
    searchTypeSet[type](itemsFoundInExistingList);
  };

  const handleInputCahnge = (value) => {
    setInputValue(value);
    itemsFoundInExistingList(value);
  };
  const handleClearInput = (value) => {
    setInputValue("");
    itemsFoundInExistingList("");
  };

  return (
    <div className="InputAndButton--container">
      <Stack spacing={2} direction="row" justifyContent="center">
        <Tooltip title={`clear ${icon} `}>
          <IconButton
            onClick={() => {
              handleClearInput();
            }}
            color={"error"}
          >
            <CancelIcon />
          </IconButton>
        </Tooltip>

        <TextField
          className="InputAndButton--input"
          value={inputValue}
          onChange={(e) => {
            handleInputCahnge(e.target.value);
          }}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              buttonFunc(inputValue);
            }
          }}
          // placeholder={`${type} name`}
          // label={`enter ${type} name`}
          placeholder={`${placeHolderText[type]} `}
          label={`${placeHolderText[type]} `}
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
              buttonFunc(inputValue);
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
