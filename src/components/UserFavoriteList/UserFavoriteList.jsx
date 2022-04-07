import "./UserFavoriteList.css";

import React, { useState } from "react";
import UserFavorite from "./UserFavorite/UserFavorite";
import { useParams } from "react-router";
import Divider from "@mui/material/Divider";
import BackToHome from "../generalComponents/BackToHome/BackToHome";

import { useEffect } from "react";
import { BASE_URL } from "../../general/main_var";
const UserFavoriteList = () => {
  const [songUserFavoriteList, setSongUserFavoriteList] = useState([]);
  const [masseage, setMasseage] = useState("");

  const { songid } = useParams();
  // const navigate=useNavigate()

  const changeMessage = (str) => {
    setMasseage(str);
  };

  useEffect(() => {
    showAllUserSongFavorite(songid);
    // console.log(songid);
  }, []);
  // const {  changeMessage,setSongUserFavoriteList}= useContext(handleFoundedSongPlayList)
  // const {  changeMessage,setSongUserFavoriteList}= useContext(handleFoundedSongPlayList)
  const getAllUserSongFavoriteFromServer = async (songId) => {
    if (!localStorage.currentUser) {
      setMasseage(
        "You aren't a Knowen user. plaese connect and then try again"
      );

      return [];
    }
    const ans = await fetch(`${BASE_URL}/songs/favorite/${songId}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.accessToken)}`,
      },
    });
    const userList = await ans.json();
    // console.log(userList);
    if (ans.status === 200) {
      return [...userList];
    } else {
      return userList.message;
    }
  };
  const showAllUserSongFavorite = async (songId) => {
    const userList = await getAllUserSongFavoriteFromServer(songId);
    // console.log(userList);
    if (userList?.message) {
      setSongUserFavoriteList([]);
      changeMessage(userList.message);
    } else {
      setSongUserFavoriteList(userList);
    }
  };

  // console.log(songUserFavoriteList);
  const countFavorites = songUserFavoriteList.length;

  return (
    <div>
      <div>
        {/* <HomeIcon fontSize="large" onClick={()=>navigate("/")} className="UserFavoriteList-home"/> */}
        <BackToHome />

        <h1>{countFavorites} User liked this song in Playlists:</h1>
        <Divider />
      </div>
      {songUserFavoriteList.map((playlist) => (
        <UserFavorite key={playlist._id} playlist={playlist} />
      ))}

      <p>
        {" "}
        <b>Message:</b> {masseage}
      </p>
    </div>
  );
};

export default UserFavoriteList;
