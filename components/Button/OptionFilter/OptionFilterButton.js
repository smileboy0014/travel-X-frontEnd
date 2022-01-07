import React from "react";
import Style from "../../../styles/FilterButton.module.css";

const OptionFilterButton = () => {
  return (
    <li className={Style.ListFilterButton_item}>
      <button className={Style.ListFilterButton_filter}>필터</button>
    </li>
  );
};

export default OptionFilterButton;
