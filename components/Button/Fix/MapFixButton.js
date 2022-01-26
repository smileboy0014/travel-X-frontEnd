import React, { useEffect, useState } from "react";
// import Style from "../../../styles/FixButton.module.css";
// import SearchMapModal from "../../Modal/Map/SearchMapModal";

const MapFixButton = (onRequestViewMap) => {
  //const [searchMapModalOpen, setSearchMapModalOpen] = useState(false);
  // const onClickRequestViewMap = () => {
  //   if (onRequestViewMap !== undefined) {
  //     onRequestViewMap(true);
  //   }
  // };

  return (
    <div>
      {/* <button className={Style.MapFixButton} onClick={onClickRequestViewMap()}>
        {"지도보기"}
      </button> */}
      {/* <SearchMapModal
        isOpen={searchMapModalOpen}
        onRequestClose={() => setSearchMapModalOpen(false)}
      /> */}
    </div>
  );
};

export default MapFixButton;
