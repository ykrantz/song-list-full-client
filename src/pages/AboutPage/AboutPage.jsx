import "./AboutPage.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import React from "react";
import AboutMePageBody from "../../components/AboutMePageBody/AboutMePageBody";

const AboutPage = () => {
  return (
    <div>
      <Header />
      <AboutMePageBody />
      <Footer />
    </div>
  );
};

export default AboutPage;
