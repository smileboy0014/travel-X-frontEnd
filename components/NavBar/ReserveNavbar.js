import React, { useState } from "react";
import Styles from "../../styles/ReserveNavbar.module.css";
import ReserveModal from "../Modal/Reserve/ReserveModal";

const ReserveNavbar = () => {
  const [reserveModalOpen, setReserveModalOpen] = useState(false);
  return (
    <div>
      <div>
        <label
          className={Styles.bottomNav}
          onClick={() => setReserveModalOpen(true)}
        >
          예약 하기
        </label>
        <ReserveModal
          isOpen={reserveModalOpen}
          onRequestClose={() => setReserveModalOpen(false)}
        ></ReserveModal>
      </div>
    </div>
  );
};

export default ReserveNavbar;
