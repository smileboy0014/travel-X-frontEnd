import React from "react";

import BottomNavbar from "./BottomNavbar";

const Layout = ({ children }) => {
  return (
    <div>
      {children}
      <BottomNavbar />
    </div>
  );
};

export default Layout;
