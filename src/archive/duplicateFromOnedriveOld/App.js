// import logo from "./logo.svg";
import { useRef, useState } from "react";
import "./App.css";
import AddItem from "./components/AddItem/AddItem";
import FoundedSongs from "./components/FoundedSongs/FoundedSongs";
import Header from "../../components/Header/Header";
import SongList from "./components/SongList/SongList";

function App() {
  const songList = [
    { id: 1, name: "song1", artist: "artist1" },
    { id: 2, name: "song2", artist: "artist2" },
    { id: 3, name: "song3", artist: "artist1" },
    { id: 4, name: "song4", artist: "artist2" },
  ];

  const [newSongList, setNewSongList] = useState(songList);
  const [inputSong, setInputSong] = useState("");
  const [inputArtist, setInputArtist] = useState("");
  const [foundedSongs, setFoundedSongs] = useState([]);
  const idCunter = useRef(5);

  const findSongs = (text) => {
    console.log(text);
    const songsFounded = newSongList.filter((song) => song.name.includes(text));
    console.log(songsFounded);

    setFoundedSongs(songsFounded);
  };

  const removeSong = (id) => {
    const updatedSonglist = newSongList.filter((song) => song.id !== id);
    setNewSongList(updatedSonglist);
  };
  const addSong = (song, artist) => {
    idCunter.current++;

    setNewSongList([
      ...newSongList,
      { id: idCunter.current, name: song, artist: artist },
    ]);

    setInputSong("");
    setInputArtist("");
  };

  return (
    <div className="App">
      <Header />
      <AddItem
        addSong={addSong}
        findSongs={findSongs}
        // inputSong={inputSong}
        // inputArtist={inputArtist}
        // setInputSong={setInputSong}
        // setInputArtist={setInputArtist}
      />
      <div className="App-divSongs">
        <SongList songList={newSongList} removeSong={removeSong} />
        <FoundedSongs foundedSongs={foundedSongs} />
      </div>
    </div>
  );
}

export default App;
