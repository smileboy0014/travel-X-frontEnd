import React, { useState } from "react";
import Style from "../../../styles/Component.module.css";
import { BsPerson } from "react-icons/bs";
import { useSelector } from "react-redux";
import PesonalModal from "../../Modal/Personal/PersonalModal";
import classNames from 'classnames/bind';

const cx = classNames.bind(Style);

const PersonalFilterButton = () => {
  const [personalModalOpen, setPersonalModalOpen] = useState(false);
  const adultCounterValue = useSelector(
    ({ adultCounter }) => adultCounter.value
  );
  const childCounterValue = useSelector(
    ({ childCounter }) => childCounter.value
  );

  return (
    <li className={Style["ListFilterValue-item"]}>
      <button
        className={cx("ListFilterValueItem", "icoPersonnel")}
        onClick={() => setPersonalModalOpen(true)}
      >
        {"성인: " + adultCounterValue + " 아동: " + childCounterValue}
      </button>
      <PesonalModal
        isOpen={personalModalOpen}
        onRequestClose={() => setPersonalModalOpen(false)}
      />
    </li>
  );
};

export default PersonalFilterButton;
