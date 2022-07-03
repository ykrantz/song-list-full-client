import "./LoginRegisterPage.css";

import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import LoginRegisterPageBody from "../../components/LoginRegisterPageBody/LoginRegisterPageBody";

const LoginRegisterPage = ({ type }) => {
  return (
    <div>
      <Header />
      <LoginRegisterPageBody type={type} />
      <Footer />
    </div>
  );
};

export default LoginRegisterPage;
