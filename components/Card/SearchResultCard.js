import React from "react";
import Image from "next/image";
import Style from "../../styles/Component.module.css";

const CalcStarWidth = (score) => {
  return String(score * 20.0) + "%";
};

const RatingScoreStar = ({ ratingScoreAvg }) => {
  return (
    <div className="row">
      <span className={Style["roomListScoreStarsBackground"]}>
        <i
          className={Style["roomListScoreStars"]}
          style={{ width: CalcStarWidth(ratingScoreAvg) }}
        ></i>
      </span>
      {ratingScoreAvg}
    </div>
  );
};

const SearchRoomCard = (props) => {
  return (
    <div style={{ marginTop: "100px", textAlign: "center" }}>
      <h4>{props.propertyName}</h4>
      <div>{props.roomName}</div>
      <p>최대인원 : {props.maxUser}명</p>
      <RatingScoreStar ratingScoreAvg={props.ratingScoreAvg} />
      <p>₩{props.price}</p>
    </div>
  );
};

export default SearchRoomCard;
