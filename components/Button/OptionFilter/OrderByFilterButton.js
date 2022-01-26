import React from "react";
import Style from "../../../styles/FilterButton.module.css";

const OrderByFilterButton = () => {
  return (
    <li className={Style.ListFilterButton_item}>
      <select className={Style.ListFilterButtonItem_select}>
        <option value="정렬기준">정렬기준</option>
        <option value="오름차순">오름차순</option>
        <option value="내림차순">내림차순</option>
      </select>
    </li>
  );
};

export default OrderByFilterButton;
