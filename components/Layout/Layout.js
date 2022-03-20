import React from "react";

import BottomNavbar from "./BottomNavbar";
import Style from "../../styles/BackLayout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={Style.main}>
      {children}
      {/* <BottomNavbar /> */}
    </div>
  );
};

export default Layout;
