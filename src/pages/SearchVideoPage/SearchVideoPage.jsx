import "./SearchVideoPage.css";

import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SearchVideoPageBody from "../../components/SearchVideoPageBody/SearchVideoPageBody";

const SearchVideoPage = () => {
  return (
    <div className="SearchPage-Container">
      <Header />
      <SearchVideoPageBody />
      <Footer />
    </div>
  );
};

export default SearchVideoPage;
