import React from "react";
import Style from "../../styles/BackLayout.module.css";

const BackLayout = (children) => {
  return <div className={Style.main}>{children}</div>;
};

export default BackLayout;
