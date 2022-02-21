import { useContext } from "react";
import handleAddSong from "../../context/handleAddSongTolibrary";
import handleChangeSongToPlaylist from "../../context/handleChangeSongToPlaylist";
// import "./FoundedSong.css";

// const FoundedSong = ({ song: { id, name, artist } }) => {
const FoundedSong = ({ song: { id, title, img, thumbnails } }) => {
  const { addSongToPlaylist } = useContext(handleChangeSongToPlaylist);
  const { changeMessage } = useContext(handleChangeSongToPlaylist);
  // console.log(img);
  const imgToShow = "";
  if (thumbnails) {
    console.log("TUM");
    imgToShow = thumbnails[0].url;
  }
  console.log(imgToShow);
  if (img) {
    console.log("img");

    imgToShow = thumbnails[0].url;
  }
  console.log(imgToShow);

  // console.log(thumbnails[0]?.url ? thumbnails[0]?.url : img);
  // console.log(thumbnails[0]);
  return (
    <div className="FoundedSong-container">
      <p className="FoundedSong-song">title: {title}</p>
      <img src={imgToShow} className="FoundedSong-img"></img>
      <button
        onClick={() => {
          addSongToPlaylist(id);
        }}
      >
        +
      </button>
    </div>
  );
};

export default FoundedSong;
