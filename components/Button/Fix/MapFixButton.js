import React, { useEffect, useState } from "react";
import Style from "../../../styles/FixButton.module.css";
import SearchMapModal from "../../Modal/Map/SearchMapModal";

const MapFixButton = () => {
  const [searchMapModalOpen, setSearchMapModalOpen] = useState(false);

  return (
    <div>
      <button
        className={Style.MapFixButton}
        onClick={() => setSearchMapModalOpen(true)}
      >
        {"지도보기"}
      </button>

      <SearchMapModal
        isOpen={searchMapModalOpen}
        onRequestClose={() => setSearchMapModalOpen(false)}
      />
    </div>
  );
};

export default MapFixButton;
