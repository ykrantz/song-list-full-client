import "./PlaylistsPage.css";

import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
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
