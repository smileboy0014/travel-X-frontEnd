import React from "react";
import Style from "../../../styles/OptionFilterButton.module.css";
import { BsSliders } from "react-icons/bs";

const OptionFilterButton = () => {
  return (
    <li className={Style.ListFilterButton_item}>
      <button className={Style.ListFilterButton_filter}>
        <BsSliders className={Style.ListFilterButton_filter_icon} />
        필터
      </button>
    </li>
  );
};

export default OptionFilterButton;
