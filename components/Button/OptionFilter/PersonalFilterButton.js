import React, { useState } from "react";
import Style from "../../../styles/FilterButton.module.css";
import { BsPerson } from "react-icons/bs";
import { useSelector } from "react-redux";
import PesonalModal from "../../Modal/Personal/PersonalModal";

const PersonalFilterButton = () => {
  const [personalModalOpen, setPersonalModalOpen] = useState(false);
  const adultCounterValue = useSelector(
    ({ adultCounter }) => adultCounter.value
  );
  const childCounterValue = useSelector(
    ({ childCounter }) => childCounter.value
  );

  return (
    <li className={Style.ListFilterValue_item}>
      <button
        className={Style.ListFilterValueItem}
        onClick={() => setPersonalModalOpen(true)}
      >
        <BsPerson className={Style.ListFilterValueItem_icon} />
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
