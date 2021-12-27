import React from "react";
import BottomNavbar from "./BottomNavbar";

const SearchLayout = ({ children }) => {
  return (
    <div>
      {children}
      <BottomNavbar />
    </div>
  );
};

export default SearchLayout;
