import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import * as roomFilterActions from "../../../redux/store/modules/roomFilter";
import Style from "../../../styles/Component.module.css";



const RoomFilter = ({ onRequestClear, onSetClear, onRequestClose, callback }) => {
  const router = useRouter();
  const [checkedRentInputs, setCheckedRentInputs] = useState([]);
  const [checkedHotelInputs, setCheckedHotelInputs] = useState([]);
  const dispatch = useDispatch();
  const filterValue = useSelector(({roomFilter}) => roomFilter);

  useEffect(()=>{
   
    if(filterValue != null && filterValue.rent != null && filterValue.rent.length > 0){
      setCheckedRentInputs(filterValue.rent);
    }

    if(filterValue != null && filterValue.hotel != null && filterValue.hotel.length > 0){
      setCheckedHotelInputs(filterValue.hotel);
    }

  },[filterValue]);

  const changeCheckHandler = (checked, type ,id) => {
    switch(type){
      case "rent":
        if (checked) {
          setCheckedRentInputs([...checkedRentInputs, id]);
        } else {
          setCheckedRentInputs(checkedRentInputs.filter((el) => el !== id));
        }
        break;
      case "hotel":
        if (checked) {
          setCheckedHotelInputs([...checkedHotelInputs, id]);
        } else {
          setCheckedHotelInputs(checkedHotelInputs.filter((el) => el !== id));
        }
        break;
    }
  };

  useEffect(() => {
    if (onRequestClear) {
      onClearClick();
    }
  }, [onRequestClear]);

  const onClearClick = () => {
    // setCheckedInputs([]);
    setCheckedRentInputs(['hDay', 'fDay']);
    setCheckedHotelInputs([]);
    if (onSetClear !== undefined) {
      onSetClear(false);
    }
    // const filter = {rent:checkedRentInputs, hotel:checkedHotelInputs};
    // dispatch(roomFilterActions.sendConfirm(filter));
  };


  const sendConfirm = () => {
    const filter = {rent:checkedRentInputs, hotel:checkedHotelInputs};
    dispatch(roomFilterActions.sendConfirm(filter));
    onRequestClose(false);
    callback();
    console.log(checkedRentInputs);
    console.log(checkedHotelInputs);
  };

  return (
    <>
      <div className={Style["FilterPopBody"]}>
        <div className={Style["FilterPopItem"]}>
          <div className={Style["FilterPopItem-title"]}>숙박 유형</div>
          <ul className={Style["FilterPopList"]}>
            <li className={Style["FilterPopList-item"]}>
              <label className={Style["FilterCheck"]}>
                <input
                  className={Style["FilterCheck-input"]}
                  type="checkbox"
                  id="hDay"
                  name="hDay"
                  onChange={(e) => {
                    changeCheckHandler(e.currentTarget.checked,"rent" ,"hDay");
                  }}
                  checked={checkedRentInputs.includes("hDay") ? true : false}
                />
                <span className={Style["FilterCheck-text"]}>대실</span>
              </label>
            </li>
            <li className={Style["FilterPopList-item"]}>
              <label className={Style["FilterCheck"]}>
                <input
                  className={Style["FilterCheck-input"]}
                  type="checkbox"
                  id="fDay"
                  name="fDay"
                  onChange={(e) => {
                    changeCheckHandler(e.currentTarget.checked,"rent", "fDay");
                  }}
                  checked={checkedRentInputs.includes("fDay") ? true : false}
                />
                <span className={Style["FilterCheck-text"]}>숙박</span>
              </label>
            </li>
          </ul>
        </div>

        <div className={Style["FilterPopItem"]}>
          <div className={Style["FilterPopItem-title"]}>숙소 유형</div>
          <ul className={Style["FilterPopList"]}>
            <li className={Style["FilterPopList-item"]}>
              <label className={Style['FilterCheck']}>
                <input
                  className={Style["FilterCheck-input"]}
                  type="checkbox"
                  id="HOTEL"
                  name="HOTEL"
                  onChange={(e) => {
                    changeCheckHandler(e.currentTarget.checked,"hotel" ,"HOTEL");
                  }}
                  checked={checkedHotelInputs.includes("HOTEL") ? true : false}
                />
                <span className={Style["FilterCheck-text"]}>호텔</span>
              </label>
            </li>
            <li className={Style["FilterPopList-item"]}>
              <label className={Style["FilterCheck"]}>
                <input
                  className={Style["FilterCheck-input"]}
                  type="checkbox"
                  id="MOTEL"
                  name="MOTEL"
                  onChange={(e) => {
                    changeCheckHandler(e.currentTarget.checked, "hotel","MOTEL");
                  }}
                  checked={checkedHotelInputs.includes("MOTEL") ? true : false}
                />
                <span className={Style["FilterCheck-text"]}>모텔</span>
              </label>
            </li>
            <li className={Style["FilterPopList-item"]}>
              <label className={Style["FilterCheck"]}>
                <input
                  className={Style["FilterCheck-input"]}
                  type="checkbox"
                  id="PENSION"
                  name="PENSION"
                  onChange={(e) => {
                    changeCheckHandler(e.currentTarget.checked,"hotel", "PENSION");
                  }}
                  checked={checkedHotelInputs.includes("PENSION") ? true : false}
                />
                <span className={Style["FilterCheck-text"]}>펜션</span>
              </label>
            </li>
            <li className={Style["FilterPopList-item"]}>
              <label className={Style["FilterCheck"]}>
                <input
                  className={Style["FilterCheck-input"]}
                  type="checkbox"
                  id="GUESTHOUSE"
                  name="GUESTHOUSE"
                  onChange={(e) => {
                    changeCheckHandler(e.currentTarget.checked,"hotel", "GUESTHOUSE");
                  }}
                  checked={checkedHotelInputs.includes("GUESTHOUSE") ? true : false}
                />
                <span className={Style["FilterCheck-text"]}>게스트하우스</span>
              </label>
            </li>
            <li className={Style["FilterPopList-item"]}>
              <label className={Style["FilterCheck"]}>
                <input
                  className={Style["FilterCheck-input"]}
                  type="checkbox"
                  id="RESORT"
                  name="RESORT"
                  onChange={(e) => {
                    changeCheckHandler(e.currentTarget.checked,"hotel", "RESORT");
                  }}
                  checked={checkedHotelInputs.includes("RESORT") ? true : false}
                />
                <span className={Style["FilterCheck-text"]}>리조트</span>
              </label>
            </li>
            <li className={Style["FilterPopList-item"]}>
              <label className={Style["FilterCheck"]}>
                <input
                  className={Style["FilterCheck-input"]}
                  type="checkbox"
                  id="CAMPING"
                  name="CAMPING"
                  onChange={(e) => {
                    changeCheckHandler(e.currentTarget.checked,"hotel", "CAMPING");
                  }}
                  checked={checkedHotelInputs.includes("CAMPING") ? true : false}
                />
                <span className={Style["FilterCheck-text"]}>캠핑장</span>
              </label>
            </li>
          </ul>
        </div>
      </div>
      <div className={Style["FilterPopFooter"]}>
        <button className={Style["FilterPopFooter-button"]} onClick={sendConfirm}>
          선택하기
        </button>
      </div>
    </>
  );
};

export default RoomFilter;
