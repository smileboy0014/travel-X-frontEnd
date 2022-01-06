import React from "react";
import Style from "../../../styles/FixButton.module.css";
import { BsSliders } from "react-icons/bs";

const MapFixButton = () => {
  return (
    <div>
      <button className={Style.MapFixButton}>
        <BsSliders className={Style.MapFixButton_icon} />
        {"지도보기"}
      </button>
    </div>
  );
};

export default MapFixButton;
