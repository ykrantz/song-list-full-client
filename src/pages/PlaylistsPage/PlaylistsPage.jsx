import "./PlaylistsPage.css";

import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import UserPlayLists from "../../components/UserPlayLists/UserPlayLists";
import PlayList from "../../components/MainPage/Body/PlayList/PlayList";
import PlaylistsPageBody from "../../components/PlaylistsPageBody/PlaylistsPageBody";

const PlaylistsPage = () => {
  return (
    <div>
      <Header />
      <PlaylistsPageBody />
      <Footer />
    </div>
  );
};

export default PlaylistsPage;
