import React, { useState } from "react";
import Style from "../../../styles/Component.module.css";
import { BsCalendar } from "react-icons/bs";
import { useSelector } from "react-redux";
import classNames from 'classnames/bind';

const cx = classNames.bind(Style);

const CalendarFilterButton = (props) => {
	const week = new Array('일', '월', '화', '수', '목', '금', '토');
  const { searchDate } = useSelector((state) => state.date);

  return (
    <li className={Style["ListFilterValue-item"]}>
      <button className={cx("ListFilterValueItem", "icoDate")} 
        onClick={props.open}>
        {`${new Date(searchDate.start).getMonth()+1}.${new Date(searchDate.start).getDate()}(${week[new Date(searchDate.start).getDay()]}) - ${new Date(searchDate.end).getMonth()+1}.${new Date(searchDate.end).getDate()}(${week[new Date(searchDate.end).getDay()]})`}
      </button>
    </li>
  );
};

export default CalendarFilterButton;
