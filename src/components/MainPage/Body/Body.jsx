import { useContext, useState } from "react";
import handleSerachSongPlayList from "../../../context/handleSerachSongPlayList";
import FoundedSongsPlaylist from "../FoundedSongsPlaylist/FoundedSongsPlaylist";
import FoundedSongsYouTube from "../FoundedSongsYouTube/FoundedSongsYouTube";
import PlayList from "../PlayList/PlayList";
import PlayListsUser from "../PlayListsUser/PlayListsUser";
import SearchSongs from "../SearchSongs/SearchSongs";
import "./Body.css";

const Body = () => {
  const { changeMessage, newPlayList } = useContext(handleSerachSongPlayList);
  const [searchPlaylistResults, setSearchPlaylistResults] = useState([]);

  const findSongsInPlayList = (songInput) => {
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

  return (
    <div>
      <div className="MainPage-inputsAndButtonsContainer">
        {localStorage.currentUser && (
          <PlayListsUser className="MainPage-CreatePlaylist" />
        )}
        <SearchSongs
          className="MainPage-SearchApi"
          findSongsInPlayList={findSongsInPlayList}
        />
      </div>

      <div className="MainPage-contex">
        {localStorage.currentUser && (
          <PlayList className="MainPage-PlayList" newPlayList={newPlayList} />
        )}
        <FoundedSongsYouTube
          className="MainPage-FoundedSongsYouTube"
          searchSongResults={searchSongApiResults}
        />
        {localStorage.currentUser && (
          <FoundedSongsPlaylist
            className="MainPage-FoundedSongsPlaylist"
            searchSongResults={searchPlaylistResults}
          />
        )}
      </div>
    </div>
  );
};

export default Body;
