import "./UserFavoriteList.css";

import React, { useContext, useState } from "react";
import UserFavorite from "./UserFavorite/UserFavorite";
import { useParams } from "react-router";
import Divider from "@mui/material/Divider";
import BackToHome from "../generalComponents/BackToHome/BackToHome";

import { useEffect } from "react";
import { BASE_URL } from "../../general/main_var";
import handleMessage from "../../context/handleMessage";
import handleUser from "../../context/handleUser";
const UserFavoriteList = () => {
  const [songUserFavoriteList, setSongUserFavoriteList] = useState([]);
  const [masseage, setMasseage] = useState("");
  const { currentUser } = useContext(handleUser);

  const { songid } = useParams();
  const { changeMessage } = useContext(handleMessage);

  useEffect(() => {
    showAllUserSongFavorite(songid);
  }, []);

  const getAllUserSongFavoriteFromServer = async (songId) => {
    if (!currentUser) {
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
    if (ans.status === 200) {
      return [...userList];
    } else {
      return userList.message;
    }
  };
  const showAllUserSongFavorite = async (songId) => {
    const userList = await getAllUserSongFavoriteFromServer(songId);
    if (userList?.message) {
      setSongUserFavoriteList([]);
      changeMessage(userList.message);
    } else {
      setSongUserFavoriteList(userList);
    }
  };

  const countFavorites = songUserFavoriteList.length;

  return (
    <div>
      <div>
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
