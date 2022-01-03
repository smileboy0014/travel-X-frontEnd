import React, { useEffect } from "react";
import style from "../../styles/SearchTest.module.css";
import { AiFillStar } from "react-icons/ai";

function SearchResult(props) {
  // useEffect(() => {
  //   console.log(props.images[0]);

  //   console.log(props);
  // }, [props]);

  return (
    <div className={style.searchResult}>
      <img src={"http://" + props.images[0]} alt="" />
      <div className={style.searchResult__info}>
        <div className={style.searchResult__infoTop}>
          <p>{props.propertyName}</p>
          <h3>{"룸타입 " + props.roomName}</h3>
          <p></p>
          <strong>{"최대: " + props.maxUser + " 명"}</strong>
          <p>{"숙박15:00 부터"}</p>
        </div>

        <div className={style.searchResult__infoBottom}>
          <div className={style.searchResult__stars}>
            <AiFillStar className={style.searchResult__star} />
            <strong>{props.ratingScoreAvg}</strong>
          </div>
          <div className={style.searchResults__price}>
            <h2>₩{props.price}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
