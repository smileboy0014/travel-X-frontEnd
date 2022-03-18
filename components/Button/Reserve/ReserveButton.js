import React from "react";
import Style from "../../../styles/Component.module.css";

const ReserveButton = () => {
  return (
    <div className={Style["BttonFixButton"]}>
      <div className="site-container">
        <button type="button" className={Style["BttonFixButton-button"]}>
          예약하기
        </button>
      </div>
    </div>
  );
};

export default ReserveButton;
