import React from "react";
import Style from "../../../styles/CalendarFilterButton.module.css";
import { BsCalendar } from "react-icons/bs";

const CalendarFilterButton = () => {
  return (
    <li className={Style.ListFilterValue_item}>
      <button className={Style.ListFilterValueItem}>
        <BsCalendar className={Style.ListFilterValueItem_icon} />
        {"12.20(월)-12.21(화)"}
      </button>
    </li>
  );
};

export default CalendarFilterButton;
