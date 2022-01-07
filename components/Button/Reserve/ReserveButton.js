import React from "react";
import Style from "../../../styles/ReserveBotton.module.css";

const ReserveButton = () => {
  return (
    <div className={Style.BttonFixButton}>
      <div className={Style.site_container}>
        <button type="button" className={Style.BttonFixButton_button}>
          예약하기
        </button>
      </div>
    </div>
  );
};

export default ReserveButton;
