import React, { useEffect } from "react";
import Style from "../../styles/FixButton.module.css";

const SearchMobileCard = ({ data }) => {
  return (
    <div className={Style.MapFixButton}>
      {data[0] !== undefined && (
        <div>
          <li>{"주소: " + data[0].addr}</li>
          <li>{"가격: " + data[0].price}</li>
        </div>
      )}
    </div>
  );
};

export default SearchMobileCard;
